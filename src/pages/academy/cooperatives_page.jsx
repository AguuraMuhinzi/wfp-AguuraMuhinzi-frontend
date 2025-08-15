import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../Redux/axioInstance';

const CooperativesPage = () => {
  const navigate = useNavigate();
  
  const [cooperatives, setCooperatives] = useState([]);
  const [filteredCooperatives, setFilteredCooperatives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [productFilter, setProductFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [lastUpdate, setLastUpdate] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30000); // 30 seconds

  // Validate and normalize cooperative data
  const validateCooperativeData = (coop) => {
    return {
      id: coop.id || Math.random().toString(36).substr(2, 9),
      name: coop.name || 'Unknown Cooperative',
      location: coop.location || 'Unknown location',
      description: coop.description || 'Agricultural cooperative',
      contact_person: coop.contact_person || 'Contact Person',
      phone: coop.phone || 'No phone',
      email: coop.email || 'No email',
      established: coop.established || new Date().getFullYear(),
      members: coop.members || 0,
      products: coop.products || 0,
      status: coop.status || 'active',
      productsList: coop.productsList || [],
      tags: coop.tags || []
    };
  };

  // Fetch cooperatives function (extracted for reuse)
  const fetchCooperatives = useCallback(async (isManualRefresh = false) => {
    try {
      if (isManualRefresh) {
        setIsRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);
      
      // Step 1: Fetch all users with cooperative role (handle pagination)
      let allCooperativeUsers = [];
      let nextUrl = '/users/?role=cooperative';
      
      while (nextUrl) {
        const usersResponse = await axiosInstance.get(nextUrl);
        const responseData = usersResponse.data;
        
        // Handle both paginated and non-paginated responses
        const users = responseData.results || responseData || [];
        allCooperativeUsers = [...allCooperativeUsers, ...users];
        
        // Check for next page
        nextUrl = responseData.next ? responseData.next.replace(axiosInstance.defaults.baseURL, '') : null;
      }
      
      console.log('Total cooperative users found:', allCooperativeUsers.length);
      
      // Step 2: Fetch cooperative details for each user (with better error handling)
      const cooperativesWithDetails = [];
      
      for (const user of allCooperativeUsers) {
        try {
          // Try to fetch cooperative details
          const detailsResponse = await axiosInstance.get(`/cooperative-details/${user.id}/`);
          const details = detailsResponse.data;
          
          // Only add if we have valid cooperative details
          if (details && details.name) {
            const cooperative = {
              id: user.id,
              name: details.name,
              location: details.district || user.district || 'Unknown location',
              description: details.specialization || 'Agricultural cooperative',
              contact_person: details.contact_person || user.username,
              phone: details.contact || '',
              email: user.email,
              established: details.established || new Date().getFullYear(),
              members: details.members || 0,
              products: details.products || 0,
              status: user.is_active ? 'active' : 'inactive',
              // Add additional fields for filtering
              productsList: details.products_list || [],
              tags: details.tags || []
            };
            
            cooperativesWithDetails.push(cooperative);
          }
        } catch (detailsError) {
          console.log(`No cooperative details for user ${user.id}, skipping`);
          // Skip users without cooperative details instead of creating basic entries
          continue;
        }
      }
      
      console.log('Valid cooperatives with details:', cooperativesWithDetails.length);
      
      // Step 3: Remove duplicates based on ID
      const uniqueCooperatives = cooperativesWithDetails.filter((coop, index, self) => 
        index === self.findIndex(c => c.id === coop.id)
      );
      
      console.log('Unique cooperatives after deduplication:', uniqueCooperatives.length);
      
      // Step 4: Check if data has changed
      const hasChanged = cooperatives.length !== uniqueCooperatives.length || 
        JSON.stringify(cooperatives.map(c => c.id).sort()) !== JSON.stringify(uniqueCooperatives.map(c => c.id).sort());
      
      if (hasChanged) {
        console.log('Cooperatives data has changed, updating...');
        // Step 5: Validate and set the data
        const validatedData = uniqueCooperatives.map(validateCooperativeData);
        setCooperatives(validatedData);
        setFilteredCooperatives(validatedData);
        setLastUpdate(new Date());
      } else {
        console.log('No changes detected in cooperatives data');
      }
      
    } catch (err) {
      console.error('Error fetching cooperatives:', err);
      setError(`Failed to load cooperatives: ${err.message}`);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [cooperatives.length]);

  // Initial load
  useEffect(() => {
    fetchCooperatives();
  }, []);

  // Auto-refresh setup
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      console.log('Auto-refreshing cooperatives...');
      fetchCooperatives();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, fetchCooperatives]);

  // Manual refresh function
  const handleManualRefresh = () => {
    fetchCooperatives(true);
  };

  // Filter cooperatives based on search and filter criteria
  useEffect(() => {
    let filtered = cooperatives.filter(coop => {
      const matchesSearch = coop.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          coop.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          coop.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesLocation = !locationFilter || 
                            coop.location.toLowerCase().includes(locationFilter.toLowerCase());
      
      const matchesProduct = !productFilter || 
                           coop.productsList.some(product => 
                             product.toLowerCase().includes(productFilter.toLowerCase())
                           ) ||
                           coop.tags.some(tag => 
                             tag.toLowerCase().includes(productFilter.toLowerCase())
                           );
      
      const matchesStatus = !statusFilter || coop.status === statusFilter;

      return matchesSearch && matchesLocation && matchesProduct && matchesStatus;
    });

    setFilteredCooperatives(filtered);
  }, [searchTerm, locationFilter, productFilter, statusFilter, cooperatives]);

  const handleContactCooperative = (coop) => {
    // Create a more realistic contact action
    if (coop.email) {
      window.open(`mailto:${coop.email}?subject=Inquiry about ${coop.name}`);
    } else if (coop.phone) {
      window.open(`tel:${coop.phone}`);
    } else {
      alert(`Contact information for ${coop.name} is not available.`);
    }
  };

  const handleViewDetails = (coop) => {
    // Navigate to detailed view (you'll need to create this route)
    // navigate(`/cooperatives/${coop.id}`);
    
    // For now, show more details
    const details = `
Name: ${coop.name}
Location: ${coop.location}
Contact: ${coop.contact_person}
Email: ${coop.email}
Phone: ${coop.phone}
Members: ${coop.members}
Products: ${coop.products}
Established: ${coop.established}
Status: ${coop.status}
Description: ${coop.description}
    `;
    alert(details);
  };

  const handleRetry = () => {
    window.location.reload();
  };

  const CooperativeCard = ({ cooperative }) => {
    const getStatusBadgeClass = (status) => {
      switch (status) {
        case 'active': return 'bg-green-100 text-green-800';
        case 'inactive': return 'bg-red-100 text-red-800';
        case 'pending': return 'bg-yellow-100 text-yellow-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    return (
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 overflow-hidden">
        {/* Card Header */}
        <div className="p-5 border-b border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{cooperative.name}</h3>
              <p className="text-gray-600 text-sm flex items-center gap-1">
                📍 {cooperative.location}
              </p>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium uppercase ${getStatusBadgeClass(cooperative.status)}`}>
              {cooperative.status}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5">
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            {cooperative.description}
          </p>
          
          {/* Stats Row */}
          <div className="flex justify-between gap-5 mb-4">
            <div className="text-center">
              <div className="text-lg font-semibold text-green-600">{cooperative.members}</div>
              <div className="text-xs text-gray-500 uppercase">Members</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-green-600">{cooperative.products}</div>
              <div className="text-xs text-gray-500 uppercase">Products</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-green-600">{cooperative.established}</div>
              <div className="text-xs text-gray-500 uppercase">Founded</div>
            </div>
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {cooperative.tags.map((tag, index) => (
              <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                {tag}
              </span>
            ))}
          </div>
          
          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t border-gray-100">
            <button 
              onClick={() => handleContactCooperative(cooperative)}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors"
            >
              Contact
            </button>
            <button 
              onClick={() => handleViewDetails(cooperative)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-md text-sm font-medium border border-gray-200 transition-colors"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    );
  };

  const Sidebar = () => (
    <div className="fixed left-0 top-0 h-full w-60 bg-slate-800 text-white p-0 overflow-y-auto">
      {/* Logo */}
      <div className="p-5 border-b border-slate-700 mb-5">
        <h2 className="text-green-500 text-lg font-semibold">🌱 AguaraMuhinzi</h2>
      </div>

      {/* Navigation */}
      <nav className="px-0">
        <div className="px-5 py-3 hover:bg-slate-700 transition-colors cursor-pointer flex items-center gap-3">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
          </svg>
          Dashboard
        </div>
        <div className="px-5 py-3 hover:bg-slate-700 transition-colors cursor-pointer flex items-center gap-3">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>
          </svg>
          Stock
        </div>
        <div className="px-5 py-3 hover:bg-slate-700 transition-colors cursor-pointer flex items-center gap-3">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
          </svg>
          Orders
        </div>
        <div className="px-5 py-3 bg-green-600 border-r-2 border-green-500 flex items-center gap-3">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          Cooperatives
        </div>
        <div className="px-5 py-3 hover:bg-slate-700 transition-colors cursor-pointer flex items-center gap-3">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
          </svg>
          Analytics
        </div>
        <div className="px-5 py-3 hover:bg-slate-700 transition-colors cursor-pointer flex items-center gap-3">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          Price Trends
        </div>
        <div className="px-5 py-3 hover:bg-slate-700 transition-colors cursor-pointer flex items-center gap-3">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H9V3H13.5L19 8.5V9H21ZM10 16L14 12L10 8V16Z"/>
          </svg>
          Profile
        </div>
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-5 left-5 right-5">
        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md font-medium transition-colors">
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      {/* Main Content */}
      <div className="ml-60 p-5">
        {/* Header */}
        <div className="bg-white p-5 rounded-lg shadow-sm mb-5 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">Agricultural Cooperatives</h1>
            <p className="text-gray-600 text-sm">Connect with verified agricultural cooperatives across Rwanda</p>
            {cooperatives.length > 0 && (
              <p className="text-green-600 text-xs mt-1">
                Showing {filteredCooperatives.length} of {cooperatives.length} cooperatives
              </p>
            )}
          </div>
          <input
            type="text"
            className="px-4 py-2 border border-gray-200 rounded-md bg-gray-50 w-80"
            placeholder="Search cooperatives..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="bg-white p-5 rounded-lg shadow-sm mb-5">
          {/* Real-time Controls */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="autoRefresh"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <label htmlFor="autoRefresh" className="text-sm font-medium text-gray-700">
                  Auto-refresh
                </label>
              </div>
              
              <div className="flex items-center gap-2">
                <label className="text-xs font-medium text-gray-500">Interval:</label>
                <select
                  value={refreshInterval}
                  onChange={(e) => setRefreshInterval(Number(e.target.value))}
                  className="px-2 py-1 border border-gray-200 rounded text-xs"
                  disabled={!autoRefresh}
                >
                  <option value={10000}>10s</option>
                  <option value={30000}>30s</option>
                  <option value={60000}>1m</option>
                  <option value={300000}>5m</option>
                </select>
              </div>
              
              <button
                onClick={handleManualRefresh}
                disabled={isRefreshing}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-1 px-3 rounded text-sm font-medium transition-colors"
              >
                {isRefreshing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Refreshing...
                  </>
                ) : (
                  <>
                    <span>🔄</span>
                    Refresh Now
                  </>
                )}
              </button>
            </div>
            
            {lastUpdate && (
              <div className="text-xs text-gray-500">
                Last updated: {lastUpdate.toLocaleTimeString()}
              </div>
            )}
          </div>
          
          {/* Search and Filters */}
          <div className="flex gap-4 items-center">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-500 uppercase">Location</label>
              <select
                className="px-3 py-2 border border-gray-200 rounded-md bg-white min-w-40"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              >
                <option value="">All Locations</option>
                <option value="kigali">Kigali</option>
                <option value="northern">Northern Province</option>
                <option value="southern">Southern Province</option>
                <option value="eastern">Eastern Province</option>
                <option value="western">Western Province</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-500 uppercase">Product Type</label>
              <select
                className="px-3 py-2 border border-gray-200 rounded-md bg-white min-w-40"
                value={productFilter}
                onChange={(e) => setProductFilter(e.target.value)}
              >
                <option value="">All Products</option>
                <option value="coffee">Coffee</option>
                <option value="tea">Tea</option>
                <option value="maize">Maize</option>
                <option value="beans">Beans</option>
                <option value="rice">Rice</option>
                <option value="vegetables">Vegetables</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-500 uppercase">Status</label>
              <select
                className="px-3 py-2 border border-gray-200 rounded-md bg-white min-w-40"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <button className="ml-auto bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-medium transition-colors">
              + Add New Cooperative
            </button>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-green-600 text-lg">Loading cooperatives...</div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-600 text-lg mb-2">Error Loading Cooperatives</div>
            <p className="text-gray-500 text-sm mb-4">{error}</p>
            <button 
              onClick={handleRetry} 
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCooperatives.map(cooperative => (
              <CooperativeCard key={cooperative.id} cooperative={cooperative} />
            ))}
          </div>
        )}

        {/* No results message */}
        {!loading && !error && filteredCooperatives.length === 0 && cooperatives.length > 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">No cooperatives found</div>
            <p className="text-gray-500 text-sm">Try adjusting your search criteria or filters</p>
          </div>
        )}

        {/* No data message */}
        {!loading && !error && cooperatives.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">No cooperatives available</div>
            <p className="text-gray-500 text-sm">There are currently no cooperatives in the system</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CooperativesPage;