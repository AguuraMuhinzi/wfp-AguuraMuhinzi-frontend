

// 'use client';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders } from '../../Redux/Slices/order/orderSlice';
import { FaBoxOpen, FaSchool, FaShoppingCart, FaSeedling, FaTractor, FaLeaf } from 'react-icons/fa';
import AllOrders from './allOrdes';

const OrderDashboard = () => {
  const dispatch = useDispatch();
  const orders = useSelector(state => state.order.orders || []);
  const loading = useSelector(state => state.order.loading);
  const error = useSelector(state => state.order.error);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  // Calculate total orders
  const totalOrders = orders.length;

  // Calculate most ordered product
  const productCounts = {};
  orders.forEach(order => {
    if (Array.isArray(order.products)) {
      order.products.forEach(item => {
        const name = item.product?.product_name || item.product || '';
        productCounts[name] = (productCounts[name] || 0) + (item.quantity || 0);
      });
    }
  });
  const mostOrderedProduct = Object.entries(productCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '-';

  // Calculate top ordering school (user with most orders)
  const schoolCounts = {};
  orders.forEach(order => {
    const school = order.user?.username || order.user?.academy_details?.name || order.user?.user || order.user || '';
    if (school) schoolCounts[school] = (schoolCounts[school] || 0) + 1;
  });
  const mostOrderingSchool = Object.entries(schoolCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '-';

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-200 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-emerald-200 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-teal-200 rounded-full opacity-20 blur-xl"></div>
      </div>

      <div className="relative pt-20 sm:pt-24 px-4 md:px-8 flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Cards Section */}
          <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Most Ordered Product Card */}
            <div className="group relative bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 border border-green-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full -translate-y-6 translate-x-6 opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
                    <FaBoxOpen className="text-white w-6 h-6" />
                  </div>
                  <FaLeaf className="text-green-300 w-8 h-8 opacity-50" />
                </div>
                <h2 className="text-lg font-bold text-gray-800 mb-2">Most Ordered Product</h2>
                <p className="text-2xl font-bold text-green-600 mb-1">{mostOrderedProduct}</p>
                <p className="text-sm text-gray-500">Fresh from our farms</p>
              </div>
            </div>

            {/* Total Orders Card */}
            <div className="group relative bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 border border-blue-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full -translate-y-6 translate-x-6 opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl shadow-lg">
                    <FaShoppingCart className="text-white w-6 h-6" />
                  </div>
                  <FaSeedling className="text-blue-300 w-8 h-8 opacity-50" />
                </div>
                <h2 className="text-lg font-bold text-gray-800 mb-2">Total Orders</h2>
                <p className="text-2xl font-bold text-blue-600 mb-1">{totalOrders}</p>
                <p className="text-sm text-gray-500">Orders processed this month</p>
              </div>
            </div>

            {/* Most Ordering School Card */}
            <div className="group relative bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 border border-orange-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full -translate-y-6 translate-x-6 opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl shadow-lg">
                    <FaSchool className="text-white w-6 h-6" />
                  </div>
                  <FaTractor className="text-orange-300 w-8 h-8 opacity-50" />
                </div>
                <h2 className="text-lg font-bold text-gray-800 mb-2">Top Ordering School</h2>
                <p className="text-2xl font-bold text-orange-600 mb-1">{mostOrderingSchool}</p>
                <p className="text-sm text-gray-500">Most active school</p>
              </div>
            </div>
          </div>

          {/* Orders Table Section - Redesigned */}
          <div className="bg-white/90 shadow-2xl rounded-2xl p-6 border border-green-100 mt-8">
            <h2 className="text-2xl font-bold text-green-800 mb-6 flex items-center gap-2">
              <FaSeedling className="text-green-500" /> Orders Summary
            </h2>
            <div className="overflow-x-auto">
              <AllOrders />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDashboard;