// "use client"

// import { useEffect, useMemo, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { fetchOrders } from "../../Redux/Slices/order/orderSlice"
// import { fetchReferencePrices, fetchUploadHistory } from "../../Redux/Slices/price_upload/price_upload_slice"
// import { fetchProductDemandReport } from "../../Redux/Slices/reports/report_slice"
// import { listProducts } from "../../Redux/Slices/product/product"
// import { fetchAllUsers } from "../../Redux/Slices/user_slice"
// import { fetchCommodityTrend } from '../../Redux/Slices/predictions/harvest_plan'
// import { fetchPredictions } from '../../Redux/Slices/predictions/price_prediction'
// import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
// import {
//   FiUsers,
//   FiPackage,
//   FiBarChart2,
//   FiShoppingCart,
//   FiTrendingUp,
//   FiPieChart,
//   FiMapPin,
//   FiDownload,
//   FiPlus,
//   FiArrowUp,
//   FiArrowDown,
//   FiActivity,
//   FiClock,
//   FiUpload,
// } from "react-icons/fi"
// import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';

// const AdminOverview = () => {
//   const dispatch = useDispatch()

//   // State for dynamic GeoJSON loading
//   const [districtGeoJson, setDistrictGeoJson] = useState(null);
//   const [geoJsonError, setGeoJsonError] = useState(null);

//   // Prediction trend state
//   const prediction = useSelector((state) => state.commodityTrend)
//   const { predictions: commodityPredictions = [], trend_analysis } = prediction || {}

//   // Smart Market usage state
//   const predictionState = useSelector((state) => state.prediction)
//   const allPredictions = predictionState?.predictions || []

//   // Group predictions by month for the current year
//   const usageByMonth = useMemo(() => {
//     const months = [
//       'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
//       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
//     ]
//     const nowYear = new Date().getFullYear()
//     const counts = Array(12).fill(0)
//     allPredictions.forEach(pred => {
//       const date = new Date(pred.created_at)
//       if (date.getFullYear() === nowYear) {
//         counts[date.getMonth()]++
//       }
//     })
//     return months.map((m, i) => ({ month: m, count: counts[i] }))
//   }, [allPredictions])

//   // Fetch Rwanda districts GeoJSON from a direct link
//   useEffect(() => {
//     fetch('https://raw.githubusercontent.com/digitalearthafrica/country-borders/main/data/rwa_admbnda_adm2_rwa.geojson')
//       .then(res => res.json())
//       .then(setDistrictGeoJson)
//       .catch(err => setGeoJsonError('Failed to load Rwanda districts map.'));
//   }, []);

//   // Fetch all data on mount
//   useEffect(() => {
//     dispatch(fetchOrders())
//     dispatch(fetchReferencePrices())
//     dispatch(fetchUploadHistory())
//     dispatch(fetchProductDemandReport({}))
//     dispatch(listProducts())
//     dispatch(fetchAllUsers())
//     dispatch(fetchCommodityTrend({ commodity: 'Maize', year: new Date().getFullYear() }))
//     dispatch(fetchPredictions())
//   }, [dispatch])

//   // Selectors
//   const orders = useSelector((state) => state.order.orders || [])
//   const referencePrices = useSelector((state) => state.priceUpload.referencePrices || [])
//   const uploadHistory = useSelector((state) => state.priceUpload.uploadHistory || [])
//   const productDemand = useSelector((state) => state.reports.productDemandReport || [])
//   const products = useSelector((state) => state.product.products || [])
//   const allUsers = useSelector((state) => state.user.allUsers || [])

//   // Filter users by role
//   const totalUsers = allUsers.length
//   const totalCooperatives = allUsers.filter((u) => u.role === "cooperative").length
//   const totalAcademies = allUsers.filter((u) => u.role === "academy").length
//   const totalOrders = orders.length
//   const revenue = orders.reduce((sum, o) => sum + (o.total || 0), 0)

//   // Product demand bar chart data (top 6 products)
//   const productBarData = useMemo(() => {
//     if (!Array.isArray(productDemand)) return []
//     return productDemand.slice(0, 6).map((row) => ({
//       name: row.product__product_name,
//       quantity: row.total_quantity,
//       growth: Math.floor(Math.random() * 30) - 10, // Mock growth for visual
//     }))
//   }, [productDemand])

//   // Order status breakdown
//   const statusCounts = useMemo(() => {
//     return orders.reduce((acc, o) => {
//       acc[o.status] = (acc[o.status] || 0) + 1
//       return acc
//     }, {})
//   }, [orders])

//   const statusData = Object.entries(statusCounts).map(([name, value]) => ({
//     name,
//     value,
//     color:
//       name === "completed" ? "#10b981" : name === "pending" ? "#f59e0b" : name === "processing" ? "#3b82f6" : "#ef4444",
//   }))

//   // Top cooperatives (top 5)
//   const coopCounts = {}
//   orders.forEach((order) => {
//     let coop = ""
//     if (order.cooperative) {
//       if (typeof order.cooperative === "object") {
//         coop = order.cooperative.name || order.cooperative.username || ""
//       } else {
//         coop = order.cooperative
//       }
//     }
//     if (coop) coopCounts[coop] = (coopCounts[coop] || 0) + 1
//   })

//   const topCoops = Object.entries(coopCounts)
//     .sort((a, b) => b[1] - a[1])
//     .slice(0, 5)
//     .map(([name, orders]) => ({
//       name,
//       orders,
//       revenue: orders * 1500 + Math.floor(Math.random() * 5000), // Mock revenue calculation
//     }))

//   // Recent activity
//   const recentUsers = allUsers
//     .slice()
//     .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
//     .slice(0, 5)

//   const recentUploads = uploadHistory.slice(0, 4)

//   // Prepare chart data for predictions (next 3 months)
//   const predictionChartData = Array.isArray(commodityPredictions)
//     ? commodityPredictions.slice(0, 3).map((item) => ({
//         month: item.month_name,
//         predicted_price: item.predicted_price,
//         lower_bound: item.lower_bound,
//         upper_bound: item.upper_bound,
//       }))
//     : []

//   // Smart insights
//   const topCoop = topCoops[0]?.name || "N/A"
//   const mostDemandedProduct = productDemand[0]?.product__product_name || "N/A"

//   // Calculate mock growth percentages
//   const growthData = {
//     users: 12.5,
//     cooperatives: 8.3,
//     academies: 15.7,
//     orders: 23.4,
//     revenue: 18.9,
//   }

//   // Get admin username from localStorage
//   const username = typeof window !== 'undefined' ? localStorage.getItem('username') || 'Admin' : 'Admin';

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight text-gray-900">Welcome, {username}!</h1>
//           <p className="text-gray-600">Welcome to AguuraMuhinzi.</p>
//         </div>
//         <div className="flex items-center gap-3">
//           <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
//             <option value="7d">Last 7 days</option>
//             <option value="30d">Last 30 days</option>
//             <option value="90d">Last 90 days</option>
//             <option value="1y">Last year</option>
//           </select>
//         </div>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
//         <SummaryCard
//           icon={<FiUsers className="h-6 w-6" />}
//           label="Total Users"
//           value={totalUsers.toLocaleString()}
//           growth={growthData.users}
//           color="blue"
//         />
//         <SummaryCard
//           icon={<FiPackage className="h-6 w-6" />}
//           label="Cooperatives"
//           value={totalCooperatives.toLocaleString()}
//           growth={growthData.cooperatives}
//           color="green"
//         />
//         <SummaryCard
//           icon={<FiBarChart2 className="h-6 w-6" />}
//           label="Academies"
//           value={totalAcademies.toLocaleString()}
//           growth={growthData.academies}
//           color="purple"
//         />
//         <SummaryCard
//           icon={<FiShoppingCart className="h-6 w-6" />}
//           label="Total Orders"
//           value={totalOrders.toLocaleString()}
//           growth={growthData.orders}
//           color="orange"
//         />
//         <SummaryCard
//           icon={<FiTrendingUp className="h-6 w-6" />}
//           label="Revenue (RWF)"
//           value={revenue.toLocaleString()}
//           growth={growthData.revenue}
//           color="emerald"
//         />
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Product Demand Chart */}
//         <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//               <FiBarChart2 className="text-blue-600" />
//               Product Demand Trends
//             </h3>
//             <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
//           </div>
//           <div className="space-y-4">
//             {productBarData.length > 0 ? (
//               productBarData.map((product, index) => (
//                 <div key={product.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                   <div className="flex items-center gap-3">
//                     <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-semibold text-sm">
//                       {index + 1}
//                     </div>
//                     <div>
//                       <p className="font-medium text-gray-900">{product.name}</p>
//                       <p className="text-sm text-gray-500">{product.quantity} units ordered</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <div
//                       className={`flex items-center gap-1 text-sm font-medium ${product.growth > 0 ? "text-green-600" : "text-red-600"}`}
//                     >
//                       {product.growth > 0 ? <FiArrowUp className="h-3 w-3" /> : <FiArrowDown className="h-3 w-3" />}
//                       {Math.abs(product.growth)}%
//                     </div>
//                     <div className="w-20 bg-gray-200 rounded-full h-2">
//                       <div
//                         className="bg-blue-600 h-2 rounded-full"
//                         style={{
//                           width: `${Math.min((product.quantity / Math.max(...productBarData.map((p) => p.quantity))) * 100, 100)}%`,
//                         }}
//                       ></div>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="text-center py-8 text-gray-400">No product demand data available</div>
//             )}
//           </div>
//         </div>

//         {/* Order Status Pie Chart */}
//         <div className="bg-white rounded-xl border border-gray-200 p-6">
//           <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
//             <FiPieChart className="text-purple-600" />
//             Order Status
//           </h3>
//           {statusData.length > 0 ? (
//             <div className="relative">
//               <div className="w-48 h-48 mx-auto mb-4">
//                 <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
//                   {statusData.map((status, index) => {
//                     const total = statusData.reduce((sum, s) => sum + s.value, 0)
//                     const percentage = (status.value / total) * 100
//                     const strokeDasharray = `${percentage} ${100 - percentage}`
//                     const strokeDashoffset = statusData
//                       .slice(0, index)
//                       .reduce((sum, s) => sum + (s.value / total) * 100, 0)

//                     return (
//                       <circle
//                         key={status.name}
//                         cx="50"
//                         cy="50"
//                         r="15.915"
//                         fill="transparent"
//                         stroke={status.color}
//                         strokeWidth="8"
//                         strokeDasharray={strokeDasharray}
//                         strokeDashoffset={-strokeDashoffset}
//                         className="transition-all duration-300"
//                       />
//                     )
//                   })}
//                 </svg>
//               </div>
//               <div className="space-y-2">
//                 {statusData.map((status) => (
//                   <div key={status.name} className="flex items-center justify-between">
//                     <div className="flex items-center gap-2">
//                       <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }}></div>
//                       <span className="text-sm text-gray-600 capitalize">{status.name}</span>
//                     </div>
//                     <span className="text-sm font-medium text-gray-900">{status.value}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ) : (
//             <div className="text-center py-8 text-gray-400">No order status data available</div>
//           )}
//         </div>
//       </div>

//       {/* Top Cooperatives & Smart Market Usage Chart */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Top Cooperatives */}
//         <div className="bg-white rounded-xl border border-gray-200 p-6">
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//               <FiTrendingUp className="text-green-600" />
//               Top Performing Cooperatives
//             </h3>
//             <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
//           </div>
//           <div className="space-y-4">
//             {topCoops.length > 0 ? (
//               topCoops.map((coop, index) => (
//                 <div
//                   key={coop.name}
//                   className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-100"
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
//                       <span className="text-green-600 font-bold">#{index + 1}</span>
//                     </div>
//                     <div>
//                       <p className="font-medium text-gray-900">{coop.name}</p>
//                       <p className="text-sm text-gray-500">{coop.orders} orders</p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <p className="font-semibold text-gray-900">RWF {coop.revenue.toLocaleString()}</p>
//                     <p className="text-sm text-green-600">Revenue</p>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="text-center py-8 text-gray-400">No cooperative data available</div>
//             )}
//           </div>
//         </div>

//         {/* Smart Market Usage Chart */}
//         <div className="bg-white rounded-xl border border-gray-200 p-6">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
//             <FiBarChart2 className="text-blue-600" />
//             Smart Market Usage (Predictions per Month)
//           </h3>
//           <div className="relative h-96 rounded-lg overflow-hidden border border-gray-300 bg-blue-50 flex items-center justify-center">
//             {usageByMonth.some(d => d.count > 0) ? (
//               <ResponsiveContainer width="100%" height={350}>
//                 <BarChart data={usageByMonth} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="month" />
//                   <YAxis allowDecimals={false} />
//                   <Tooltip />
//                   <Legend />
//                   <Bar dataKey="count" fill="#2563EB" name="Predictions" />
//                 </BarChart>
//               </ResponsiveContainer>
//             ) : (
//               <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-semibold bg-white/80">No prediction usage data available</div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Recent Activity Tables */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Recent User Registrations */}
//         <div className="bg-white rounded-xl border border-gray-200 p-6">
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//               <FiUsers className="text-blue-600" />
//               Recent User Registrations
//             </h3>
//             <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
//           </div>
//           <div className="space-y-3">
//             {recentUsers.length > 0 ? (
//               recentUsers.map((user) => (
//                 <div
//                   key={user.id}
//                   className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
//                 >
//                   <div className="flex items-center gap-3">
//                     <div
//                       className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${
//                         user.role === "cooperative" ? "bg-blue-500" : "bg-purple-500"
//                       }`}
//                     >
//                       {(user.username || user.name || "U")
//                         .split(" ")
//                         .map((n) => n[0])
//                         .join("")
//                         .toUpperCase()}
//                     </div>
//                     <div>
//                       <p className="font-medium text-gray-900">{user.username || user.name}</p>
//                       <div className="flex items-center gap-2 text-sm text-gray-500">
//                         <span
//                           className={`px-2 py-0.5 rounded-full text-xs font-medium ${
//                             user.role === "cooperative" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
//                           }`}
//                         >
//                           {user.role}
//                         </span>
//                         <span>•</span>
//                         <span>{user.district}</span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <div className="flex items-center gap-1 text-sm text-gray-500">
//                       <FiClock className="h-3 w-3" />
//                       {new Date(user.created_at).toLocaleDateString()}
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="text-center py-8 text-gray-400">No recent users</div>
//             )}
//           </div>
//         </div>

//         {/* Recent File Uploads */}
//         <div className="bg-white rounded-xl border border-gray-200 p-6">
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//               <FiUpload className="text-green-600" />
//               Recent File Uploads
//             </h3>
//             <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
//           </div>
//           <div className="space-y-3">
//             {recentUploads.length > 0 ? (
//               recentUploads.map((upload) => (
//                 <div
//                   key={upload.id}
//                   className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
//                       <FiPackage className="h-5 w-5 text-green-600" />
//                     </div>
//                     <div>
//                       <p className="font-medium text-gray-900">{upload.file_name}</p>
//                       <div className="flex items-center gap-2 text-sm text-gray-500">
//                         <span>by {upload.uploaded_by_username}</span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <div className="flex items-center gap-1 text-sm text-gray-500">
//                       <FiClock className="h-3 w-3" />
//                       {upload.upload_date}
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="text-center py-8 text-gray-400">No recent uploads</div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Smart Insights */}
//       <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-green-50 rounded-xl border border-blue-200 p-6">
//         <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
//           <FiActivity className="text-blue-600" />
//           Smart Insights & Recommendations
//         </h3>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4">
//             <div className="flex items-center gap-2 mb-2">
//               <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//               <span className="text-sm font-medium text-gray-700">Top Performer</span>
//             </div>
//             <p className="text-gray-900 font-semibold">{topCoop}</p>
//             <p className="text-sm text-gray-600">Leading cooperative by orders</p>
//           </div>
//           <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4">
//             <div className="flex items-center gap-2 mb-2">
//               <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//               <span className="text-sm font-medium text-gray-700">High Demand</span>
//             </div>
//             <p className="text-gray-900 font-semibold">{mostDemandedProduct}</p>
//             <p className="text-sm text-gray-600">Most requested product</p>
//           </div>
//           <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4">
//             <div className="flex items-center gap-2 mb-2">
//               <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
//               <span className="text-sm font-medium text-gray-700">Platform Growth</span>
//             </div>
//             <p className="text-gray-900 font-semibold">{totalUsers} Total Users</p>
//             <p className="text-sm text-gray-600">Active platform members</p>
//           </div>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="bg-white rounded-xl border border-gray-200 p-6">
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <button className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105">
//             <FiPlus className="h-5 w-5" />
//             Add New User
//           </button>
//           <button className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105">
//             <FiDownload className="h-5 w-5" />
//             Download Platform Report
//           </button>
//           <button className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105">
//             <FiShoppingCart className="h-5 w-5" />
//             View All Orders
//           </button>
//           <button className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105">
//             <FiBarChart2 className="h-5 w-5" />
//             Analytics
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// const SummaryCard = ({ icon, label, value, growth, color }) => {
//   const colorClasses = {
//     blue: "from-blue-500 to-blue-600 bg-blue-100 text-blue-600",
//     green: "from-green-500 to-green-600 bg-green-100 text-green-600",
//     purple: "from-purple-500 to-purple-600 bg-purple-100 text-purple-600",
//     orange: "from-orange-500 to-orange-600 bg-orange-100 text-orange-600",
//     emerald: "from-emerald-500 to-emerald-600 bg-emerald-100 text-emerald-600",
//   }

//   return (
//     <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
//       <div className="flex items-center justify-between mb-4">
//         <div className={`p-3 rounded-lg ${colorClasses[color].split(" ")[2]} ${colorClasses[color].split(" ")[3]}`}>
//           {icon}
//         </div>
//         <div
//           className={`flex items-center gap-1 text-sm font-medium ${growth > 0 ? "text-green-600" : "text-red-600"}`}
//         >
//           {growth > 0 ? <FiArrowUp className="h-3 w-3" /> : <FiArrowDown className="h-3 w-3" />}
//           {Math.abs(growth)}%
//         </div>
//       </div>
//       <div className="space-y-1">
//         <p className="text-2xl font-bold text-gray-900">{value}</p>
//         <p className="text-sm text-gray-600">{label}</p>
//       </div>
//     </div>
//   )
// }

// export default AdminOverview

"use client"
import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchOrders } from "../../Redux/Slices/order/orderSlice"
import { fetchReferencePrices, fetchUploadHistory } from "../../Redux/Slices/price_upload/price_upload_slice"
import { fetchProductDemandReport } from "../../Redux/Slices/reports/report_slice"
import { listProducts } from "../../Redux/Slices/product/product"
import { fetchAllUsers } from "../../Redux/Slices/user_slice"
import { fetchCommodityTrend } from "../../Redux/Slices/predictions/harvest_plan"
import { fetchPredictions } from "../../Redux/Slices/predictions/price_prediction"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import {
  FiUsers,
  FiPackage,
  FiBarChart2,
  FiShoppingCart,
  FiTrendingUp,
  FiPieChart,
  FiDownload,
  FiPlus,
  FiArrowUp,
  FiArrowDown,
  FiActivity,
  FiClock,
  FiUpload,
} from "react-icons/fi"

const AdminOverview = () => {
  const dispatch = useDispatch()

  // State for dynamic GeoJSON loading
  const [districtGeoJson, setDistrictGeoJson] = useState(null)
  const [geoJsonError, setGeoJsonError] = useState(null)

  // Prediction trend state
  const prediction = useSelector((state) => state.commodityTrend)
  const { predictions: commodityPredictions = [], trend_analysis } = prediction || {}

  // Smart Market usage state
  const predictionState = useSelector((state) => state.prediction)
  const allPredictions = predictionState?.predictions || []

  // Group predictions by month for the current year
  const usageByMonth = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const nowYear = new Date().getFullYear()
    const counts = Array(12).fill(0)
    allPredictions.forEach((pred) => {
      const date = new Date(pred.created_at)
      if (date.getFullYear() === nowYear) {
        counts[date.getMonth()]++
      }
    })
    return months.map((m, i) => ({ month: m, count: counts[i] }))
  }, [allPredictions])

  // Fetch Rwanda districts GeoJSON from a direct link
  useEffect(() => {
    fetch("https://raw.githubusercontent.com/digitalearthafrica/country-borders/main/data/rwa_admbnda_adm2_rwa.geojson")
      .then((res) => res.json())
      .then(setDistrictGeoJson)
      .catch((err) => setGeoJsonError("Failed to load Rwanda districts map."))
  }, [])

  // Fetch all data on mount
  useEffect(() => {
    dispatch(fetchOrders())
    dispatch(fetchReferencePrices())
    dispatch(fetchUploadHistory())
    dispatch(fetchProductDemandReport({}))
    dispatch(listProducts())
    dispatch(fetchAllUsers())
    dispatch(fetchCommodityTrend({ commodity: "Maize", year: new Date().getFullYear() }))
    dispatch(fetchPredictions())
  }, [dispatch])

  // Selectors
  const orders = useSelector((state) => state.order.orders || [])
  const referencePrices = useSelector((state) => state.priceUpload.referencePrices || [])
  const uploadHistory = useSelector((state) => state.priceUpload.uploadHistory || [])
  const productDemand = useSelector((state) => state.reports.productDemandReport || [])
  const products = useSelector((state) => state.product.products || [])
  const allUsers = useSelector((state) => state.user.allUsers || [])

  // Filter users by role
  const totalUsers = allUsers.length
  const totalCooperatives = allUsers.filter((u) => u.role === "cooperative").length
  const totalAcademies = allUsers.filter((u) => u.role === "academy").length
  const totalOrders = orders.length
  const revenue = orders.reduce((sum, o) => sum + (o.total || 0), 0)

  // Product demand bar chart data (top 6 products)
  const productBarData = useMemo(() => {
    if (!Array.isArray(productDemand)) return []
    return productDemand.slice(0, 6).map((row) => ({
      name: row.product__product_name,
      quantity: row.total_quantity,
      growth: Math.floor(Math.random() * 30) - 10, // Mock growth for visual
    }))
  }, [productDemand])

  // Order status breakdown
  const statusCounts = useMemo(() => {
    return orders.reduce((acc, o) => {
      acc[o.status] = (acc[o.status] || 0) + 1
      return acc
    }, {})
  }, [orders])

  const statusData = Object.entries(statusCounts).map(([name, value]) => ({
    name,
    value,
    color:
      name === "completed" ? "#10b981" : name === "pending" ? "#f59e0b" : name === "processing" ? "#3b82f6" : "#ef4444",
  }))

  // Top cooperatives (top 5)
  const coopCounts = {}
  orders.forEach((order) => {
    let coop = ""
    if (order.cooperative) {
      if (typeof order.cooperative === "object") {
        coop = order.cooperative.name || order.cooperative.username || ""
      } else {
        coop = order.cooperative
      }
    }
    if (coop) coopCounts[coop] = (coopCounts[coop] || 0) + 1
  })

  const topCoops = Object.entries(coopCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, orders]) => ({
      name,
      orders,
      revenue: orders * 1500 + Math.floor(Math.random() * 5000), // Mock revenue calculation
    }))

  // Recent activity
  const recentUsers = allUsers
    .slice()
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5)

  const recentUploads = uploadHistory.slice(0, 4)

  // Prepare chart data for predictions (next 3 months)
  const predictionChartData = Array.isArray(commodityPredictions)
    ? commodityPredictions.slice(0, 3).map((item) => ({
        month: item.month_name,
        predicted_price: item.predicted_price,
        lower_bound: item.lower_bound,
        upper_bound: item.upper_bound,
      }))
    : []

  // Smart insights
  const topCoop = topCoops[0]?.name || "N/A"
  const mostDemandedProduct = productDemand[0]?.product__product_name || "N/A"

  // Calculate mock growth percentages
  const growthData = {
    users: 12.5,
    cooperatives: 8.3,
    academies: 15.7,
    orders: 23.4,
    revenue: 18.9,
  }

  // Get admin username from localStorage
  const username = typeof window !== "undefined" ? localStorage.getItem("username") || "Admin" : "Admin"

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 p-6">
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Welcome, {username}!</h1>
            <p className="text-gray-600">Welcome to AguuraMuhinzi.</p>
        </div>
        <div className="flex items-center gap-3">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white">
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <SummaryCard
          icon={<FiUsers className="h-6 w-6" />}
          label="Total Users"
          value={totalUsers.toLocaleString()}
          growth={growthData.users}
            color="emerald"
        />
        <SummaryCard
          icon={<FiPackage className="h-6 w-6" />}
          label="Cooperatives"
          value={totalCooperatives.toLocaleString()}
          growth={growthData.cooperatives}
          color="green"
        />
        <SummaryCard
          icon={<FiBarChart2 className="h-6 w-6" />}
          label="Academies"
          value={totalAcademies.toLocaleString()}
          growth={growthData.academies}
            color="teal"
        />
        <SummaryCard
          icon={<FiShoppingCart className="h-6 w-6" />}
          label="Total Orders"
          value={totalOrders.toLocaleString()}
          growth={growthData.orders}
            color="emerald"
        />
        <SummaryCard
          icon={<FiTrendingUp className="h-6 w-6" />}
          label="Revenue (RWF)"
          value={revenue.toLocaleString()}
          growth={growthData.revenue}
            color="green"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Demand Chart */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl border border-emerald-200 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <FiBarChart2 className="text-emerald-600" />
              Product Demand Trends
            </h3>
              <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {productBarData.length > 0 ? (
              productBarData.map((product, index) => (
                  <div
                    key={product.name}
                    className="flex items-center justify-between p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg border border-emerald-100"
                  >
                  <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.quantity} units ordered</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex items-center gap-1 text-sm font-medium ${product.growth > 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {product.growth > 0 ? <FiArrowUp className="h-3 w-3" /> : <FiArrowDown className="h-3 w-3" />}
                      {Math.abs(product.growth)}%
                    </div>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div
                          className="bg-emerald-600 h-2 rounded-full"
                        style={{
                          width: `${Math.min((product.quantity / Math.max(...productBarData.map((p) => p.quantity))) * 100, 100)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">No product demand data available</div>
            )}
          </div>
        </div>

        {/* Order Status Pie Chart */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-emerald-200 p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <FiPieChart className="text-emerald-600" />
            Order Status
          </h3>
          {statusData.length > 0 ? (
            <div className="relative">
              <div className="w-48 h-48 mx-auto mb-4">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  {statusData.map((status, index) => {
                    const total = statusData.reduce((sum, s) => sum + s.value, 0)
                    const percentage = (status.value / total) * 100
                    const strokeDasharray = `${percentage} ${100 - percentage}`
                    const strokeDashoffset = statusData
                      .slice(0, index)
                      .reduce((sum, s) => sum + (s.value / total) * 100, 0)

                    return (
                      <circle
                        key={status.name}
                        cx="50"
                        cy="50"
                        r="15.915"
                        fill="transparent"
                        stroke={status.color}
                        strokeWidth="8"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={-strokeDashoffset}
                        className="transition-all duration-300"
                      />
                    )
                  })}
                </svg>
              </div>
              <div className="space-y-2">
                {statusData.map((status) => (
                  <div key={status.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }}></div>
                      <span className="text-sm text-gray-600 capitalize">{status.name}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{status.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">No order status data available</div>
          )}
        </div>
      </div>

      {/* Top Cooperatives & Smart Market Usage Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Cooperatives */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-emerald-200 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <FiTrendingUp className="text-emerald-600" />
              Top Performing Cooperatives
            </h3>
              <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {topCoops.length > 0 ? (
              topCoops.map((coop, index) => (
                <div
                  key={coop.name}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg border border-emerald-100"
                >
                  <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                        <span className="text-emerald-600 font-bold">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{coop.name}</p>
                      <p className="text-sm text-gray-500">{coop.orders} orders</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">RWF {coop.revenue.toLocaleString()}</p>
                      <p className="text-sm text-emerald-600">Revenue</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">No cooperative data available</div>
            )}
          </div>
        </div>

        {/* Smart Market Usage Chart */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-emerald-200 p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FiBarChart2 className="text-emerald-600" />
            Smart Market Usage (Predictions per Month)
          </h3>
            <div className="relative h-96 rounded-lg overflow-hidden border border-emerald-300 bg-gradient-to-br from-emerald-50 to-green-50 flex items-center justify-center">
              {usageByMonth.some((d) => d.count > 0) ? (
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={usageByMonth} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                    <Bar dataKey="count" fill="#10B981" name="Predictions" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-semibold bg-white/80">
                  No prediction usage data available
                </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent User Registrations */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-emerald-200 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <FiUsers className="text-emerald-600" />
              Recent User Registrations
            </h3>
              <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">View All</button>
          </div>
          <div className="space-y-3">
            {recentUsers.length > 0 ? (
              recentUsers.map((user) => (
                <div
                  key={user.id}
                    className="flex items-center justify-between p-3 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-green-50 rounded-lg transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${
                          user.role === "cooperative"
                            ? "bg-gradient-to-r from-emerald-500 to-green-500"
                            : "bg-gradient-to-r from-teal-500 to-emerald-500"
                      }`}
                    >
                      {(user.username || user.name || "U")
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user.username || user.name}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              user.role === "cooperative"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-teal-100 text-teal-700"
                          }`}
                        >
                          {user.role}
                        </span>
                        <span>•</span>
                        <span>{user.district}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <FiClock className="h-3 w-3" />
                      {new Date(user.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">No recent users</div>
            )}
          </div>
        </div>

        {/* Recent File Uploads */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-emerald-200 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <FiUpload className="text-emerald-600" />
              Recent File Uploads
            </h3>
              <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">View All</button>
          </div>
          <div className="space-y-3">
            {recentUploads.length > 0 ? (
              recentUploads.map((upload) => (
                <div
                  key={upload.id}
                    className="flex items-center justify-between p-3 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-green-50 rounded-lg transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-emerald-100 to-green-100 rounded-lg flex items-center justify-center">
                        <FiPackage className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{upload.file_name}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>by {upload.uploaded_by_username}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <FiClock className="h-3 w-3" />
                      {upload.upload_date}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">No recent uploads</div>
            )}
          </div>
        </div>
      </div>

      {/* Smart Insights */}
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-green-50 rounded-2xl border border-emerald-200 p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiActivity className="text-emerald-600" />
          Smart Insights & Recommendations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-emerald-100">
            <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Top Performer</span>
            </div>
            <p className="text-gray-900 font-semibold">{topCoop}</p>
            <p className="text-sm text-gray-600">Leading cooperative by orders</p>
          </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-emerald-100">
            <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">High Demand</span>
            </div>
            <p className="text-gray-900 font-semibold">{mostDemandedProduct}</p>
            <p className="text-sm text-gray-600">Most requested product</p>
          </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-emerald-100">
            <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Platform Growth</span>
            </div>
            <p className="text-gray-900 font-semibold">{totalUsers} Total Users</p>
            <p className="text-sm text-gray-600">Active platform members</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-emerald-200 p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg">
            <FiPlus className="h-5 w-5" />
            Add New User
          </button>
            <button className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-teal-600 to-emerald-700 hover:from-teal-700 hover:to-emerald-800 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg">
            <FiDownload className="h-5 w-5" />
            Download Platform Report
          </button>
            <button className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg">
            <FiShoppingCart className="h-5 w-5" />
            View All Orders
          </button>
            <button className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg">
            <FiBarChart2 className="h-5 w-5" />
            Analytics
          </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const SummaryCard = ({ icon, label, value, growth, color }) => {
  const colorClasses = {
    emerald: "from-emerald-500 to-emerald-600 bg-emerald-100 text-emerald-600",
    green: "from-green-500 to-green-600 bg-green-100 text-green-600",
    teal: "from-teal-500 to-teal-600 bg-teal-100 text-teal-600",
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-emerald-200 p-6 hover:shadow-lg transition-all duration-200 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses[color].split(" ")[2]} ${colorClasses[color].split(" ")[3]}`}>
          {icon}
        </div>
        <div
          className={`flex items-center gap-1 text-sm font-medium ${growth > 0 ? "text-green-600" : "text-red-600"}`}
        >
          {growth > 0 ? <FiArrowUp className="h-3 w-3" /> : <FiArrowDown className="h-3 w-3" />}
          {Math.abs(growth)}%
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-600">{label}</p>
      </div>
    </div>
  )
}

export default AdminOverview
