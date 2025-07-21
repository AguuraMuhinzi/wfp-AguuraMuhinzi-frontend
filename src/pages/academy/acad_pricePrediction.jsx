// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { 
//   Calculator, 
//   TrendingUp, 
//   MapPin, 
//   Calendar, 
//   DollarSign, 
//   ShoppingCart,
//   History,
//   PieChart,
//   Download,
//   AlertCircle,
//   CheckCircle,
//   Loader,
//   Plus,
//   X,
//   BarChart3,
//   Target,
//   BookOpen,
//   Users,
//   Wallet,
//   ArrowRight,
//   Sparkles,
//   RefreshCw,
//   FileText,
//   Eye
// } from 'lucide-react';
// import { createPrediction, fetchUserPredictions } from '../../Redux/Slices/predictions/price_prediction';
// import { createBudgetItem, fetchBudgetItems, removeLocalBudgetItem, clearBudgetMessages } from '../../Redux/Slices/predictions/budget_slice';
// import InsightsTab from '../academy/insightsTab';
// const AcademyPricePredictionDashboard = () => {
//   const userId = localStorage.getItem('user_id'); 
//   const dispatch = useDispatch();
//   const [activeTab, setActiveTab] = useState('predict');
//   const [predictionForm, setPredictionForm] = useState({
//     user: userId,
//     province: '',
//     district: '',
//     market: '',
//     category: '',
//     commodity: '',
//     unit: '',
//     pricetype: '',
//     currency: 'RWF',
//     year: new Date().getFullYear(),
//     month: new Date().getMonth() + 1
//   });
  
//   const [prediction, setPrediction] = useState(null);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [showBudgetSuccess, setShowBudgetSuccess] = useState(false);

//   // Redux selectors
//   const { 
//     prediction: reduxPrediction, 
//     predictions: userPredictions,
//     loading: predictionLoading 
//   } = useSelector(state => state.prediction);
//   const { items: budgetItems, isLoading: budgetLoading, error: budgetError, successMessage } = useSelector(state => state.budget);

//   // Fetch budget items and user predictions on component mount
//   useEffect(() => {
//     if (userId) {
//       dispatch(fetchBudgetItems(userId));
//       dispatch(fetchUserPredictions());
//     }
//   }, [dispatch, userId]);

//   // Fetch user predictions when history tab is activated
//   useEffect(() => {
//     if (activeTab === 'history' && userId) {
//       dispatch(fetchUserPredictions());
//     }
//   }, [activeTab, dispatch, userId]);

//   // Handle budget success message
//   useEffect(() => {
//     if (successMessage) {
//       setShowBudgetSuccess(true);
//       setTimeout(() => {
//         setShowBudgetSuccess(false);
//         dispatch(clearBudgetMessages());
//       }, 3000);
//     }
//   }, [successMessage, dispatch]);

//   // Mock data for demonstration - replace with Redux selectors
//   const mockData = {
//     provinces: ['Kigali City', 'Eastern Province', 'Northern Province', 'Southern Province', 'Western Province'],
//     districts: {
//       'Kigali City': ['Gasabo', 'Kicukiro', 'Nyarugenge'],
//       'Eastern Province': ['Bugesera', 'Gatsibo', 'Kayonza', 'Kirehe'],
//       'Northern Province': ['Burera', 'Gakenke', 'Gicumbi', 'Musanze'],
//       'Southern Province': ['Gisagara', 'Huye', 'Kamonyi', 'Muhanga'],
//       'Western Province': ['Karongi', 'Ngororero', 'Nyabihu', 'Rusizi']
//     },
//     categories: ['cereals and tubers', 'vegetables', 'meat, fish and eggs', 'milk and dairy products', 'fruits', 'pulses and nuts','oil and fats'],
//     commodities: {
//       'cereals and tubers': ['Rice', 'Maize','Maize_flour', 'Sweet potato', 'Irish potato', 'Beans'],
//       'vegetables': ['Tomatoes', 'Onions', 'Cabbage', 'Carrots', 'Spinach'],
//       'meat, fish and eggs': ['Beef', 'Chicken', 'Fish', 'Eggs'],
//       'milk and dairy products': ['Milk', 'Cheese', 'Yogurt'],
//       'fruits': ['Bananas', 'Oranges', 'Avocado'],
//       'pulses and nuts': ['Beans', 'Groundnuts', 'Peas'],
//       'oil and fats': ['Oil']
//     },
//     units: ['KG', 'Litre', 'Piece', 'Bundle'],
//     pricetypes: ['Retail', 'Wholesale']
//   };

//   const handlePredictionSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const resultAction = await dispatch(createPrediction(predictionForm));
//       if (createPrediction.fulfilled.match(resultAction)) {
//         const newPrediction = resultAction.payload;

//         setPrediction(newPrediction);
//         setShowSuccess(true);
//         setTimeout(() => setShowSuccess(false), 3000);
        
//         // Refresh user predictions to include the new one
//         dispatch(fetchUserPredictions());
//       } else {
//         console.error("Prediction failed:", resultAction.payload);
//       }
//     } catch (error) {
//       console.error("Unexpected error:", error);
//     }
//   };

//   const addToBudget = async (predictionData, quantity, userInputPrice) => {
//     // Validate that user input price is within prediction range
//     if (userInputPrice < predictionData.lower_bound || userInputPrice > predictionData.upper_bound) {
//       alert(`Price must be between ${predictionData.lower_bound.toLocaleString()} and ${predictionData.upper_bound.toLocaleString()} RWF`);
//       return;
//     }

//     const budgetData = {
//       user: userId,
//       prediction: parseInt(predictionData.record_id),
//       commodity: predictionData.commodity,
//       quantity: parseFloat(quantity),
//       user_input_price: parseFloat(userInputPrice),
//       // total_cost will be calculated by the backend
//     };

//     try {
//       await dispatch(createBudgetItem(budgetData));
//     } catch (error) {
//       console.error("Failed to add budget item:", error);
//     }
//   };

//   const removeBudgetItem = async (id) => {
//     // Note: You might want to add a delete API endpoint for this
//     // For now, just remove locally
//     dispatch(removeLocalBudgetItem(id));
//   };

//   const refreshHistory = () => {
//     if (userId) {
//       dispatch(fetchUserPredictions());
//     }
//   };

//   const totalBudget = budgetItems.reduce((sum, item) => sum + (item.total_cost || 0), 0);

//   const months = [
//     'January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December'
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
//                 <BookOpen className="w-8 h-8 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">Academy Food Price Predictor</h1>
//                 <p className="text-gray-600">Smart budget planning for school feeding programs</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-4">
//               <div className="text-right">
//                 <p className="text-sm text-gray-500">Total Budget</p>
//                 <p className="text-2xl font-bold text-green-600">{totalBudget.toLocaleString()} RWF</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-6 py-8">
//         {/* Navigation Tabs */}
//         <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl mb-8">
//           {[
//             { id: 'predict', label: 'Price Prediction', icon: Calculator },
//             { id: 'budget', label: 'Budget Planner', icon: Wallet },
//             { id: 'insights', label: 'Insights', icon: BarChart3 },
//             { id: 'history', label: 'History', icon: History }
//           ].map(({ id, label, icon: Icon }) => (
//             <button
//               key={id}
//               onClick={() => setActiveTab(id)}
//               className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
//                 activeTab === id
//                   ? 'bg-white text-blue-600 shadow-sm'
//                   : 'text-gray-600 hover:text-gray-900'
//               }`}
//             >
//               <Icon className="w-5 h-5" />
//               {label}
//             </button>
//           ))}
//         </div>

//         {/* Success Notifications */}
//         {showSuccess && (
//           <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 z-50 animate-pulse">
//             <CheckCircle className="w-6 h-6" />
//             <span>Prediction generated successfully!</span>
//           </div>
//         )}

//         {showBudgetSuccess && (
//           <div className="fixed top-16 right-4 bg-blue-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 z-50 animate-pulse">
//             <CheckCircle className="w-6 h-6" />
//             <span>Budget item added successfully!</span>
//           </div>
//         )}

//         {budgetError && (
//           <div className="fixed top-4 right-4 bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 z-50">
//             <AlertCircle className="w-6 h-6" />
//             <span>{budgetError}</span>
//           </div>
//         )}

//         {/* Main Content */}
//         {activeTab === 'predict' && (
//           <div className="grid lg:grid-cols-3 gap-8">
//             {/* Prediction Form */}
//             <div className="lg:col-span-2">
//               <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//                 <div className="flex items-center gap-3 mb-8">
//                   <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl">
//                     <Sparkles className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <h2 className="text-2xl font-bold text-gray-900">Generate Price Prediction</h2>
//                     <p className="text-gray-600">Get accurate price forecasts for your food procurement</p>
//                   </div>
//                 </div>

//                 <form onSubmit={handlePredictionSubmit} className="space-y-8">
//                   {/* Location Section */}
//                   <div className="bg-gray-50 p-6 rounded-xl">
//                     <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
//                       <MapPin className="w-5 h-5 text-blue-600" />
//                       Location Details
//                     </h3>
//                     <div className="grid md:grid-cols-3 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">Province</label>
//                         <select
//                           value={predictionForm.province}
//                           onChange={(e) => setPredictionForm({...predictionForm, province: e.target.value, district: ''})}
//                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                           required
//                         >
//                           <option value="">Select Province</option>
//                           {mockData.provinces.map(province => (
//                             <option key={province} value={province}>{province}</option>
//                           ))}
//                         </select>
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
//                         <select
//                           value={predictionForm.district}
//                           onChange={(e) => setPredictionForm({...predictionForm, district: e.target.value})}
//                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                           required
//                           disabled={!predictionForm.province}
//                         >
//                           <option value="">Select District</option>
//                           {predictionForm.province && mockData.districts[predictionForm.province]?.map(district => (
//                             <option key={district} value={district}>{district}</option>
//                           ))}
//                         </select>
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">Market</label>
//                         <input
//                           type="text"
//                           value={predictionForm.market}
//                           onChange={(e) => setPredictionForm({...predictionForm, market: e.target.value})}
//                           placeholder="Enter market name"
//                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                           required
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Commodity Section */}
//                   <div className="bg-gray-50 p-6 rounded-xl">
//                     <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
//                       <ShoppingCart className="w-5 h-5 text-green-600" />
//                       Commodity Information
//                     </h3>
//                     <div className="grid md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
//                         <select
//                           value={predictionForm.category}
//                           onChange={(e) => setPredictionForm({...predictionForm, category: e.target.value, commodity: ''})}
//                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                           required
//                         >
//                           <option value="">Select Category</option>
//                           {mockData.categories.map(category => (
//                             <option key={category} value={category}>{category}</option>
//                           ))}
//                         </select>
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">Commodity</label>
//                         <select
//                           value={predictionForm.commodity}
//                           onChange={(e) => setPredictionForm({...predictionForm, commodity: e.target.value})}
//                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                           required
//                           disabled={!predictionForm.category}
//                         >
//                           <option value="">Select Commodity</option>
//                           {predictionForm.category && mockData.commodities[predictionForm.category]?.map(commodity => (
//                             <option key={commodity} value={commodity}>{commodity}</option>
//                           ))}
//                         </select>
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
//                         <select
//                           value={predictionForm.unit}
//                           onChange={(e) => setPredictionForm({...predictionForm, unit: e.target.value})}
//                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                           required
//                         >
//                           <option value="">Select Unit</option>
//                           {mockData.units.map(unit => (
//                             <option key={unit} value={unit}>{unit}</option>
//                           ))}
//                         </select>
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">Price Type</label>
//                         <select
//                           value={predictionForm.pricetype}
//                           onChange={(e) => setPredictionForm({...predictionForm, pricetype: e.target.value})}
//                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                           required
//                         >
//                           <option value="">Select Type</option>
//                           {mockData.pricetypes.map(type => (
//                             <option key={type} value={type}>{type}</option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Time Section */}
//                   <div className="bg-gray-50 p-6 rounded-xl">
//                     <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
//                       <Calendar className="w-5 h-5 text-purple-600" />
//                       Prediction Period
//                     </h3>
//                     <div className="grid md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
//                         <select
//                           value={predictionForm.year}
//                           onChange={(e) => setPredictionForm({...predictionForm, year: parseInt(e.target.value)})}
//                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                         >
//                           {[2024, 2025, 2026].map(year => (
//                             <option key={year} value={year}>{year}</option>
//                           ))}
//                         </select>
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">Month</label>
//                         <select
//                           value={predictionForm.month}
//                           onChange={(e) => setPredictionForm({...predictionForm, month: parseInt(e.target.value)})}
//                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                         >
//                           {months.map((month, index) => (
//                             <option key={month} value={index + 1}>{month}</option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>
//                   </div>

//                   <button
//                     type="submit"
//                     disabled={predictionLoading}
//                     className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-8 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
//                   >
//                     {predictionLoading ? (
//                       <>
//                         <Loader className="w-6 h-6 animate-spin" />
//                         Generating Prediction...
//                       </>
//                     ) : (
//                       <>
//                         <TrendingUp className="w-6 h-6" />
//                         Generate Price Prediction
//                       </>
//                     )}
//                   </button>
//                 </form>
//               </div>
//             </div>

//             {/* Prediction Result */}
//             <div className="space-y-6">
//               {prediction && (
//                 <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
//                   <div className="text-center mb-6">
//                     <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
//                       <DollarSign className="w-8 h-8 text-green-600" />
//                     </div>
//                     <h3 className="text-lg font-semibold text-gray-800 mb-2">Predicted Price</h3>
//                     <div className="text-2xl font-semibold text-green-600 mb-2">
//                       Estimated Price: {prediction.predicted_price.toLocaleString()} RWF
//                     </div>
//                     <div className="text-sm text-gray-500 mb-2">
//                       Price Range: {prediction.lower_bound.toLocaleString()} – {prediction.upper_bound.toLocaleString()} RWF
//                     </div>
//                     <p className="text-gray-600">per {prediction.unit}</p>
//                   </div>

//                   <div className="border-t pt-6">
//                     <div className="space-y-3 text-sm">
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Commodity:</span>
//                         <span className="font-medium">{prediction.commodity}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Location:</span>
//                         <span className="font-medium">{prediction.district}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Period:</span>
//                         <span className="font-medium">{months[prediction.month - 1]} {prediction.year}</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex gap-3 mt-6">
//                     <button
//                       onClick={() => {
//                         const quantity = prompt('Enter quantity needed:');
//                         if (quantity && !isNaN(quantity)) {
//                           const userPrice = prompt(`Enter your planned price per ${prediction.unit} (Range: ${prediction.lower_bound.toLocaleString()} - ${prediction.upper_bound.toLocaleString()} RWF):`);
//                           if (userPrice && !isNaN(userPrice)) {
//                             addToBudget(prediction, quantity, userPrice);
//                           }
//                         }
//                       }}
//                       disabled={budgetLoading}
//                       className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
//                     >
//                       {budgetLoading ? (
//                         <Loader className="w-4 h-4 animate-spin" />
//                       ) : (
//                         <Plus className="w-4 h-4" />
//                       )}
//                       Add to Budget
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* Quick Stats */}
//               <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
//                 <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
//                   <BarChart3 className="w-5 h-5 text-blue-600" />
//                   Quick Stats
//                 </h3>
//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
//                     <span className="text-blue-800 font-medium">Total Predictions</span>
//                     <span className="text-blue-600 font-bold">{userPredictions?.length || 0}</span>
//                   </div>
//                   <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
//                     <span className="text-green-800 font-medium">Budget Items</span>
//                     <span className="text-green-600 font-bold">{budgetItems.length}</span>
//                   </div>
//                   <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
//                     <span className="text-purple-800 font-medium">Total Budget</span>
//                     <span className="text-purple-600 font-bold">{totalBudget.toLocaleString()} RWF</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Budget Planner Tab */}
//         {activeTab === 'budget' && (
//           <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//             <div className="flex items-center justify-between mb-8">
//               <div className="flex items-center gap-3">
//                 <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
//                   <Wallet className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-900">Budget Planner</h2>
//                   <p className="text-gray-600">Manage your food procurement budget</p>
//                 </div>
//               </div>
//               <div className="text-right">
//                 <p className="text-sm text-gray-500">Total Budget</p>
//                 <p className="text-3xl font-bold text-green-600">{totalBudget.toLocaleString()} RWF</p>
//               </div>
//             </div>

//             {budgetLoading ? (
//               <div className="text-center py-12">
//                 <Loader className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
//                 <p className="text-gray-600">Loading budget items...</p>
//               </div>
//             ) : budgetItems.length === 0 ? (
//               <div className="text-center py-12">
//                 <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-4">
//                   <ShoppingCart className="w-12 h-12 text-gray-400" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-600 mb-2">No Budget Items Yet</h3>
//                 <p className="text-gray-500 mb-6">Start by generating price predictions and adding them to your budget</p>
//                 <button
//                   onClick={() => setActiveTab('predict')}
//                   className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
//                 >
//                   <Calculator className="w-5 h-5" />
//                   Create Prediction
//                 </button>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {budgetItems.map((item, index) => (
//                   <div key={item.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
//                     <div className="flex items-center justify-between">
//                       <div className="flex-1">
//                         <div className="flex items-center gap-3 mb-2">
//                           <h3 className="text-lg font-semibold text-gray-800">{item.commodity}</h3>
//                           <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
//                             {item.prediction?.category || 'N/A'}
//                           </span>
//                         </div>
//                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
//                           <div>
//                             <span className="font-medium">Quantity:</span> {item.quantity}
//                           </div>
//                           <div>
//                             <span className="font-medium">Unit Price:</span> {item.user_input_price.toLocaleString()} RWF
//                           </div>
//                           <div>
//                             <span className="font-medium">Total:</span> {item.total_cost.toLocaleString()} RWF
//                           </div>
//                           <div>
//                             <span className="font-medium">Added:</span> {new Date(item.created_at).toLocaleDateString()}
//                           </div>
//                         </div>
//                       </div>
//                       <button
//                         onClick={() => removeBudgetItem(item.id)}
//                         className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                       >
//                         <X className="w-5 h-5" />
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}


//         {/* History Tab */}
//         {activeTab === 'history' && (
//           <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//             <div className="flex items-center justify-between mb-8">
//               <div className="flex items-center gap-3">
//                 <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
//                   <History className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-900">Prediction History</h2>
//                   <p className="text-gray-600">Track all your price predictions</p>
//                 </div>
//               </div>
//               <button
//                 onClick={refreshHistory}
//                 className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition-colors"
//               >
//                 <RefreshCw className="w-4 h-4 animate-spin" />
//                 Refresh
//               </button>
//             </div>

//             {userPredictions.length === 0 ? (
//               <div className="text-center py-12">
//                 <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-4">
//                   <Eye className="w-12 h-12 text-gray-400" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-600 mb-2">No Predictions Yet</h3>
//                 <p className="text-gray-500 mb-6">Your prediction history will appear here.</p>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {userPredictions.map((item) => (
//                   <div key={item.record_id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
//                     <div className="flex items-center justify-between">
//                       <div className="flex-1">
//                         <div className="flex items-center gap-3 mb-2">
//                           <h3 className="text-lg font-semibold text-gray-800">{item.commodity}</h3>
//                           <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
//                             {item.category}
//                           </span>
//                         </div>
//                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
//                           <div>
//                             <span className="font-medium">Predicted:</span>{' '}
//                             {item.predicted_price.toLocaleString()} RWF
//                           </div>
//                           <div>
//                             <span className="font-medium">Range:</span>{' '}
//                             {item.lower_bound.toLocaleString()} - {item.upper_bound.toLocaleString()} RWF
//                           </div>
//                           <div>
//                             <span className="font-medium">Location:</span> {item.district}, {item.province}
//                           </div>
//                           <div>
//                             <span className="font-medium">Market:</span> {item.market}
//                           </div>
//                           <div>
//                             <span className="font-medium">Period:</span> {months[item.month - 1]} {item.year}
//                           </div>
//                           <div>
//                             <span className="font-medium">Price Type:</span> {item.pricetype}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {/* Insights Tab - You might want to add this
//         {activeTab === 'insights' && (
//           <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//             <div className="flex items-center gap-3 mb-8">
//               <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
//                 <BarChart3 className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-900">Insights</h2>
//                 <p className="text-gray-600">Analytics and trends from your data</p>
//               </div>
//             </div>
//             <div className="text-center py-12">
//               <p className="text-gray-500">Insights feature coming soon...</p>
//             </div>
//           </div>
//         )} */}
//         {/* Insights Tab - Now using the InsightsTab component */}
//         {activeTab === 'insights' && (
//           <InsightsTab mockData={mockData} />
//         )}


//       </div>
//     </div>
//   );
// };

// export default AcademyPricePredictionDashboard;


"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  Calculator,
  TrendingUp,
  MapPin,
  Calendar,
  DollarSign,
  ShoppingCart,
  History,
  AlertCircle,
  CheckCircle,
  Loader,
  Plus,
  X,
  BarChart3,
  BookOpen,
  Wallet,
  Sparkles,
  RefreshCw,
  Eye,
} from "lucide-react"
import { createPrediction, fetchUserPredictions } from "../../Redux/Slices/predictions/price_prediction"
import {
  createBudgetItem,
  fetchBudgetItems,
  removeLocalBudgetItem,
  clearBudgetMessages,
} from "../../Redux/Slices/predictions/budget_slice"
import InsightsTab from "../academy/insightsTab"

const AcademyPricePredictionDashboard = () => {
  const userId = localStorage.getItem("user_id")
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState("predict")
  const [predictionForm, setPredictionForm] = useState({
    user: userId,
    province: "",
    district: "",
    market: "",
    category: "",
    commodity: "",
    unit: "",
    pricetype: "",
    currency: "RWF",
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  })

  const [prediction, setPrediction] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showBudgetSuccess, setShowBudgetSuccess] = useState(false)

  // Redux selectors
  const {
    prediction: reduxPrediction,
    predictions: userPredictions,
    loading: predictionLoading,
  } = useSelector((state) => state.prediction)
  const {
    items: budgetItems,
    isLoading: budgetLoading,
    error: budgetError,
    successMessage,
  } = useSelector((state) => state.budget)

  // Fetch budget items and user predictions on component mount
  useEffect(() => {
    if (userId) {
      dispatch(fetchBudgetItems(userId))
      dispatch(fetchUserPredictions())
    }
  }, [dispatch, userId])

  // Fetch user predictions when history tab is activated
  useEffect(() => {
    if (activeTab === "history" && userId) {
      dispatch(fetchUserPredictions())
    }
  }, [activeTab, dispatch, userId])

  // Handle budget success message
  useEffect(() => {
    if (successMessage) {
      setShowBudgetSuccess(true)
      setTimeout(() => {
        setShowBudgetSuccess(false)
        dispatch(clearBudgetMessages())
      }, 3000)
    }
  }, [successMessage, dispatch])

  // Mock data for demonstration - replace with Redux selectors
  const mockData = {
    provinces: ["Kigali City", "Eastern Province", "Northern Province", "Southern Province", "Western Province"],
    districts: {
      "Kigali City": ["Gasabo", "Kicukiro", "Nyarugenge"],
      "Eastern Province": ["Bugesera", "Gatsibo", "Kayonza", "Kirehe"],
      "Northern Province": ["Burera", "Gakenke", "Gicumbi", "Musanze"],
      "Southern Province": ["Gisagara", "Huye", "Kamonyi", "Muhanga"],
      "Western Province": ["Karongi", "Ngororero", "Nyabihu", "Rusizi"],
    },
    categories: [
      "cereals and tubers",
      "vegetables",
      "meat, fish and eggs",
      "milk and dairy products",
      "fruits",
      "pulses and nuts",
      "oil and fats",
    ],
    commodities: {
      "cereals and tubers": ["Rice", "Maize", "Maize_flour", "Sweet potato", "Irish potato", "Beans"],
      vegetables: ["Tomatoes", "Onions", "Cabbage", "Carrots", "Spinach"],
      "meat, fish and eggs": ["Beef", "Chicken", "Fish", "Eggs"],
      "milk and dairy products": ["Milk", "Cheese", "Yogurt"],
      fruits: ["Bananas", "Oranges", "Avocado"],
      "pulses and nuts": ["Beans", "Groundnuts", "Peas"],
      "oil and fats": ["Oil"],
    },
    units: ["KG", "Litre", "Piece", "Bundle"],
    pricetypes: ["Retail", "Wholesale"],
  }

  const handlePredictionSubmit = async (e) => {
    e.preventDefault()
    try {
      const resultAction = await dispatch(createPrediction(predictionForm))
      if (createPrediction.fulfilled.match(resultAction)) {
        const newPrediction = resultAction.payload
        setPrediction(newPrediction)
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 3000)

        // Refresh user predictions to include the new one
        dispatch(fetchUserPredictions())
      } else {
        console.error("Prediction failed:", resultAction.payload)
      }
    } catch (error) {
      console.error("Unexpected error:", error)
    }
  }

  const addToBudget = async (predictionData, quantity, userInputPrice) => {
    // Validate that user input price is within prediction range
    if (userInputPrice < predictionData.lower_bound || userInputPrice > predictionData.upper_bound) {
      alert(
        `Price must be between ${predictionData.lower_bound.toLocaleString()} and ${predictionData.upper_bound.toLocaleString()} RWF`,
      )
      return
    }

    const budgetData = {
      user: userId,
      prediction: Number.parseInt(predictionData.record_id),
      commodity: predictionData.commodity,
      quantity: Number.parseFloat(quantity),
      user_input_price: Number.parseFloat(userInputPrice),
      // total_cost will be calculated by the backend
    }

    try {
      await dispatch(createBudgetItem(budgetData))
    } catch (error) {
      console.error("Failed to add budget item:", error)
    }
  }

  const removeBudgetItem = async (id) => {
    // Note: You might want to add a delete API endpoint for this
    // For now, just remove locally
    dispatch(removeLocalBudgetItem(id))
  }

  const refreshHistory = () => {
    if (userId) {
      dispatch(fetchUserPredictions())
    }
  }

  const totalBudget = budgetItems.reduce((sum, item) => sum + (item.total_cost || 0), 0)

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl shadow-lg">
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
            { id: "predict", label: "Price Prediction", icon: Calculator },
            { id: "budget", label: "Budget Planner", icon: Wallet },
            { id: "insights", label: "Insights", icon: BarChart3 },
            { id: "history", label: "History", icon: History },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === id ? "bg-white text-green-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </button>
          ))}
        </div>

        {/* Success Notifications */}
        {showSuccess && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 z-50 animate-pulse">
            <CheckCircle className="w-6 h-6" />
            <span>Prediction generated successfully!</span>
          </div>
        )}

        {showBudgetSuccess && (
          <div className="fixed top-16 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 z-50 animate-pulse">
            <CheckCircle className="w-6 h-6" />
            <span>Budget item added successfully!</span>
          </div>
        )}

        {budgetError && (
          <div className="fixed top-4 right-4 bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 z-50">
            <AlertCircle className="w-6 h-6" />
            <span>{budgetError}</span>
          </div>
        )}

        {/* Main Content */}
        {activeTab === "predict" && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Prediction Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
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
                      <MapPin className="w-5 h-5 text-green-600" />
                      Location Details
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Province</label>
                        <select
                          value={predictionForm.province}
                          onChange={(e) =>
                            setPredictionForm({ ...predictionForm, province: e.target.value, district: "" })
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                          required
                        >
                          <option value="">Select Province</option>
                          {mockData.provinces.map((province) => (
                            <option key={province} value={province}>
                              {province}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
                        <select
                          value={predictionForm.district}
                          onChange={(e) => setPredictionForm({ ...predictionForm, district: e.target.value })}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                          required
                          disabled={!predictionForm.province}
                        >
                          <option value="">Select District</option>
                          {predictionForm.province &&
                            mockData.districts[predictionForm.province]?.map((district) => (
                              <option key={district} value={district}>
                                {district}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Market</label>
                        <input
                          type="text"
                          value={predictionForm.market}
                          onChange={(e) => setPredictionForm({ ...predictionForm, market: e.target.value })}
                          placeholder="Enter market name"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
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
                          onChange={(e) =>
                            setPredictionForm({ ...predictionForm, category: e.target.value, commodity: "" })
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                          required
                        >
                          <option value="">Select Category</option>
                          {mockData.categories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Commodity</label>
                        <select
                          value={predictionForm.commodity}
                          onChange={(e) => setPredictionForm({ ...predictionForm, commodity: e.target.value })}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                          required
                          disabled={!predictionForm.category}
                        >
                          <option value="">Select Commodity</option>
                          {predictionForm.category &&
                            mockData.commodities[predictionForm.category]?.map((commodity) => (
                              <option key={commodity} value={commodity}>
                                {commodity}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                        <select
                          value={predictionForm.unit}
                          onChange={(e) => setPredictionForm({ ...predictionForm, unit: e.target.value })}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                          required
                        >
                          <option value="">Select Unit</option>
                          {mockData.units.map((unit) => (
                            <option key={unit} value={unit}>
                              {unit}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Price Type</label>
                        <select
                          value={predictionForm.pricetype}
                          onChange={(e) => setPredictionForm({ ...predictionForm, pricetype: e.target.value })}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                          required
                        >
                          <option value="">Select Type</option>
                          {mockData.pricetypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Time Section */}
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-green-600" />
                      Prediction Period
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                        <select
                          value={predictionForm.year}
                          onChange={(e) =>
                            setPredictionForm({ ...predictionForm, year: Number.parseInt(e.target.value) })
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        >
                          {[2024, 2025, 2026].map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Month</label>
                        <select
                          value={predictionForm.month}
                          onChange={(e) =>
                            setPredictionForm({ ...predictionForm, month: Number.parseInt(e.target.value) })
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        >
                          {months.map((month, index) => (
                            <option key={month} value={index + 1}>
                              {month}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={predictionLoading}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-8 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {predictionLoading ? (
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
                    <div className="text-2xl font-semibold text-green-600 mb-2">
                      Estimated Price: {prediction.predicted_price.toLocaleString()} RWF
                    </div>
                    <div className="text-sm text-gray-500 mb-2">
                      Price Range: {prediction.lower_bound.toLocaleString()} – {prediction.upper_bound.toLocaleString()}{" "}
                      RWF
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
                        <span className="font-medium">
                          {months[prediction.month - 1]} {prediction.year}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => {
                        const quantity = prompt("Enter quantity needed:")
                        if (quantity && !isNaN(quantity)) {
                          const userPrice = prompt(
                            `Enter your planned price per ${prediction.unit} (Range: ${prediction.lower_bound.toLocaleString()} - ${prediction.upper_bound.toLocaleString()} RWF):`,
                          )
                          if (userPrice && !isNaN(userPrice)) {
                            addToBudget(prediction, quantity, userPrice)
                          }
                        }
                      }}
                      disabled={budgetLoading}
                      className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {budgetLoading ? <Loader className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                      Add to Budget
                    </button>
                  </div>
                </div>
              )}

              {/* Quick Stats */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                  Quick Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-green-800 font-medium">Total Predictions</span>
                    <span className="text-green-600 font-bold">{userPredictions?.length || 0}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-green-800 font-medium">Budget Items</span>
                    <span className="text-green-600 font-bold">{budgetItems.length}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-green-800 font-medium">Total Budget</span>
                    <span className="text-green-600 font-bold">{totalBudget.toLocaleString()} RWF</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Budget Planner Tab */}
        {activeTab === "budget" && (
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

            {budgetLoading ? (
              <div className="text-center py-12">
                <Loader className="w-12 h-12 animate-spin text-green-600 mx-auto mb-4" />
                <p className="text-gray-600">Loading budget items...</p>
              </div>
            ) : budgetItems.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-4">
                  <ShoppingCart className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Budget Items Yet</h3>
                <p className="text-gray-500 mb-6">
                  Start by generating price predictions and adding them to your budget
                </p>
                <button
                  onClick={() => setActiveTab("predict")}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 mx-auto"
                >
                  <Calculator className="w-5 h-5" />
                  Create Prediction
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {budgetItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-800">{item.commodity}</h3>
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                            {item.prediction?.category || "N/A"}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Quantity:</span> {item.quantity}
                          </div>
                          <div>
                            <span className="font-medium">Unit Price:</span> {item.user_input_price.toLocaleString()}{" "}
                            RWF
                          </div>
                          <div>
                            <span className="font-medium">Total:</span> {item.total_cost.toLocaleString()} RWF
                          </div>
                          <div>
                            <span className="font-medium">Added:</span> {new Date(item.created_at).toLocaleDateString()}
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
        {activeTab === "history" && (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                  <History className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Prediction History</h2>
                  <p className="text-gray-600">Track all your price predictions</p>
                </div>
              </div>
              <button
                onClick={refreshHistory}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition-colors"
              >
                <RefreshCw className="w-4 h-4 animate-spin" />
                Refresh
              </button>
            </div>

            {userPredictions.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-4">
                  <Eye className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Predictions Yet</h3>
                <p className="text-gray-500 mb-6">Your prediction history will appear here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {userPredictions.map((item) => (
                  <div
                    key={item.record_id}
                    className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-800">{item.commodity}</h3>
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                            {item.category}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Predicted:</span> {item.predicted_price.toLocaleString()} RWF
                          </div>
                          <div>
                            <span className="font-medium">Range:</span> {item.lower_bound.toLocaleString()} -{" "}
                            {item.upper_bound.toLocaleString()} RWF
                          </div>
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
                            <span className="font-medium">Price Type:</span> {item.pricetype}
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

        {/* Insights Tab - Now using the InsightsTab component */}
        {activeTab === "insights" && <InsightsTab mockData={mockData} />}
      </div>
    </div>
  )
}

export default AcademyPricePredictionDashboard
