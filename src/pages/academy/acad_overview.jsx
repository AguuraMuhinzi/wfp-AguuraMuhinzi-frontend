"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchAcademyFinancialReport,
  fetchProductDemandReport,
  fetchAcademyCooperativeCollaboration,
} from "../../Redux/Slices/reports/report_slice"
import {
  FiShoppingCart,
  FiPackage,
  FiDownload,
  FiPlus,
  FiBarChart2,
  FiActivity,
  FiCalendar,
  FiEye,
  FiArrowUp,
  FiArrowDown,
  FiDollarSign,
  FiTarget,
} from "react-icons/fi"
import { FaHandshake, FaLeaf } from "react-icons/fa"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts"

const COLORS = ["#059669", "#0369a1", "#d97706", "#dc2626", "#7c3aed", "#0891b2"]

const StatCard = ({ icon: Icon, label, value, color = "emerald", trend, subtitle }) => {
  const colorClasses = {
    emerald: "from-emerald-600 to-emerald-700 bg-emerald-50 text-emerald-700",
    blue: "from-blue-600 to-blue-700 bg-blue-50 text-blue-700",
    purple: "from-purple-600 to-purple-700 bg-purple-50 text-purple-700",
    orange: "from-orange-600 to-orange-700 bg-orange-50 text-orange-700",
    green: "from-green-600 to-green-700 bg-green-50 text-green-700",
    teal: "from-teal-600 to-teal-700 bg-teal-50 text-teal-700",
  }

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200 p-6 hover:shadow-md hover:scale-[1.02] transition-all duration-300 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-gradient-to-br ${colorClasses[color].split(" ")[0]} shadow-sm`}>
          <Icon className="text-white" size={20} />
        </div>
        {trend !== undefined && (
          <div
            className={`flex items-center gap-1 text-sm font-medium ${
              trend > 0 ? "text-green-700" : trend < 0 ? "text-red-700" : "text-gray-600"
            }`}
          >
            {trend > 0 ? <FiArrowUp className="h-3 w-3" /> : trend < 0 ? <FiArrowDown className="h-3 w-3" /> : null}
            {trend !== 0 && `${Math.abs(trend)}%`}
          </div>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-xl font-bold text-gray-800">{value}</p>
        <p className="text-sm text-gray-600">{label}</p>
        {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
      </div>
    </div>
  )
}

const ChartCard = ({ title, children, onExport, icon: Icon = FiBarChart2 }) => (
  <div className="bg-white/60 backdrop-blur-sm shadow-md rounded-xl border border-gray-200 overflow-hidden">
    <div className="bg-gradient-to-r from-green-600 to-emerald-700 px-6 py-4 flex justify-between items-center">
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

const AcadOverview = () => {
  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.user.userInfo) || {}
  const academyFinancial = useSelector((state) => state.reports.academyFinancialReport) || {}
  const productDemand = useSelector((state) => state.reports.productDemandReport) || []
  const coopCollab = useSelector((state) => state.reports.academyCoopCollaboration) || []
  const orders = useSelector((state) => state.order.orders) || []
  const userId = useSelector((state) => state.user.userId) || localStorage.getItem('user_id');
  // Filter orders for the logged-in academy user
  const filteredOrders = orders.filter(order => order.user && String(order.user.id || order.user) === String(userId));
  const loading = useSelector((state) => state.reports.loading)

  const [dateRange, setDateRange] = useState({ start: "", end: "" })

  useEffect(() => {
    const academyId = userInfo.academy_id || userInfo.id
    if (!academyFinancial.total_spend) {
      dispatch(
        fetchAcademyFinancialReport({
          academy_id: academyId,
          start_date: dateRange.start,
          end_date: dateRange.end,
        }),
      )
    }
    if (!Array.isArray(productDemand) || productDemand.length === 0) {
      dispatch(
        fetchProductDemandReport({
          start_date: dateRange.start,
          end_date: dateRange.end,
        }),
      )
    }
    if (!Array.isArray(coopCollab) || coopCollab.length === 0) {
      dispatch(
        fetchAcademyCooperativeCollaboration({
          start_date: dateRange.start,
          end_date: dateRange.end,
        }),
      )
    }
  }, [dispatch, userInfo, dateRange])

  // Calculate metrics
  const totalSpend = academyFinancial.total_spend || 0
  const orderCount = academyFinancial.order_count || 0
  const avgOrderValue = academyFinancial.avg_order_value || 0
  const activeCoops = Array.isArray(coopCollab) ? coopCollab.length : 0
  const mostOrderedProduct =
    Array.isArray(productDemand) && productDemand.length > 0 ? productDemand[0].product__product_name : "N/A"

  // Process data
  const spendTrend = academyFinancial.spend_trend || []
  const recentOrders = Array.isArray(filteredOrders) ? filteredOrders.slice(-10).reverse() : []
  const topCoops = Array.isArray(coopCollab) ? coopCollab.slice(0, 5) : []
  const topProducts = Array.isArray(productDemand) ? productDemand.slice(0, 6) : []

  // Calculate trends
  const spendChange =
    spendTrend.length > 1
      ? ((spendTrend[spendTrend.length - 1].monthly_spend - spendTrend[0].monthly_spend) /
          spendTrend[0].monthly_spend) *
        100
      : 0

  // Order status breakdown for pie chart
  const statusCounts = recentOrders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1
    return acc
  }, {})
  const statusData = Object.entries(statusCounts).map(([status, count]) => ({
    name: status,
    value: count,
  }))

  // Product demand chart data
  const productChartData = topProducts.map((product) => ({
    name: product.product__product_name?.substring(0, 15) + "..." || "Unknown",
    quantity: product.total_quantity || 0,
    revenue: product.total_revenue || 0,
    orders: product.order_count || 0,
  }))

  const handleExport = (section) => {
    console.log(`Exporting ${section} report...`)
    // Add export logic here
  }

 const getOrderProductsSummary = (order) => {
  if (!order.products || !Array.isArray(order.products)) return { names: "-", quantities: "-" }
  const names = order.products
    .map((item) =>
      item.product?.product_name ||
      item.product?.name ||
      (typeof item.product === "string" ? item.product : "") ||
      ""
    )
    .join(", ")
  const quantities = order.products
    .map((item) => item.quantity ?? "")
    .join(", ")
  return { names, quantities }
}
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent mb-2">
              Academy Dashboard
            </h1>
            <p className="text-gray-600 text-lg">Monitor your academy's performance and partnerships</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none bg-white"
              onChange={(e) => {
                const value = e.target.value
                const now = new Date()
                let start = ""
                if (value === "7d") {
                  start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
                } else if (value === "30d") {
                  start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
                } else if (value === "90d") {
                  start = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
                }
                setDateRange({ start, end: now.toISOString().split("T")[0] })
              }}
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            icon={FiDollarSign}
            label="Total Spend"
            value={`${totalSpend.toLocaleString()} RWF`}
            color="emerald"
            // trend={spendChange}
            subtitle="Academy expenditure"
          />
          <StatCard
            icon={FiShoppingCart}
            label="Total Orders"
            value={orderCount.toLocaleString()}
            color="blue"
            // trend={12}
            subtitle="Orders placed"
          />
          <StatCard
            icon={FiTarget}
            label="Avg Order Value"
            value={`${avgOrderValue.toLocaleString()} RWF`}
            color="purple"
            // trend={8}
            subtitle="Per order average"
          />
          <StatCard
            icon={FaHandshake}
            label="Active Cooperatives"
            value={activeCoops.toLocaleString()}
            color="orange"
            // trend={15}
            subtitle="Partnership count"
          />
          {/* <StatCard
            icon={FaLeaf}
            label="Top Product"
            value={mostOrderedProduct.length > 15 ? mostOrderedProduct.substring(0, 15) + "..." : mostOrderedProduct}
            color="green"
            subtitle="Most ordered item"
          /> */}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Spend Trend Chart */}
          <ChartCard title="Monthly Spend Trend" onExport={() => handleExport("Spend Trend")} icon={FiActivity}>
            {spendTrend.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={spendTrend} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
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

          {/* Order Status Breakdown */}
          <ChartCard
            title="Order Status Distribution"
            onExport={() => handleExport("Order Status")}
            icon={FiShoppingCart}
          >
            {statusData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500">
                <div className="text-center">
                  <FiShoppingCart className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                  <p>No order status data available</p>
                </div>
              </div>
            )}
          </ChartCard>
        </div>

        {/* Product Demand Chart */}
        <ChartCard title="Top Products by Demand" onExport={() => handleExport("Product Demand")} icon={FiPackage}>
          {productChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={productChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend />
                <Bar dataKey="quantity" fill="#059669" name="Quantity" />
                <Bar dataKey="orders" fill="#0369a1" name="Orders" />
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

        {/* Data Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Cooperatives */}
          <div className="bg-white/60 backdrop-blur-sm shadow-md rounded-xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-emerald-700 px-6 py-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <FaHandshake />
                Top Cooperatives
              </h3>
              <button
                onClick={() => handleExport("Top Cooperatives")}
                className="flex items-center gap-2 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg transition-colors duration-200 text-white text-sm font-medium"
              >
                <FiDownload size={16} />
                Export
              </button>
            </div>
            <div className="p-6">
              {topCoops.length > 0 ? (
                <div className="space-y-4">
                  {topCoops.map((coop, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg border border-gray-100 hover:shadow-sm transition-all duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-700 rounded-full flex items-center justify-center text-white font-bold">
                          #{index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{coop.cooperative__username}</p>
                          <p className="text-sm text-gray-500">{coop.order_count} orders</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">RWF {coop.total_value?.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">Total Value</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <FaHandshake className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                  <p>No cooperative collaboration data</p>
                </div>
              )}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white/60 backdrop-blur-sm shadow-md rounded-xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-emerald-700 px-6 py-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <FaLeaf />
                Top Products
              </h3>
              <button
                onClick={() => handleExport("Top Products")}
                className="flex items-center gap-2 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg transition-colors duration-200 text-white text-sm font-medium"
              >
                <FiDownload size={16} />
                Export
              </button>
            </div>
            <div className="p-6">
              {topProducts.length > 0 ? (
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg border border-gray-100 hover:shadow-sm transition-all duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center text-white font-bold">
                          #{index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{product.product__product_name}</p>
                          <p className="text-sm text-gray-500">{product.total_quantity} units</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">RWF {product.total_revenue?.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">{product.order_count} orders</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <FaLeaf className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                  <p>No product demand data</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white/60 backdrop-blur-sm shadow-md rounded-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-emerald-700 px-6 py-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <FiShoppingCart />
              Recent Orders
            </h3>
            <button
              onClick={() => handleExport("Recent Orders")}
              className="flex items-center gap-2 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg transition-colors duration-200 text-white text-sm font-medium"
            >
              <FiDownload size={16} />
              Export
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider flex items-center gap-2">
                    <FiCalendar />
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    <FaLeaf className="inline mr-1" />
                    Products
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    <FiPackage className="inline mr-1" />
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    <FiDollarSign className="inline mr-1" />
                    Total Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    <FiActivity className="inline mr-1" />
                    Status
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentOrders.length > 0 ? (
                  recentOrders.map((order, idx) => {
                    const { names, quantities } = getOrderProductsSummary(order)
                    return (
                      <tr key={order.id || idx} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.date || order.created_at
                            ? new Date(order.date || order.created_at).toLocaleDateString()
                            : "-"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{names}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{quantities}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          RWF {order.total?.toLocaleString() || "-"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                              order.status === "delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : order.status === "shipped"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {order.status || "Unknown"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <button className="inline-flex items-center gap-1 text-green-600 hover:text-green-800 font-medium text-sm hover:bg-green-50 px-3 py-1 rounded-lg transition-all duration-200">
                            <FiEye size={14} />
                            View
                          </button>
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                      <FiShoppingCart className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                      <p>No recent orders available</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Smart Insights */}
        <div className="bg-gradient-to-r from-gray-50 via-slate-50 to-gray-100 rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiActivity className="text-gray-600" />
            Smart Insights & Recommendations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Spend Trend</span>
              </div>
              <p className="text-gray-900 font-semibold">
                {spendChange > 0 ? "Increasing" : spendChange < 0 ? "Decreasing" : "Stable"}
              </p>
              <p className="text-sm text-gray-600">{spendChange !== 0 && `${spendChange.toFixed(1)}% change`}</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Top Product</span>
              </div>
              <p className="text-gray-900 font-semibold">{mostOrderedProduct}</p>
              <p className="text-sm text-gray-600">Most ordered item</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Partnerships</span>
              </div>
              <p className="text-gray-900 font-semibold">{activeCoops} Cooperatives</p>
              <p className="text-sm text-gray-600">Active collaborations</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] shadow-sm">
              <FiPlus className="h-5 w-5" />
              Place New Order
            </button>
            <button className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] shadow-sm">
              <FiDownload className="h-5 w-5" />
              Download Report
            </button>
            <button className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] shadow-sm">
              <FiShoppingCart className="h-5 w-5" />
              View All Orders
            </button>
            <button className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] shadow-sm">
              <FaHandshake className="h-5 w-5" />
              Find Cooperatives
            </button>
          </div>
        </div>

        {/* Loading overlay */}
        {loading && (
          <div className="fixed inset-0 bg-green-900/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 shadow-2xl flex items-center gap-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              <span className="text-lg text-green-600 font-medium">Loading academy data...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AcadOverview
