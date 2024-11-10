

'use client';

import React from 'react';
import { FaBoxOpen, FaSchool, FaShoppingCart } from 'react-icons/fa';
import AllOrders from './allOrdes'; // Adjust import path as needed

const OrderDashboard = () => {
  // Sample data to display; in real use, replace these with data from props or Redux.
  const mostOrderedProduct = 'Maize Flour';
  const mostOrderingSchool = 'Green Valley School';
  const totalOrders = 120;

  return (
    <div className="pt-20 sm:pt-24 px-4 md:px-8 flex-1 overflow-auto">
      <div className="max-w-7xl mx-auto">
        {/* Cards Section */}
        <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Most Ordered Product Card */}
          <div className="bg-white shadow-lg rounded-lg p-2 sm:p-4 w-full sm:w-3/4 md:w-full mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-700">Most Ordered Product</h2>
                <p className="text-gray-600 mt-1 text-xs sm:text-sm md:text-base">{mostOrderedProduct}</p>
              </div>
              <FaBoxOpen className="text-green-500 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
            </div>
          </div>

          {/* Total Orders Card */}
          <div className="bg-white shadow-lg rounded-lg p-2 sm:p-4 w-full sm:w-3/4 md:w-full mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-700">Total Orders</h2>
                <p className="text-gray-600 mt-1 text-xs sm:text-sm md:text-base">{totalOrders}</p>
              </div>
              <FaShoppingCart className="text-blue-500 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
            </div>
          </div>

          {/* Most Ordering School Card */}
          <div className="bg-white shadow-lg rounded-lg p-2 sm:p-4 w-full sm:w-3/4 md:w-full mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-700">Top Ordering School</h2>
                <p className="text-gray-600 mt-1 text-xs sm:text-sm md:text-base">{mostOrderingSchool}</p>
              </div>
              <FaSchool className="text-orange-500 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
            </div>
          </div>
        </div>

        {/* Navigation for Additional Pages */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-lg sm:text-xl md:text-3xl font-bold text-green-700 mb-4 sm:mb-0">Orders Overview</h1>
          <div className="flex flex-wrap space-x-2 sm:space-x-4">
            <button className="px-2 sm:px-3 md:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300">
              View All Orders
            </button>
            <button className="px-2 sm:px-3 md:px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-300">
              Other Actions
            </button>
          </div>
        </div>

        {/* Call All Orders Page/Table */}
        <div className="bg-white shadow-lg rounded-lg p-2 sm:p-4">
          <AllOrders />
        </div>
      </div>
    </div>
  );
};

export default OrderDashboard;
