import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  uploadCSV, 
  fetchReferencePrices, 
  searchPrices, 
  fetchUploadHistory, 
  downloadTemplate,
  clearUploadState,
  clearSearchState,
  setFilters,
  clearFilters
} from '../../Redux/Slices/price_upload/price_upload_slice';
import {
  selectUploadState,
  selectReferencePrices,
  selectSearchState,
  selectUploadHistory,
  selectDownloadState
} from '../../Redux/Slices/price_upload/price_upload_slice';
import { 
  Upload, 
  FileText, 
  History, 
  Search, 
  Filter, 
  Download, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle, 
  AlertCircle, 
  X,
  FileSpreadsheet,
  Users,
  Calendar,
  BarChart3
} from 'lucide-react';

const AdminPriceUploadPage = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('upload');

  // Fetch initial data
  useEffect(() => {
    dispatch(fetchReferencePrices());
    dispatch(fetchUploadHistory());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <FileSpreadsheet className="h-8 w-8 text-blue-600" />
                Reference Price Management
              </h1>
              <p className="text-gray-600 mt-2">Upload and manage reference prices for cooperatives</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-gray-500">Total Prices</div>
                <div className="text-2xl font-bold text-blue-600">1,234</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Last Updated</div>
                <div className="text-sm font-medium text-gray-900">2 hours ago</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <div className="flex border-b">
            <button 
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'upload' 
                  ? 'border-b-2 border-blue-600 text-blue-600 bg-blue-50' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('upload')}
            >
              <Upload className="h-4 w-4 mr-2 inline" />
              Upload Prices
            </button>
            <button 
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'manage' 
                  ? 'border-b-2 border-blue-600 text-blue-600 bg-blue-50' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('manage')}
            >
              <FileText className="h-4 w-4 mr-2 inline" />
              Manage Prices
            </button>
            <button 
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'history' 
                  ? 'border-b-2 border-blue-600 text-blue-600 bg-blue-50' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('history')}
            >
              <History className="h-4 w-4 mr-2 inline" />
              Upload History
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="content-area">
          {activeTab === 'upload' && <UploadSection />}
          {activeTab === 'manage' && <ManageSection />}
          {activeTab === 'history' && <HistorySection />}
        </div>
      </div>
    </div>
  );
};

const UploadSection = () => {
  const dispatch = useDispatch();
  const { loading: uploading, success: uploadSuccess, error: uploadError, data: uploadData } = useSelector(selectUploadState);
  const { loading: downloadLoading } = useSelector(selectDownloadState);
  
  const [file, setFile] = useState(null);
  const [overwriteExisting, setOverwriteExisting] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleUpload = () => {
    if (!file) return;
    console.log('Uploading file:', file, file instanceof File);
    dispatch(uploadCSV({ file, overwriteExisting }));
  };

  const handleDownloadTemplate = () => {
    dispatch(downloadTemplate());
  };

  const handleClearUploadState = () => {
    dispatch(clearUploadState());
    setFile(null);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <Upload className="h-5 w-5 text-blue-600" />
          Upload New Prices
        </h3>
        
        {/* File Upload Area */}
        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);
            const droppedFile = e.dataTransfer.files[0];
            if (droppedFile && droppedFile.type === 'text/csv') {
              setFile(droppedFile);
            }
          }}
        >
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-900 mb-2">Drag & drop your CSV file here</p>
          <p className="text-gray-500 mb-4">or</p>
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
            id="file-input"
          />
          <label 
            htmlFor="file-input"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
          >
            Browse Files
          </label>
        </div>

        {/* File Info */}
        {file && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-green-600" />
                <div>
                  <span className="font-medium text-green-900">{file.name}</span>
                  <span className="text-sm text-green-700 ml-2">({Math.round(file.size / 1024)}KB)</span>
                </div>
              </div>
              <button 
                className="text-green-600 hover:text-green-800"
                onClick={() => setFile(null)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* Options */}
        <div className="mt-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={overwriteExisting}
              onChange={(e) => setOverwriteExisting(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">Overwrite existing prices</span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-4">
          <button 
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            onClick={handleDownloadTemplate}
            disabled={downloadLoading}
          >
            <Download className="h-4 w-4 mr-2" />
            {downloadLoading ? 'Downloading...' : 'Download Template'}
          </button>
          
          <button 
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleUpload}
            disabled={!file || uploading}
          >
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Upload Prices
              </>
            )}
          </button>
        </div>

        {/* Upload Result */}
        {uploadSuccess && uploadData && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <h4 className="font-medium text-green-900">Upload Successful</h4>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-green-700">Total Records:</span>
                <span className="font-medium text-green-900 ml-2">{uploadData.total_records || 0}</span>
              </div>
              <div>
                <span className="text-green-700">Successful:</span>
                <span className="font-medium text-green-900 ml-2">{uploadData.successful_uploads || 0}</span>
              </div>
              <div>
                <span className="text-green-700">Failed:</span>
                <span className="font-medium text-red-600 ml-2">{uploadData.failed_uploads || 0}</span>
              </div>
            </div>
            
            {uploadData.errors && uploadData.errors.length > 0 && (
              <div className="mt-4">
                <h5 className="font-medium text-green-900 mb-2">Errors:</h5>
                <ul className="text-sm text-red-700 space-y-1">
                  {uploadData.errors.slice(0, 5).map((error, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <button 
              className="mt-4 text-sm text-green-700 hover:text-green-900"
              onClick={handleClearUploadState}
            >
              Clear Result
            </button>
          </div>
        )}

        {uploadError && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <h4 className="font-medium text-red-900">Upload Failed</h4>
            </div>
            <p className="text-red-700">{uploadError}</p>
            <button 
              className="mt-2 text-sm text-red-700 hover:text-red-900"
              onClick={handleClearUploadState}
            >
              Clear Error
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const ManageSection = () => {
  const dispatch = useDispatch();
  const { loading, error, prices, count } = useSelector(selectReferencePrices);
  const [filters, setFilters] = useState({
    category: '',
    admin1: '',
    admin2: '',
    commodity: ''
  });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    dispatch(setFilters(newFilters));
    dispatch(fetchReferencePrices(newFilters));
  };

  const handleClearFilters = () => {
    setFilters({
      category: '',
      admin1: '',
      admin2: '',
      commodity: ''
    });
    dispatch(clearFilters());
    dispatch(fetchReferencePrices());
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <Filter className="h-5 w-5 text-blue-600" />
          Filter Prices
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select 
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              <option value="cereals and tubers">Cereals and Tubers</option>
              <option value="pulses and nuts">Pulses and Nuts</option>
              <option value="vegetables">Vegetables</option>
              <option value="fruits">Fruits</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Province</label>
            <select 
              value={filters.admin1}
              onChange={(e) => handleFilterChange('admin1', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Provinces</option>
              <option value="Kigali City">Kigali City</option>
              <option value="Eastern Province">Eastern Province</option>
              <option value="Western Province">Western Province</option>
              <option value="Northern Province">Northern Province</option>
              <option value="Southern Province">Southern Province</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
            <select 
              value={filters.admin2}
              onChange={(e) => handleFilterChange('admin2', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Districts</option>
              <option value="Gasabo">Gasabo</option>
              <option value="Kicukiro">Kicukiro</option>
              <option value="Nyarugenge">Nyarugenge</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Commodity</label>
            <input
              type="text"
              placeholder="Search by commodity..."
              value={filters.commodity}
              onChange={(e) => handleFilterChange('commodity', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="mt-4 flex gap-2">
          <button 
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            onClick={handleClearFilters}
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Prices Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              Current Reference Prices
            </h3>
            <div className="flex gap-2">
              <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
              <button className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add New
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-500">Loading prices...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <p className="text-red-600">{error}</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commodity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {prices && prices.length > 0 ? (
                  prices.map((price, index) => (
                    <tr key={price.id || index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {price.commodity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {price.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900">{price.price}</span>
                          <span className="text-sm text-gray-500 ml-1">{price.currency}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {price.admin1}, {price.admin2}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {price.pricetype}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                      No prices found. Try adjusting your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

const HistorySection = () => {
  const dispatch = useDispatch();
  const { loading, error, history } = useSelector(selectUploadHistory);

  useEffect(() => {
    dispatch(fetchUploadHistory());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <History className="h-5 w-5 text-blue-600" />
          Upload History
        </h3>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-500">Loading history...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <p className="text-red-600">{error}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {history && history.length > 0 ? (
              history.map((item, index) => (
                <div key={item.id || index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <div>
                        <span className="font-medium text-gray-900">{item.file_name}</span>
                        <span className="text-sm text-gray-500 ml-2">
                          {new Date(item.upload_date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        {item.successful_uploads}
                      </span>
                      <span className="flex items-center gap-1 text-red-600">
                        <AlertCircle className="h-4 w-4" />
                        {item.failed_uploads}
                      </span>
                      <span className="flex items-center gap-1 text-gray-600">
                        <BarChart3 className="h-4 w-4" />
                        {item.total_records}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      Size: {Math.round(item.file_size / 1024)}KB
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      Uploaded by: {item.uploaded_by_username}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(item.upload_date).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <History className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No upload history found.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPriceUploadPage; 