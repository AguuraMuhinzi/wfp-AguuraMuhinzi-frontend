import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAcademyFinancialReport, fetchProductDemandReport, fetchAcademyCooperativeCollaboration } from '../../Redux/Slices/reports/report_slice';
import { FiTrendingUp, FiTrendingDown, FiShoppingCart, FiUsers, FiPackage, FiDownload, FiPlus } from 'react-icons/fi';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AcadOverview = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.user.userInfo) || {};
  const academyFinancial = useSelector(state => state.reports.academyFinancialReport) || {};
  const productDemand = useSelector(state => state.reports.productDemandReport) || [];
  const coopCollab = useSelector(state => state.reports.academyCoopCollaboration) || [];
  const orders = useSelector(state => state.order.orders) || [];
  const loading = useSelector(state => state.reports.loading);

  useEffect(() => {
    if (!academyFinancial.total_spend) dispatch(fetchAcademyFinancialReport({ academy_id: userInfo.academy_id || userInfo.id, start_date: '', end_date: '' }));
    if (!Array.isArray(productDemand) || productDemand.length === 0) dispatch(fetchProductDemandReport({ start_date: '', end_date: '' }));
    if (!Array.isArray(coopCollab) || coopCollab.length === 0) dispatch(fetchAcademyCooperativeCollaboration({ start_date: '', end_date: '' }));
    // Optionally: dispatch(fetchOrders()) if not already loaded
  }, [dispatch, userInfo]);

  // Summary cards
  const totalSpend = academyFinancial.total_spend || 0;
  const orderCount = academyFinancial.order_count || 0;
  const avgOrderValue = academyFinancial.avg_order_value || 0;
  const activeCoops = Array.isArray(coopCollab) ? coopCollab.length : 0;
  const mostOrderedProduct = Array.isArray(productDemand) && productDemand.length > 0 ? productDemand[0].product__product_name : 'N/A';

  // Spend trend data
  const spendTrend = academyFinancial.spend_trend || [];

  // Recent orders
  const recentOrders = Array.isArray(orders) ? orders.slice(-5).reverse() : [];

  // Top cooperatives
  const topCoops = Array.isArray(coopCollab) ? coopCollab.slice(0, 5) : [];

  // Top products
  const topProducts = Array.isArray(productDemand) ? productDemand.slice(0, 5) : [];

  // Smart insights
  const spendChange = spendTrend.length > 1 ? ((spendTrend[spendTrend.length-1].monthly_spend - spendTrend[0].monthly_spend) / spendTrend[0].monthly_spend) * 100 : 0;
  const spendTrendDirection = spendChange > 0 ? 'up' : spendChange < 0 ? 'down' : 'flat';

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
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

      {/* Spend Trend Chart/Table */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Spend Trend by Month</h3>
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
              <Tooltip formatter={(value) => value?.toLocaleString?.() + ' RWF'} />
              <Area type="monotone" dataKey="monthly_spend" stroke="#3b82f6" fillOpacity={1} fill="url(#colorSpend)" name="Monthly Spend" />
            </AreaChart>
          </ResponsiveContainer>
        ) : <p className="text-gray-500">No spend trend data.</p>}
      </div>

      {/* Top Products Table */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Products</h3>
        {topProducts.length > 0 ? (
          <table className="min-w-full text-sm border rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Product</th>
                <th className="p-2 text-left">Total Quantity</th>
                <th className="p-2 text-left">Total Revenue (RWF)</th>
                <th className="p-2 text-left">Order Count</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((row, idx) => (
                <tr key={idx} className="border-b">
                  <td className="p-2">{row.product__product_name}</td>
                  <td className="p-2">{row.total_quantity}</td>
                  <td className="p-2">{row.total_revenue}</td>
                  <td className="p-2">{row.order_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : <p className="text-gray-500">No product demand data.</p>}
      </div>

      {/* Top Cooperatives Table */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Cooperatives</h3>
        {topCoops.length > 0 ? (
          <table className="min-w-full text-sm border rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Cooperative</th>
                <th className="p-2 text-left">Order Count</th>
                <th className="p-2 text-left">Total Value (RWF)</th>
              </tr>
            </thead>
            <tbody>
              {topCoops.map((row, idx) => (
                <tr key={idx} className="border-b">
                  <td className="p-2">{row.cooperative__username}</td>
                  <td className="p-2">{row.order_count}</td>
                  <td className="p-2">{row.total_value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : <p className="text-gray-500">No cooperative collaboration data.</p>}
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h3>
        {recentOrders.length > 0 ? (
          <table className="min-w-full text-sm border rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Products</th>
                <th className="p-2 text-left">Quantity</th>
                <th className="p-2 text-left">Total Value (RWF)</th>
                <th className="p-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, idx) => (
                <tr key={idx} className="border-b">
                  <td className="p-2">{order.date || order.created_at || '-'}</td>
                  <td className="p-2">{order.products ? order.products.map(p => p.product?.product_name || p.product).join(', ') : '-'}</td>
                  <td className="p-2">{order.products ? order.products.map(p => p.quantity).join(', ') : '-'}</td>
                  <td className="p-2">{order.total || '-'}</td>
                  <td className="p-2">{order.status || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : <p className="text-gray-500">No recent orders.</p>}
      </div>

      {/* Smart Insights */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border border-blue-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Smart Insights</h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>
            Spend trend is <span className={spendTrendDirection === 'up' ? 'text-green-600' : spendTrendDirection === 'down' ? 'text-red-600' : 'text-gray-600'}>{spendTrendDirection}</span> {spendChange !== 0 && `(${spendChange.toFixed(1)}%)`} compared to previous period.
          </li>
          <li>
            Most ordered product: <span className="font-semibold text-blue-700">{mostOrderedProduct}</span>
          </li>
          <li>
            You have worked with <span className="font-semibold text-purple-700">{activeCoops}</span> cooperatives recently.
          </li>
        </ul>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4 mt-6">
        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2"><FiPlus /> Place New Order</button>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2"><FiDownload /> Download Financial Report</button>
        <button className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2"><FiShoppingCart /> View All Orders</button>
      </div>
    </div>
  );
};

export default AcadOverview;
