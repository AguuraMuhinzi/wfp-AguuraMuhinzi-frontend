// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from 'recharts';
// import {
//   FiBarChart2, FiTrendingUp, FiShoppingCart, FiCheckCircle, FiZap, FiCloud, FiPackage, FiInfo, FiActivity, FiAlertTriangle, FiTarget, FiDollarSign, FiCalendar, FiMinus, FiTrendingDown as FiTrendDown, FiRefreshCw, FiAlertCircle
// } from 'react-icons/fi';
// import { listProducts } from '../../Redux/Slices/product/product';
// import { fetchCommodityTrend } from '../../Redux/Slices/predictions/harvest_plan';
// import { fetchOrders } from '../../Redux/Slices/order/orderSlice';
// import { fetchUserPredictions } from '../../Redux/Slices/predictions/price_prediction';

// // Commodity options (from plan.jsx)
// const commodityOptions = [
//   'Maize', 'Rice', 'Beans', 'Irish Potatoes', 'Tomatoes', 'Onions', 'Bananas', 'Avocados', 'Oil', 'Salt'
// ];

// // Helper functions (from plan.jsx)
// const getInsightIcon = (type) => {
//   switch (type) {
//     case 'bullish': return <FiTrendingUp className="w-5 h-5" />;
//     case 'bearish': return <FiTrendDown className="w-5 h-5" />;
//     case 'warning': return <FiAlertTriangle className="w-5 h-5" />;
//     case 'timing': return <FiCalendar className="w-5 h-5" />;
//     case 'storage': return <FiPackage className="w-5 h-5" />;
//     case 'stable': return <FiCheckCircle className="w-5 h-5" />;
//     case 'risk': return <FiAlertCircle className="w-5 h-5" />;
//     default: return <FiInfo className="w-5 h-5" />;
//   }
// };
// const getInsightColorClasses = (color, urgency) => {
//   const baseClasses = 'border-l-4 rounded-lg p-4 shadow-sm';
//   const urgencyClasses = urgency === 'high' ? 'shadow-md' : urgency === 'medium' ? 'shadow' : 'shadow-sm';
//   switch (color) {
//     case 'green': return `${baseClasses} ${urgencyClasses} bg-green-50 border-green-400 text-green-800`;
//     case 'red': return `${baseClasses} ${urgencyClasses} bg-red-50 border-red-400 text-red-800`;
//     case 'yellow': return `${baseClasses} ${urgencyClasses} bg-yellow-50 border-yellow-400 text-yellow-800`;
//     case 'blue': return `${baseClasses} ${urgencyClasses} bg-blue-50 border-blue-400 text-blue-800`;
//     case 'orange': return `${baseClasses} ${urgencyClasses} bg-orange-50 border-orange-400 text-orange-800`;
//     case 'purple': return `${baseClasses} ${urgencyClasses} bg-purple-50 border-purple-400 text-purple-800`;
//     case 'gray': return `${baseClasses} ${urgencyClasses} bg-gray-50 border-gray-400 text-gray-800`;
//     default: return `${baseClasses} ${urgencyClasses} bg-blue-50 border-blue-400 text-blue-800`;
//   }
// };
// const getTrendIcon = (trend) => {
//   if (!trend || typeof trend !== 'string') return <FiMinus className="w-5 h-5 text-gray-500" />;
//   const trendLower = trend.toLowerCase();
//   if (trendLower.includes('increasing') || trendLower.includes('rising')) return <FiTrendingUp className="w-5 h-5 text-green-500" />;
//   if (trendLower.includes('decreasing') || trendLower.includes('falling')) return <FiTrendDown className="w-5 h-5 text-red-500" />;
//   return <FiMinus className="w-5 h-5 text-yellow-500" />;
// };
// const getTrendColor = (trend) => {
//   if (!trend || typeof trend !== 'string') return 'text-gray-600';
//   const trendLower = trend.toLowerCase();
//   if (trendLower.includes('increasing') || trendLower.includes('rising')) return 'text-green-600';
//   if (trendLower.includes('decreasing') || trendLower.includes('falling')) return 'text-red-600';
//   return 'text-yellow-600';
// };

// const LoadingSpinner = () => (
//   <div className="flex items-center justify-center py-12">
//     <FiRefreshCw className="w-8 h-8 text-green-600 animate-spin mr-3" />
//     <span className="text-gray-600 text-lg">Analyzing market trends...</span>
//   </div>
// );

// const ErrorMessage = ({ message }) => (
//   <div className="text-center py-12">
//     <FiAlertCircle className="w-16 h-16 mx-auto mb-4 text-red-400" />
//     <p className="text-red-600 text-lg mb-4">{message}</p>
//   </div>
// );

// // --- Smart Insights logic (reuse from plan.jsx) ---
// function generateSmartInsights(predictions, trendAnalysis, commodityName) {
//   if (!predictions || predictions.length === 0 || !trendAnalysis) return [];
//   const insights = [];
//   const currentPrice = predictions[0]?.predicted_price || 0;
//   const futurePrice = predictions[predictions.length - 1]?.predicted_price || 0;
//   const priceChange = ((futurePrice - currentPrice) / currentPrice) * 100;
//   const volatility = trendAnalysis.volatility && typeof trendAnalysis.volatility === 'string' ? trendAnalysis.volatility.toLowerCase() : '';
//   const trend = trendAnalysis.trend && typeof trendAnalysis.trend === 'string' ? trendAnalysis.trend.toLowerCase() : '';
//   if (priceChange > 10) {
//     insights.push({
//       type: 'bullish',
//       icon: '📈',
//       title: 'Strong Price Growth Expected',
//       message: `The price of ${commodityName.toLowerCase()} is expected to increase by ${Math.abs(priceChange).toFixed(1)}% in the next 3 months. Consider holding stocks for better returns.`,
//       color: 'green',
//       urgency: 'high',
//       action: 'Hold & Store',
//     });
//   } else if (priceChange > 5) {
//     insights.push({
//       type: 'positive',
//       icon: '✅',
//       title: 'Moderate Price Increase',
//       message: `${commodityName} prices are projected to rise by ${Math.abs(priceChange).toFixed(1)}%. Good time to store produce if you have storage facilities.`,
//       color: 'green',
//       urgency: 'medium',
//       action: 'Consider Storage',
//     });
//   }
//   if (priceChange < -8) {
//     insights.push({
//       type: 'bearish',
//       icon: '📉',
//       title: 'Price Decline Expected',
//       message: `The price of ${commodityName.toLowerCase()} is expected to decrease by ${Math.abs(priceChange).toFixed(1)}%. It might be better to sell now before prices drop further.`,
//       color: 'red',
//       urgency: 'high',
//       action: 'Sell Now',
//     });
//   } else if (priceChange < -3) {
//     insights.push({
//       type: 'caution',
//       icon: '⚠️',
//       title: 'Slight Price Decline',
//       message: `${commodityName} prices may drop by ${Math.abs(priceChange).toFixed(1)}%. Consider selling soon or wait for market recovery.`,
//       color: 'yellow',
//       urgency: 'medium',
//       action: 'Monitor Closely',
//     });
//   }
//   if (volatility && volatility.includes('high')) {
//     insights.push({
//       type: 'warning',
//       icon: '⚠️',
//       title: 'High Market Volatility',
//       message: `${commodityName} prices show high volatility. Stay alert for sharp market shifts and be ready to act quickly.`,
//       color: 'orange',
//       urgency: 'high',
//       action: 'Stay Alert',
//     });
//   }
//   if (priceChange > 5 && volatility && volatility.includes('low')) {
//     insights.push({
//       type: 'storage',
//       icon: '🏪',
//       title: 'Storage Opportunity',
//       message: `With rising prices and low volatility, investing in storage for ${commodityName.toLowerCase()} could yield ${Math.abs(priceChange).toFixed(1)}% returns.`,
//       color: 'purple',
//       urgency: 'medium',
//       action: 'Invest in Storage',
//     });
//   }
//   if (volatility && volatility.includes('low') && Math.abs(priceChange) < 3) {
//     insights.push({
//       type: 'stable',
//       icon: '📊',
//       title: 'Stable Market Conditions',
//       message: `${commodityName} market shows stability with minimal price fluctuations. Good for consistent planning and contracts.`,
//       color: 'gray',
//       urgency: 'low',
//       action: 'Plan Long-term',
//     });
//   }
//   if (volatility && volatility.includes('high') && Math.abs(priceChange) > 10) {
//     insights.push({
//       type: 'risk',
//       icon: '🚨',
//       title: 'High Risk Market',
//       message: `${commodityName} shows both high volatility and significant price changes. Consider diversifying your crops to reduce risk.`,
//       color: 'red',
//       urgency: 'high',
//       action: 'Diversify Portfolio',
//     });
//   }
//   if (insights.length === 0) {
//     insights.push({
//       type: 'stable',
//       icon: '📊',
//       title: 'Market Analysis Available',
//       message: `${commodityName} market data is available for analysis. Monitor trends regularly for better decision making.`,
//       color: 'gray',
//       urgency: 'low',
//       action: 'Monitor Trends',
//     });
//   }
//   return insights.slice(0, 4);
// }

// // --- Price Chart for Insights ---
// const InsightsPriceChart = ({ data, commodity }) => {
//   if (!data || data.length === 0) return null;
//   return (
//     <div className="bg-white rounded-lg border p-6 mt-6">
//       <h4 className="text-lg font-semibold mb-4 text-gray-800">{commodity} Price Forecast (Next 3 Months)</h4>
//       <ResponsiveContainer width="100%" height={350}>
//         <LineChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="month_name" />
//           <YAxis domain={["dataMin - 100", "dataMax + 100"]} />
//           <Tooltip />
//           <Line type="monotone" dataKey="predicted_price" stroke="#2563EB" strokeWidth={3} name="Predicted Price (RWF)" dot={{ fill: "#2563EB", strokeWidth: 2, r: 5 }} />
//           <Line type="monotone" dataKey="lower_bound" stroke="#10B981" strokeDasharray="4 4" strokeWidth={2} name="Lower Bound" />
//           <Line type="monotone" dataKey="upper_bound" stroke="#EF4444" strokeDasharray="4 4" strokeWidth={2} name="Upper Bound" />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// const SummaryCard = ({ icon, label, value }) => (
//   <div className="bg-white rounded-xl shadow-sm border p-6 flex flex-col items-center justify-center">
//     <div className="text-3xl mb-2 text-blue-600">{icon}</div>
//     <div className="text-2xl font-bold text-gray-800">{value}</div>
//     <div className="text-sm text-gray-500">{label}</div>
//   </div>
// );

// const WeatherWidget = () => (
//   <div className="bg-blue-50 rounded-xl shadow-sm border p-6 flex flex-col items-center justify-center">
//     <div className="flex items-center gap-2 mb-2">
//       <FiCloud className="text-3xl text-blue-400" />
//       <span className="text-2xl font-bold text-blue-700">23°C</span>
//     </div>
//     <div className="text-lg text-blue-800 font-semibold">Kigali</div>
//     <div className="text-sm text-blue-500">Partly Cloudy</div>
//   </div>
// );

// function getOrdersLast7DaysData(orders) {
//   const today = new Date();
//   const days = [];
//   for (let i = 6; i >= 0; i--) {
//     const d = new Date(today);
//     d.setDate(today.getDate() - i);
//     days.push(d);
//   }
//   // Format: [{date: 'YYYY-MM-DD', count: N}]
//   const data = days.map(day => {
//     const dateStr = day.toISOString().slice(0, 10);
//     const count = orders.filter(o => {
//       const orderDate = o.created_at ? o.created_at.slice(0, 10) : '';
//       return orderDate === dateStr;
//     }).length;
//     return { date: dateStr, count };
//   });
//   return data;
// }

// const OverviewDashboard = () => {
//   const dispatch = useDispatch();
//   const products = useSelector(state => state.product.products || []);
//   const productsLoading = useSelector(state => state.product.loading);
//   const orders = useSelector(state => state.order.orders || []);
//   const predictions = useSelector(state => state.prediction.predictions || []);
//   const predictionsLoading = useSelector(state => state.prediction.loading);
//   const predictionsError = useSelector(state => state.prediction.error);
//   const userId = useSelector(state => state.user.userId) || localStorage.getItem('user_id');

//   useEffect(() => {
//     dispatch(listProducts());
//     dispatch(fetchOrders());
//     dispatch(fetchUserPredictions());
//   }, [dispatch]);

//   // Filter products for the logged-in user
//   const userProducts = products.filter((product) => String(product.user) === String(userId));
//   const totalStock = userProducts.reduce((sum, p) => sum + (p.quantity || 0), 0);
//   const totalOrders = orders.length;
//   const avgOrderValue = totalOrders ? (orders.reduce((sum, o) => sum + (o.total || 0), 0) / totalOrders) : 0;
//   const fulfilledOrders = orders.filter(o => o.status === 'delivered' || o.status === 'completed').length;
//   const fulfillmentRate = totalOrders ? ((fulfilledOrders / totalOrders) * 100).toFixed(1) : 0;

//   // Product bar chart data
//   const productBarData = userProducts.map(p => ({ name: p.product_name || p.name, quantity: p.quantity || 0 }));

//   // Recent orders (latest 5)
//   const recentOrders = [...orders].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5);
//   const getOrderProductsSummary = (order) => {
//     if (!order.products || !Array.isArray(order.products)) return { names: '-', quantities: '-' };
//     const names = order.products.map(item => item.product?.product_name || item.product || '').join(', ');
//     const quantities = order.products.map(item => item.quantity).join(', ');
//     return { names, quantities };
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
//       <div className="max-w-7xl mx-auto space-y-8">
//         {/* Weather Widget at the top */}
//         <div className="mb-6">
//           <WeatherWidget />
//         </div>
//         {/* Summary Cards (5 columns) */}
//         <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
//           <SummaryCard icon={<FiPackage />} label="My Products" value={userProducts.length} />
//           <SummaryCard icon={<FiBarChart2 />} label="Total Stock" value={totalStock} />
//           <SummaryCard icon={<FiShoppingCart />} label="Total Orders" value={totalOrders} />
//           <SummaryCard icon={<FiTrendingUp />} label="Avg Order Value" value={avgOrderValue.toLocaleString('en-US', { style: 'currency', currency: 'RWF' })} />
//           <SummaryCard icon={<FiCheckCircle />} label="Fulfillment Rate" value={`${fulfillmentRate}%`} />
//         </div>
//         {/* Recent User Predictions (show only 3) */}
//         <div className="bg-white rounded-xl shadow-sm border p-6">
//           <div className="flex items-center space-x-2 mb-4">
//             <FiBarChart2 className="w-5 h-5 text-blue-600" />
//             <h3 className="text-lg font-semibold text-gray-800">Recent Predictions</h3>
//           </div>
//           {predictionsLoading && (
//             <div className="flex items-center justify-center py-8"><FiRefreshCw className="w-6 h-6 animate-spin text-blue-600 mr-2" /> Loading predictions...</div>
//           )}
//           {predictionsError && (
//             <div className="text-red-600 py-4">{String(predictionsError)}</div>
//           )}
//           {!predictionsLoading && predictions && predictions.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {predictions.slice(0, 3).map((pred, idx) => (
//                 <div key={pred.id || idx} className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-sm">
//                   <div className="flex items-center gap-2 mb-2">
//                     <FiBarChart2 className="w-5 h-5 text-blue-600" />
//                     <span className="font-semibold text-blue-800">{pred.commodity}</span>
//                   </div>
//                   <div className="text-sm text-gray-700 mb-1"><strong>Market:</strong> {pred.market || pred.district || '-'}</div>
//                   <div className="text-sm text-gray-700 mb-1"><strong>Predicted Price:</strong> {pred.predicted_price?.toLocaleString() || pred.price?.toLocaleString() || '-'} RWF</div>
//                   <div className="text-xs text-gray-500 mb-1">Range: {pred.lower_bound?.toLocaleString() || '-'} - {pred.upper_bound?.toLocaleString() || '-'} RWF</div>
//                   <div className="text-xs text-gray-400">{pred.created_at ? new Date(pred.created_at).toLocaleString() : ''}</div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             !predictionsLoading && <div className="text-gray-500 py-4">No predictions found.</div>
//           )}
//         </div>
//         {/* Orders in last 7 days bar chart */}
//         <div className="bg-white rounded-xl shadow-sm border p-6">
//           <div className="flex items-center space-x-2 mb-4">
//             <FiBarChart2 className="w-5 h-5 text-green-600" />
//             <h3 className="text-lg font-semibold text-gray-800">Orders in the Last 7 Days</h3>
//           </div>
//           <ResponsiveContainer width="100%" height={250}>
//             <BarChart data={getOrdersLast7DaysData(orders)}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="date" />
//               <YAxis allowDecimals={false} />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="count" fill="#2563eb" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//         {/* Product Bar Chart */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="col-span-2 bg-white rounded-xl shadow-sm border p-6">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Product Stock Overview</h3>
//             <ResponsiveContainer width="100%" height={250}>
//               <BarChart data={productBarData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="quantity" fill="#34d399" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//           {/* Empty cell for layout balance */}
//           <div></div>
//         </div>
//         {/* Recent Orders Table */}
//         <div className="bg-white rounded-xl shadow-sm border p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="min-w-full">
//               <thead>
//                 <tr className="bg-gray-50">
//                   <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
//                   <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Created At</th>
//                   <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
//                   <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Product Name(s)</th>
//                   <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
//                   <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//                   <th className="p-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {recentOrders.map((order, idx) => {
//                   const { names, quantities } = getOrderProductsSummary(order);
//                   return (
//                     <tr key={order.id || idx} className="border-b hover:bg-gray-50">
//                       <td className="p-3">{order.id || 'N/A'}</td>
//                       <td className="p-3">{order.created_at ? new Date(order.created_at).toLocaleDateString() : 'N/A'}</td>
//                       <td className="p-3">{order.user?.user || order.user?.username || order.user || 'N/A'}</td>
//                       <td className="p-3">{names}</td>
//                       <td className="p-3">{quantities}</td>
//                       <td className="p-3 capitalize">{order.status}</td>
//                       <td className="p-3 text-center">
//                         <Link to={`/orders/orderpage/${order.id}`} className="text-green-600 hover:text-green-800 font-medium underline flex items-center gap-1">
//                           View
//                         </Link>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>
//         {/* Loading overlay for products */}
//         {productsLoading && (
//           <div className="fixed inset-0 bg-white bg-opacity-60 flex items-center justify-center z-50">
//             <div className="text-lg text-blue-600">Loading products...</div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OverviewDashboard;


"use client"

import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import {
  FiBarChart2,
  FiTrendingUp,
  FiShoppingCart,
  FiCheckCircle,
  FiPackage,
  FiTrendingDown as FiTrendDown,
  FiAlertCircle,
  FiSun,
  FiDroplet,
  FiWind,
  FiEye,
  FiDollarSign,
  FiUsers,
  FiActivity,
} from "react-icons/fi"
import { listProducts } from "../../Redux/Slices/product/product"
import { fetchOrders } from "../../Redux/Slices/order/orderSlice"
import { fetchUserPredictions } from "../../Redux/Slices/predictions/price_prediction"

// Commodity options
const commodityOptions = [
  "Maize",
  "Rice",
  "Beans",
  "Irish Potatoes",
  "Tomatoes",
  "Onions",
  "Bananas",
  "Avocados",
  "Oil",
  "Salt",
]

// Color palette for charts
const COLORS = ["#10B981", "#059669", "#047857", "#065F46", "#064E3B", "#0D9488", "#0F766E", "#115E59"]

const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-12">
    <div className="relative">
      <div className="w-12 h-12 rounded-full border-4 border-emerald-200"></div>
      <div className="w-12 h-12 rounded-full border-4 border-emerald-600 border-t-transparent animate-spin absolute top-0 left-0"></div>
    </div>
    <span className="text-emerald-600 text-lg ml-4 font-medium">Analyzing market trends...</span>
  </div>
)

const ErrorMessage = ({ message }) => (
  <div className="text-center py-12">
    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
      <FiAlertCircle className="w-8 h-8 text-red-500" />
    </div>
    <p className="text-red-600 text-lg mb-4 font-medium">{message}</p>
  </div>
)

const SummaryCard = ({ icon, label, value, trend, color = "emerald" }) => {
  const colorClasses = {
    emerald: "from-emerald-500 to-emerald-600 text-emerald-600",
    teal: "from-teal-500 to-teal-600 text-teal-600",
    green: "from-green-500 to-green-600 text-green-600",
    blue: "from-blue-500 to-blue-600 text-blue-600",
    purple: "from-purple-500 to-purple-600 text-purple-600",
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-emerald-100 p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]} text-white shadow-lg`}>{icon}</div>
        {trend && (
          <div
            className={`flex items-center gap-1 text-sm font-semibold ${trend > 0 ? "text-emerald-600" : "text-red-500"}`}
          >
            {trend > 0 ? <FiTrendingUp className="w-4 h-4" /> : <FiTrendDown className="w-4 h-4" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div className="space-y-1">
        <div className="text-3xl font-bold text-gray-800">{value}</div>
        <div className="text-sm text-gray-600 font-medium">{label}</div>
      </div>
    </div>
  )
}

const WeatherWidget = () => (
  <div className="bg-gradient-to-br from-emerald-400 via-teal-500 to-green-500 rounded-2xl shadow-xl border border-emerald-200 p-6 text-white relative overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <FiSun className="text-2xl" />
          </div>
          <div>
            <div className="text-2xl font-bold">23°C</div>
            <div className="text-sm opacity-90">Feels like 25°C</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-semibold">Kigali</div>
          <div className="text-sm opacity-90">Partly Cloudy</div>
        </div>
      </div>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-1">
          <FiDroplet className="w-4 h-4" />
          <span>65%</span>
        </div>
        <div className="flex items-center gap-1">
          <FiWind className="w-4 h-4" />
          <span>12 km/h</span>
        </div>
        <div className="flex items-center gap-1">
          <FiEye className="w-4 h-4" />
          <span>10 km</span>
        </div>
      </div>
    </div>
  </div>
)

function getOrdersLast7DaysData(orders) {
  const today = new Date()
  const days = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    days.push(d)
  }

  const data = days.map((day) => {
    const dateStr = day.toISOString().slice(0, 10)
    const dayName = day.toLocaleDateString("en-US", { weekday: "short" })
    const count = orders.filter((o) => {
      const orderDate = o.created_at ? o.created_at.slice(0, 10) : ""
      return orderDate === dateStr
    }).length
    return { date: dayName, count, fullDate: dateStr }
  })
  return data
}

// Custom tooltip for charts
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-xl border border-emerald-200">
        <p className="font-semibold text-gray-800">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-emerald-600 font-medium">
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

const OverviewDashboard = () => {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.product.products || [])
  const productsLoading = useSelector((state) => state.product.loading)
  const orders = useSelector((state) => state.order.orders || [])
  const predictions = useSelector((state) => state.prediction.predictions || [])
  const predictionsLoading = useSelector((state) => state.prediction.loading)
  const predictionsError = useSelector((state) => state.prediction.error)
  const userId = useSelector((state) => state.user.userId) || localStorage.getItem("user_id")

  useEffect(() => {
    dispatch(listProducts())
    dispatch(fetchOrders())
    dispatch(fetchUserPredictions())
  }, [dispatch])

  // Filter products for the logged-in user
  const userProducts = products.filter((product) => String(product.user) === String(userId))
  const totalStock = userProducts.reduce((sum, p) => sum + (p.quantity || 0), 0)
  const totalOrders = orders.length
  const avgOrderValue = totalOrders ? orders.reduce((sum, o) => sum + (o.total || 0), 0) / totalOrders : 0
  const fulfilledOrders = orders.filter((o) => o.status === "delivered" || o.status === "completed").length
  const fulfillmentRate = totalOrders ? ((fulfilledOrders / totalOrders) * 100).toFixed(1) : 0

  // Enhanced product data with colors
  const productBarData = userProducts.map((p, index) => ({
    name: p.product_name || p.name,
    quantity: p.quantity || 0,
    fill: COLORS[index % COLORS.length],
  }))

  // Order status data for pie chart
  const orderStatusData = [
    { name: "Completed", value: orders.filter((o) => o.status === "completed").length, fill: "#10B981" },
    { name: "Pending", value: orders.filter((o) => o.status === "pending").length, fill: "#F59E0B" },
    { name: "Processing", value: orders.filter((o) => o.status === "processing").length, fill: "#3B82F6" },
    { name: "Cancelled", value: orders.filter((o) => o.status === "cancelled").length, fill: "#EF4444" },
  ].filter((item) => item.value > 0)

  // Recent orders (latest 5)
  const recentOrders = [...orders].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5)

  const getOrderProductsSummary = (order) => {
    if (!order.products || !Array.isArray(order.products)) return { names: "-", quantities: "-" }
    const names = order.products.map((item) => item.product?.product_name || item.product || "").join(", ")
    const quantities = order.products.map((item) => item.quantity).join(", ")
    return { names, quantities }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
      <div className="p-6 space-y-6">
        {/* Weather Widget */}
        <WeatherWidget />

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <SummaryCard
            icon={<FiPackage className="w-6 h-6" />}
            label="My Products"
            value={userProducts.length}
            trend={12}
            color="emerald"
          />
          <SummaryCard
            icon={<FiBarChart2 className="w-6 h-6" />}
            label="Total Stock"
            value={totalStock.toLocaleString()}
            trend={8}
            color="teal"
          />
          <SummaryCard
            icon={<FiShoppingCart className="w-6 h-6" />}
            label="Total Orders"
            value={totalOrders}
            trend={15}
            color="green"
          />
          <SummaryCard
            icon={<FiDollarSign className="w-6 h-6" />}
            label="Avg Order Value"
            value={`${Math.round(avgOrderValue).toLocaleString()} RWF`}
            trend={5}
            color="blue"
          />
          <SummaryCard
            icon={<FiCheckCircle className="w-6 h-6" />}
            label="Fulfillment Rate"
            value={`${fulfillmentRate}%`}
            trend={3}
            color="purple"
          />
        </div>

        {/* Recent Predictions */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-emerald-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg text-white">
                <FiActivity className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Recent Market Predictions</h3>
            </div>
            <button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 font-medium">
              View All
            </button>
          </div>

          {predictionsLoading && <LoadingSpinner />}
          {predictionsError && <ErrorMessage message={String(predictionsError)} />}

          {!predictionsLoading && predictions && predictions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {predictions.slice(0, 3).map((pred, idx) => (
                <div
                  key={pred.id || idx}
                  className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg text-white">
                      <FiTrendingUp className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-emerald-800 text-lg">{pred.commodity}</span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">Market:</span>
                      <span className="text-sm font-semibold text-gray-800">{pred.market || pred.district || "-"}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">Predicted Price:</span>
                      <span className="text-lg font-bold text-emerald-600">
                        {pred.predicted_price?.toLocaleString() || pred.price?.toLocaleString() || "-"} RWF
                      </span>
                    </div>

                    <div className="bg-white/60 rounded-lg p-3">
                      <div className="text-xs text-gray-500 mb-1">Price Range:</div>
                      <div className="text-sm font-medium text-gray-700">
                        {pred.lower_bound?.toLocaleString() || "-"} - {pred.upper_bound?.toLocaleString() || "-"} RWF
                      </div>
                    </div>

                    <div className="text-xs text-gray-400 text-center pt-2 border-t border-emerald-200">
                      {pred.created_at ? new Date(pred.created_at).toLocaleDateString() : ""}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            !predictionsLoading && (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
                  <FiBarChart2 className="w-8 h-8 text-emerald-500" />
                </div>
                <p className="text-gray-500 font-medium">No predictions found.</p>
              </div>
            )
          )}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Orders Chart */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-emerald-100 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg text-white">
                <FiBarChart2 className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Orders Last 7 Days</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={getOrdersLast7DaysData(orders)}>
                <defs>
                  <linearGradient id="orderGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="date" stroke="#6B7280" fontSize={12} />
                <YAxis allowDecimals={false} stroke="#6B7280" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="count" stroke="#10B981" strokeWidth={3} fill="url(#orderGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Order Status Pie Chart */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-emerald-100 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg text-white">
                <FiUsers className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Order Status Distribution</h3>
            </div>
            {orderStatusData.length > 0 ? (
              <div className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={orderStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {orderStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <FiUsers className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500">No order data available</p>
              </div>
            )}
          </div>
        </div>

        {/* Product Stock Chart */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-emerald-100 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg text-white">
              <FiPackage className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Product Stock Overview</h3>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={productBarData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="quantity" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-emerald-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg text-white">
                <FiShoppingCart className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Recent Orders</h3>
            </div>
            <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 font-medium">
              View All Orders
            </button>
          </div>

          <div className="overflow-hidden rounded-xl border border-emerald-200">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                  <th className="p-4 text-left text-sm font-semibold">Order ID</th>
                  <th className="p-4 text-left text-sm font-semibold">Date</th>
                  <th className="p-4 text-left text-sm font-semibold">Customer</th>
                  <th className="p-4 text-left text-sm font-semibold">Products</th>
                  <th className="p-4 text-left text-sm font-semibold">Quantity</th>
                  <th className="p-4 text-left text-sm font-semibold">Status</th>
                  <th className="p-4 text-center text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, idx) => {
                  const { names, quantities } = getOrderProductsSummary(order)
                  return (
                    <tr
                      key={order.id || idx}
                      className="border-b border-emerald-100 hover:bg-emerald-50/50 transition-colors duration-200"
                    >
                      <td className="p-4 font-medium text-gray-800">#{order.id || "N/A"}</td>
                      <td className="p-4 text-gray-600">
                        {order.created_at ? new Date(order.created_at).toLocaleDateString() : "N/A"}
                      </td>
                      <td className="p-4 text-gray-800 font-medium">
                        {order.user?.user || order.user?.username || order.user || "N/A"}
                      </td>
                      <td className="p-4 text-gray-600">{names}</td>
                      <td className="p-4 text-gray-600">{quantities}</td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            order.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : order.status === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : order.status === "processing"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-red-100 text-red-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <Link
                          to={`/orders/orderpage/${order.id}`}
                          className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 text-sm font-medium"
                        >
                          <FiEye className="w-4 h-4 mr-1" />
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
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <LoadingSpinner />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OverviewDashboard
