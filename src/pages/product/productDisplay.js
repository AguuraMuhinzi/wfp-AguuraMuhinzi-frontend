
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../Redux/Slices/product/product';
import { fetchCooperativeDetails } from '../../Redux/Slices/cooperative/coop_details';
import Navbar from '../../components/sidebar';

const Modal = ({ product, cooperative, onClose }) => {
  if (!product || !cooperative) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg border-4 border-green-600 w-4/5 md:w-1/2 lg:w-1/3 p-6 relative">
        {/* Header */}
        <h1 className="text-2xl font-bold text-center text-green-700 mb-6">
        product details</h1>
        
        {/* Product Section */}
        <div className="border-b border-gray-300 pb-4 mb-4">
          <h2 className="text-xl font-bold text-green-600 mb-2">{product.product_name}</h2>
          <p className="text-sm text-gray-700 mb-2">
            <strong>Description:</strong> {product.description || 'No description provided.'}
          </p>
          <p className="text-sm text-gray-700 mb-2">
            <strong>Price:</strong> {product.price} RWF
          </p>
          <p className="text-sm text-gray-700 mb-2">
            <strong>Harvest Date:</strong> {new Date(product.harvest_date).toLocaleDateString()}
          </p>
        </div>
  
        {/* Cooperative Details */}
        <div className="pb-4 mb-4">
        <h1 className="text-2xl font-bold text-center text-green-700 mb-6">
          {cooperative.name}
        </h1>
  
          <p className="text-sm text-gray-700 mb-2">
            <strong>Specialization:</strong> {cooperative.specialization}
          </p>
          <p className="text-sm text-gray-700 mb-2">
            <strong>Location:</strong> {cooperative.province}, {cooperative.district}, {cooperative.sector}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Contact:</strong> {cooperative.contact || 'Not available'}
          </p>
        </div>
  
        {/* Footer */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <button
            className="w-full md:w-auto px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
            onClick={() => alert('Getting in touch with the cooperative...')}
          >
            Contact Cooperative
          </button>
          <button
            className="w-full md:w-auto px-4 py-2 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
  
}
const ProductListingPage = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.product.products);
  const loading = useSelector((state) => state.product.loading);
  const error = useSelector((state) => state.product.error);
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cooperativeNames, setCooperativeNames] = useState({});
  const [cooperativeDetails, setCooperativeDetails] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  useEffect(() => {
    const fetchCooperativeNames = async () => {
      const names = {};
      const details = {};
      for (const product of products) {
        if (product.user && !names[product.user]) {
          try {
            const response = await dispatch(fetchCooperativeDetails(product.user)).unwrap();
            names[product.user] = response.name || 'Unknown Cooperative';
            details[product.user] = response;
          } catch (error) {
            console.error(`Failed to fetch details for user ID ${product.user}:`, error);
          }
        }
      }
      setCooperativeNames(names);
      setCooperativeDetails(details);
    };

    if (products.length > 0) {
      fetchCooperativeNames();
    }
  }, [dispatch, products]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const filteredProducts = products.filter((product) => {
    const cooperative = cooperativeDetails[product.user] || {};
    const matchesLocation = selectedLocation === 'All' || cooperative.province === selectedLocation;
    const matchesDate = selectedDate === '' || product.harvest_date >= selectedDate;
    const matchesPrice =
      selectedPriceRange === 'All' || (selectedPriceRange === 'Low' ? product.price <= 1000 : product.price > 1000);
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesSearch =
      searchTerm === '' || product.product_name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLocation && matchesDate && matchesPrice && matchesCategory && matchesSearch;
  });

  const openModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  if (loading === 'loading') {
    return <p>Loading...</p>;
  }

  if (error === 'failed') {
    return <p>Failed to load products.</p>;
  }

  return (
    <div>
      <Navbar />

      <div className="flex flex-col md:flex-row md:h-screen p-4 mt-6">
        {/* Filter Section */}
        <div className="md:w-1/5 bg-gray-50 p-3 shadow-md">
          <button
            className="block md:hidden bg-green-600 text-white w-full p-2 rounded-md mb-4"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
          <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
            <div className="sticky top-2">
              <h2 className="text-md font-semibold mb-4 text-center text-green-700">Filters</h2>
              {/* Search Bar */}
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border border-green-300 rounded-md p-2 text-sm focus:outline-none focus:ring focus:ring-green-300"
                />
              </div>
              {/* Category Filter */}
              <div className="mb-3">
                <h3 className="text-sm font-semibold text-green-700 mb-2">Category</h3>
                <div className="grid grid-cols-2 gap-1">
                  {['Fruits', 'Vegetables', 'Grain', 'Dairy', 'Processed Grains'].map((category) => (
                    <div key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        id={category}
                        value={category}
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        className="w-4 h-4 text-green-600 focus:ring-green-500 border-green-300 rounded"
                      />
                      <label htmlFor={category} className="ml-2 text-gray-700 text-xs">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              {/* Location Filter */}
              <div className="mb-3">
                <h3 className="text-sm font-semibold text-green-700 mb-2">Nearby Location</h3>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full border border-green-300 rounded-md p-2 text-sm"
                >
                  <option value="All">All</option>
                  <option value="Eastern Province"> kigali</option>
                  <option value="Eastern Province">Eastern Province</option>
                  <option value="Western Province">Western Province</option>
                  <option value="Northern Province">Northern Province</option>
                  <option value="Southern Province">Southern Province</option>
                </select>
              </div>
              {/* Price Filter */}
              <div className="mb-3">
                <h3 className="text-sm font-semibold text-green-700 mb-2">Price Range</h3>
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="w-full border border-green-300 rounded-md p-2 text-sm"
                >
                  <option value="All">All Prices</option>
                  <option value="Low">Below 1000 RWF</option>
                  <option value="High">Above 1000 RWF</option>
                </select>
              </div>
              {/* Harvest Date Filter */}
              <div className="mb-3">
                <h3 className="text-sm font-semibold text-green-700 mb-2">Harvest Date</h3>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full border border-green-300 rounded-md p-2 text-sm focus:outline-none focus:ring focus:ring-green-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Product Section */}
        <div className="flex-1 p-6 overflow-y-auto">
          <h2 className="text-lg font-bold text-green-700 mb-6 text-center">Fresh Products</h2>
          <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-md rounded-lg min-w-[260px] max-w-[300px] flex-grow mx-auto border border-green-200"
              >
                <div className="bg-green-600 text-white text-center py-3 rounded-t-lg">
                  <h3 className="text-lg font-bold uppercase">{product.product_name}</h3>
                </div>
                <div
                  className="relative h-48 bg-gray-300 bg-center bg-cover"
                  style={{ backgroundImage: `url(${BASE_URL}${product.image})` }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                </div>
                <div className="p-4">
                  <div className="bg-green-100 rounded-lg p-3 text-gray-700 text-sm shadow-sm">
                    <p>
                      <strong>Cooperative:</strong> {cooperativeNames[product.user] || 'Loading...'}
                    </p>
                    <p>
                      <strong>Harvest Date:</strong> {new Date(product.harvest_date).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Price:</strong> {product.price} RWF
                    </p>
                  </div>
                </div>
                <div className="p-4 border-t border-green-200 bg-green-50 rounded-b-lg">
                  <button
                    className="w-full px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700"
                    onClick={() => openModal(product)}
                  >
                    View More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <Modal
          product={selectedProduct}
          cooperative={cooperativeDetails[selectedProduct.user]}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default ProductListingPage;
