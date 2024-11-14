import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts, updateProduct } from '../../Redux/Slices/product/product'; 

// Main Product Listing Page Component
const ProductListingPage = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.product.products);
  const loading = useSelector((state) => state.product.loading);
  const error = useSelector((state) => state.product.error);

  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');

  useEffect(() => {
    // Fetch products from the server on component mount
    dispatch(listProducts());
  }, [dispatch]);

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    const matchesLocation = selectedLocation === 'All' || product.location === selectedLocation;
    const matchesDate = selectedDate === '' || product.harvestDate >= selectedDate;
    const matchesPrice = selectedPriceRange === 'All' || (selectedPriceRange === 'Low' ? product.price <= 1000 : product.price > 1000);
    return matchesLocation && matchesDate && matchesPrice;
  });

  // Render based on status
  if (loading === 'loading') {
    return <p>Loading...</p>;
  }

  if (error === 'failed') {
    return <p>Failed to load products.</p>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100 p-4">
      {/* Sidebar Filter Section */}
      <div className="w-1/4 bg-white rounded-lg shadow-md p-4 mr-6">
        <h2 className="text-xl font-semibold mb-4 text-center text-green-700">Filters</h2>
        {/* Location Filter */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Nearby Location</label>
          <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} className="w-full border rounded-md p-2">
            <option value="All">All</option>
            <option value="Eastern Province">Eastern Province</option>
            <option value="Western Province">Western Province</option>
            <option value="Northern Province">Northern Province</option>
            <option value="Southern Province">Southern Province</option>
          </select>
        </div>
        {/* Date Filter */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Date of Harvest</label>
          <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="w-full border rounded-md p-2" />
        </div>
        {/* Price Filter */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Price</label>
          <select value={selectedPriceRange} onChange={(e) => setSelectedPriceRange(e.target.value)} className="w-full border rounded-md p-2">
            <option value="All">All Prices</option>
            <option value="Low">Below 1000 RWF</option>
            <option value="High">Above 1000 RWF</option>
          </select>
        </div>
      </div>

      {/* Product Cards Section */}
      <div className="w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="flex flex-col items-center justify-center max-w-sm mx-auto">
            {/* Product Image */}
            <div className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md" style={{ backgroundImage: `url(${  product.image?.url})` }}></div>

            {/* Product Details */}
            <div className="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64">
              <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase">{product.product_name}</h3>
              <div className="flex items-center justify-between px-3 py-2 bg-gray-200">
                <span className="font-bold text-gray-800">{product.price} RWF</span>
                <button className="px-2 py-1 text-xs font-semibold text-white uppercase bg-green-600 rounded hover:bg-green-700">
                  Contact
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListingPage;
