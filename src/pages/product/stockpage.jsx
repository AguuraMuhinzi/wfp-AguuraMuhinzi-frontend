

// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { FaLeaf, FaSeedling, FaDollarSign, FaChartLine } from 'react-icons/fa'; // Import some icons for product representation
// import ProductTable from './Allproducts'; // Adjust import path as needed
// import InsertProductForm from './newProduct'; // Adjust import path as needed

// const ProductCard = ({ productName, icon: Icon, quantity, description }) => (
//   <div className="bg-white shadow-lg rounded-lg p-4 w-full md:w-1/2 mb-4 md:mb-0 md:mr-4 flex-1">
//     <div className="flex items-center mb-2">
//       <Icon className="text-green-500 mr-2" size={24} />
//       <h2 className="text-xl font-semibold text-gray-700">{productName}</h2>
//     </div>
//     <p className="text-gray-600 mb-1">
//       <strong>Stock/Quantity:</strong> {quantity}
//     </p>
//     <p className="text-gray-500 text-sm">{description}</p>
//   </div>
// );

// const FinancialCard = ({ title, value, icon: Icon }) => (
//   <div className="bg-white shadow-lg rounded-lg p-4 w-full md:w-1/2 mb-4 md:mb-0 md:mr-4 flex-1">
//     <div className="flex items-center mb-2">
//       <Icon className="text-green-500 mr-2" size={24} />
//       <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
//     </div>
//     <p className="text-gray-600 text-lg font-bold">${value.toFixed(2)}</p>
//   </div>
// );

// const StockPage = () => {
//   const [isModalVisible, setModalVisible] = useState(false);
//   const products = useSelector((state) => state.product.products);

//   const handleAddProductClick = () => {
//     setModalVisible(true);
//   };

//   const handleCloseModal = () => {
//     setModalVisible(false);
//   };

//   // Calculate total stock value and potential profit margin
//   const totalStockValue = products.reduce((total, product) => total + product.price * product.stock, 0);
//   const estimatedProfitMargin = totalStockValue * 0.2; // Assume 20% profit margin for simplicity

//   return (
//     <div className="pt-28 sm:pt-28 md:pt-8 px-4 md:px-8 flex-1 overflow-auto">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex flex-col md:flex-row justify-between items-center mb-6">
//           <h1 className="text-2xl md:text-3xl font-bold text-green-700 mb-4 md:mb-0">
//             Stock Management
//           </h1>
//           <button
//             onClick={handleAddProductClick}
//             className="w-full md:w-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
//           >
//             Add New Product
//           </button>
//         </div>

//         {/* Product Summary Cards */}
//         <div className="flex flex-col md:flex-row mb-6">
//           <ProductCard
//             productName="Product 1: Fresh Apples"
//             icon={FaLeaf}
//             quantity="150 kg"
//             description="High-quality fresh apples harvested from our local farm."
//           />
//           <ProductCard
//             productName="Product 2: Organic Carrots"
//             icon={FaSeedling}
//             quantity="200 kg"
//             description="Organic carrots grown sustainably for school supply."
//           />
//         </div>

//         {/* Financial Insights Cards */}
//         <div className="flex flex-col md:flex-row mb-6">
//           <FinancialCard
//             title="Total Stock Value"
//             value={totalStockValue}
//             icon={FaDollarSign}
//           />
//           <FinancialCard
//             title="Estimated Profit Margin"
//             value={estimatedProfitMargin}
//             icon={FaChartLine}
//           />
//         </div>

//         {/* Render the product table */}
//         <ProductTable />

//         {/* Insert Product Modal */}
//         {isModalVisible && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//             <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full relative">
//               {/* Close button for the modal */}
//               <button
//                 onClick={handleCloseModal}
//                 className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//               >
//                 &times;
//               </button>
//               {/* Insert the form inside the modal */}
//               <InsertProductForm onClose={handleCloseModal} />
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StockPage;

"use client"
import { useState } from "react"
import { useSelector } from "react-redux"
import {
  FaLeaf,
  FaSeedling,
  FaDollarSign,
  FaChartLine,
  FaPlus,
  FaTimes,
  FaBox,
  FaArrowUp,
  FaWarehouse,
  FaShoppingCart,
} from "react-icons/fa"
import ProductTable from "./Allproducts"
import InsertProductForm from "./newProduct"

const ProductCard = ({ productName, icon: Icon, quantity, description, trend }) => (
  <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 border border-emerald-200 hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg group-hover:shadow-emerald-500/25 transition-all duration-300">
          <Icon className="text-white" size={24} />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-bold text-gray-800">{productName}</h3>
          <p className="text-sm text-gray-500">Fresh & Organic</p>
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
        <span className="text-gray-600 font-medium">Stock Quantity:</span>
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
        <p className="text-3xl font-bold text-gray-800">RWF {value.toLocaleString()}</p>
        <p className="text-sm text-gray-500">Current valuation</p>
      </div>
    </div>
  )
}

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

const StockPage = () => {
  const [isModalVisible, setModalVisible] = useState(false)
  const products = useSelector((state) => state.product.products || [])

  const handleAddProductClick = () => {
    setModalVisible(true)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
  }

  // Calculate metrics
  const totalProducts = products.length
  const totalStockValue = products.reduce(
    (total, product) => total + (product.price || 0) * (product.stock || product.quantity || 0),
    0,
  )
  const estimatedProfitMargin = totalStockValue * 0.2
  const lowStockItems = products.filter((p) => (p.stock || p.quantity || 0) < 10).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
              Stock Management
            </h1>
            <p className="text-gray-600 text-lg">Manage your inventory and track stock levels efficiently</p>
          </div>
          <button
            onClick={handleAddProductClick}
            className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-emerald-500/25 hover:scale-105 transition-all duration-300"
          >
            <FaPlus size={18} />
            Add New Product
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon={FaBox} label="Total Products" value={totalProducts} color="emerald" />
          <StatCard
            icon={FaWarehouse}
            label="Stock Value"
            value={`${Math.round(totalStockValue / 1000)}K`}
            color="blue"
          />
          <StatCard icon={FaShoppingCart} label="Low Stock Items" value={lowStockItems} color="orange" />
          <StatCard
            icon={FaArrowUp}
            label="Profit Margin"
            value={`${Math.round(estimatedProfitMargin / 1000)}K`}
            color="purple"
          />
        </div>

        {/* Product Showcase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProductCard
            productName="Fresh Apples"
            icon={FaLeaf}
            quantity="150 kg"
            description="High-quality fresh apples harvested from our local farm. Perfect for school nutrition programs."
            trend={12}
          />
          <ProductCard
            productName="Organic Carrots"
            icon={FaSeedling}
            quantity="200 kg"
            description="Organic carrots grown sustainably for school supply. Rich in vitamins and minerals."
            trend={8}
          />
        </div>

        {/* Financial Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FinancialCard
            title="Total Stock Value"
            value={totalStockValue}
            icon={FaDollarSign}
            change={15.2}
            color="emerald"
          />
          <FinancialCard
            title="Estimated Profit Margin"
            value={estimatedProfitMargin}
            icon={FaChartLine}
            change={8.7}
            color="blue"
          />
        </div>

        {/* Product Table Section */}
        <ProductTable />

        {/* Modal */}
        {isModalVisible && (
          <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto border border-emerald-200">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Add New Product</h2>
                <button
                  onClick={handleCloseModal}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
                >
                  <FaTimes className="text-white" size={20} />
                </button>
              </div>
              <div className="p-6">
                <InsertProductForm onClose={handleCloseModal} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default StockPage
