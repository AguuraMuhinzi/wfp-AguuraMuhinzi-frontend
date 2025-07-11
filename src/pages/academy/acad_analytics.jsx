import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts';
import { FiTrendingUp, FiShoppingCart, FiUsers, FiPackage, FiDownload, FiPieChart, FiBarChart2 } from 'react-icons/fi';

const COLORS = ['#3b82f6', '#34d399', '#fbbf24', '#f87171', '#a78bfa', '#6366f1', '#f472b6'];

const SummaryCards = ({ totalSpend, orderCount, avgOrderValue, activeCoops, mostOrderedProduct }) => (
  <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
    <div className="bg-white rounded-xl shadow-sm border p-6 flex flex-col items-center justify-center">
      <FiDownload className="text-3xl mb-2 text-blue-600" />
      <div className="text-2xl font-bold text-gray-800">{totalSpend.toLocaleString()} RWF</div>
      <div className="text-sm text-gray-500">Total Spend</div>
    </div>
    <div className="bg-white rounded-xl shadow-sm border p-6 flex flex-col items-center justify-center">
      <FiShoppingCart className="text-3xl mb-2 text-green-600" />
      <div className="text-2xl font-bold text-gray-800">{orderCount}</div>
      <div className="text-sm text-gray-500">Order Count</div>
    </div>
    <div className="bg-white rounded-xl shadow-sm border p-6 flex flex-col items-center justify-center">
      <FiTrendingUp className="text-3xl mb-2 text-yellow-600" />
      <div className="text-2xl font-bold text-gray-800">{avgOrderValue.toLocaleString()} RWF</div>
      <div className="text-sm text-gray-500">Avg Order Value</div>
    </div>
    <div className="bg-white rounded-xl shadow-sm border p-6 flex flex-col items-center justify-center">
      <FiUsers className="text-3xl mb-2 text-purple-600" />
      <div className="text-2xl font-bold text-gray-800">{activeCoops}</div>
      <div className="text-sm text-gray-500">Active Cooperatives</div>
    </div>
    <div className="bg-white rounded-xl shadow-sm border p-6 flex flex-col items-center justify-center">
      <FiPackage className="text-3xl mb-2 text-pink-600" />
      <div className="text-2xl font-bold text-gray-800">{mostOrderedProduct}</div>
      <div className="text-sm text-gray-500">Most Ordered Product</div>
    </div>
  </div>
);

const ExportButtons = () => (
  <div className="flex gap-4 mb-6">
    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2"><FiDownload /> Export PDF</button>
    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2"><FiDownload /> Export CSV</button>
  </div>
);

const AcadAnalytics = () => {
  const academyFinancial = useSelector(state => state.reports.academyFinancialReport) || {};
  const productDemand = useSelector(state => state.reports.productDemandReport) || [];
  const coopCollab = useSelector(state => state.reports.academyCoopCollaboration) || [];
  const orders = useSelector(state => state.order.orders) || [];

  // Summary values
  const totalSpend = academyFinancial.total_spend || 0;
  const orderCount = academyFinancial.order_count || 0;
  const avgOrderValue = academyFinancial.avg_order_value || 0;
  const activeCoops = Array.isArray(coopCollab) ? coopCollab.length : 0;
  const mostOrderedProduct = Array.isArray(productDemand) && productDemand.length > 0 ? productDemand[0].product__product_name : 'N/A';

  // Spend trend
  const spendTrend = academyFinancial.spend_trend || [];

  // Order volume trend (orders per month)
  const orderVolumeData = useMemo(() => {
    if (!Array.isArray(orders)) return [];
    const monthMap = {};
    orders.forEach(order => {
      if (!order.created_at) return;
      const date = new Date(order.created_at);
      const month = date.toLocaleString('default', { month: 'short', year: '2-digit' });
      monthMap[month] = (monthMap[month] || 0) + 1;
    });
    return Object.entries(monthMap).map(([month, count]) => ({ month, count })).sort((a, b) => new Date('01 ' + a.month) - new Date('01 ' + b.month));
  }, [orders]);

  // Most ordered products (bar chart)
  const topProducts = Array.isArray(productDemand) ? productDemand.slice(0, 7) : [];
  const productBarData = topProducts.map(row => ({
    name: row.product__product_name,
    quantity: row.total_quantity
  }));

  // Order status breakdown (pie chart)
  const statusCounts = useMemo(() => {
    if (!Array.isArray(orders)) return {};
    return orders.reduce((acc, o) => {
      acc[o.status] = (acc[o.status] || 0) + 1;
      return acc;
    }, {});
  }, [orders]);
  const statusData = Object.entries(statusCounts).map(([name, value]) => ({ name, value }));

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <SummaryCards
        totalSpend={totalSpend}
        orderCount={orderCount}
        avgOrderValue={avgOrderValue}
        activeCoops={activeCoops}
        mostOrderedProduct={mostOrderedProduct}
      />
      <ExportButtons />
      {/* Spend Trend Area Chart */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2"><FiBarChart2 /> Monthly Spend Trend</h3>
        {spendTrend.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={spendTrend} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={value => value?.toLocaleString?.() + ' RWF'} />
              <Area type="monotone" dataKey="monthly_spend" stroke="#3b82f6" fillOpacity={1} fill="url(#colorSpend)" name="Monthly Spend" />
            </AreaChart>
          </ResponsiveContainer>
        ) : <p className="text-gray-500">No spend trend data.</p>}
      </div>
      {/* Order Volume Bar Chart */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2"><FiBarChart2 /> Order Volume Trend</h3>
        {orderVolumeData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={orderVolumeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#34d399" name="Order Count" />
            </BarChart>
          </ResponsiveContainer>
        ) : <p className="text-gray-500">No order volume data.</p>}
      </div>
      {/* Most Ordered Products Bar Chart */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2"><FiBarChart2 /> Most Ordered Products</h3>
        {productBarData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productBarData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="quantity" fill="#fbbf24" name="Quantity Ordered" />
            </BarChart>
          </ResponsiveContainer>
        ) : <p className="text-gray-500">No product demand data.</p>}
      </div>
      {/* Order Status Pie Chart */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2"><FiPieChart /> Order Status Breakdown</h3>
        {statusData.length > 0 ? (
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
        ) : <p className="text-gray-500">No order status data.</p>}
      </div>
    </div>
  );
};

export default AcadAnalytics;
