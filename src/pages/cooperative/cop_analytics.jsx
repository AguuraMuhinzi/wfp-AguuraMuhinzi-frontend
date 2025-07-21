"use client"

import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  FiBarChart2,
  FiTrendingUp,
  FiShoppingCart,
  FiCheckCircle,
  FiDownload,
  FiPackage,
  FiFileText,
  FiChevronUp,
  FiChevronDown,
  FiEye,
  FiCalendar,
  FiUsers,
  FiActivity,
} from "react-icons/fi"
import { FaBox, FaWarehouse, FaArrowUp, FaDollarSign, FaLeaf } from "react-icons/fa"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts"
import { listProducts } from "../../Redux/Slices/product/product"
import { fetchUserReports } from "../../Redux/Slices/reports/report_slice"
import { fetchSalesSummaryReport } from "../../Redux/Slices/reports/report_slice"
import { Link } from "react-router-dom"
import { generateCooperativeSalesReportPDF } from "../../components/export_function"
import { fetchAcademyCooperativeCollaboration } from '../../Redux/Slices/reports/report_slice';

// Helper for currency formatting
const formatCurrency = (value) => value?.toLocaleString?.("en-US", { style: "currency", currency: "RWF" }) || value

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"]

const StatCard = ({ icon: Icon, label, value, color = "emerald", trend }) => {
  const colorClasses = {
    emerald: "from-emerald-500 to-teal-600",
    blue: "from-blue-500 to-indigo-600",
    purple: "from-purple-500 to-pink-600",
    orange: "from-orange-500 to-red-600",
    green: "from-green-500 to-emerald-600",
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl p-6 border border-emerald-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {trend && (
            <div className="flex items-center mt-2 text-emerald-600">
              <FaArrowUp className="mr-1" size={12} />
              <span className="text-xs font-semibold">+{trend}%</span>
            </div>
          )}
        </div>
        <div className={`p-3 bg-gradient-to-br ${colorClasses[color]} rounded-xl shadow-lg`}>
          <Icon className="text-white" size={20} />
        </div>
      </div>
    </div>
  )
}

const ChartCard = ({ title, children, onExport }) => (
  <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-emerald-200 overflow-hidden">
    <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 flex justify-between items-center">
      <h3 className="text-lg font-bold text-white flex items-center gap-2">
        <FiBarChart2 />
        {title}
      </h3>
      <button
        onClick={onExport}
        className="flex items-center gap-2 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg transition-colors duration-200 text-white text-sm font-medium"
      >
        <FiDownload size={16} />
        Export
      </button>
    </div>
    <div className="p-6">{children}</div>
  </div>
)

const CopAnalytics = () => {
  const dispatch = useDispatch()

  // Redux selectors
  const products = useSelector((state) => state.product.products || [])
  const productsLoading = useSelector((state) => state.product.loading)
  const orders = useSelector((state) => state.order.orders || [])
  const priceTrends = useSelector((state) => state.commodityTrend.predictions || [])
  const userId = useSelector((state) => state.user.userId) || localStorage.getItem("user_id")
  const userReports = useSelector((state) => state.reports.userReports || [])
  const reportsLoading = useSelector((state) => state.reports.loading)
  const reportsError = useSelector((state) => state.reports.error)
  const cooperative = useSelector((state) => state.cooperative.data)
  const salesSummary = useSelector((state) => state.reports.salesSummary)
  const user = useSelector((state) => state.user.userInfo) || {}
  const academyCoopCollaboration = useSelector(state => state.reports.academyCoopCollaboration) || [];

  const [dateRange, setDateRange] = React.useState({ start_date: "", end_date: "" })
  const [salesLoading, setSalesLoading] = React.useState(false)
  const [salesError, setSalesError] = React.useState(null)
  const [salesSummaryOpen, setSalesSummaryOpen] = React.useState(true)

  useEffect(() => {
    dispatch(listProducts())
    dispatch(fetchUserReports())
    dispatch(fetchAcademyCooperativeCollaboration({}));
  }, [dispatch])

  const handleSalesSummary = async (e) => {
    e.preventDefault()
    if (!dateRange.start_date || !dateRange.end_date || !userId) {
      setSalesError("Please select a date range.")
      return
    }
    setSalesError(null)
    setSalesLoading(true)
    try {
      await dispatch(
        fetchSalesSummaryReport({
          start_date: dateRange.start_date,
          end_date: dateRange.end_date,
          cooperative_id: userId,
        }),
      )
    } catch (err) {
      setSalesError("Failed to fetch sales summary.")
    }
    setSalesLoading(false)
  }

  // Filter products for the logged-in user
  const userProducts = products.filter((product) => {
    return String(product.user) === String(userId)
  })

  // Top cards
  const totalStock = userProducts.reduce((sum, p) => sum + (p.quantity || 0), 0)
  const totalOrders = orders.length
  const avgOrderValue = totalOrders ? orders.reduce((sum, o) => sum + (o.total || 0), 0) / totalOrders : 0
  const fulfilledOrders = orders.filter((o) => o.status === "delivered" || o.status === "completed").length
  const fulfillmentRate = totalOrders ? ((fulfilledOrders / totalOrders) * 100).toFixed(1) : 0

  // Order status breakdown for pie chart
  const statusCounts = orders.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1
    return acc
  }, {})
  const statusData = Object.entries(statusCounts).map(([status, count]) => ({ name: status, value: count }))

  // Price trend for line chart
  const priceTrendData = priceTrends.map((pt) => ({
    month: pt.month_name || pt.month || "",
    price: pt.predicted_price || pt.price || 0,
  }))

  // Recent orders (latest 10)
  const recentOrders = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10)

  // Export handlers
  const handleExport = (section) => {
    alert(`Exporting ${section} report...`)
  }

  // Helper to get product names and quantities from order
  const getOrderProductsSummary = (order) => {
    if (!order.products || !Array.isArray(order.products)) return { names: "-", quantities: "-" }
    const names = order.products.map((item) => item.product?.product_name || item.product || "").join(", ")
    const quantities = order.products.map((item) => item.quantity).join(", ")
    return { names, quantities }
  }

  // Remove delivered order filter on top_products, since backend already filters by status='delivered'
  const topProducts = Array.isArray(salesSummary?.top_products) ? salesSummary.top_products : [];
  const salesTrend = Array.isArray(salesSummary?.sales_trend) ? salesSummary.sales_trend : [];
  const salesByCooperative = Array.isArray(salesSummary?.sales_by_cooperative) ? salesSummary.sales_by_cooperative : [];

  // Filter collaboration data for this cooperative
  const myCoopAcademyCollab = Array.isArray(academyCoopCollaboration)
    ? academyCoopCollaboration.filter(row => String(row.cooperative__username) === String(user.username))
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
              Analytics Dashboard
            </h1>
            <p className="text-gray-600 text-lg">Track your cooperative's performance and insights</p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <StatCard icon={FaBox} label="My Products" value={userProducts.length} color="emerald" trend={5} />
          <StatCard icon={FaWarehouse} label="Total Stock" value={totalStock} color="blue" trend={12} />
          <StatCard icon={FiShoppingCart} label="Total Orders" value={totalOrders} color="purple" trend={8} />
          <StatCard
            icon={FaDollarSign}
            label="Avg Order Value"
            value={formatCurrency(avgOrderValue)}
            color="orange"
            trend={15}
          />
          <StatCard
            icon={FiCheckCircle}
            label="Fulfillment Rate"
            value={`${fulfillmentRate}%`}
            color="green"
            trend={3}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Order Status Breakdown" onExport={() => handleExport("Order Status")}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                  {statusData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Price Trend Analysis" onExport={() => handleExport("Price Trend")}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={priceTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
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
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "#10b981", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Sales Summary Report */}
        <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-emerald-200 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FiBarChart2 />
              Sales Summary Report
            </h3>
            <div className="flex items-center gap-2">
              {salesSummary && (
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors duration-200 text-white text-sm font-medium"
                  onClick={() =>
                    generateCooperativeSalesReportPDF(
                      { ...salesSummary, start_date: dateRange.start_date, end_date: dateRange.end_date },
                      user,
                      "cooperative_sales_report.pdf",
                    )
                  }
                >
                  <FiDownload size={16} />
                  Export PDF
                </button>
              )}
              <button
                type="button"
                className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200 text-white"
                onClick={() => setSalesSummaryOpen((open) => !open)}
                aria-label={salesSummaryOpen ? "Minimize sales summary" : "Expand sales summary"}
              >
                {salesSummaryOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
              </button>
            </div>
          </div>

          {salesSummaryOpen && (
            <div className="p-6 space-y-6">
              <form className="grid grid-cols-1 md:grid-cols-3 gap-4" onSubmit={handleSalesSummary}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <FiCalendar className="text-emerald-600" />
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    value={dateRange.start_date}
                    onChange={(e) => setDateRange({ ...dateRange, start_date: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <FiCalendar className="text-emerald-600" />
                    End Date
                  </label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    value={dateRange.end_date}
                    onChange={(e) => setDateRange({ ...dateRange, end_date: e.target.value })}
                    required
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    disabled={salesLoading}
                  >
                    {salesLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Loading...
                      </>
                    ) : (
                      <>
                        <FiActivity />
                        Get Summary
                      </>
                    )}
                  </button>
                </div>
              </form>

              {salesError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">{salesError}</div>
              )}

              {salesSummary && (
                <div className="space-y-6">
                  {/* Report Header Information */}
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <FiUsers className="text-emerald-600" />
                        <span className="font-semibold text-emerald-800">Cooperative:</span>
                        <span className="text-emerald-700">{user.username || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiCalendar className="text-emerald-600" />
                        <span className="font-semibold text-emerald-800">Period:</span>
                        <span className="text-emerald-700">
                          {dateRange.start_date} to {dateRange.end_date}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiFileText className="text-emerald-600" />
                        <span className="font-semibold text-emerald-800">Generated:</span>
                        <span className="text-emerald-700">{new Date().toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Top Products Table */}
                  {topProducts.length > 0 && (
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-3">
                        <h4 className="font-semibold text-white flex items-center gap-2">
                          <FaLeaf />
                          Top Products
                        </h4>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="min-w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Product
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Quantity Sold
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Revenue
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {topProducts.map((prod, idx) => (
                              <tr key={idx} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm text-gray-900">{prod.product__product_name}</td>
                                <td className="px-4 py-3 text-sm text-gray-900">{prod.quantity_sold}</td>
                                <td className="px-4 py-3 text-sm font-medium text-emerald-600">{prod.revenue}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Sales Trend Chart */}
                  {salesTrend.length > 0 && (
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                      <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <FiTrendingUp className="text-emerald-600" />
                        Sales Trend
                      </h4>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={salesTrend.map(item => ({ ...item, month: item.month ? `Month ${item.month}` : item.month }))}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                          <XAxis dataKey="month" stroke="#6b7280" />
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
                          <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="#10b981"
                            strokeWidth={3}
                            dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, stroke: "#10b981", strokeWidth: 2 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  )}

                  {/* Sales by Cooperative Table */}
                  {salesByCooperative.length > 0 && (
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mt-6">
                      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-3">
                        <h4 className="font-semibold text-white flex items-center gap-2">
                          <FiUsers />
                          Sales by Cooperative
                        </h4>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="min-w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cooperative</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Count</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {salesByCooperative.map((coop, idx) => (
                              <tr key={idx} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm text-gray-900">{coop.cooperative__username}</td>
                                <td className="px-4 py-3 text-sm text-gray-900">{coop.order_count}</td>
                                <td className="px-4 py-3 text-sm font-medium text-emerald-600">{coop.revenue}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Summary Statistics */}
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-3">
                      <h4 className="font-semibold text-white flex items-center gap-2">
                        <FiBarChart2 />
                        Summary Statistics
                      </h4>
                    </div>
                    <div className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(salesSummary)
                          .filter(([key]) => !["top_products", "sales_trend", "sales_by_cooperative"].includes(key))
                          .map(([key, value]) => (
                            <div
                              key={key}
                              className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                            >
                              <span className="font-medium text-gray-700 capitalize">
                                {key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                              </span>
                              <span className="text-gray-900 font-semibold">
                                {typeof value === "number" ? value.toLocaleString() : String(value)}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Collaborating Academies Table */}
        {myCoopAcademyCollab.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-emerald-200 overflow-hidden mt-8">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FiUsers />
                Collaborating Academies
              </h3>
            </div>
            <div className="overflow-x-auto p-6">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Academy</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Count</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Value (RWF)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {myCoopAcademyCollab.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{row.user__username}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{row.order_count}</td>
                      <td className="px-4 py-3 text-sm font-medium text-emerald-600">{row.total_value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Recent Orders Table */}
        <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-emerald-200 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 flex justify-between items-center">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
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
              <thead className="bg-emerald-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-emerald-800 uppercase tracking-wider flex items-center gap-2">
                    <FiFileText />
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-emerald-800 uppercase tracking-wider">
                    <FiCalendar className="inline mr-1" />
                    Created At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-emerald-800 uppercase tracking-wider">
                    <FiUsers className="inline mr-1" />
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-emerald-800 uppercase tracking-wider">
                    <FaLeaf className="inline mr-1" />
                    Product Name(s)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-emerald-800 uppercase tracking-wider">
                    <FiPackage className="inline mr-1" />
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-emerald-800 uppercase tracking-wider">
                    <FiActivity className="inline mr-1" />
                    Status
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-emerald-800 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentOrders.map((order, idx) => {
                  const { names, quantities } = getOrderProductsSummary(order)
                  return (
                    <tr key={order.id || idx} className="hover:bg-emerald-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {order.id?.toString().slice(-2) || "N/A"}
                          </div>
                          <span className="ml-3 text-sm font-medium text-gray-900">#{order.id || "N/A"}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.created_at ? new Date(order.created_at).toLocaleDateString() : "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {(order.user?.user || order.user?.username || order.user || "U").charAt(0).toUpperCase()}
                          </div>
                          <span className="ml-3 text-sm text-gray-900">
                            {order.user?.user || order.user?.username || order.user || "N/A"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{names}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{quantities}</td>
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
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <Link
                          to={`/orders/orderpage/${order.id}`}
                          className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-800 font-medium text-sm hover:bg-emerald-50 px-3 py-1 rounded-lg transition-all duration-200"
                        >
                          <FiEye size={14} />
                          View
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Loading overlay */}
        {productsLoading && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 shadow-2xl flex items-center gap-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
              <span className="text-lg text-emerald-600 font-medium">Loading analytics...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CopAnalytics
