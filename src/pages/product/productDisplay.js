
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { listProducts } from '../../Redux/Slices/product/product';
// import { fetchCooperativeDetails } from '../../Redux/Slices/cooperative/coop_details';
// import Navbar from '../../components/sidebar';

// const Modal = ({ product, cooperative, onClose }) => {
//   if (!product || !cooperative) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white rounded-lg shadow-lg border-4 border-green-600 w-4/5 md:w-1/2 lg:w-1/3 p-6 relative">
//         {/* Header */}
//         <h1 className="text-2xl font-bold text-center text-green-700 mb-6">
//         product details</h1>
        
//         {/* Product Section */}
//         <div className="border-b border-gray-300 pb-4 mb-4">
//           <h2 className="text-xl font-bold text-green-600 mb-2">{product.product_name}</h2>
//           <p className="text-sm text-gray-700 mb-2">
//             <strong>Description:</strong> {product.description || 'No description provided.'}
//           </p>
//           <p className="text-sm text-gray-700 mb-2">
//             <strong>Price:</strong> {product.price} RWF
//           </p>
//           <p className="text-sm text-gray-700 mb-2">
//             <strong>Harvest Date:</strong> {new Date(product.harvest_date).toLocaleDateString()}
//           </p>
//         </div>
  
//         {/* Cooperative Details */}
//         <div className="pb-4 mb-4">
//         <h1 className="text-2xl font-bold text-center text-green-700 mb-6">
//           {cooperative.name}
//         </h1>
  
//           <p className="text-sm text-gray-700 mb-2">
//             <strong>Specialization:</strong> {cooperative.specialization}
//           </p>
//           <p className="text-sm text-gray-700 mb-2">
//             <strong>Location:</strong> {cooperative.province}, {cooperative.district}, {cooperative.sector}
//           </p>
//           <p className="text-sm text-gray-700">
//             <strong>Contact:</strong> {cooperative.contact || 'Not available'}
//           </p>
//         </div>
  
//         {/* Footer */}
//         <div className="flex flex-col md:flex-row justify-between gap-4">
//           <button
//             className="w-full md:w-auto px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
//             onClick={() => alert('Getting in touch with the cooperative...')}
//           >
//             Contact Cooperative
//           </button>
//           <button
//             className="w-full md:w-auto px-4 py-2 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700"
//             onClick={onClose}
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
  
// }
// const ProductListingPage = () => {
//   const dispatch = useDispatch();

//   const products = useSelector((state) => state.product.products);
//   const loading = useSelector((state) => state.product.loading);
//   const error = useSelector((state) => state.product.error);
//   const BASE_URL = process.env.REACT_APP_API_BASE_URL;

//   const [selectedLocation, setSelectedLocation] = useState('All');
//   const [selectedDate, setSelectedDate] = useState('');
//   const [selectedPriceRange, setSelectedPriceRange] = useState('All');
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [cooperativeNames, setCooperativeNames] = useState({});
//   const [cooperativeDetails, setCooperativeDetails] = useState({});
//   const [showFilters, setShowFilters] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     dispatch(listProducts());
//   }, [dispatch]);

//   useEffect(() => {
//     const fetchCooperativeNames = async () => {
//       const names = {};
//       const details = {};
//       for (const product of products) {
//         if (product.user && !names[product.user]) {
//           try {
//             const response = await dispatch(fetchCooperativeDetails(product.user)).unwrap();
//             names[product.user] = response.name || 'Unknown Cooperative';
//             details[product.user] = response;
//           } catch (error) {
//             console.error(`Failed to fetch details for user ID ${product.user}:`, error);
//           }
//         }
//       }
//       setCooperativeNames(names);
//       setCooperativeDetails(details);
//     };

//     if (products.length > 0) {
//       fetchCooperativeNames();
//     }
//   }, [dispatch, products]);

//   const handleCategoryChange = (category) => {
//     setSelectedCategories((prev) =>
//       prev.includes(category)
//         ? prev.filter((cat) => cat !== category)
//         : [...prev, category]
//     );
//   };

//   const filteredProducts = products.filter((product) => {
//     const cooperative = cooperativeDetails[product.user] || {};
//     const matchesLocation = selectedLocation === 'All' || cooperative.province === selectedLocation;
//     const matchesDate = selectedDate === '' || product.harvest_date >= selectedDate;
//     const matchesPrice =
//       selectedPriceRange === 'All' || (selectedPriceRange === 'Low' ? product.price <= 1000 : product.price > 1000);
//     const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
//     const matchesSearch =
//       searchTerm === '' || product.product_name.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesLocation && matchesDate && matchesPrice && matchesCategory && matchesSearch;
//   });

//   const openModal = (product) => {
//     setSelectedProduct(product);
//     setShowModal(true);
//   };

//   if (loading === 'loading') {
//     return <p>Loading...</p>;
//   }

//   if (error === 'failed') {
//     return <p>Failed to load products.</p>;
//   }

//   return (
//     <div>
//       <Navbar />

//       <div className="flex flex-col md:flex-row md:h-screen p-4 mt-6">
//         {/* Filter Section */}
//         <div className="md:w-1/5 bg-gray-50 p-3 shadow-md">
//           <button
//             className="block md:hidden bg-green-600 text-white w-full p-2 rounded-md mb-4"
//             onClick={() => setShowFilters(!showFilters)}
//           >
//             {showFilters ? 'Hide Filters' : 'Show Filters'}
//           </button>
//           <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
//             <div className="sticky top-2">
//               <h2 className="text-md font-semibold mb-4 text-center text-green-700">Filters</h2>
//               {/* Search Bar */}
//               <div className="mb-3">
//                 <input
//                   type="text"
//                   placeholder="Search products..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full border border-green-300 rounded-md p-2 text-sm focus:outline-none focus:ring focus:ring-green-300"
//                 />
//               </div>
//               {/* Category Filter */}
//               <div className="mb-3">
//                 <h3 className="text-sm font-semibold text-green-700 mb-2">Category</h3>
//                 <div className="grid grid-cols-2 gap-1">
//                   {['Fruits', 'Vegetables', 'Grain', 'Dairy', 'Processed Grains'].map((category) => (
//                     <div key={category} className="flex items-center">
//                       <input
//                         type="checkbox"
//                         id={category}
//                         value={category}
//                         checked={selectedCategories.includes(category)}
//                         onChange={() => handleCategoryChange(category)}
//                         className="w-4 h-4 text-green-600 focus:ring-green-500 border-green-300 rounded"
//                       />
//                       <label htmlFor={category} className="ml-2 text-gray-700 text-xs">
//                         {category}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               {/* Location Filter */}
//               <div className="mb-3">
//                 <h3 className="text-sm font-semibold text-green-700 mb-2">Nearby Location</h3>
//                 <select
//                   value={selectedLocation}
//                   onChange={(e) => setSelectedLocation(e.target.value)}
//                   className="w-full border border-green-300 rounded-md p-2 text-sm"
//                 >
//                   <option value="All">All</option>
//                   <option value="Eastern Province"> kigali</option>
//                   <option value="Eastern Province">Eastern Province</option>
//                   <option value="Western Province">Western Province</option>
//                   <option value="Northern Province">Northern Province</option>
//                   <option value="Southern Province">Southern Province</option>
//                 </select>
//               </div>
//               {/* Price Filter */}
//               <div className="mb-3">
//                 <h3 className="text-sm font-semibold text-green-700 mb-2">Price Range</h3>
//                 <select
//                   value={selectedPriceRange}
//                   onChange={(e) => setSelectedPriceRange(e.target.value)}
//                   className="w-full border border-green-300 rounded-md p-2 text-sm"
//                 >
//                   <option value="All">All Prices</option>
//                   <option value="Low">Below 1000 RWF</option>
//                   <option value="High">Above 1000 RWF</option>
//                 </select>
//               </div>
//               {/* Harvest Date Filter */}
//               <div className="mb-3">
//                 <h3 className="text-sm font-semibold text-green-700 mb-2">Harvest Date</h3>
//                 <input
//                   type="date"
//                   value={selectedDate}
//                   onChange={(e) => setSelectedDate(e.target.value)}
//                   className="w-full border border-green-300 rounded-md p-2 text-sm focus:outline-none focus:ring focus:ring-green-300"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Product Section */}
//         {/* <div className="flex-1 p-6 overflow-y-auto">
//           <h2 className="text-lg font-bold text-green-700 mb-6 text-center">Fresh Products</h2>
//           <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
//             {filteredProducts.map((product) => (
//               <div
//                 key={product.id}
//                 className="bg-white shadow-md rounded-lg min-w-[260px] max-w-[300px] flex-grow mx-auto border border-green-200"
//               >
//                 <div className="bg-green-600 text-white text-center py-3 rounded-t-lg">
//                   <h3 className="text-lg font-bold uppercase">{product.product_name}</h3>
//                 </div>
//                 <div
//                   className="relative h-48 bg-gray-300 bg-center bg-cover"
//                   style={{ backgroundImage: `url(${BASE_URL}${product.image})` }}
//                 >
//                   <div className="absolute inset-0 bg-black bg-opacity-10"></div>
//                 </div>
//                 <div className="p-4">
//                   <div className="bg-green-100 rounded-lg p-3 text-gray-700 text-sm shadow-sm">
//                     <p>
//                       <strong>Cooperative:</strong> {cooperativeNames[product.user] || 'Loading...'}
//                     </p>
//                     <p>
//                       <strong>Harvest Date:</strong> {new Date(product.harvest_date).toLocaleDateString()}
//                     </p>
//                     <p>
//                       <strong>Price:</strong> {product.price} RWF
//                     </p>
//                   </div>
//                 </div>
//                 <div className="p-4 border-t border-green-200 bg-green-50 rounded-b-lg">
//                   <button
//                     className="w-full px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700"
//                     onClick={() => openModal(product)}
//                   >
//                     View More
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div> */}
        
//         {/* Product Section */}
// <div className="flex-1 p-6 overflow-y-auto">
//   <h2 className="text-lg font-bold text-green-700 mb-6 text-center">Fresh Products</h2>
//   <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
//     {filteredProducts.map((product) => (
//       <div
//         key={product.id}
//         className="bg-white shadow-md rounded-lg w-full max-w-lg flex border border-green-200 overflow-hidden"
//       >
//         {/* Image Section */}
//         <div
//           className="w-48 h-48 bg-gray-300 bg-center bg-cover flex-shrink-0"
//           style={{ backgroundImage: `url(${BASE_URL}${product.image})` }}
//         />

//         {/* Text Section */}
//         <div className="flex-1 p-4 flex flex-col justify-between">
//           {/* Product Details */}
//           <div>
//             <h3 className="text-lg font-bold text-green-700">{product.product_name}</h3>
//             <p className="text-sm text-gray-700 mt-2">
//               <strong>Cooperative:</strong> {cooperativeNames[product.user] || 'Loading...'}
//             </p>
//             <p className="text-sm text-gray-700">
//               <strong>Harvest Date:</strong> {new Date(product.harvest_date).toLocaleDateString()}
//             </p>
//             <p className="text-sm text-gray-700">
//               <strong>Price:</strong> {product.price} RWF
//             </p>
//           </div>

//           {/* Action Button */}
//           <button
//             className="mt-4 px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700"
//             onClick={() => openModal(product)}
//           >
//             View More
//           </button>
//         </div>
//       </div>
//     ))}
//   </div>
// </div>

//       </div>

//       {/* Modal */}
//       {showModal && (
//         <Modal
//           product={selectedProduct}
//           cooperative={cooperativeDetails[selectedProduct.user]}
//           onClose={() => setShowModal(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default ProductListingPage;



import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../Redux/Slices/product/product';
import { fetchCooperativeDetails } from '../../Redux/Slices/cooperative/coop_details';
import { 
  Leaf, Search, Filter, X, ChevronDown, 
  MapPin, Calendar, DollarSign, SlidersHorizontal 
} from 'lucide-react';
import Navbar from '../../components/sidebar';

const TopFilters = ({ activeFilters, setActiveFilters }) => (
  <div className="bg-white shadow-sm border-b border-green-100">
    <div className="container mx-auto px-4 py-3">
      <div className="flex flex-wrap items-center gap-4">
        {/* Quick Category Pills */}
        <div className="flex gap-2 flex-wrap">
          {['All', 'Fruits', 'Vegetables', 'Grain', 'Dairy'].map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilters({
                ...activeFilters,
                category: category === 'All' ? '' : category
              })}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors
                ${activeFilters.category === category || (category === 'All' && !activeFilters.category)
                  ? 'bg-green-600 text-white'
                  : 'bg-green-50 text-green-700 hover:bg-green-100'}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Quick Price Filters */}
        <div className="flex gap-2 ml-auto">
          <select
            value={activeFilters.priceRange}
            onChange={(e) => setActiveFilters({ ...activeFilters, priceRange: e.target.value })}
            className="px-4 py-1.5 rounded-lg text-sm border border-green-200 
                     focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">All Prices</option>
            <option value="low">Under 1000 RWF</option>
            <option value="medium">1000-5000 RWF</option>
            <option value="high">Above 5000 RWF</option>
          </select>
        </div>
      </div>
    </div>
  </div>
);

const ProductCard = ({ product, cooperativeName, BASE_URL, onViewMore }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:shadow-xl border border-green-100">
    <div className="relative">
      <div 
        className="h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${BASE_URL}${product.image})` }}
      />
      <div className="absolute top-0 right-0 bg-green-500 text-white px-3 py-1 rounded-bl-lg">
        {product.category}
      </div>
    </div>
    
    <div className="p-4">
      <h3 className="text-xl font-bold text-green-800 mb-2">{product.product_name}</h3>
      
      <div className="space-y-2 text-sm">
        <div className="flex items-center text-gray-600">
          <Leaf className="w-4 h-4 mr-2 text-green-600" />
          <span>{cooperativeName}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2 text-green-600" />
          <span>{product.location || 'Location not specified'}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Calendar className="w-4 h-4 mr-2 text-green-600" />
          <span>Harvested: {new Date(product.harvest_date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <DollarSign className="w-4 h-4 mr-2 text-green-600" />
          <span className="text-lg font-semibold text-green-700">{product.price} RWF</span>
        </div>
      </div>
      
      <button
        onClick={() => onViewMore(product)}
        className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg 
                 transition-colors duration-200 flex items-center justify-center gap-2"
      >
        View Details
      </button>
    </div>
  </div>
);

const SideFilter = ({ filters, setFilters, showMobileFilters, setShowMobileFilters }) => (
  <div className={`
    fixed md:relative inset-y-0 left-0 z-40 w-72 bg-white shadow-lg md:shadow-none
    transform ${showMobileFilters ? 'translate-x-0' : '-translate-x-full'} 
    md:transform-none transition-transform duration-200 ease-in-out
  `}>
    <div className="h-full overflow-y-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-green-800">Filters</h2>
        <button 
          onClick={() => setShowMobileFilters(false)}
          className="md:hidden text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-green-800 mb-2">Search</label>
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={filters.searchTerm}
            onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border-2 border-green-100 rounded-lg 
                     focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Location */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-green-800 mb-2">Location</label>
        <div className="space-y-2">
          {['All Locations', 'Kigali', 'Eastern', 'Western', 'Northern', 'Southern'].map((location) => (
            <label key={location} className="flex items-center p-2 rounded-lg hover:bg-green-50">
              <input
                type="radio"
                name="location"
                value={location}
                checked={filters.location === location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="w-4 h-4 text-green-600 focus:ring-green-500 border-green-300"
              />
              <span className="ml-3 text-gray-700">{location}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Harvest Date Range */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-green-800 mb-2">Harvest Date</label>
        <input
          type="date"
          value={filters.harvestDate}
          onChange={(e) => setFilters({ ...filters, harvestDate: e.target.value })}
          className="w-full p-2 border-2 border-green-100 rounded-lg 
                   focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      {/* Quality Rating */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-green-800 mb-2">Quality Rating</label>
        <select
          value={filters.quality}
          onChange={(e) => setFilters({ ...filters, quality: e.target.value })}
          className="w-full p-2 border-2 border-green-100 rounded-lg 
                   focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="">All Ratings</option>
          <option value="premium">Premium Quality</option>
          <option value="standard">Standard Quality</option>
          <option value="economy">Economy Quality</option>
        </select>
      </div>

      {/* Clear Filters Button */}
      <button
        onClick={() => setFilters({
          searchTerm: '',
          location: 'All Locations',
          harvestDate: '',
          quality: '',
          categories: []
        })}
        className="w-full py-2 text-green-600 border-2 border-green-600 rounded-lg 
                 hover:bg-green-50 transition-colors duration-200"
      >
        Clear All Filters
      </button>
    </div>
  </div>
);

const ProductListingPage = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    searchTerm: '',
    location: 'All Locations',
    harvestDate: '',
    quality: '',
    categories: []
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cooperativeNames, setCooperativeNames] = useState({});
  const [activeFilters, setActiveFilters] = useState({
    category: '',
    priceRange: ''
  });

  const products = useSelector((state) => state.product.products);
  const loading = useSelector((state) => state.product.loading);
  const error = useSelector((state) => state.product.error);
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  useEffect(() => {
    const fetchCoopNames = async () => {
      const names = {};
      for (const product of products) {
        if (product.user && !names[product.user]) {
          try {
            const response = await dispatch(fetchCooperativeDetails(product.user)).unwrap();
            names[product.user] = response.name || 'Unknown Cooperative';
          } catch (error) {
            console.error(`Failed to fetch cooperative name:`, error);
          }
        }
      }
      setCooperativeNames(names);
    };

    if (products.length > 0) {
      fetchCoopNames();
    }
  }, [dispatch, products]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = !filters.searchTerm || 
      product.product_name.toLowerCase().includes(filters.searchTerm.toLowerCase());
    const matchesLocation = filters.location === 'All Locations' || 
      product.location === filters.location;
    const matchesDate = !filters.harvestDate || 
      new Date(product.harvest_date) >= new Date(filters.harvestDate);
    const matchesQuality = !filters.quality || 
      product.quality === filters.quality;
    const matchesTopCategory = !activeFilters.category || 
      product.category === activeFilters.category;
    const matchesTopPrice = !activeFilters.priceRange || 
      (activeFilters.priceRange === 'low' && product.price < 1000) ||
      (activeFilters.priceRange === 'medium' && product.price >= 1000 && product.price <= 5000) ||
      (activeFilters.priceRange === 'high' && product.price > 5000);

    return matchesSearch && matchesLocation && matchesDate && 
           matchesQuality && matchesTopCategory && matchesTopPrice;
  });

  if (loading === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-600">Failed to load products. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Navbar />
       */}
      {/* Top Filter Bar */}
      <TopFilters activeFilters={activeFilters} setActiveFilters={setActiveFilters} />

      <main className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap items-center justify-between mb-8 bg-white shadow-sm p-4 rounded-lg border border-green-200">
  <h1 className="text-2xl md:text-3xl font-bold text-green-800">Fresh Agricultural Products</h1>

  {/* Filter Buttons */}
  <div className="flex gap-4">
    {/* Sort Dropdown */}
    <select
      className="px-4 py-2 rounded-lg border border-green-300 text-green-800 focus:ring-2 focus:ring-green-500"
    >
      <option>Sort by</option>
      <option>Price: Low to High</option>
      <option>Price: High to Low</option>
      <option>Newest First</option>
    </select>

    {/* Filter Button (for Mobile) */}
    <button
      onClick={() => setShowMobileFilters(true)}
      className="md:hidden flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md transition-all"
    >
      <SlidersHorizontal className="w-5 h-5" />
      <span>Filters</span>
    </button>
  </div>
</div>

        <div className="flex gap-8">
          {/* Side Filters */}
          <SideFilter
            filters={filters}
            setFilters={setFilters}
            showMobileFilters={showMobileFilters}
            setShowMobileFilters={setShowMobileFilters}
          />

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  cooperativeName={cooperativeNames[product.user]}
                  BASE_URL={BASE_URL}
                  onViewMore={setSelectedProduct}
                />
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products match your current filters.</p>
                <button
                  onClick={() => {
                    setFilters({
                      searchTerm: '',
                      location: 'All Locations',
                      harvestDate: '',
                      quality: '',
                      categories: []
                    });
                    setActiveFilters({
                      category: '',
                      priceRange: ''
                    });
                  }}
                  className="mt-4 text-green-600 hover:text-green-700 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductListingPage;
