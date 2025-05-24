import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Calculator, 
  TrendingUp, 
  MapPin, 
  Calendar, 
  DollarSign, 
  ShoppingCart,
  History,
  PieChart,
  Download,
  AlertCircle,
  CheckCircle,
  Loader,
  Plus,
  X,
  BarChart3,
  Target,
  BookOpen,
  Users,
  Wallet,
  ArrowRight,
  Sparkles,
  RefreshCw,
  FileText,
  Eye
} from 'lucide-react';
import { createPrediction } from '../../Redux/Slices/predictions/price_prediction';

const AcademyPricePredictionDashboard = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('predict');
  const [predictionForm, setPredictionForm] = useState({
    province: '',
    district: '',
    market: '',
    category: '',
    commodity: '',
    unit: '',
    pricetype: '',
    currency: 'RWF',
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1
  });
  const [budgetItems, setBudgetItems] = useState([]);
 // const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [history, setHistory] = useState([]);
  const { prediction: reduxPrediction, loading: reduxLoading } = useSelector(state => state.prediction);

  // Mock data for demonstration - replace with Redux selectors
  const mockData = {
    provinces: ['Kigali City', 'Eastern Province', 'Northern Province', 'Southern Province', 'Western Province'],
    districts: {
      'Kigali City': ['Gasabo', 'Kicukiro', 'Nyarugenge'],
      'Eastern Province': ['Bugesera', 'Gatsibo', 'Kayonza', 'Kirehe'],
      'Northern Province': ['Burera', 'Gakenke', 'Gicumbi', 'Musanze'],
      'Southern Province': ['Gisagara', 'Huye', 'Kamonyi', 'Muhanga'],
      'Western Province': ['Karongi', 'Ngororero', 'Nyabihu', 'Rusizi']
    },
    categories: ['cereals and tubers', 'vegetables', 'meat, fish and eggs', 'milk and dairy products', 'fruits', 'pulses and nuts'],
    commodities: {
      'cereals and tubers': ['Rice', 'Maize', 'Sweet potato', 'Irish potato', 'Beans'],
      'vegetables': ['Tomatoes', 'Onions', 'Cabbage', 'Carrots', 'Spinach'],
      'meat, fish and eggs': ['Beef', 'Chicken', 'Fish', 'Eggs'],
      'milk and dairy products': ['Milk', 'Cheese', 'Yogurt'],
      'fruits': ['Bananas', 'Oranges', 'Avocado'],
      'pulses and nuts': ['Beans', 'Groundnuts', 'Peas']
    },
    units: ['KG', 'Litre', 'Piece', 'Bundle'],
    pricetypes: ['Retail', 'Wholesale']
  };

  const handlePredictionSubmit = async (e) => {
  e.preventDefault();

  try {
    const resultAction = await dispatch(createPrediction(predictionForm));
    if (createPrediction.fulfilled.match(resultAction)) {
      const newPrediction = resultAction.payload;

      setPrediction(newPrediction);
      setShowSuccess(true);
      setHistory(prev => [newPrediction, ...prev.slice(0, 9)]);
      setTimeout(() => setShowSuccess(false), 3000);
    } else {
      console.error("Prediction failed:", resultAction.payload);
    }
  } catch (error) {
    console.error("Unexpected error:", error);
  }
};

  const addToBudget = (predictionData, quantity) => {
    const budgetItem = {
      id: Date.now(),
      ...predictionData,
      quantity: parseFloat(quantity),
      totalCost: predictionData.predicted_price * parseFloat(quantity)
    };
    setBudgetItems(prev => [...prev, budgetItem]);
  };

  const removeBudgetItem = (id) => {
    setBudgetItems(prev => prev.filter(item => item.id !== id));
  };

  const totalBudget = budgetItems.reduce((sum, item) => sum + item.totalCost, 0);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Academy Food Price Predictor</h1>
                <p className="text-gray-600">Smart budget planning for school feeding programs</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Budget</p>
                <p className="text-2xl font-bold text-green-600">{totalBudget.toLocaleString()} RWF</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl mb-8">
          {[
            { id: 'predict', label: 'Price Prediction', icon: Calculator },
            { id: 'budget', label: 'Budget Planner', icon: Wallet },
            { id: 'insights', label: 'Insights', icon: BarChart3 },
            { id: 'history', label: 'History', icon: History }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </button>
          ))}
        </div>

        {/* Success Notification */}
        {showSuccess && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 z-50 animate-pulse">
            <CheckCircle className="w-6 h-6" />
            <span>Prediction generated successfully!</span>
          </div>
        )}

        {/* Main Content */}
        {activeTab === 'predict' && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Prediction Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Generate Price Prediction</h2>
                    <p className="text-gray-600">Get accurate price forecasts for your food procurement</p>
                  </div>
                </div>

                <form onSubmit={handlePredictionSubmit} className="space-y-8">
                  {/* Location Section */}
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      Location Details
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Province</label>
                        <select
                          value={predictionForm.province}
                          onChange={(e) => setPredictionForm({...predictionForm, province: e.target.value, district: ''})}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          required
                        >
                          <option value="">Select Province</option>
                          {mockData.provinces.map(province => (
                            <option key={province} value={province}>{province}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
                        <select
                          value={predictionForm.district}
                          onChange={(e) => setPredictionForm({...predictionForm, district: e.target.value})}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          required
                          disabled={!predictionForm.province}
                        >
                          <option value="">Select District</option>
                          {predictionForm.province && mockData.districts[predictionForm.province]?.map(district => (
                            <option key={district} value={district}>{district}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Market</label>
                        <input
                          type="text"
                          value={predictionForm.market}
                          onChange={(e) => setPredictionForm({...predictionForm, market: e.target.value})}
                          placeholder="Enter market name"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Commodity Section */}
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <ShoppingCart className="w-5 h-5 text-green-600" />
                      Commodity Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <select
                          value={predictionForm.category}
                          onChange={(e) => setPredictionForm({...predictionForm, category: e.target.value, commodity: ''})}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          required
                        >
                          <option value="">Select Category</option>
                          {mockData.categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Commodity</label>
                        <select
                          value={predictionForm.commodity}
                          onChange={(e) => setPredictionForm({...predictionForm, commodity: e.target.value})}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          required
                          disabled={!predictionForm.category}
                        >
                          <option value="">Select Commodity</option>
                          {predictionForm.category && mockData.commodities[predictionForm.category]?.map(commodity => (
                            <option key={commodity} value={commodity}>{commodity}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                        <select
                          value={predictionForm.unit}
                          onChange={(e) => setPredictionForm({...predictionForm, unit: e.target.value})}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          required
                        >
                          <option value="">Select Unit</option>
                          {mockData.units.map(unit => (
                            <option key={unit} value={unit}>{unit}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Price Type</label>
                        <select
                          value={predictionForm.pricetype}
                          onChange={(e) => setPredictionForm({...predictionForm, pricetype: e.target.value})}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          required
                        >
                          <option value="">Select Type</option>
                          {mockData.pricetypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Time Section */}
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-purple-600" />
                      Prediction Period
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                        <select
                          value={predictionForm.year}
                          onChange={(e) => setPredictionForm({...predictionForm, year: parseInt(e.target.value)})}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        >
                          {[2024, 2025, 2026].map(year => (
                            <option key={year} value={year}>{year}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Month</label>
                        <select
                          value={predictionForm.month}
                          onChange={(e) => setPredictionForm({...predictionForm, month: parseInt(e.target.value)})}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        >
                          {months.map((month, index) => (
                            <option key={month} value={index + 1}>{month}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={reduxLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-8 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {reduxLoading ? (
                      <>
                        <Loader className="w-6 h-6 animate-spin" />
                        Generating Prediction...
                      </>
                    ) : (
                      <>
                        <TrendingUp className="w-6 h-6" />
                        Generate Price Prediction
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Prediction Result */}
            <div className="space-y-6">
              {prediction && (
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                      <DollarSign className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Predicted Price</h3>
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      {prediction.predicted_price.toLocaleString()} RWF
                    </div>
                    <p className="text-gray-600">per {prediction.unit}</p>
                  </div>

                  <div className="border-t pt-6">
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Commodity:</span>
                        <span className="font-medium">{prediction.commodity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Location:</span>
                        <span className="font-medium">{prediction.district}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Period:</span>
                        <span className="font-medium">{months[prediction.month - 1]} {prediction.year}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => {
                        const quantity = prompt('Enter quantity needed:');
                        if (quantity && !isNaN(quantity)) {
                          addToBudget(prediction, quantity);
                        }
                      }}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add to Budget
                    </button>
                  </div>
                </div>
              )}

              {/* Quick Stats */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  Quick Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-blue-800 font-medium">Total Predictions</span>
                    <span className="text-blue-600 font-bold">{history.length}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-green-800 font-medium">Budget Items</span>
                    <span className="text-green-600 font-bold">{budgetItems.length}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <span className="text-purple-800 font-medium">Total Budget</span>
                    <span className="text-purple-600 font-bold">{totalBudget.toLocaleString()} RWF</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Budget Planner Tab */}
        {activeTab === 'budget' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Budget Planner</h2>
                  <p className="text-gray-600">Manage your food procurement budget</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Budget</p>
                <p className="text-3xl font-bold text-green-600">{totalBudget.toLocaleString()} RWF</p>
              </div>
            </div>

            {budgetItems.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-4">
                  <ShoppingCart className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Budget Items Yet</h3>
                <p className="text-gray-500 mb-6">Start by generating price predictions and adding them to your budget</p>
                <button
                  onClick={() => setActiveTab('predict')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
                >
                  <Calculator className="w-5 h-5" />
                  Create Prediction
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {budgetItems.map((item, index) => (
                  <div key={item.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-800">{item.commodity}</h3>
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">{item.category}</span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Location:</span> {item.district}
                          </div>
                          <div>
                            <span className="font-medium">Quantity:</span> {item.quantity} {item.unit}
                          </div>
                          <div>
                            <span className="font-medium">Unit Price:</span> {item.predicted_price.toLocaleString()} RWF
                          </div>
                          <div>
                            <span className="font-medium">Total:</span> {item.totalCost.toLocaleString()} RWF
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeBudgetItem(item.id)}
                        className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                <History className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Prediction History</h2>
                <p className="text-gray-600">Track all your price predictions</p>
              </div>
            </div>

            {history.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-4">
                  <FileText className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No History Yet</h3>
                <p className="text-gray-500">Your prediction history will appear here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {history.map((item, index) => (
                  <div key={item.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-800">{item.commodity}</h3>
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                            {item.predicted_price.toLocaleString()} RWF
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Location:</span> {item.district}, {item.province}
                          </div>
                          <div>
                            <span className="font-medium">Market:</span> {item.market}
                          </div>
                          <div>
                            <span className="font-medium">Period:</span> {months[item.month - 1]} {item.year}
                          </div>
                          <div>
                            <span className="font-medium">Created:</span> {new Date(item.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Insights Tab */}
        {activeTab === 'insights' && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Budget Insights</h2>
                  <p className="text-gray-600">Analyze your spending patterns</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-4 bg-blue-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-blue-800 font-medium">Average Price per Item</span>
                    <span className="text-blue-600 font-bold">
                      {budgetItems.length > 0 ? Math.round(budgetItems.reduce((sum, item) => sum + item.predicted_price, 0) / budgetItems.length).toLocaleString() : 0} RWF
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-green-800 font-medium">Most Expensive Item</span>
                    <span className="text-green-600 font-bold">
                                            {budgetItems.length > 0 ? Math.max(...budgetItems.map(item => item.predicted_price)).toLocaleString() : 0} RWF
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-yellow-800 font-medium">Most Affordable Item</span>
                    <span className="text-yellow-600 font-bold">
                      {budgetItems.length > 0 ? Math.min(...budgetItems.map(item => item.predicted_price)).toLocaleString() : 0} RWF
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-indigo-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-indigo-800 font-medium">Total Items Analyzed</span>
                    <span className="text-indigo-600 font-bold">
                      {budgetItems.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl">
                  <PieChart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Category Distribution</h2>
                  <p className="text-gray-600">See how your budget is distributed by category</p>
                </div>
              </div>

              <ul className="space-y-3">
                {Object.entries(
                  budgetItems.reduce((acc, item) => {
                    acc[item.category] = (acc[item.category] || 0) + item.totalCost;
                    return acc;
                  }, {})
                ).map(([category, total]) => (
                  <li key={category} className="flex justify-between text-sm text-gray-700">
                    <span>{category}</span>
                    <span className="font-semibold">{total.toLocaleString()} RWF</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AcademyPricePredictionDashboard;
