// "use client"

// import { useState, useEffect } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import {
//   FiTrendingUp,
//   FiInfo,
//   FiChevronDown,
//   FiChevronUp,
//   FiStar,
//   FiCalendar,
//   FiDollarSign,
//   FiBarChart2,
//   FiAlertCircle,
//   FiRefreshCw,
//   FiMapPin,
//   FiShoppingCart,
//   FiPackage,
//   FiTarget,
// } from "react-icons/fi"
// import { fetchHarvestPlanningSuggestions } from "../../Redux/Slices/predictions/harvest_plan"

// const SmartMarketSuggestion = () => {
//   const dispatch = useDispatch()
//   const { top_commodities, loading, error } = useSelector((state) => state.harvestPlanning)

//   // Form state
//   const [selectedProvince, setSelectedProvince] = useState("")
//   const [selectedDistrict, setSelectedDistrict] = useState("")
//   const [selectedMarket, setSelectedMarket] = useState("")
//   const [selectedCategory, setSelectedCategory] = useState("")
//   const [selectedCommodity, setSelectedCommodity] = useState("")
//   const [selectedUnit, setSelectedUnit] = useState("")
//   const [selectedPriceType, setSelectedPriceType] = useState("")
//   const [expandedCrop, setExpandedCrop] = useState(null)

//   // Static data for form options
//   const mockProvinces = ["Kigali", "Eastern Province", "Western Province", "Northern Province", "Southern Province"]

//   const mockDistricts = {
//     Kigali: ["Gasabo", "Kicukiro", "Nyarugenge"],
//     "Eastern Province": ["Rwamagana", "Kayonza", "Gatsibo"],
//     "Western Province": ["Rusizi", "Nyamasheke", "Karongi"],
//     "Northern Province": ["Musanze", "Gicumbi", "Rulindo"],
//     "Southern Province": ["Huye", "Muhanga", "Ruhango"],
//   }

//   const mockMarkets = {
//     Gasabo: ["Kimironko Market", "Remera Market"],
//     Kicukiro: ["Nyabugogo Market", "Gikondo Market"],
//     Nyarugenge: ["Nyarugenge Market", "Central Market"],
//     Rwamagana: ["Rwamagana Market", "Fumbwe Market"],
//     Kayonza: ["Kayonza Market", "Mukarange Market"],
//   }

//   const mockCategories = ["Vegetables", "Fruits", "Grains", "Legumes"]
//   const mockCommodities = {
//     Vegetables: ["Tomatoes", "Onions", "Carrots", "Cabbage", "Irish Potatoes"],
//     Fruits: ["Bananas", "Avocados", "Mangoes", "Oranges", "Pineapples"],
//     Grains: ["Maize", "Rice", "Wheat", "Sorghum"],
//     Legumes: ["Beans", "Peas", "Groundnuts", "Soybeans"],
//   }

//   const mockUnits = ["Kg", "Ton", "Bag (50kg)", "Crate"]
//   const mockPriceTypes = ["Wholesale", "Retail", "Farm Gate"]

//   // Derived state for cascading dropdowns
//   const [availableDistricts, setAvailableDistricts] = useState([])
//   const [availableMarkets, setAvailableMarkets] = useState([])
//   const [availableCommodities, setAvailableCommodities] = useState([])

//   // Handle cascading dropdown updates
//   useEffect(() => {
//     if (selectedProvince) {
//       setAvailableDistricts(mockDistricts[selectedProvince] || [])
//       setSelectedDistrict("")
//       setSelectedMarket("")
//     }
//   }, [selectedProvince])

//   useEffect(() => {
//     if (selectedDistrict) {
//       setAvailableMarkets(mockMarkets[selectedDistrict] || [])
//       setSelectedMarket("")
//     }
//   }, [selectedDistrict])

//   useEffect(() => {
//     if (selectedCategory) {
//       setAvailableCommodities(mockCommodities[selectedCategory] || [])
//       setSelectedCommodity("")
//     }
//   }, [selectedCategory])

//   // Fetch data when all required fields are selected
//   useEffect(() => {
//     if (
//       selectedProvince &&
//       selectedDistrict &&
//       selectedMarket &&
//       selectedCategory &&
//       selectedCommodity &&
//       selectedUnit &&
//       selectedPriceType
//     ) {
//       const inputData = {
//         province: selectedProvince,
//         district: selectedDistrict,
//         market: selectedMarket,
//         category: selectedCategory,
//         commodity: selectedCommodity,
//         unit: selectedUnit,
//         pricetype: selectedPriceType,
//       }
//       dispatch(fetchHarvestPlanningSuggestions(inputData))
//     }
//   }, [
//     selectedProvince,
//     selectedDistrict,
//     selectedMarket,
//     selectedCategory,
//     selectedCommodity,
//     selectedUnit,
//     selectedPriceType,
//     dispatch,
//   ])

//   const getSmartSuggestion = () => {
//     const crop = top_commodities.find((c) => c.commodity === selectedCommodity)
//     if (!crop || !crop.trend || crop.trend.length < 2) return null

//     const now = crop.trend[0].predicted_price
//     const next = crop.trend[1].predicted_price
//     const changePercent = ((next - now) / now) * 100

//     if (changePercent > 5) {
//       return {
//         type: "wait",
//         message: `Wait to Sell – Price Expected to Rise by ${changePercent.toFixed(1)}%`,
//         icon: "💡",
//         color: "bg-yellow-100 border-yellow-400 text-yellow-800",
//       }
//     } else if (changePercent > 0) {
//       return {
//         type: "sell",
//         message: "Good Time to Sell – Prices at Peak",
//         icon: "🎯",
//         color: "bg-green-100 border-green-400 text-green-800",
//       }
//     } else {
//       return {
//         type: "caution",
//         message: "Sell Now – Price May Drop Soon",
//         icon: "⚠️",
//         color: "bg-red-100 border-red-400 text-red-800",
//       }
//     }
//   }

//   const smartSuggestion = getSmartSuggestion()

//   const SimpleLineChart = ({ data }) => {
//     if (!data || data.length === 0) return null

//     const max = Math.max(...data)
//     const min = Math.min(...data)
//     const range = max - min

//     return (
//       <div className="h-16 flex items-end space-x-1">
//         {data.map((value, index) => {
//           const height = range > 0 ? ((value - min) / range) * 100 : 50
//           return (
//             <div
//               key={index}
//               className="bg-green-500 w-2 rounded-t transition-all duration-300 hover:bg-green-600"
//               style={{ height: `${Math.max(height, 10)}%` }}
//             />
//           )
//         })}
//       </div>
//     )
//   }

//   const PriceChart = ({ data }) => {
//     if (!data || data.length === 0) return null

//     return (
//       <div className="bg-white p-4 rounded-lg border">
//         <div className="flex items-center justify-between mb-4">
//           <h4 className="font-medium text-gray-800">Price Trend Forecast</h4>
//           <FiBarChart2 className="text-green-600" />
//         </div>
//         <div className="h-48 flex items-end justify-between space-x-2">
//           {data.map((item, index) => {
//             const maxPrice = Math.max(...data.map((d) => d.predicted_price))
//             const height = (item.predicted_price / maxPrice) * 100
//             return (
//               <div key={index} className="flex flex-col items-center flex-1">
//                 <div className="w-full bg-gray-200 rounded-t relative" style={{ height: "150px" }}>
//                   <div
//                     className="bg-gradient-to-t from-green-500 to-green-400 rounded-t absolute bottom-0 w-full transition-all duration-500"
//                     style={{ height: `${height}%` }}
//                   />
//                   <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700">
//                     {item.predicted_price} RWF
//                   </div>
//                 </div>
//                 <div className="text-xs text-gray-600 mt-2 text-center">
//                   {item.month} {item.year}
//                 </div>
//               </div>
//             )
//           })}
//         </div>
//       </div>
//     )
//   }

//   const LoadingSpinner = () => (
//     <div className="flex items-center justify-center py-12">
//       <FiRefreshCw className="w-8 h-8 text-green-600 animate-spin mr-3" />
//       <span className="text-gray-600 text-lg">Loading market insights...</span>
//     </div>
//   )

//   const ErrorMessage = ({ message }) => (
//     <div className="text-center py-12">
//       <FiAlertCircle className="w-16 h-16 mx-auto mb-4 text-red-400" />
//       <p className="text-red-600 text-lg mb-4">{message}</p>
//       <button
//         onClick={() => window.location.reload()}
//         className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
//       >
//         Try Again
//       </button>
//     </div>
//   )

//   const isFormComplete =
//     selectedProvince &&
//     selectedDistrict &&
//     selectedMarket &&
//     selectedCategory &&
//     selectedCommodity &&
//     selectedUnit &&
//     selectedPriceType

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 space-y-6">
//       {/* Page Header */}
//       <div className="bg-white rounded-lg shadow-sm border p-6">
//         <div className="flex items-center space-x-3 mb-2">
//           <div className="p-3 bg-green-100 rounded-lg">
//             <FiTrendingUp className="w-8 h-8 text-green-600" />
//           </div>
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800">Smart Market Suggestions</h1>
//             <p className="text-gray-600 text-lg">AI-powered forecasts for better farming decisions</p>
//           </div>
//         </div>
//       </div>

//       <div className="grid lg:grid-cols-3 gap-6">
//         {/* Selection Form */}
//         <div className="lg:col-span-1">
//           <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-4">
//             <div className="flex items-center space-x-2 mb-6">
//               <FiTarget className="w-5 h-5 text-green-600" />
//               <h2 className="text-xl font-semibold text-gray-800">Market Selection</h2>
//             </div>

//             <div className="space-y-4">
//               {/* Location Selection */}
//               <div>
//                 <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
//                   <FiMapPin className="w-4 h-4 mr-1" />
//                   Province
//                 </label>
//                 <select
//                   value={selectedProvince}
//                   onChange={(e) => setSelectedProvince(e.target.value)}
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
//                 >
//                   <option value="">Select Province</option>
//                   {mockProvinces.map((province) => (
//                     <option key={province} value={province}>
//                       {province}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
//                   <FiMapPin className="w-4 h-4 mr-1" />
//                   District
//                 </label>
//                 <select
//                   value={selectedDistrict}
//                   onChange={(e) => setSelectedDistrict(e.target.value)}
//                   disabled={!selectedProvince}
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100 transition-colors"
//                 >
//                   <option value="">Select District</option>
//                   {availableDistricts.map((district) => (
//                     <option key={district} value={district}>
//                       {district}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
//                   <FiShoppingCart className="w-4 h-4 mr-1" />
//                   Market
//                 </label>
//                 <select
//                   value={selectedMarket}
//                   onChange={(e) => setSelectedMarket(e.target.value)}
//                   disabled={!selectedDistrict}
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100 transition-colors"
//                 >
//                   <option value="">Select Market</option>
//                   {availableMarkets.map((market) => (
//                     <option key={market} value={market}>
//                       {market}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Product Selection */}
//               <div className="border-t pt-4">
//                 <div>
//                   <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
//                     <FiPackage className="w-4 h-4 mr-1" />
//                     Category
//                   </label>
//                   <select
//                     value={selectedCategory}
//                     onChange={(e) => setSelectedCategory(e.target.value)}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
//                   >
//                     <option value="">Select Category</option>
//                     {mockCategories.map((category) => (
//                       <option key={category} value={category}>
//                         {category}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="mt-4">
//                   <label className="flex items-center text-sm font-medium text-gray-700 mb-2">🌾 Commodity</label>
//                   <select
//                     value={selectedCommodity}
//                     onChange={(e) => setSelectedCommodity(e.target.value)}
//                     disabled={!selectedCategory}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100 transition-colors"
//                   >
//                     <option value="">Select Commodity</option>
//                     {availableCommodities.map((commodity) => (
//                       <option key={commodity} value={commodity}>
//                         {commodity}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="mt-4">
//                   <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
//                     <FiPackage className="w-4 h-4 mr-1" />
//                     Unit
//                   </label>
//                   <select
//                     value={selectedUnit}
//                     onChange={(e) => setSelectedUnit(e.target.value)}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
//                   >
//                     <option value="">Select Unit</option>
//                     {mockUnits.map((unit) => (
//                       <option key={unit} value={unit}>
//                         {unit}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="mt-4">
//                   <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
//                     <FiDollarSign className="w-4 h-4 mr-1" />
//                     Price Type
//                   </label>
//                   <select
//                     value={selectedPriceType}
//                     onChange={(e) => setSelectedPriceType(e.target.value)}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
//                   >
//                     <option value="">Select Price Type</option>
//                     {mockPriceTypes.map((type) => (
//                       <option key={type} value={type}>
//                         {type}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             </div>

//             {/* Form Status */}
//             <div className="mt-6 p-4 bg-gray-50 rounded-lg">
//               <div className="flex items-center space-x-2">
//                 <div className={`w-3 h-3 rounded-full ${isFormComplete ? "bg-green-500" : "bg-gray-300"}`}></div>
//                 <span className="text-sm text-gray-600">
//                   {isFormComplete ? "Form Complete - Getting Predictions" : "Complete form to get predictions"}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Smart Suggestion Banner */}
//           {smartSuggestion && selectedCommodity && !loading && (
//             <div className={`p-6 rounded-lg border-l-4 ${smartSuggestion.color} shadow-sm`}>
//               <div className="flex items-center space-x-3">
//                 <span className="text-3xl">{smartSuggestion.icon}</span>
//                 <div>
//                   <h3 className="font-semibold text-lg">Smart Recommendation</h3>
//                   <p className="font-medium">{smartSuggestion.message}</p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Price Prediction Section */}
//           <div className="bg-white rounded-lg shadow-sm border">
//             <div className="p-6 border-b">
//               <div className="flex items-center space-x-2 mb-2">
//                 <FiBarChart2 className="w-5 h-5 text-green-600" />
//                 <h2 className="text-xl font-semibold text-gray-800">Price Forecast</h2>
//               </div>
//               {selectedCommodity && (
//                 <p className="text-gray-600">
//                   3-month prediction for <strong>{selectedCommodity}</strong> in <strong>{selectedMarket}</strong>
//                 </p>
//               )}
//             </div>

//             <div className="p-6">
//               {loading ? (
//                 <LoadingSpinner />
//               ) : error ? (
//                 <ErrorMessage message={error} />
//               ) : selectedCommodity && top_commodities.length > 0 ? (
//                 <>
//                   {(() => {
//                     const selectedCrop = top_commodities.find((c) => c.commodity === selectedCommodity)
//                     return selectedCrop && selectedCrop.trend ? (
//                       <>
//                         <PriceChart data={selectedCrop.trend} />

//                         {/* Price Table */}
//                         <div className="mt-6 overflow-x-auto">
//                           <table className="w-full text-sm border rounded-lg">
//                             <thead className="bg-gray-50">
//                               <tr>
//                                 <th className="text-left p-3 font-medium text-gray-700">
//                                   <div className="flex items-center space-x-1">
//                                     <FiCalendar className="w-4 h-4" />
//                                     <span>Period</span>
//                                   </div>
//                                 </th>
//                                 <th className="text-left p-3 font-medium text-gray-700">
//                                   <div className="flex items-center space-x-1">
//                                     <FiDollarSign className="w-4 h-4" />
//                                     <span>Predicted Price</span>
//                                   </div>
//                                 </th>
//                                 <th className="text-left p-3 font-medium text-gray-700">Lower Bound</th>
//                                 <th className="text-left p-3 font-medium text-gray-700">Upper Bound</th>
//                               </tr>
//                             </thead>
//                             <tbody>
//                               {selectedCrop.trend.map((row, index) => (
//                                 <tr key={index} className="border-t hover:bg-gray-50 transition-colors">
//                                   <td className="p-3 font-medium">
//                                     {row.month} {row.year}
//                                   </td>
//                                   <td className="p-3 text-green-600 font-semibold">{row.predicted_price} RWF</td>
//                                   <td className="p-3 text-gray-600">{row.lower_bound} RWF</td>
//                                   <td className="p-3 text-gray-600">{row.upper_bound} RWF</td>
//                                 </tr>
//                               ))}
//                             </tbody>
//                           </table>
//                         </div>
//                       </>
//                     ) : (
//                       <div className="text-center py-12 text-gray-500">
//                         <FiAlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//                         <p>No prediction data available for selected commodity</p>
//                       </div>
//                     )
//                   })()}
//                 </>
//               ) : (
//                 <div className="text-center py-12 text-gray-500">
//                   <FiAlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//                   <p>Please complete the form to view price predictions</p>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Top Crops Recommendations */}
//           <div className="bg-white rounded-lg shadow-sm border">
//             <div className="p-6 border-b">
//               <div className="flex items-center space-x-2 mb-2">
//                 <FiStar className="w-5 h-5 text-yellow-500" />
//                 <h2 className="text-xl font-semibold text-gray-800">Top Crops This Season</h2>
//               </div>
//               <p className="text-gray-600">Based on market performance and predictions</p>
//             </div>

//             <div className="p-6">
//               {loading ? (
//                 <LoadingSpinner />
//               ) : error ? (
//                 <ErrorMessage message={error} />
//               ) : top_commodities && top_commodities.length > 0 ? (
//                 <div className="space-y-4">
//                   {top_commodities.map((crop, index) => (
//                     <div
//                       key={crop.commodity}
//                       className="border rounded-lg hover:shadow-md transition-all duration-200 cursor-pointer"
//                       onClick={() => setExpandedCrop(expandedCrop === index ? null : index)}
//                     >
//                       <div className="p-4">
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center space-x-3">
//                             <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
//                               <span className="text-2xl">🌾</span>
//                             </div>
//                             <div>
//                               <h3 className="font-semibold text-gray-800 text-lg">{crop.commodity}</h3>
//                               <p className="text-sm text-gray-600">
//                                 Average: <span className="font-medium text-green-600">{crop.average_price} RWF</span>
//                               </p>
//                             </div>
//                           </div>

//                           <div className="flex items-center space-x-4">
//                             <div className="w-20">
//                               <SimpleLineChart data={crop.trend?.map((p) => p.predicted_price) || []} />
//                             </div>
//                             {expandedCrop === index ? (
//                               <FiChevronUp className="w-5 h-5 text-gray-400" />
//                             ) : (
//                               <FiChevronDown className="w-5 h-5 text-gray-400" />
//                             )}
//                           </div>
//                         </div>
//                       </div>

//                       {/* Expanded Content */}
//                       {expandedCrop === index && crop.trend && (
//                         <div className="border-t bg-gray-50 p-4">
//                           <h4 className="font-medium text-gray-800 mb-3">3-Month Price Trend</h4>
//                           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                             {crop.trend.map((item, idx) => (
//                               <div key={idx} className="bg-white p-3 rounded border">
//                                 <div className="text-sm text-gray-600">
//                                   {item.month} {item.year}
//                                 </div>
//                                 <div className="text-lg font-semibold text-green-600">{item.predicted_price} RWF</div>
//                                 <div className="text-xs text-gray-500">
//                                   Range: {item.lower_bound} - {item.upper_bound} RWF
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-12 text-gray-500">
//                   <FiAlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//                   <p>Complete the form to view crop recommendations</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Tips Section */}
//       <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200 p-6">
//         <div className="flex items-start space-x-3">
//           <div className="p-2 bg-green-100 rounded-lg">
//             <FiInfo className="w-5 h-5 text-green-600" />
//           </div>
//           <div>
//             <h3 className="font-semibold text-gray-800 mb-2">💡 Smart Farming Tips</h3>
//             <div className="grid md:grid-cols-2 gap-4">
//               <ul className="text-sm text-gray-700 space-y-1">
//                 <li>• Diversify crops to reduce market risk</li>
//                 <li>• Monitor weather patterns for optimal planting</li>
//               </ul>
//               <ul className="text-sm text-gray-700 space-y-1">
//                 <li>• Join cooperatives for better bargaining power</li>
//                 <li>• Consider storage facilities for better timing</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default SmartMarketSuggestion
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommodityTrend } from "../../Redux/Slices/predictions/harvest_plan"

const CommodityTrendPage = () => {
  const dispatch = useDispatch();
  const { predictions, loading, error } = useSelector((state) => state.commodityTrend);

  const [commodity, setCommodity] = useState("");
  const [district, setDistrict] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commodity && district && year) {
      dispatch(fetchCommodityTrend({ commodity, district, year }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">📈 Commodity Price Trends</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Commodity (e.g., Maize)"
          value={commodity}
          onChange={(e) => setCommodity(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="District (e.g., Gasabo)"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Year (e.g., 2025)"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="col-span-1 md:col-span-3 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          View Trends
        </button>
      </form>

      {loading && <p className="text-blue-600">Loading predictions...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {predictions.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">📊 Monthly Predictions</h3>
          <table className="w-full border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Month</th>
                <th className="border p-2">Predicted Price (RWF)</th>
              </tr>
            </thead>
            <tbody>
              {predictions.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border p-2">{item.month}</td>
                  <td className="border p-2">{item.predicted_price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CommodityTrendPage;
