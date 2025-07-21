

// // 'use client';

// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchOrders } from '../../Redux/Slices/order/orderSlice';
// import { FaBoxOpen, FaSchool, FaShoppingCart, FaSeedling, FaTractor, FaLeaf } from 'react-icons/fa';
// import AllOrders from './allOrdes';

// const OrderDashboard = () => {
//   const dispatch = useDispatch();
//   const orders = useSelector(state => state.order.orders || []);
//   const loading = useSelector(state => state.order.loading);
//   const error = useSelector(state => state.order.error);

//   useEffect(() => {
//     dispatch(fetchOrders());
//   }, [dispatch]);

//   // Calculate total orders
//   const totalOrders = orders.length;

//   // Calculate most ordered product
//   const productCounts = {};
//   orders.forEach(order => {
//     if (Array.isArray(order.products)) {
//       order.products.forEach(item => {
//         const name = item.product?.product_name || item.product || '';
//         productCounts[name] = (productCounts[name] || 0) + (item.quantity || 0);
//       });
//     }
//   });
//   const mostOrderedProduct = Object.entries(productCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '-';

//   // Calculate top ordering school (user with most orders)
//   const schoolCounts = {};
//   orders.forEach(order => {
//     const school = order.user?.username || order.user?.academy_details?.name || order.user?.user || order.user || '';
//     if (school) schoolCounts[school] = (schoolCounts[school] || 0) + 1;
//   });
//   const mostOrderingSchool = Object.entries(schoolCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '-';

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
//       {/* Decorative background elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-20 left-10 w-32 h-32 bg-green-200 rounded-full opacity-20 blur-xl"></div>
//         <div className="absolute top-40 right-20 w-48 h-48 bg-emerald-200 rounded-full opacity-20 blur-xl"></div>
//         <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-teal-200 rounded-full opacity-20 blur-xl"></div>
//       </div>

//       <div className="relative pt-20 sm:pt-24 px-4 md:px-8 flex-1 overflow-auto">
//         <div className="max-w-7xl mx-auto">
//           {/* Cards Section */}
//           <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-3">
//             {/* Most Ordered Product Card */}
//             <div className="group relative bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 border border-green-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
//               <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full -translate-y-6 translate-x-6 opacity-10 group-hover:opacity-20 transition-opacity"></div>
//               <div className="relative">
//                 <div className="flex items-center justify-between mb-4">
//                   <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
//                     <FaBoxOpen className="text-white w-6 h-6" />
//                   </div>
//                   <FaLeaf className="text-green-300 w-8 h-8 opacity-50" />
//                 </div>
//                 <h2 className="text-lg font-bold text-gray-800 mb-2">Most Ordered Product</h2>
//                 <p className="text-2xl font-bold text-green-600 mb-1">{mostOrderedProduct}</p>
//                 <p className="text-sm text-gray-500">Fresh from our farms</p>
//               </div>
//             </div>

//             {/* Total Orders Card */}
//             <div className="group relative bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 border border-blue-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
//               <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full -translate-y-6 translate-x-6 opacity-10 group-hover:opacity-20 transition-opacity"></div>
//               <div className="relative">
//                 <div className="flex items-center justify-between mb-4">
//                   <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl shadow-lg">
//                     <FaShoppingCart className="text-white w-6 h-6" />
//                   </div>
//                   <FaSeedling className="text-blue-300 w-8 h-8 opacity-50" />
//                 </div>
//                 <h2 className="text-lg font-bold text-gray-800 mb-2">Total Orders</h2>
//                 <p className="text-2xl font-bold text-blue-600 mb-1">{totalOrders}</p>
//                 <p className="text-sm text-gray-500">Orders processed this month</p>
//               </div>
//             </div>

//             {/* Most Ordering School Card */}
//             <div className="group relative bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 border border-orange-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
//               <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full -translate-y-6 translate-x-6 opacity-10 group-hover:opacity-20 transition-opacity"></div>
//               <div className="relative">
//                 <div className="flex items-center justify-between mb-4">
//                   <div className="p-3 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl shadow-lg">
//                     <FaSchool className="text-white w-6 h-6" />
//                   </div>
//                   <FaTractor className="text-orange-300 w-8 h-8 opacity-50" />
//                 </div>
//                 <h2 className="text-lg font-bold text-gray-800 mb-2">Top Ordering School</h2>
//                 <p className="text-2xl font-bold text-orange-600 mb-1">{mostOrderingSchool}</p>
//                 <p className="text-sm text-gray-500">Most active school</p>
//               </div>
//             </div>
//           </div>

//           {/* Orders Table Section - Redesigned */}
//           <div className="bg-white/90 shadow-2xl rounded-2xl p-6 border border-green-100 mt-8">
//             <h2 className="text-2xl font-bold text-green-800 mb-6 flex items-center gap-2">
//               <FaSeedling className="text-green-500" /> Orders Summary
//             </h2>
//             <div className="overflow-x-auto">
//               <AllOrders />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderDashboard;

"use client"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchOrders } from "../../Redux/Slices/order/orderSlice"
import {
  FaBoxOpen,
  FaSchool,
  FaShoppingCart,
  FaTractor,
  FaLeaf,
  FaArrowUp,
  FaClipboardList,
  FaUsers,
  FaChartLine,
} from "react-icons/fa"
import AllOrders from "./allOrdes"

const StatCard = ({ icon: Icon, label, value, color = "emerald" }) => {
  const colorClasses = {
    emerald: "from-emerald-500 to-teal-600",
    blue: "from-blue-500 to-indigo-600",
    purple: "from-purple-500 to-pink-600",
    orange: "from-orange-500 to-red-600",
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl p-6 border border-emerald-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 bg-gradient-to-br ${colorClasses[color]} rounded-xl shadow-lg`}>
          <Icon className="text-white" size={20} />
        </div>
      </div>
    </div>
  )
}

const ProductCard = ({ productName, icon: Icon, quantity, description, trend }) => (
  <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 border border-emerald-200 hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg group-hover:shadow-emerald-500/25 transition-all duration-300">
          <Icon className="text-white" size={24} />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-bold text-gray-800">{productName}</h3>
          <p className="text-sm text-gray-500">Most Popular</p>
        </div>
      </div>
      {trend && (
        <div className="flex items-center text-emerald-600">
          <FaArrowUp className="mr-1" size={16} />
          <span className="text-sm font-semibold">+{trend}%</span>
        </div>
      )}
    </div>
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-gray-600 font-medium">Total Ordered:</span>
        <span className="text-xl font-bold text-emerald-600">{quantity}</span>
      </div>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </div>
    <div className="mt-4 pt-4 border-t border-gray-100">
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">Last Updated</span>
        <span className="text-xs text-gray-600">2 hours ago</span>
      </div>
    </div>
  </div>
)

const FinancialCard = ({ title, value, icon: Icon, change, color = "emerald" }) => {
  const colorClasses = {
    emerald: "from-emerald-500 to-teal-600 shadow-emerald-500/25",
    blue: "from-blue-500 to-indigo-600 shadow-blue-500/25",
    purple: "from-purple-500 to-pink-600 shadow-purple-500/25",
    orange: "from-orange-500 to-red-600 shadow-orange-500/25",
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 border border-emerald-200 hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
      <div className="flex items-center justify-between mb-4">
        <div
          className={`p-3 bg-gradient-to-br ${colorClasses[color]} rounded-xl shadow-lg group-hover:${colorClasses[color].split(" ")[2]} transition-all duration-300`}
        >
          <Icon className="text-white" size={24} />
        </div>
        {change && (
          <div className={`flex items-center ${change > 0 ? "text-emerald-600" : "text-red-500"}`}>
            <FaArrowUp className={`mr-1 ${change < 0 ? "transform rotate-180" : ""}`} size={16} />
            <span className="text-sm font-semibold">
              {change > 0 ? "+" : ""}
              {change}%
            </span>
          </div>
        )}
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
        <p className="text-sm text-gray-500">This month</p>
      </div>
    </div>
  )
}

const OrderDashboard = () => {
  const dispatch = useDispatch()
  const orders = useSelector((state) => state.order.orders || [])
  const loading = useSelector((state) => state.order.loading)
  const error = useSelector((state) => state.order.error)
  const userId = useSelector(state => state.user.userId) || localStorage.getItem("user_id");

  // Filter orders for the logged-in user/cooperative
  const filteredOrders = orders.filter(order => order.cooperative && String(order.cooperative.id || order.cooperative) === String(userId));

  useEffect(() => {
    dispatch(fetchOrders())
  }, [dispatch])

  // Calculate total orders
  const totalOrders = filteredOrders.length

  // Calculate most ordered product
  const productCounts = {}
  filteredOrders.forEach((order) => {
    if (Array.isArray(order.products)) {
      order.products.forEach((item) => {
        const name = item.product?.product_name || item.product || ""
        productCounts[name] = (productCounts[name] || 0) + (item.quantity || 0)
      })
    }
  })

  const mostOrderedProduct = Object.entries(productCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "No orders yet"
  const mostOrderedQuantity = Object.entries(productCounts).sort((a, b) => b[1] - a[1])[0]?.[1] || 0

  // Calculate top ordering school (user with most orders)
  const schoolCounts = {}
  filteredOrders.forEach((order) => {
    const school = order.user?.username || order.user?.academy_details?.name || order.user?.user || order.user || ""
    if (school) schoolCounts[school] = (schoolCounts[school] || 0) + 1
  })

  const mostOrderingSchool = Object.entries(schoolCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "No schools yet"
  const totalSchools = Object.keys(schoolCounts).length

  // Calculate pending orders
  const pendingOrders = filteredOrders.filter((order) => order.status === "pending" || order.status === "processing").length

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
              Order Management
            </h1>
            <p className="text-gray-600 text-lg">Track and manage all your orders efficiently</p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon={FaClipboardList} label="Total Orders" value={totalOrders} color="emerald" />
          <StatCard icon={FaBoxOpen} label="Pending Orders" value={pendingOrders} color="orange" />
          <StatCard icon={FaUsers} label="Active Schools" value={totalSchools} color="blue" />
          <StatCard icon={FaChartLine} label="Order Growth" value="+15%" color="purple" />
        </div>

        {/* Product Showcase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProductCard
            productName={mostOrderedProduct}
            icon={FaLeaf}
            quantity={`${mostOrderedQuantity} units`}
            description="This product has been ordered the most by schools in your network. High demand indicates quality and satisfaction."
            trend={12}
          />
          <ProductCard
            productName={mostOrderingSchool}
            icon={FaSchool}
            quantity={`${schoolCounts[mostOrderingSchool] || 0} orders`}
            description="Most active school in placing orders. Consistent ordering pattern shows reliable partnership."
            trend={8}
          />
        </div>

        <AllOrders />
      </div>
    </div>
  )
}

export default OrderDashboard
