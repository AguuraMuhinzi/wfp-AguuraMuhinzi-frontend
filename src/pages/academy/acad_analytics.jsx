// import React, { useMemo } from 'react';
// import { useSelector } from 'react-redux';
// import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts';
// import { FiTrendingUp, FiShoppingCart, FiUsers, FiPackage, FiDownload, FiPieChart, FiBarChart2 } from 'react-icons/fi';
// import { exportTableToCSV, generateAcademyFinancialReportPDF } from '../../components/export_function';

// const COLORS = ['#3b82f6', '#34d399', '#fbbf24', '#f87171', '#a78bfa', '#6366f1', '#f472b6'];

// const SummaryCards = ({ totalSpend, orderCount, avgOrderValue, activeCoops, mostOrderedProduct }) => (
//   <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
//     <div className="bg-white rounded-xl shadow-sm border p-6 flex flex-col items-center justify-center">
//       <FiDownload className="text-3xl mb-2 text-blue-600" />
//       <div className="text-2xl font-bold text-gray-800">{totalSpend.toLocaleString()} RWF</div>
//       <div className="text-sm text-gray-500">Total Spend</div>
//     </div>
//     <div className="bg-white rounded-xl shadow-sm border p-6 flex flex-col items-center justify-center">
//       <FiShoppingCart className="text-3xl mb-2 text-green-600" />
//       <div className="text-2xl font-bold text-gray-800">{orderCount}</div>
//       <div className="text-sm text-gray-500">Order Count</div>
//     </div>
//     <div className="bg-white rounded-xl shadow-sm border p-6 flex flex-col items-center justify-center">
//       <FiTrendingUp className="text-3xl mb-2 text-yellow-600" />
//       <div className="text-2xl font-bold text-gray-800">{avgOrderValue.toLocaleString()} RWF</div>
//       <div className="text-sm text-gray-500">Avg Order Value</div>
//     </div>
//     <div className="bg-white rounded-xl shadow-sm border p-6 flex flex-col items-center justify-center">
//       <FiUsers className="text-3xl mb-2 text-purple-600" />
//       <div className="text-2xl font-bold text-gray-800">{activeCoops}</div>
//       <div className="text-sm text-gray-500">Active Cooperatives</div>
//     </div>
//     <div className="bg-white rounded-xl shadow-sm border p-6 flex flex-col items-center justify-center">
//       <FiPackage className="text-3xl mb-2 text-pink-600" />
//       <div className="text-2xl font-bold text-gray-800">{mostOrderedProduct}</div>
//       <div className="text-sm text-gray-500">Most Ordered Product</div>
//     </div>
//   </div>
// );

// const ExportButtons = ({ academyFinancial, coopCollab }) => (
//   <div className="flex gap-4 mb-6">
//     <button 
//       className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2"
//       onClick={() => generateAcademyFinancialReportPDF(academyFinancial, coopCollab, 'academy_financial_report.pdf')}
//     >
//       <FiDownload /> Export Financial Report PDF
//     </button>
//     <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2"><FiDownload /> Export CSV</button>
//   </div>
// );

// const AcadAnalytics = () => {
//   const academyFinancial = useSelector(state => state.reports.academyFinancialReport) || {};
//   const productDemand = useSelector(state => state.reports.productDemandReport) || [];
//   const coopCollab = useSelector(state => state.reports.academyCoopCollaboration) || [];
//   const orders = useSelector(state => state.order.orders) || [];

//   // Summary values
//   const totalSpend = academyFinancial.total_spend || 0;
//   const orderCount = academyFinancial.order_count || 0;
//   const avgOrderValue = academyFinancial.avg_order_value || 0;
//   const activeCoops = Array.isArray(coopCollab) ? coopCollab.length : 0;
//   const mostOrderedProduct = Array.isArray(productDemand) && productDemand.length > 0 ? productDemand[0].product__product_name : 'N/A';

//   // Spend trend
//   const spendTrend = academyFinancial.spend_trend || [];

//   // Order volume trend (orders per month)
//   const orderVolumeData = useMemo(() => {
//     if (!Array.isArray(orders)) return [];
//     const monthMap = {};
//     orders.forEach(order => {
//       if (!order.created_at) return;
//       const date = new Date(order.created_at);
//       const month = date.toLocaleString('default', { month: 'short', year: '2-digit' });
//       monthMap[month] = (monthMap[month] || 0) + 1;
//     });
//     return Object.entries(monthMap).map(([month, count]) => ({ month, count })).sort((a, b) => new Date('01 ' + a.month) - new Date('01 ' + b.month));
//   }, [orders]);

//   // Most ordered products (bar chart)
//   const topProducts = Array.isArray(productDemand) ? productDemand.slice(0, 7) : [];
//   const productBarData = topProducts.map(row => ({
//     name: row.product__product_name,
//     quantity: row.total_quantity
//   }));

//   // Order status breakdown (pie chart)
//   const statusCounts = useMemo(() => {
//     if (!Array.isArray(orders)) return {};
//     return orders.reduce((acc, o) => {
//       acc[o.status] = (acc[o.status] || 0) + 1;
//       return acc;
//     }, {});
//   }, [orders]);
//   const statusData = Object.entries(statusCounts).map(([name, value]) => ({ name, value }));

//   return (
//     <div className="max-w-6xl mx-auto p-6 space-y-8">
//       <SummaryCards
//         totalSpend={totalSpend}
//         orderCount={orderCount}
//         avgOrderValue={avgOrderValue}
//         activeCoops={activeCoops}
//         mostOrderedProduct={mostOrderedProduct}
//       />
//       <ExportButtons academyFinancial={academyFinancial} coopCollab={coopCollab} />
//       {/* Spend Trend Area Chart */}
//       <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2"><FiBarChart2 /> Monthly Spend Trend</h3>
//           {spendTrend.length > 0 && (
//             <button
//               className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-semibold"
//               onClick={() => exportTableToCSV(spendTrend, 'spend_trend.csv')}
//             >
//               Export CSV
//             </button>
//           )}
//         </div>
//         {spendTrend.length > 0 ? (
//           <ResponsiveContainer width="100%" height={300}>
//             <AreaChart data={spendTrend} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
//               <defs>
//                 <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
//                   <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
//                 </linearGradient>
//               </defs>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip formatter={value => value?.toLocaleString?.() + ' RWF'} />
//               <Area type="monotone" dataKey="monthly_spend" stroke="#3b82f6" fillOpacity={1} fill="url(#colorSpend)" name="Monthly Spend" />
//             </AreaChart>
//           </ResponsiveContainer>
//         ) : <p className="text-gray-500">No spend trend data.</p>}
//       </div>
//       {/* Order Volume Bar Chart */}
//       <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2"><FiBarChart2 /> Order Volume Trend</h3>
//           {orderVolumeData.length > 0 && (
//             <button
//               className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-semibold"
//               onClick={() => exportTableToCSV(orderVolumeData, 'order_volume.csv')}
//             >
//               Export CSV
//             </button>
//           )}
//         </div>
//         {orderVolumeData.length > 0 ? (
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={orderVolumeData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="month" />
//               <YAxis allowDecimals={false} />
//               <Tooltip />
//               <Bar dataKey="count" fill="#34d399" name="Order Count" />
//             </BarChart>
//           </ResponsiveContainer>
//         ) : <p className="text-gray-500">No order volume data.</p>}
//       </div>
//       {/* Most Ordered Products Bar Chart */}
//       <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2"><FiBarChart2 /> Most Ordered Products</h3>
//           {productBarData.length > 0 && (
//             <button
//               className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-semibold"
//               onClick={() => exportTableToCSV(productBarData, 'most_ordered_products.csv')}
//             >
//               Export CSV
//             </button>
//           )}
//         </div>
//         {productBarData.length > 0 ? (
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={productBarData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="quantity" fill="#fbbf24" name="Quantity Ordered" />
//             </BarChart>
//           </ResponsiveContainer>
//         ) : <p className="text-gray-500">No product demand data.</p>}
//       </div>
//       {/* Order Status Pie Chart */}
//       <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
//         <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2"><FiPieChart /> Order Status Breakdown</h3>
//         {statusData.length > 0 ? (
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
//                 {statusData.map((entry, idx) => (
//                   <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Legend />
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         ) : <p className="text-gray-500">No order status data.</p>}
//       </div>
//     </div>
//   );
// };

// export default AcadAnalytics;
"use client"

import { useMemo } from "react"
import { useSelector } from "react-redux"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import {
  FiTrendingUp,
  FiShoppingCart,
  FiUsers,
  FiPackage,
  FiDownload,
  FiPieChart,
  FiBarChart2,
  FiDollarSign,
  FiActivity,
  FiTarget,
  FiEye,
  FiCalendar,
} from "react-icons/fi"
import { exportTableToCSV, generateAcademyFinancialReportPDF } from "../../components/export_function"

const COLORS = ["#059669", "#0369a1", "#d97706", "#dc2626", "#7c3aed", "#0891b2", "#f472b6"]

const SummaryCards = ({ totalSpend, orderCount, avgOrderValue, activeCoops, mostOrderedProduct }) => (
  <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
    <div className="bg-white/60 backdrop-blur-sm rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-600 to-emerald-700 shadow-sm">
          <FiDollarSign className="text-white" size={20} />
        </div>
        <div className="flex items-center gap-1 text-sm font-medium text-emerald-700">
          <FiTrendingUp className="h-3 w-3" />
          +12%
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-2xl font-bold text-gray-800">{totalSpend.toLocaleString()} RWF</p>
        <p className="text-sm text-gray-600">Total Spend</p>
        <p className="text-xs text-gray-500">Academy expenditure</p>
      </div>
    </div>

    <div className="bg-white/60 backdrop-blur-sm rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 shadow-sm">
          <FiShoppingCart className="text-white" size={20} />
        </div>
        <div className="flex items-center gap-1 text-sm font-medium text-green-700">
          <FiTrendingUp className="h-3 w-3" />
          +8%
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-2xl font-bold text-gray-800">{orderCount}</p>
        <p className="text-sm text-gray-600">Total Orders</p>
        <p className="text-xs text-gray-500">Orders placed</p>
      </div>
    </div>

    <div className="bg-white/60 backdrop-blur-sm rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-lg bg-gradient-to-br from-purple-600 to-purple-700 shadow-sm">
          <FiTarget className="text-white" size={20} />
        </div>
        <div className="flex items-center gap-1 text-sm font-medium text-green-700">
          <FiTrendingUp className="h-3 w-3" />
          +5%
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-2xl font-bold text-gray-800">{avgOrderValue.toLocaleString()} RWF</p>
        <p className="text-sm text-gray-600">Avg Order Value</p>
        <p className="text-xs text-gray-500">Per order average</p>
      </div>
    </div>

    <div className="bg-white/60 backdrop-blur-sm rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-lg bg-gradient-to-br from-orange-600 to-orange-700 shadow-sm">
          <FiUsers className="text-white" size={20} />
        </div>
        <div className="flex items-center gap-1 text-sm font-medium text-green-700">
          <FiTrendingUp className="h-3 w-3" />
          +15%
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-2xl font-bold text-gray-800">{activeCoops}</p>
        <p className="text-sm text-gray-600">Active Cooperatives</p>
        <p className="text-xs text-gray-500">Partnership count</p>
      </div>
    </div>

    <div className="bg-white/60 backdrop-blur-sm rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-lg bg-gradient-to-br from-green-600 to-green-700 shadow-sm">
          <FiPackage className="text-white" size={20} />
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-xl font-bold text-gray-800">
          {mostOrderedProduct.length > 15 ? mostOrderedProduct.substring(0, 15) + "..." : mostOrderedProduct}
        </p>
        <p className="text-sm text-gray-600">Top Product</p>
        <p className="text-xs text-gray-500">Most ordered item</p>
      </div>
    </div>
  </div>
)

const ExportButtons = ({ academyFinancial, coopCollab }) => (
  <div className="flex gap-4 mb-8">
    <button
      className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
      onClick={() => generateAcademyFinancialReportPDF(academyFinancial, coopCollab, "academy_financial_report.pdf")}
    >
      <FiDownload className="h-5 w-5" />
      Export Financial Report PDF
    </button>
    <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]">
      <FiDownload className="h-5 w-5" />
      Export All Data CSV
    </button>
  </div>
)

const ChartCard = ({ title, children, onExport, icon: Icon = FiBarChart2 }) => (
  <div className="bg-white/60 backdrop-blur-sm shadow-md rounded-xl border border-gray-200 overflow-hidden">
    <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-4 flex justify-between items-center">
      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
        <Icon />
        {title}
      </h3>
      {onExport && (
        <button
          onClick={onExport}
          className="flex items-center gap-2 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg transition-colors duration-200 text-white text-sm font-medium"
        >
          <FiDownload size={16} />
          Export
        </button>
      )}
    </div>
    <div className="p-6">{children}</div>
  </div>
)

const AcadAnalytics = () => {
  const academyFinancial = useSelector((state) => state.reports.academyFinancialReport) || {}
  const productDemand = useSelector((state) => state.reports.productDemandReport) || []
  const coopCollab = useSelector((state) => state.reports.academyCoopCollaboration) || []
  const orders = useSelector((state) => state.order.orders) || []

  // Summary values
  const totalSpend = academyFinancial.total_spend || 0
  const orderCount = academyFinancial.order_count || 0
  const avgOrderValue = academyFinancial.avg_order_value || 0
  const activeCoops = Array.isArray(coopCollab) ? coopCollab.length : 0
  const mostOrderedProduct =
    Array.isArray(productDemand) && productDemand.length > 0 ? productDemand[0].product__product_name : "N/A"

  // Spend trend
  const spendTrend = academyFinancial.spend_trend || []

  // Order volume trend (orders per month)
  const orderVolumeData = useMemo(() => {
    if (!Array.isArray(orders)) return []
    const monthMap = {}
    orders.forEach((order) => {
      if (!order.created_at) return
      const date = new Date(order.created_at)
      const month = date.toLocaleString("default", { month: "short", year: "2-digit" })
      monthMap[month] = (monthMap[month] || 0) + 1
    })
    return Object.entries(monthMap)
      .map(([month, count]) => ({ month, count }))
      .sort((a, b) => new Date("01 " + a.month) - new Date("01 " + b.month))
  }, [orders])

  // Most ordered products (bar chart)
  const topProducts = Array.isArray(productDemand) ? productDemand.slice(0, 7) : []
  const productBarData = topProducts.map((row) => ({
    name: row.product__product_name?.substring(0, 15) + "..." || "Unknown",
    quantity: row.total_quantity,
  }))

  // Order status breakdown (pie chart)
  const statusCounts = useMemo(() => {
    if (!Array.isArray(orders)) return {}
    return orders.reduce((acc, o) => {
      acc[o.status] = (acc[o.status] || 0) + 1
      return acc
    }, {})
  }, [orders])

  const statusData = Object.entries(statusCounts).map(([name, value]) => ({ name, value }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-slate-50 to-teal-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-700 to-teal-900 bg-clip-text text-transparent mb-2">
              Analytics
            </h1>
            <p className="text-gray-600 text-lg">
              Comprehensive insights into your academy's performance and partnerships
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200">
              <FiCalendar className="h-4 w-4" />
              Last 30 days
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200">
              <FiEye className="h-4 w-4" />
              View Report
            </button>
          </div>
        </div>

        <SummaryCards
          totalSpend={totalSpend}
          orderCount={orderCount}
          avgOrderValue={avgOrderValue}
          activeCoops={activeCoops}
          mostOrderedProduct={mostOrderedProduct}
        />

        <ExportButtons academyFinancial={academyFinancial} coopCollab={coopCollab} />

        {/* Charts Grid - Two charts per row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Spend Trend Area Chart */}
          <ChartCard
            title="Monthly Spend Trend"
            icon={FiActivity}
            onExport={spendTrend.length > 0 ? () => exportTableToCSV(spendTrend, "spend_trend.csv") : null}
          >
            {spendTrend.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={spendTrend} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip
                    formatter={(value) => [`${value?.toLocaleString?.()} RWF`, "Monthly Spend"]}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="monthly_spend"
                    stroke="#059669"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorSpend)"
                    name="Monthly Spend"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500">
                <div className="text-center">
                  <FiBarChart2 className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                  <p>No spend trend data available</p>
                </div>
              </div>
            )}
          </ChartCard>

          {/* Order Volume Bar Chart */}
          <ChartCard
            title="Order Volume Trend"
            icon={FiShoppingCart}
            onExport={orderVolumeData.length > 0 ? () => exportTableToCSV(orderVolumeData, "order_volume.csv") : null}
          >
            {orderVolumeData.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={orderVolumeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                  <YAxis allowDecimals={false} stroke="#6b7280" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Bar dataKey="count" fill="#059669" name="Order Count" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500">
                <div className="text-center">
                  <FiShoppingCart className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                  <p>No order volume data available</p>
                </div>
              </div>
            )}
          </ChartCard>
        </div>

        {/* Second row of charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Most Ordered Products Bar Chart */}
          <ChartCard
            title="Most Ordered Products"
            icon={FiPackage}
            onExport={
              productBarData.length > 0 ? () => exportTableToCSV(productBarData, "most_ordered_products.csv") : null
            }
          >
            {productBarData.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={productBarData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Bar dataKey="quantity" fill="#0369a1" name="Quantity Ordered" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500">
                <div className="text-center">
                  <FiPackage className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                  <p>No product demand data available</p>
                </div>
              </div>
            )}
          </ChartCard>

          {/* Order Status Pie Chart */}
          <ChartCard title="Order Status Distribution" icon={FiPieChart}>
            {statusData.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={statusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {statusData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500">
                <div className="text-center">
                  <FiPieChart className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                  <p>No order status data available</p>
                </div>
              </div>
            )}
          </ChartCard>
        </div>

        {/* Smart Insights */}
        <div className="bg-gradient-to-r from-emerald-50 via-slate-50 to-teal-50 rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiActivity className="text-emerald-600" />
            Smart Insights & Recommendations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Spend Performance</span>
              </div>
              <p className="text-gray-900 font-semibold">Increasing Trend</p>
              <p className="text-sm text-gray-600">12% growth this month</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Order Efficiency</span>
              </div>
              <p className="text-gray-900 font-semibold">Optimal Performance</p>
              <p className="text-sm text-gray-600">Average processing time: 2.3 days</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Partnership Growth</span>
              </div>
              <p className="text-gray-900 font-semibold">{activeCoops} Active Partners</p>
              <p className="text-sm text-gray-600">15% increase in collaborations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AcadAnalytics
