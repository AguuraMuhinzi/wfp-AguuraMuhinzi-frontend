// 'use client';

// import React, { useState } from 'react';
// import ProductTable from './Allproducts'; // Adjust import path as needed
// import InsertProductForm from './newProduct'; // Adjust import path as needed

// const StockPage = () => {
//   const [isModalVisible, setModalVisible] = useState(false);

//   const handleAddProductClick = () => {
//     setModalVisible(true);
//   };

//   const handleCloseModal = () => {
//     setModalVisible(false);
//   };

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
//               <InsertProductForm />
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StockPage;

'use client';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaLeaf, FaSeedling, FaDollarSign, FaChartLine } from 'react-icons/fa'; // Import some icons for product representation
import ProductTable from './Allproducts'; // Adjust import path as needed
import InsertProductForm from './newProduct'; // Adjust import path as needed

const ProductCard = ({ productName, icon: Icon, quantity, description }) => (
  <div className="bg-white shadow-lg rounded-lg p-4 w-full md:w-1/2 mb-4 md:mb-0 md:mr-4 flex-1">
    <div className="flex items-center mb-2">
      <Icon className="text-green-500 mr-2" size={24} />
      <h2 className="text-xl font-semibold text-gray-700">{productName}</h2>
    </div>
    <p className="text-gray-600 mb-1">
      <strong>Stock/Quantity:</strong> {quantity}
    </p>
    <p className="text-gray-500 text-sm">{description}</p>
  </div>
);

const FinancialCard = ({ title, value, icon: Icon }) => (
  <div className="bg-white shadow-lg rounded-lg p-4 w-full md:w-1/2 mb-4 md:mb-0 md:mr-4 flex-1">
    <div className="flex items-center mb-2">
      <Icon className="text-green-500 mr-2" size={24} />
      <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
    </div>
    <p className="text-gray-600 text-lg font-bold">${value.toFixed(2)}</p>
  </div>
);

const StockPage = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const products = useSelector((state) => state.product.products);

  const handleAddProductClick = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  // Calculate total stock value and potential profit margin
  const totalStockValue = products.reduce((total, product) => total + product.price * product.stock, 0);
  const estimatedProfitMargin = totalStockValue * 0.2; // Assume 20% profit margin for simplicity

  return (
    <div className="pt-28 sm:pt-28 md:pt-8 px-4 md:px-8 flex-1 overflow-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-green-700 mb-4 md:mb-0">
            Stock Management
          </h1>
          <button
            onClick={handleAddProductClick}
            className="w-full md:w-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
          >
            Add New Product
          </button>
        </div>

        {/* Product Summary Cards */}
        <div className="flex flex-col md:flex-row mb-6">
          <ProductCard
            productName="Product 1: Fresh Apples"
            icon={FaLeaf}
            quantity="150 kg"
            description="High-quality fresh apples harvested from our local farm."
          />
          <ProductCard
            productName="Product 2: Organic Carrots"
            icon={FaSeedling}
            quantity="200 kg"
            description="Organic carrots grown sustainably for school supply."
          />
        </div>

        {/* Financial Insights Cards */}
        <div className="flex flex-col md:flex-row mb-6">
          <FinancialCard
            title="Total Stock Value"
            value={totalStockValue}
            icon={FaDollarSign}
          />
          <FinancialCard
            title="Estimated Profit Margin"
            value={estimatedProfitMargin}
            icon={FaChartLine}
          />
        </div>

        {/* Render the product table */}
        <ProductTable />

        {/* Insert Product Modal */}
        {isModalVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full relative">
              {/* Close button for the modal */}
              <button
                onClick={handleCloseModal}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
              {/* Insert the form inside the modal */}
              <InsertProductForm onClose={handleCloseModal} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockPage;
