// "use client"

// import { useEffect, useMemo, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import {
//   fetchProductDemandReport,
//   fetchAcademyCooperativeCollaboration,
//   fetchSalesSummaryReport,
// } from "../../Redux/Slices/reports/report_slice"
// import { fetchOrders } from "../../Redux/Slices/order/orderSlice"
// import { fetchAllUsers } from "../../Redux/Slices/user_slice"
// import {
//   BarChart,
//   Bar,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
//   PieChart,
//   Pie,
//   Cell,
//   AreaChart,
//   Area,
// } from "recharts"
// import {
//   FiTrendingUp,
//   FiBarChart2,
//   FiUsers,
//   FiShoppingCart,
//   FiCheckCircle,
//   FiDownload,
//   FiActivity,
// } from "react-icons/fi"
// import html2canvas from "html2canvas"
// import jsPDF from "jspdf"
// import { fetchCommodityTrend } from '../../Redux/Slices/predictions/harvest_plan';
// import { Link } from 'react-router-dom';
// import AcademyFinancialReportModal from './academy_financial_report';

// const AdminAnalytics = () => {
//   const dispatch = useDispatch()

//   // Fetch data on mount
//   useEffect(() => {
//     dispatch(fetchProductDemandReport({}))
//     dispatch(fetchAcademyCooperativeCollaboration({}))
//     dispatch(fetchSalesSummaryReport({}))
//     dispatch(fetchOrders())
//     dispatch(fetchAllUsers())
//     dispatch(fetchCommodityTrend({ commodity: 'Maize', year: new Date().getFullYear() }));
//   }, [dispatch])

//   // Selectors
//   const productDemand = useSelector((state) => state.reports.productDemandReport || [])
//   const academyCoopCollab = useSelector((state) => state.reports.academyCoopCollaboration || [])
//   const salesSummary = useSelector((state) => state.reports.salesSummary || [])
//   const orders = useSelector((state) => state.order.orders || [])
//   const allUsers = useSelector((state) => state.user.allUsers || [])
//   const commodityPrediction = useSelector(state => state.commodityTrend.predictions || []);
//   const [showFinancialModal, setShowFinancialModal] = useState(false);

//   // 1. Most Demanded Products (bar chart)
//   const mostDemandedProducts = useMemo(() => {
//     if (!Array.isArray(productDemand)) return []
//     return [...productDemand]
//       .sort((a, b) => b.total_quantity - a.total_quantity)
//       .slice(0, 8)
//       .map((row, index) => ({
//         name: row.product__product_name,
//         quantity: row.total_quantity,
//         fill: `hsl(${120 + index * 15}, 70%, ${60 - index * 3}%)`, // Green gradient
//       }))
//   }, [productDemand])

//   // 2. Demand Trend (area chart)
//   const demandTrend = useMemo(() => {
//     if (!Array.isArray(productDemand)) return []
//     return productDemand.slice(0, 10).map((row) => ({
//       name: row.product__product_name.substring(0, 15) + "...",
//       quantity: row.total_quantity,
//       growth: Math.floor(Math.random() * 30) + 5, // Mock growth data
//     }))
//   }, [productDemand])

//   // 4. Total Spending
//   const totalSpending = useMemo(() => {
//     if (!salesSummary) return 0
//     if (Array.isArray(salesSummary)) {
//       return salesSummary.reduce((sum, s) => sum + (s.total_spend || 0), 0)
//     }
//     return salesSummary.total_spend || 0
//   }, [salesSummary])

//   // 5. Order Fulfillment Rate
//   const fulfillment = useMemo(() => {
//     if (!Array.isArray(orders)) return { rate: 0, total: 0, fulfilled: 0 }
//     const total = orders.length
//     const fulfilled = orders.filter((o) => o.status === "completed").length
//     return {
//       rate: total ? Math.round((fulfilled / total) * 100) : 0,
//       total,
//       fulfilled,
//     }
//   }, [orders])

//   // 6. Total Schools Served
//   const totalSchoolsServed = useMemo(() => {
//     return allUsers.filter((u) => u.role === "academy").length
//   }, [allUsers])

//   // System Growth
//   const [growthType, setGrowthType] = useState("users")
//   const systemGrowth = useMemo(() => {
//     const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
//     const nowYear = new Date().getFullYear()
//     if (growthType === "users") {
//       const counts = Array(12).fill(0)
//       allUsers.forEach((u) => {
//         if (u.date_joined) {
//           const d = new Date(u.date_joined)
//           if (d.getFullYear() === nowYear) counts[d.getMonth()]++
//         }
//       })
//       return months.map((m, i) => ({ month: m, count: counts[i], target: counts[i] + Math.floor(Math.random() * 10) }))
//     } else {
//       const counts = Array(12).fill(0)
//       orders.forEach((o) => {
//         if (o.created_at) {
//           const d = new Date(o.created_at)
//           if (d.getFullYear() === nowYear) counts[d.getMonth()]++
//         }
//       })
//       return months.map((m, i) => ({ month: m, count: counts[i], target: counts[i] + Math.floor(Math.random() * 5) }))
//     }
//   }, [allUsers, orders, growthType])

//   // Order Fulfillment Rate by month
//   const orderFulfillmentTrend = useMemo(() => {
//     const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
//     const nowYear = new Date().getFullYear()
//     const total = Array(12).fill(0)
//     const fulfilled = Array(12).fill(0)
//     orders.forEach((o) => {
//       if (o.created_at) {
//         const d = new Date(o.created_at)
//         if (d.getFullYear() === nowYear) {
//           total[d.getMonth()]++
//           if (o.status === "completed") fulfilled[d.getMonth()]++
//         }
//       }
//     })
//     return months.map((m, i) => ({
//       month: m,
//       rate: total[i] ? Math.round((fulfilled[i] / total[i]) * 100) : 0,
//       total: total[i],
//       fulfilled: fulfilled[i],
//     }))
//   }, [orders])

//   // Order Status Distribution
//   const orderStatusData = useMemo(() => {
//     const statusCounts = orders.reduce((acc, order) => {
//       acc[order.status] = (acc[order.status] || 0) + 1
//       return acc
//     }, {})

//     const colors = {
//       completed: "#10B981",
//       pending: "#F59E0B",
//       processing: "#3B82F6",
//       cancelled: "#EF4444",
//     }

//     return Object.entries(statusCounts).map(([status, count]) => ({
//       name: status.charAt(0).toUpperCase() + status.slice(1),
//       value: count,
//       fill: colors[status] || "#6B7280",
//     }))
//   }, [orders])

//   // PDF export for collaboration table
//   const handleDownloadCollabPDF = async () => {
//     const table = document.getElementById('collab-table');
//     if (!table) return;
//     const canvas = await html2canvas(table);
//     const imgData = canvas.toDataURL('image/png');
//     const pdf = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });
//     const pageWidth = pdf.internal.pageSize.getWidth();
//     const pageHeight = pdf.internal.pageSize.getHeight();
//     const imgWidth = pageWidth - 40;
//     const imgHeight = (canvas.height * imgWidth) / canvas.width;
//     pdf.setFontSize(18);
//     pdf.text('Are the cooperatives working with schools?', 40, 40);
//     pdf.setFontSize(12);
//     pdf.text('Date: ' + new Date().toLocaleDateString(), 40, 60);
//     pdf.addImage(imgData, 'PNG', 20, 80, imgWidth, imgHeight);
//     pdf.save('collaboration_report.pdf');
//   };

//   // Program Reach Report PDF export (detailed, text-based)
//   const handleDownloadReachPDF = async () => {
//     const academies = allUsers.filter(u => u.role === 'academy');
//     const cooperatives = allUsers.filter(u => u.role === 'cooperative');
//     const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
//     let y = 40;
//     pdf.setFontSize(20);
//     pdf.text('WFP Program Reach Report', 40, y);
//     y += 28;
//     pdf.setFontSize(12);
//     pdf.text('A detailed report on the scale and outreach of the WFP Rwanda School Feeding Program', 40, y);
//     y += 20;
//     pdf.text('Date: ' + new Date().toLocaleDateString(), 40, y);
//     y += 30;
//     pdf.setFontSize(14);
//     pdf.text('Summary:', 40, y);
//     y += 20;
//     pdf.setFontSize(12);
//     pdf.text(`The WFP Rwanda School Feeding Program currently reaches ${academies.length} schools/academies and works with ${cooperatives.length} agricultural cooperatives.`, 40, y, { maxWidth: 520 });
//     y += 30;
//     pdf.setFontSize(14);
//     pdf.text('Academies/Schools Reached:', 40, y);
//     y += 20;
//     pdf.setFontSize(12);
//     academies.forEach((a, i) => {
//       if (y > 750) { pdf.addPage(); y = 40; }
//       pdf.text(`${i + 1}. ${a.username || a.email || '-'}${a.district ? ' (' + a.district + ')' : ''}`, 60, y);
//       y += 18;
//     });
//     y += 20;
//     pdf.setFontSize(14);
//     pdf.text('Cooperatives Working With the Program:', 40, y);
//     y += 20;
//     pdf.setFontSize(12);
//     cooperatives.forEach((c, i) => {
//       if (y > 750) { pdf.addPage(); y = 40; }
//       pdf.text(`${i + 1}. ${c.username || c.email || '-'}${c.district ? ' (' + c.district + ')' : ''}`, 60, y);
//       y += 18;
//     });
//     pdf.save('wfp_program_reach_report.pdf');
//   };

//   return (
//     <div className="relative min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-6">
//       <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
//         {/* Main Analytics Content */}
//         <div className="flex-1 space-y-8">
//           <div className="flex justify-end mb-6">
//             <Link
//               to="/admin-dashboard/academy-financial-report"
//               className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors text-lg shadow"
//             >
//               Academy Financial Reports
//             </Link>
//           </div>
//           {/* Header */}
//           <div className="text-center mb-10">
//             <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
//               WFP School Feeding Program Analytics
//             </h1>
//             <p className="text-gray-600 text-lg">Comprehensive insights into program performance and impact</p>
//           </div>

//           {/* Summary Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
//             <SummaryCard
//               icon={<FiUsers className="h-8 w-8" />}
//               label="Total Schools Served"
//               value={totalSchoolsServed}
//               color="emerald"
//               trend="+12%"
//             />
//             <SummaryCard
//               icon={<FiShoppingCart className="h-8 w-8" />}
//               label="Total Orders"
//               value={fulfillment.total}
//               color="green"
//               trend="+8%"
//             />
//             <SummaryCard
//               icon={<FiCheckCircle className="h-8 w-8" />}
//               label="Fulfillment Rate"
//               value={fulfillment.rate + "%"}
//               color="teal"
//               trend="+5%"
//             />
//             <SummaryCard
//               icon={<FiBarChart2 className="h-8 w-8" />}
//               label="Total Spending"
//               value={`RWF ${totalSpending.toLocaleString()}`}
//               color="lime"
//               trend="+15%"
//             />
//           </div>

//           {/* Charts Grid */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
//             {/* Most Demanded Products */}
//             <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-green-100 shadow-xl p-8">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
//                   <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
//                     <FiBarChart2 className="h-6 w-6 text-white" />
//                   </div>
//                   Most Demanded Products
//                 </h2>
//               </div>
//               <div className="h-80">
//                 {mostDemandedProducts.length > 0 ? (
//                   <ResponsiveContainer width="100%" height="100%">
//                     <BarChart data={mostDemandedProducts} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
//                       <defs>
//                         <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
//                           <stop offset="0%" stopColor="#10B981" stopOpacity={0.8} />
//                           <stop offset="100%" stopColor="#059669" stopOpacity={0.6} />
//                         </linearGradient>
//                       </defs>
//                       <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
//                       <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} fontSize={12} stroke="#6B7280" />
//                       <YAxis allowDecimals={false} fontSize={12} stroke="#6B7280" />
//                       <Tooltip
//                         contentStyle={{
//                           backgroundColor: "rgba(255, 255, 255, 0.95)",
//                           border: "1px solid #10B981",
//                           borderRadius: "12px",
//                           boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
//                         }}
//                       />
//                       <Bar dataKey="quantity" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 ) : (
//                   <div className="flex items-center justify-center h-full text-gray-400">
//                     <div className="text-center">
//                       <FiBarChart2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
//                       <p>No product demand data available</p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Order Status Distribution */}
//             <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-green-100 shadow-xl p-8">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
//                   <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg">
//                     <FiActivity className="h-6 w-6 text-white" />
//                   </div>
//                   Order Status Distribution
//                 </h2>
//               </div>
//               <div className="h-80">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <PieChart>
//                     <Pie
//                       data={orderStatusData}
//                       cx="50%"
//                       cy="50%"
//                       outerRadius={100}
//                       innerRadius={40}
//                       paddingAngle={5}
//                       dataKey="value"
//                     >
//                       {orderStatusData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={entry.fill} />
//                       ))}
//                     </Pie>
//                     <Tooltip
//                       contentStyle={{
//                         backgroundColor: "rgba(255, 255, 255, 0.95)",
//                         border: "1px solid #10B981",
//                         borderRadius: "12px",
//                         boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
//                       }}
//                     />
//                     <Legend />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           </div>

//           {/* Full Width Charts */}
//           <div className="space-y-8">
//             {/* Replace Order Fulfillment Rate chart with 3-month Price Prediction chart */}
//             <section>
//               <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><FiTrendingUp /> 3-Month Price Trend (Maize)</h2>
//               <div className="bg-white rounded-xl border border-gray-200 p-6">
//                 {commodityPrediction.length > 0 ? (
//                   <ResponsiveContainer width="100%" height={300}>
//                     <LineChart data={commodityPrediction.slice(0, 3)}>
//                       <defs>
//                         <linearGradient id="priceTrendGradient" x1="0" y1="0" x2="0" y2="1">
//                           <stop offset="0%" stopColor="#2563EB" stopOpacity={0.3} />
//                           <stop offset="100%" stopColor="#2563EB" stopOpacity={0.05} />
//                         </linearGradient>
//                       </defs>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="month_name" />
//                       <YAxis allowDecimals={false} />
//                       <Tooltip formatter={v => v.toLocaleString() + ' RWF'} />
//                       <Legend />
//                       <Line type="monotone" dataKey="predicted_price" stroke="#2563EB" strokeWidth={3} name="Predicted Price (RWF)" fill="url(#priceTrendGradient)" dot={{ r: 6, fill: '#2563EB' }} activeDot={{ r: 8 }} />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 ) : <div className="text-gray-400 text-center py-8">No price prediction data available.</div>}
//               </div>
//             </section>

//             {/* System Growth */}
//             <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-green-100 shadow-xl p-8">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
//                   <div className="p-2 bg-gradient-to-r from-lime-500 to-green-500 rounded-lg">
//                     <FiTrendingUp className="h-6 w-6 text-white" />
//                   </div>
//                   System Growth ({growthType === "users" ? "Users" : "Orders"})
//                 </h2>
//                 <div className="flex gap-2">
//                   <button
//                     className={`px-6 py-2 rounded-xl font-medium transition-all duration-200 ${
//                       growthType === "users"
//                         ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
//                         : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
//                     }`}
//                     onClick={() => setGrowthType("users")}
//                   >
//                     Users
//                   </button>
//                   <button
//                     className={`px-6 py-2 rounded-xl font-medium transition-all duration-200 ${
//                       growthType === "orders"
//                         ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
//                         : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
//                     }`}
//                     onClick={() => setGrowthType("orders")}
//                   >
//                     Orders
//                   </button>
//                 </div>
//               </div>
//               <div className="h-80">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <LineChart data={systemGrowth} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
//                     <defs>
//                       <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
//                         <stop offset="0%" stopColor="#10B981" stopOpacity={0.2} />
//                         <stop offset="100%" stopColor="#10B981" stopOpacity={0.05} />
//                       </linearGradient>
//                     </defs>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
//                     <XAxis dataKey="month" fontSize={12} stroke="#6B7280" />
//                     <YAxis allowDecimals={false} fontSize={12} stroke="#6B7280" />
//                     <Tooltip
//                       contentStyle={{
//                         backgroundColor: "rgba(255, 255, 255, 0.95)",
//                         border: "1px solid #10B981",
//                         borderRadius: "12px",
//                         boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
//                       }}
//                     />
//                     <Legend />
//                     <Line
//                       type="monotone"
//                       dataKey="count"
//                       stroke="#10B981"
//                       strokeWidth={3}
//                       dot={{ fill: "#10B981", strokeWidth: 2, r: 6 }}
//                       name={growthType === "users" ? "Users" : "Orders"}
//                     />
//                     <Line
//                       type="monotone"
//                       dataKey="target"
//                       stroke="#6B7280"
//                       strokeWidth={2}
//                       strokeDasharray="5 5"
//                       dot={{ fill: "#6B7280", strokeWidth: 2, r: 4 }}
//                       name="Target"
//                     />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           </div>

//           {/* Program Reach Report */}
//           <section>
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-xl font-semibold flex items-center gap-2"><FiUsers /> Program Reach Report</h2>
//               <Link
//                 to="/admin-dashboard/program-reach-report"
//                 className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
//               >
//                 View Detailed Report
//               </Link>
//             </div>
//           </section>

//           {/* Academy-Cooperative Collaboration */}
//           <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-green-100 shadow-xl p-8">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
//                 <div className="p-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg">
//                   <FiUsers className="h-6 w-6 text-white" />
//                 </div>
//                 Academy-Cooperative Collaboration
//               </h2>
//               <button
//                 className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg flex items-center gap-2"
//                 onClick={handleDownloadCollabPDF}
//               >
//                 <FiDownload className="h-4 w-4" />
//                 Download PDF
//               </button>
//             </div>
//             <div className="overflow-x-auto rounded-xl border border-green-100">
//               {academyCoopCollab.length > 0 ? (
//                 <table id="collab-table" className="min-w-full divide-y divide-green-100">
//                   <thead className="bg-gradient-to-r from-green-50 to-emerald-50">
//                     <tr>
//                       <th className="px-6 py-4 text-left text-sm font-semibold text-green-800 uppercase tracking-wider">
//                         Academy
//                       </th>
//                       <th className="px-6 py-4 text-left text-sm font-semibold text-green-800 uppercase tracking-wider">
//                         Cooperative
//                       </th>
//                       <th className="px-6 py-4 text-left text-sm font-semibold text-green-800 uppercase tracking-wider">
//                         Order Count
//                       </th>
//                       <th className="px-6 py-4 text-left text-sm font-semibold text-green-800 uppercase tracking-wider">
//                         Total Value (RWF)
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-green-50">
//                     {academyCoopCollab.map((row, idx) => (
//                       <tr key={idx} className="hover:bg-green-50/50 transition-colors">
//                         <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">
//                           {row.user__username || "-"}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-gray-700">{row.cooperative__username || "-"}</td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
//                             {row.order_count || "-"}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-semibold">
//                           {row.total_value ? `RWF ${row.total_value.toLocaleString()}` : "-"}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               ) : (
//                 <div className="flex items-center justify-center py-16 text-gray-400">
//                   <div className="text-center">
//                     <FiUsers className="h-12 w-12 mx-auto mb-4 opacity-50" />
//                     <p className="text-lg">No collaboration data available</p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//         {/* Aside: Academy Financial Reports */}
//         <aside className="w-full md:w-80 flex-shrink-0">
//           <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
//             <h2 className="text-xl font-bold mb-4 text-green-700">Academy Financial Reports</h2>
//             <p className="mb-4 text-gray-600">Generate and view detailed financial spending reports for each academy by period.</p>
//             <button
//               className="w-full bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors text-center"
//               onClick={() => setShowFinancialModal(true)}
//             >
//               View Reports
//             </button>
//           </div>
//         </aside>
//         <AcademyFinancialReportModal
//           open={showFinancialModal}
//           onClose={() => setShowFinancialModal(false)}
//           allUsers={allUsers}
//           orders={orders}
//           loadingUsers={useSelector(state => state.user.loading)}
//           loadingOrders={useSelector(state => state.order.loading)}
//         />
//       </div>
//     </div>
//   )
// }

// const SummaryCard = ({ icon, label, value, color, trend }) => {
//   const colorClasses = {
//     emerald: "from-emerald-500 to-emerald-600 bg-emerald-50 text-emerald-600 border-emerald-200",
//     green: "from-green-500 to-green-600 bg-green-50 text-green-600 border-green-200",
//     teal: "from-teal-500 to-teal-600 bg-teal-50 text-teal-600 border-teal-200",
//     lime: "from-lime-500 to-lime-600 bg-lime-50 text-lime-600 border-lime-200",
//   }

//   return (
//     <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-green-100 shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
//       <div className="flex items-center justify-between mb-4">
//         <div
//           className={`p-3 rounded-xl bg-gradient-to-r ${colorClasses[color].split(" ")[0]} ${colorClasses[color].split(" ")[1]}`}
//         >
//           <div className="text-white">{icon}</div>
//         </div>
//         <div className="text-right">
//           <div className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">{trend}</div>
//         </div>
//       </div>
//       <div className="space-y-2">
//         <div className="text-3xl font-bold text-gray-900">{value}</div>
//         <div className="text-sm font-medium text-gray-600">{label}</div>
//       </div>
//     </div>
//   )
// }

// export default AdminAnalytics


"use client"

import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchProductDemandReport,
  fetchAcademyCooperativeCollaboration,
  fetchSalesSummaryReport,
} from "../../Redux/Slices/reports/report_slice"
import { fetchOrders } from "../../Redux/Slices/order/orderSlice"
import { fetchAllUsers } from "../../Redux/Slices/user_slice"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  FiTrendingUp,
  FiBarChart2,
  FiUsers,
  FiShoppingCart,
  FiCheckCircle,
  FiDownload,
  FiActivity,
  FiDollarSign,
  FiCalendar,
  FiFileText,
  FiEye,
  FiArrowUpRight,
  FiZap,
} from "react-icons/fi"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import { fetchCommodityTrend } from "../../Redux/Slices/predictions/harvest_plan"
import { Link } from "react-router-dom"
import AcademyFinancialReportModal from "./academy_financial_report"

const AdminAnalytics = () => {
  const dispatch = useDispatch()

  // State
  const [showFinancialModal, setShowFinancialModal] = useState(false)
  const [growthType, setGrowthType] = useState("users")

  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchProductDemandReport({}))
    dispatch(fetchAcademyCooperativeCollaboration({}))
    dispatch(fetchSalesSummaryReport({}))
    dispatch(fetchOrders())
    dispatch(fetchAllUsers())
    dispatch(fetchCommodityTrend({ commodity: "Maize", year: new Date().getFullYear() }))
  }, [dispatch])

  // Selectors
  const productDemand = useSelector((state) => state.reports.productDemandReport || [])
  const academyCoopCollab = useSelector((state) => state.reports.academyCoopCollaboration || [])
  const salesSummary = useSelector((state) => state.reports.salesSummary || [])
  const orders = useSelector((state) => state.order.orders || [])
  const allUsers = useSelector((state) => state.user.allUsers || [])
  const commodityPrediction = useSelector((state) => state.commodityTrend.predictions || [])

  // Data Processing
  const mostDemandedProducts = useMemo(() => {
    if (!Array.isArray(productDemand)) return []
    return [...productDemand]
      .sort((a, b) => b.total_quantity - a.total_quantity)
      .slice(0, 8)
      .map((row, index) => ({
        name: row.product__product_name,
        quantity: row.total_quantity,
        fill: `hsl(${120 + index * 15}, 70%, ${60 - index * 3}%)`,
      }))
  }, [productDemand])

  const demandTrend = useMemo(() => {
    if (!Array.isArray(productDemand)) return []
    return productDemand.slice(0, 10).map((row) => ({
      name: row.product__product_name.substring(0, 15) + "...",
      quantity: row.total_quantity,
      growth: Math.floor(Math.random() * 30) + 5,
    }))
  }, [productDemand])

  const totalSpending = useMemo(() => {
    if (!salesSummary) return 0
    if (Array.isArray(salesSummary)) {
      return salesSummary.reduce((sum, s) => sum + (s.total_spend || 0), 0)
    }
    return salesSummary.total_spend || 0
  }, [salesSummary])

  const fulfillment = useMemo(() => {
    if (!Array.isArray(orders)) return { rate: 0, total: 0, fulfilled: 0 }
    const total = orders.length
    const fulfilled = orders.filter((o) => o.status === "completed").length
    return {
      rate: total ? Math.round((fulfilled / total) * 100) : 0,
      total,
      fulfilled,
    }
  }, [orders])

  const totalSchoolsServed = useMemo(() => {
    return allUsers.filter((u) => u.role === "academy").length
  }, [allUsers])

  const systemGrowth = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const nowYear = new Date().getFullYear()
    if (growthType === "users") {
      const counts = Array(12).fill(0)
      allUsers.forEach((u) => {
        if (u.date_joined) {
          const d = new Date(u.date_joined)
          if (d.getFullYear() === nowYear) counts[d.getMonth()]++
        }
      })
      return months.map((m, i) => ({ month: m, count: counts[i], target: counts[i] + Math.floor(Math.random() * 10) }))
    } else {
      const counts = Array(12).fill(0)
      orders.forEach((o) => {
        if (o.created_at) {
          const d = new Date(o.created_at)
          if (d.getFullYear() === nowYear) counts[d.getMonth()]++
        }
      })
      return months.map((m, i) => ({ month: m, count: counts[i], target: counts[i] + Math.floor(Math.random() * 5) }))
    }
  }, [allUsers, orders, growthType])

  const orderFulfillmentTrend = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const nowYear = new Date().getFullYear()
    const total = Array(12).fill(0)
    const fulfilled = Array(12).fill(0)
    orders.forEach((o) => {
      if (o.created_at) {
        const d = new Date(o.created_at)
        if (d.getFullYear() === nowYear) {
          total[d.getMonth()]++
          if (o.status === "completed") fulfilled[d.getMonth()]++
        }
      }
    })
    return months.map((m, i) => ({
      month: m,
      rate: total[i] ? Math.round((fulfilled[i] / total[i]) * 100) : 0,
      total: total[i],
      fulfilled: fulfilled[i],
    }))
  }, [orders])

  const orderStatusData = useMemo(() => {
    const statusCounts = orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1
      return acc
    }, {})

    const colors = {
      completed: "#10B981",
      pending: "#F59E0B",
      processing: "#3B82F6",
      cancelled: "#EF4444",
    }

    return Object.entries(statusCounts).map(([status, count]) => ({
      name: status.charAt(0).toUpperCase() + status.slice(1),
      value: count,
      fill: colors[status] || "#6B7280",
    }))
  }, [orders])

  // PDF Export Functions
  const handleDownloadCollabPDF = async () => {
    const table = document.getElementById("collab-table")
    if (!table) return
    const canvas = await html2canvas(table)
    const imgData = canvas.toDataURL("image/png")
    const pdf = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" })
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const imgWidth = pageWidth - 40
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    pdf.setFontSize(18)
    pdf.text("Are the cooperatives working with schools?", 40, 40)
    pdf.setFontSize(12)
    pdf.text("Date: " + new Date().toLocaleDateString(), 40, 60)
    pdf.addImage(imgData, "PNG", 20, 80, imgWidth, imgHeight)
    pdf.save("collaboration_report.pdf")
  }

  const handleDownloadReachPDF = async () => {
    const academies = allUsers.filter((u) => u.role === "academy")
    const cooperatives = allUsers.filter((u) => u.role === "cooperative")
    const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" })
    let y = 40
    pdf.setFontSize(20)
    pdf.text("WFP Program Reach Report", 40, y)
    y += 28
    pdf.setFontSize(12)
    pdf.text("A detailed report on the scale and outreach of the WFP Rwanda School Feeding Program", 40, y)
    y += 20
    pdf.text("Date: " + new Date().toLocaleDateString(), 40, y)
    y += 30
    pdf.setFontSize(14)
    pdf.text("Summary:", 40, y)
    y += 20
    pdf.setFontSize(12)
    pdf.text(
      `The WFP Rwanda School Feeding Program currently reaches ${academies.length} schools/academies and works with ${cooperatives.length} agricultural cooperatives.`,
      40,
      y,
      { maxWidth: 520 },
    )
    y += 30
    pdf.setFontSize(14)
    pdf.text("Academies/Schools Reached:", 40, y)
    y += 20
    pdf.setFontSize(12)
    academies.forEach((a, i) => {
      if (y > 750) {
        pdf.addPage()
        y = 40
      }
      pdf.text(`${i + 1}. ${a.username || a.email || "-"}${a.district ? " (" + a.district + ")" : ""}`, 60, y)
      y += 18
    })
    y += 20
    pdf.setFontSize(14)
    pdf.text("Cooperatives Working With the Program:", 40, y)
    y += 20
    pdf.setFontSize(12)
    cooperatives.forEach((c, i) => {
      if (y > 750) {
        pdf.addPage()
        y = 40
      }
      pdf.text(`${i + 1}. ${c.username || c.email || "-"}${c.district ? " (" + c.district + ")" : ""}`, 60, y)
      y += 18
    })
    pdf.save("wfp_program_reach_report.pdf")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            <FiActivity className="h-4 w-4" />
            Live Analytics Dashboard
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
            WFP School Feeding Program Analytics
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive insights into program performance, impact, and growth across Rwanda
          </p>
        </div>

        {/* Quick Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700 border border-green-200">
              <FiCalendar className="h-3 w-3 mr-1" />
              Last Updated: {new Date().toLocaleDateString()}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200">
              <FiZap className="h-3 w-3 mr-1" />
              Real-time Data
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white/50 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <FiFileText className="h-4 w-4 mr-2" />
              Export Report
            </button>
            <Link
              to="/admin-dashboard/academy-financial-report"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all"
            >
              <FiEye className="h-4 w-4 mr-2" />
              Academy Reports
            </Link>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="space-y-8">
          {/* Main Analytics Content */}
          <div className="flex-1 space-y-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <SummaryCard
                icon={<FiUsers className="h-8 w-8" />}
                label="Total Schools Served"
                value={totalSchoolsServed}
                color="emerald"
                trend="+12%"
              />
              <SummaryCard
                icon={<FiShoppingCart className="h-8 w-8" />}
                label="Total Orders"
                value={fulfillment.total}
                color="green"
                trend="+8%"
              />
              <SummaryCard
                icon={<FiCheckCircle className="h-8 w-8" />}
                label="Fulfillment Rate"
                value={fulfillment.rate + "%"}
                color="teal"
                trend="+5%"
              />
              <SummaryCard
                icon={<FiBarChart2 className="h-8 w-8" />}
                label="Total Spending"
                value={`RWF ${totalSpending.toLocaleString()}`}
                color="lime"
                trend="+15%"
              />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Most Demanded Products */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-green-100 shadow-xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                      <FiBarChart2 className="h-6 w-6 text-white" />
                    </div>
                    Most Demanded Products
                  </h2>
                </div>
                <div className="h-80">
                  {mostDemandedProducts.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={mostDemandedProducts} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                        <defs>
                          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10B981" stopOpacity={0.8} />
                            <stop offset="100%" stopColor="#059669" stopOpacity={0.6} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} fontSize={12} stroke="#6B7280" />
                        <YAxis allowDecimals={false} fontSize={12} stroke="#6B7280" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(255, 255, 255, 0.95)",
                            border: "1px solid #10B981",
                            borderRadius: "12px",
                            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                          }}
                        />
                        <Bar dataKey="quantity" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <div className="text-center">
                        <FiBarChart2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No product demand data available</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Status Distribution */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-green-100 shadow-xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg">
                      <FiActivity className="h-6 w-6 text-white" />
                    </div>
                    Order Status Distribution
                  </h2>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={orderStatusData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        innerRadius={40}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {orderStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.95)",
                          border: "1px solid #10B981",
                          borderRadius: "12px",
                          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Full Width Charts */}
            <div className="space-y-8">
              {/* Price Prediction Chart */}
              <section>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <FiTrendingUp /> 3-Month Price Trend (Maize)
                </h2>
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  {commodityPrediction.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={commodityPrediction.slice(0, 3)}>
                        <defs>
                          <linearGradient id="priceTrendGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#2563EB" stopOpacity={0.3} />
                            <stop offset="100%" stopColor="#2563EB" stopOpacity={0.05} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month_name" />
                        <YAxis allowDecimals={false} />
                        <Tooltip formatter={(v) => v.toLocaleString() + " RWF"} />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="predicted_price"
                          stroke="#2563EB"
                          strokeWidth={3}
                          name="Predicted Price (RWF)"
                          fill="url(#priceTrendGradient)"
                          dot={{ r: 6, fill: "#2563EB" }}
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="text-gray-400 text-center py-8">No price prediction data available.</div>
                  )}
                </div>
              </section>

              {/* System Growth */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-green-100 shadow-xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-lime-500 to-green-500 rounded-lg">
                      <FiTrendingUp className="h-6 w-6 text-white" />
                    </div>
                    System Growth ({growthType === "users" ? "Users" : "Orders"})
                  </h2>
                  <div className="flex gap-2">
                    <button
                      className={`px-6 py-2 rounded-xl font-medium transition-all duration-200 ${
                        growthType === "users"
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                          : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                      }`}
                      onClick={() => setGrowthType("users")}
                    >
                      Users
                    </button>
                    <button
                      className={`px-6 py-2 rounded-xl font-medium transition-all duration-200 ${
                        growthType === "orders"
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                          : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                      }`}
                      onClick={() => setGrowthType("orders")}
                    >
                      Orders
                    </button>
                  </div>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={systemGrowth} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <defs>
                        <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10B981" stopOpacity={0.2} />
                          <stop offset="100%" stopColor="#10B981" stopOpacity={0.05} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="month" fontSize={12} stroke="#6B7280" />
                      <YAxis allowDecimals={false} fontSize={12} stroke="#6B7280" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.95)",
                          border: "1px solid #10B981",
                          borderRadius: "12px",
                          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="count"
                        stroke="#10B981"
                        strokeWidth={3}
                        dot={{ fill: "#10B981", strokeWidth: 2, r: 6 }}
                        name={growthType === "users" ? "Users" : "Orders"}
                      />
                      <Line
                        type="monotone"
                        dataKey="target"
                        stroke="#6B7280"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ fill: "#6B7280", strokeWidth: 2, r: 4 }}
                        name="Target"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Program Reach Report Section */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <FiUsers /> Program Reach Report
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={handleDownloadReachPDF}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <FiDownload className="h-4 w-4" />
                    Download PDF
                  </button>
                  <Link
                    to="/admin-dashboard/program-reach-report"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    View Detailed Report
                  </Link>
                </div>
              </div>
            </section>

            {/* Academy Financial Reports Section */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <FiDollarSign /> Academy Financial Reports
                </h2>
                <div className="flex gap-2">
                  <button
                    className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all flex items-center gap-2"
                    onClick={() => setShowFinancialModal(true)}
                  >
                    <FiEye className="h-4 w-4" />
                    View Reports
                  </button>
                  <Link
                    to="/admin-dashboard/academy-financial-report"
                    className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-green-50 transition-colors border border-green-200 flex items-center gap-2"
                  >
                    <FiFileText className="h-4 w-4" />
                    Detailed View
                  </Link>
                </div>
              </div>
              
            </section>

            {/* Academy-Cooperative Collaboration */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-green-100 shadow-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg">
                    <FiUsers className="h-6 w-6 text-white" />
                  </div>
                  Academy-Cooperative Collaboration
                </h2>
                <button
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg flex items-center gap-2"
                  onClick={handleDownloadCollabPDF}
                >
                  <FiDownload className="h-4 w-4" />
                  Download PDF
                </button>
              </div>
              <div className="overflow-x-auto rounded-xl border border-green-100">
                {academyCoopCollab.length > 0 ? (
                  <table id="collab-table" className="min-w-full divide-y divide-green-100">
                    <thead className="bg-gradient-to-r from-green-50 to-emerald-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-green-800 uppercase tracking-wider">
                          Academy
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-green-800 uppercase tracking-wider">
                          Cooperative
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-green-800 uppercase tracking-wider">
                          Order Count
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-green-800 uppercase tracking-wider">
                          Total Value (RWF)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-green-50">
                      {academyCoopCollab.map((row, idx) => (
                        <tr key={idx} className="hover:bg-green-50/50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">
                            {row.user__username || "-"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                            {row.cooperative__username || "-"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                              {row.order_count || "-"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-semibold">
                            {row.total_value ? `RWF ${row.total_value.toLocaleString()}` : "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="flex items-center justify-center py-16 text-gray-400">
                    <div className="text-center">
                      <FiUsers className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">No collaboration data available</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Financial Modal */}
        <AcademyFinancialReportModal
          open={showFinancialModal}
          onClose={() => setShowFinancialModal(false)}
          allUsers={allUsers}
          orders={orders}
          loadingUsers={useSelector((state) => state.user.loading)}
          loadingOrders={useSelector((state) => state.order.loading)}
        />
      </div>
    </div>
  )
}

const SummaryCard = ({ icon, label, value, color, trend }) => {
  const colorClasses = {
    emerald: "from-emerald-500 to-emerald-600",
    green: "from-green-500 to-green-600",
    teal: "from-teal-500 to-teal-600",
    lime: "from-lime-500 to-lime-600",
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-green-100 shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group">
      <div className="flex items-center justify-between mb-4">
        <div
          className={`p-3 rounded-xl bg-gradient-to-r ${colorClasses[color]} group-hover:scale-110 transition-transform duration-200`}
        >
          <div className="text-white">{icon}</div>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full flex items-center gap-1">
            <FiArrowUpRight className="h-3 w-3" />
            {trend}
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="text-3xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">{value}</div>
        <div className="text-sm font-medium text-gray-600">{label}</div>
      </div>
    </div>
  )
}

export default AdminAnalytics
