import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiBarChart2, FiTrendingUp, FiShoppingCart, FiCheckCircle, FiDownload, FiPackage, FiFileText } from "react-icons/fi";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import { listProducts } from "../../Redux/Slices/product/product";
import { fetchUserReports } from '../../Redux/Slices/reports/report_slice';
import { Link } from "react-router-dom";

// Helper for currency formatting
const formatCurrency = (value) => value?.toLocaleString?.("en-US", { style: "currency", currency: "RWF" }) || value;

const COLORS = ["#34d399", "#60a5fa", "#fbbf24", "#f87171", "#a78bfa"];

const SummaryCard = ({ icon, label, value }) => (
  <div className="bg-white rounded-xl shadow-sm border p-6 flex flex-col items-center justify-center">
    <div className="text-3xl mb-2 text-blue-600">{icon}</div>
    <div className="text-2xl font-bold text-gray-800">{value}</div>
    <div className="text-sm text-gray-500">{label}</div>
  </div>
);

const CopAnalytics = () => {
  const dispatch = useDispatch();
  // Redux selectors
  const products = useSelector(state => state.product.products || []);
  const productsLoading = useSelector(state => state.product.loading);
  const orders = useSelector(state => state.order.orders || []);
  const priceTrends = useSelector(state => state.commodityTrend.predictions || []);
  const userId = useSelector(state => state.user.userId) || localStorage.getItem('user_id');
  const userReports = useSelector(state => state.reports.userReports || []);
  const reportsLoading = useSelector(state => state.reports.loading);
  const reportsError = useSelector(state => state.reports.error);

  useEffect(() => {
    dispatch(listProducts());
    dispatch(fetchUserReports());
  }, [dispatch]);

  // Filter products for the logged-in user
  const userProducts = products.filter((product) => {
    // product.user may be int or string, userId may be string
    return String(product.user) === String(userId);
  });

  // Top cards
  const totalStock = userProducts.reduce((sum, p) => sum + (p.quantity || 0), 0);
  const totalOrders = orders.length;
  const avgOrderValue = totalOrders ? (orders.reduce((sum, o) => sum + (o.total || 0), 0) / totalOrders) : 0;
  const fulfilledOrders = orders.filter(o => o.status === "delivered" || o.status === "completed").length;
  const fulfillmentRate = totalOrders ? ((fulfilledOrders / totalOrders) * 100).toFixed(1) : 0;

  // Order status breakdown for pie chart
  const statusCounts = orders.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1;
    return acc;
  }, {});
  const statusData = Object.entries(statusCounts).map(([status, count]) => ({ name: status, value: count }));

  // Price trend for line chart
  const priceTrendData = priceTrends.map(pt => ({
    month: pt.month_name || pt.month || "",
    price: pt.predicted_price || pt.price || 0,
  }));

  // Recent orders (latest 10)
  const recentOrders = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10);

  // Export handlers (stub)
  const handleExport = (section) => {
    alert(`Exporting ${section} report...`);
    // Implement actual export logic here
  };

  // Helper to get product names and quantities from order
  const getOrderProductsSummary = (order) => {
    if (!order.products || !Array.isArray(order.products)) return { names: "-", quantities: "-" };
    const names = order.products.map(item => item.product?.product_name || item.product || "").join(", ");
    const quantities = order.products.map(item => item.quantity).join(", ");
    return { names, quantities };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top: Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <SummaryCard icon={<FiPackage />} label="My Products" value={userProducts.length} />
          <SummaryCard icon={<FiBarChart2 />} label="Total Stock" value={totalStock} />
          <SummaryCard icon={<FiShoppingCart />} label="Total Orders" value={totalOrders} />
          <SummaryCard icon={<FiTrendingUp />} label="Avg Order Value" value={formatCurrency(avgOrderValue)} />
          <SummaryCard icon={<FiCheckCircle />} label="Fulfillment Rate" value={`${fulfillmentRate}%`} />
        </div>

        {/* Middle: Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Order Status Breakdown</h3>
              <button onClick={() => handleExport("Order Status")} className="text-blue-600 flex items-center gap-1">
                <FiDownload /> Export
              </button>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {statusData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Price Trend</h3>
              <button onClick={() => handleExport("Price Trend")} className="text-blue-600 flex items-center gap-1">
                <FiDownload /> Export
              </button>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={priceTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="price" stroke="#2563eb" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Reports Table */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center space-x-2 mb-4">
            <FiFileText className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-800">My Generated Reports</h3>
          </div>
          {reportsLoading && (
            <div className="flex items-center justify-center py-8"><FiDownload className="w-6 h-6 animate-spin text-purple-600 mr-2" /> Loading reports...</div>
          )}
          {reportsError && (
            <div className="text-red-600 py-4">{String(reportsError)}</div>
          )}
          {!reportsLoading && userReports && userReports.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-purple-50">
                    <th className="p-3 text-left text-xs font-medium text-purple-700 uppercase">Report Name</th>
                    <th className="p-3 text-left text-xs font-medium text-purple-700 uppercase">Created At</th>
                    <th className="p-3 text-left text-xs font-medium text-purple-700 uppercase">Status</th>
                    <th className="p-3 text-left text-xs font-medium text-purple-700 uppercase">File Size</th>
                    <th className="p-3 text-left text-xs font-medium text-purple-700 uppercase">Downloads</th>
                    <th className="p-3 text-center text-xs font-medium text-purple-700 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {userReports.map((report, idx) => {
                    const fileUrl = report.file_name ? `/media/reports/${report.file_name}` : null;
                    const clickable = !!fileUrl;
                    return (
                      <tr
                        key={report.id || idx}
                        className={`border-b transition-colors ${clickable ? 'hover:bg-purple-100 cursor-pointer' : ''}`}
                        onClick={clickable ? () => window.open(fileUrl, '_blank', 'noopener,noreferrer') : undefined}
                        tabIndex={clickable ? 0 : -1}
                        aria-label={clickable ? `Open report ${report.configuration_name || report.id}` : undefined}
                        style={clickable ? { outline: 'none' } : {}}
                      >
                        <td className="p-3 font-semibold text-purple-900">{report.configuration_name || `Report #${report.id}`}</td>
                        <td className="p-3 text-purple-700">{report.generated_at ? new Date(report.generated_at).toLocaleString() : '-'}</td>
                        <td className="p-3 text-purple-700 capitalize">{report.status || 'Ready'}</td>
                        <td className="p-3 text-purple-700">{report.file_size ? `${report.file_size} bytes` : '-'}</td>
                        <td className="p-3 text-purple-700">{report.download_count ?? 0}</td>
                        <td className="p-3 text-center">
                          {fileUrl ? (
                            <a
                              href={fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-medium transition-colors duration-200 inline-flex items-center gap-2"
                              onClick={e => e.stopPropagation()}
                              aria-label={`Download report ${report.configuration_name || report.id}`}
                            >
                              <FiDownload className="w-4 h-4" /> Download
                            </a>
                          ) : (
                            <span className="text-gray-400">N/A</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            !reportsLoading && <div className="text-gray-500 py-4">No reports found.</div>
          )}
        </div>

        {/* Bottom: Recent Orders Table */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
            <button onClick={() => handleExport("Recent Orders")} className="text-blue-600 flex items-center gap-1">
              <FiDownload /> Export
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                  <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Created At</th>
                  <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                  <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Product Name(s)</th>
                  <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                  <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="p-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, idx) => {
                  const { names, quantities } = getOrderProductsSummary(order);
                  return (
                    <tr key={order.id || idx} className="border-b hover:bg-gray-50">
                      <td className="p-3">{order.id || "N/A"}</td>
                      <td className="p-3">{order.created_at ? new Date(order.created_at).toLocaleDateString() : "N/A"}</td>
                      <td className="p-3">{order.user?.user || order.user?.username || order.user || "N/A"}</td>
                      <td className="p-3">{names}</td>
                      <td className="p-3">{quantities}</td>
                      <td className="p-3 capitalize">{order.status}</td>
                      <td className="p-3 text-center">
                        <Link to={`/orders/orderpage/${order.id}`} className="text-green-600 hover:text-green-800 font-medium underline flex items-center gap-1">
                          View
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Loading overlay for products */}
        {productsLoading && (
          <div className="fixed inset-0 bg-white bg-opacity-60 flex items-center justify-center z-50">
            <div className="text-lg text-blue-600">Loading products...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CopAnalytics;