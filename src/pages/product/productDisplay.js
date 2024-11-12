import React, { useState } from 'react';

// Sample data for products
const products = [
  {
    id: 1,
    name: 'Fresh Apples',
    quantity: '150 kg',
    cooperative: 'Cooperative A',
    location: 'Eastern Province',
    price: 1200,
    category: 'Fruits',
  },
  {
    id: 2,
    name: 'Organic Carrots',
    quantity: '200 kg',
    cooperative: 'Cooperative B',
    location: 'Western Province',
    price: 1000,
    category: 'Vegetables',
  },
  {
    id: 3,
    name: 'Green Beans',
    quantity: '180 kg',
    cooperative: 'Cooperative C',
    location: 'Northern Province',
    price: 1100,
    category: 'Vegetables',
  },
  {
    id: 4,
    name: 'Tomatoes',
    quantity: '300 kg',
    cooperative: 'Cooperative D',
    location: 'Southern Province',
    price: 900,
    category: 'Fruits',
  },
];

// Main Product Listing Page Component
const ProductListingPage = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter products based on selected location and category
  const handleLocationFilter = (e) => {
    const location = e.target.value;
    setSelectedLocation(location);
    filterProducts(location, selectedCategory);
  };

  const handleCategoryFilter = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    filterProducts(selectedLocation, category);
  };

  const filterProducts = (location, category) => {
    setFilteredProducts(
      products.filter((product) =>
        (location === 'All' || product.location === location) &&
        (category === 'All' || product.category === category)
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-green-700 text-center mb-6">Available Products from Cooperatives</h1>

      {/* Filter Section */}
      <div className="flex justify-center gap-4 mb-6">
        <select
          value={selectedLocation}
          onChange={handleLocationFilter}
          className="p-2 bg-white border rounded-lg shadow-md"
        >
          <option value="All">All Locations</option>
          <option value="Eastern Province">Eastern Province</option>
          <option value="Western Province">Western Province</option>
          <option value="Northern Province">Northern Province</option>
          <option value="Southern Province">Southern Province</option>
        </select>
        <select
          value={selectedCategory}
          onChange={handleCategoryFilter}
          className="p-2 bg-white border rounded-lg shadow-md"
        >
          <option value="All">All Categories</option>
          <option value="Fruits">Fruits</option>
          <option value="Vegetables">Vegetables</option>
        </select>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-semibold text-green-600 mb-2">{product.name}</h2>
            <p className="text-gray-700"><strong>Cooperative:</strong> {product.cooperative}</p>
            <p className="text-gray-700"><strong>Quantity:</strong> {product.quantity}</p>
            <p className="text-gray-700"><strong>Location:</strong> {product.location}</p>
            <p className="text-gray-700"><strong>Category:</strong> {product.category}</p>
            <p className="text-gray-700"><strong>Price:</strong> {product.price} RWF</p>
            <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
              Contact Cooperative
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListingPage;
