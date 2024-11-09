'use client';

import React, { useState } from 'react';
import ProductTable from './Allproducts'; // Adjust import path as needed
import InsertProductForm from './newProduct'; // Adjust import path as needed

const StockPage = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleAddProductClick = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

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

        {/* Render the product table */}
        <ProductTable />

        {/* Insert Product Modal */}
        {isModalVisible && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full relative max-h-[70vh] overflow-y-auto">
      {/* Close button for the modal */}
      <button
        onClick={handleCloseModal}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        &times;
      </button>
      {/* Insert the form inside the modal */}
      <InsertProductForm />
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default StockPage;
