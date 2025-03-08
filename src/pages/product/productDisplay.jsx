// // import React, { useEffect, useState } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { listProducts } from '../../Redux/Slices/product/product';
// // import { fetchCooperativeDetails } from '../../Redux/Slices/cooperative/coop_details';
// // import { 
// //   Leaf, Search, Filter, X, ChevronDown, 
// //   MapPin, Calendar, DollarSign, SlidersHorizontal 
// // } from 'lucide-react';
// // import Navbar from '../../components/sidebar';

// // // Modal Component
// // const Modal = ({ product, cooperative, onClose }) => {
// //   if (!product || !cooperative) return null;

// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
// //       <div className="bg-white rounded-lg shadow-lg border-4 border-green-600 w-4/5 md:w-1/2 lg:w-1/3 p-6 relative">
// //         {/* Header */}
// //         <h1 className="text-2xl font-bold text-center text-green-700 mb-6">
// //           Product Details
// //         </h1>
        
// //         {/* Product Section */}
// //         <div className="border-b border-gray-300 pb-4 mb-4">
// //           <h2 className="text-xl font-bold text-green-600 mb-2">{product.product_name}</h2>
// //           <p className="text-sm text-gray-700 mb-2">
// //             <strong>Description:</strong> {product.description || 'No description provided.'}
// //           </p>
// //           <p className="text-sm text-gray-700 mb-2">
// //             <strong>Price:</strong> {product.price} RWF
// //           </p>
// //           <p className="text-sm text-gray-700 mb-2">
// //             <strong>Harvest Date:</strong> {new Date(product.harvest_date).toLocaleDateString()}
// //           </p>
// //         </div>
  
// //         {/* Cooperative Details */}
// //         <div className="pb-4 mb-4">
// //           <h1 className="text-2xl font-bold text-center text-green-700 mb-6">
// //             {cooperative.name}
// //           </h1>
  
// //           <p className="text-sm text-gray-700 mb-2">
// //             <strong>Specialization:</strong> {cooperative.specialization}
// //           </p>
// //           <p className="text-sm text-gray-700 mb-2">
// //             <strong>Location:</strong> {cooperative.province}, {cooperative.district}, {cooperative.sector}
// //           </p>
// //           <p className="text-sm text-gray-700">
// //             <strong>Contact:</strong> {cooperative.contact || 'Not available'}
// //           </p>
// //         </div>
  
// //         {/* Footer */}
// //         <div className="flex flex-col md:flex-row justify-between gap-4">
// //           <button
// //             className="w-full md:w-auto px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
// //             onClick={() => alert('Getting in touch with the cooperative...')}
// //           >
// //             Contact Cooperative
// //           </button>
// //           <button
// //             className="w-full md:w-auto px-4 py-2 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700"
// //             onClick={onClose}
// //           >
// //             Close
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const TopFilters = ({ activeFilters, setActiveFilters }) => (
// //   <div className="bg-white shadow-sm border-b border-green-100">
// //     <div className="container mx-auto px-4 py-3">
// //       <div className="flex flex-wrap items-center gap-4">
// //         {/* Quick Category Pills */}
// //         <div className="flex gap-2 flex-wrap">
// //           {['All', 'Fruits', 'Vegetables', 'Grain', 'Dairy'].map((category) => (
// //             <button
// //               key={category}
// //               onClick={() => setActiveFilters({
// //                 ...activeFilters,
// //                 category: category === 'All' ? '' : category
// //               })}
// //               className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors
// //                 ${activeFilters.category === category || (category === 'All' && !activeFilters.category)
// //                   ? 'bg-green-600 text-white'
// //                   : 'bg-green-50 text-green-700 hover:bg-green-100'}`}
// //             >
// //               {category}
// //             </button>
// //           ))}
// //         </div>

// //         {/* Quick Price Filters */}
// //         <div className="flex gap-2 ml-auto">
// //           <select
// //             value={activeFilters.priceRange}
// //             onChange={(e) => setActiveFilters({ ...activeFilters, priceRange: e.target.value })}
// //             className="px-4 py-1.5 rounded-lg text-sm border border-green-200 
// //                      focus:ring-2 focus:ring-green-500 focus:border-transparent"
// //           >
// //             <option value="">All Prices</option>
// //             <option value="low">Under 1000 RWF</option>
// //             <option value="medium">1000-5000 RWF</option>
// //             <option value="high">Above 5000 RWF</option>
// //           </select>
// //         </div>
// //       </div>
// //     </div>
// //   </div>
// // );

// // const ProductCard = ({ product, cooperativeName, BASE_URL, onViewMore }) => (
// //   <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:shadow-xl border border-green-100">
// //     <div className="relative">
// //       <div 
// //         className="h-48 bg-cover bg-center"
// //         style={{ backgroundImage: `url(${BASE_URL}${product.image})` }}
// //       />
// //       <div className="absolute top-0 right-0 bg-green-500 text-white px-3 py-1 rounded-bl-lg">
// //         {product.category}
// //       </div>
// //     </div>
    
// //     <div className="p-4">
// //       <h3 className="text-xl font-bold text-green-800 mb-2">{product.product_name}</h3>
      
// //       <div className="space-y-2 text-sm">
// //         <div className="flex items-center text-gray-600">
// //           <Leaf className="w-4 h-4 mr-2 text-green-600" />
// //           <span>{cooperativeName}</span>
// //         </div>
// //         <div className="flex items-center text-gray-600">
// //           <MapPin className="w-4 h-4 mr-2 text-green-600" />
// //           <span>{product.location || 'Location not specified'}</span>
// //         </div>
// //         <div className="flex items-center text-gray-600">
// //           <Calendar className="w-4 h-4 mr-2 text-green-600" />
// //           <span>Harvested: {new Date(product.harvest_date).toLocaleDateString()}</span>
// //         </div>
// //         <div className="flex items-center text-gray-600">
// //           <DollarSign className="w-4 h-4 mr-2 text-green-600" />
// //           <span className="text-lg font-semibold text-green-700">{product.price} RWF</span>
// //         </div>
// //       </div>
      
// //       <button
// //         onClick={() => onViewMore(product)}
// //         className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg 
// //                  transition-colors duration-200 flex items-center justify-center gap-2"
// //       >
// //         View Details
// //       </button>
// //     </div>
// //   </div>
// // );

// // const SideFilter = ({ filters, setFilters, showMobileFilters, setShowMobileFilters }) => (
// //   <div className={`
// //     fixed md:relative inset-y-0 left-0 z-40 w-72 bg-white shadow-lg md:shadow-none
// //     transform ${showMobileFilters ? 'translate-x-0' : '-translate-x-full'} 
// //     md:transform-none transition-transform duration-200 ease-in-out
// //   `}>
// //     <div className="h-full overflow-y-auto p-6">
// //       <div className="flex items-center justify-between mb-6">
// //         <h2 className="text-xl font-bold text-green-800">Filters</h2>
// //         <button 
// //           onClick={() => setShowMobileFilters(false)}
// //           className="md:hidden text-gray-500 hover:text-gray-700"
// //         >
// //           <X className="w-6 h-6" />
// //         </button>
// //       </div>

// //       {/* Search */}
// //       <div className="mb-6">
// //         <label className="block text-sm font-medium text-green-800 mb-2">Search</label>
// //         <div className="relative">
// //           <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
// //           <input
// //             type="text"
// //             value={filters.searchTerm}
// //             onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
// //             placeholder="Search products..."
// //             className="w-full pl-10 pr-4 py-2 border-2 border-green-100 rounded-lg 
// //                      focus:ring-2 focus:ring-green-500 focus:border-transparent"
// //           />
// //         </div>
// //       </div>

// //       {/* Location */}
// //       <div className="mb-6">
// //         <label className="block text-sm font-medium text-green-800 mb-2">Location</label>
// //         <div className="space-y-2">
// //           {['All Locations', 'Kigali', 'Eastern', 'Western', 'Northern', 'Southern'].map((location) => (
// //             <label key={location} className="flex items-center p-2 rounded-lg hover:bg-green-50">
// //               <input
// //                 type="radio"
// //                 name="location"
// //                 value={location}
// //                 checked={filters.location === location}
// //                 onChange={(e) => setFilters({ ...filters, location: e.target.value })}
// //                 className="w-4 h-4 text-green-600 focus:ring-green-500 border-green-300"
// //               />
// //               <span className="ml-3 text-gray-700">{location}</span>
// //             </label>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Harvest Date Range */}
// //       <div className="mb-6">
// //         <label className="block text-sm font-medium text-green-800 mb-2">Harvest Date</label>
// //         <input
// //           type="date"
// //           value={filters.harvestDate}
// //           onChange={(e) => setFilters({ ...filters, harvestDate: e.target.value })}
// //           className="w-full p-2 border-2 border-green-100 rounded-lg 
// //                    focus:ring-2 focus:ring-green-500 focus:border-transparent"
// //         />
// //       </div>

// //       {/* Quality Rating */}
// //       <div className="mb-6">
// //         <label className="block text-sm font-medium text-green-800 mb-2">Quality Rating</label>
// //         <select
// //           value={filters.quality}
// //           onChange={(e) => setFilters({ ...filters, quality: e.target.value })}
// //           className="w-full p-2 border-2 border-green-100 rounded-lg 
// //                    focus:ring-2 focus:ring-green-500 focus:border-transparent"
// //         >
// //           <option value="">All Ratings</option>
// //           <option value="premium">Premium Quality</option>
// //           <option value="standard">Standard Quality</option>
// //           <option value="economy">Economy Quality</option>
// //         </select>
// //       </div>

// //       {/* Clear Filters Button */}
// //       <button
// //         onClick={() => setFilters({
// //           searchTerm: '',
// //           location: 'All Locations',
// //           harvestDate: '',
// //           quality: '',
// //           categories: []
// //         })}
// //         className="w-full py-2 text-green-600 border-2 border-green-600 rounded-lg 
// //                  hover:bg-green-50 transition-colors duration-200"
// //       >
// //         Clear All Filters
// //       </button>
// //     </div>
// //   </div>
// // );

// // const ProductListingPage = () => {
// //   const dispatch = useDispatch();
// //   const [filters, setFilters] = useState({
// //     searchTerm: '',
// //     location: 'All Locations',
// //     harvestDate: '',
// //     quality: '',
// //     categories: []
// //   });
// //   const [showMobileFilters, setShowMobileFilters] = useState(false);
// //   const [selectedProduct, setSelectedProduct] = useState(null);
// //   const [selectedCooperative, setSelectedCooperative] = useState(null);
// //   const [cooperativeNames, setCooperativeNames] = useState({});
// //   const [activeFilters, setActiveFilters] = useState({
// //     category: '',
// //     priceRange: ''
// //   });

// //   const products = useSelector((state) => state.product.products);
// //   const loading = useSelector((state) => state.product.loading);
// //   const error = useSelector((state) => state.product.error);
// //   const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// //   useEffect(() => {
// //     dispatch(listProducts());
// //   }, [dispatch]);

// //   useEffect(() => {
// //     const fetchCoopNames = async () => {
// //       const names = {};
// //       for (const product of products) {
// //         if (product.user && !names[product.user]) {
// //           try {
// //             const response = await dispatch(fetchCooperativeDetails(product.user)).unwrap();
// //             names[product.user] = response.name || 'Unknown Cooperative';
// //           } catch (error) {
// //             console.error(`Failed to fetch cooperative name:`, error);
// //           }
// //         }
// //       }
// //       setCooperativeNames(names);
// //     };

// //     if (products.length > 0) {
// //       fetchCoopNames();
// //     }
// //   }, [dispatch, products]);

// //   // Handle viewing product details
// //   const handleViewProduct = async (product) => {
// //     try {
// //       const cooperativeData = await dispatch(fetchCooperativeDetails(product.user)).unwrap();
// //       setSelectedProduct(product);
// //       setSelectedCooperative(cooperativeData);
// //     } catch (error) {
// //       console.error('Failed to fetch cooperative details:', error);
// //     }
// //   };

// //   // Handle closing the modal
// //   const handleCloseModal = () => {
// //     setSelectedProduct(null);
// //     setSelectedCooperative(null);
// //   };

// //   const filteredProducts = products.filter(product => {
// //     const matchesSearch = !filters.searchTerm || 
// //       product.product_name.toLowerCase().includes(filters.searchTerm.toLowerCase());
// //     const matchesLocation = filters.location === 'All Locations' || 
// //       product.location === filters.location;
// //     const matchesDate = !filters.harvestDate || 
// //       new Date(product.harvest_date) >= new Date(filters.harvestDate);
// //     const matchesQuality = !filters.quality || 
// //       product.quality === filters.quality;
// //     const matchesTopCategory = !activeFilters.category || 
// //       product.category === activeFilters.category;
// //     const matchesTopPrice = !activeFilters.priceRange || 
// //       (activeFilters.priceRange === 'low' && product.price < 1000) ||
// //       (activeFilters.priceRange === 'medium' && product.price >= 1000 && product.price <= 5000) ||
// //       (activeFilters.priceRange === 'high' && product.price > 5000);

// //     return matchesSearch && matchesLocation && matchesDate && 
// //            matchesQuality && matchesTopCategory && matchesTopPrice;
// //   });

// //   if (loading === 'loading') {
// //     return (
// //       <div className="flex items-center justify-center h-screen">
// //         <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="text-center p-8">
// //         <p className="text-red-600">Failed to load products. Please try again later.</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       {/* <Navbar />
// //        */}
// //       {/* Top Filter Bar */}
      
// //       <TopFilters activeFilters={activeFilters} setActiveFilters={setActiveFilters} />

// //       <main className="container mx-auto px-4 py-8">
// //       <div className="flex flex-wrap items-center justify-between mb-8 bg-white shadow-sm p-4 rounded-lg border border-green-200">
// //   <h1 className="text-2xl md:text-3xl font-bold text-green-800">Fresh Agricultural Products</h1>

// //   {/* Filter Buttons */}
// //   <div className="flex gap-4">
// //     {/* Sort Dropdown */}
// //     <select
// //       className="px-4 py-2 rounded-lg border border-green-300 text-green-800 focus:ring-2 focus:ring-green-500"
// //     >
// //       <option>Sort by</option>
// //       <option>Price: Low to High</option>
// //       <option>Price: High to Low</option>
// //       <option>Newest First</option>
// //     </select>

// //     {/* Filter Button (for Mobile) */}
// //     <button
// //       onClick={() => setShowMobileFilters(true)}
// //       className="md:hidden flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md transition-all"
// //     >
// //       <SlidersHorizontal className="w-5 h-5" />
// //       <span>Filters</span>
// //     </button>
// //   </div>
// // </div>

// //         <div className="flex gap-8">
// //           {/* Side Filters */}
// //           <SideFilter
// //             filters={filters}
// //             setFilters={setFilters}
// //             showMobileFilters={showMobileFilters}
// //             setShowMobileFilters={setShowMobileFilters}
// //           />

// //           {/* Product Grid */}
// //           <div className="flex-1">
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //               {filteredProducts.map(product => (
// //                 <ProductCard
// //                   key={product.id}
// //                   product={product}
// //                   cooperativeName={cooperativeNames[product.user]}
// //                   BASE_URL={BASE_URL}
// //                   onViewMore={() => handleViewProduct(product)}
// //                 />
// //               ))}
// //             </div>
            
// //             {filteredProducts.length === 0 && (
// //               <div className="text-center py-12">
// //                 <p className="text-gray-500 text-lg">No products match your current filters.</p>
// //                 <button
// //                   onClick={() => {
// //                     setFilters({
// //                       searchTerm: '',
// //                       location: 'All Locations',
// //                       harvestDate: '',
// //                       quality: '',
// //                       categories: []
// //                     });
// //                     setActiveFilters({
// //                       category: '',
// //                       priceRange: ''
// //                     });
// //                   }}
// //                   className="mt-4 text-green-600 hover:text-green-700 font-medium"
// //                 >
// //                   Clear all filters
// //                 </button>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </main>
// //       {selectedProduct && selectedCooperative && (
// //         <Modal
// //           product={selectedProduct}
// //           cooperative={selectedCooperative}
// //           onClose={handleCloseModal}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default ProductListingPage;


// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { listProducts } from '../../Redux/Slices/product/product';
// import { fetchCooperativeDetails } from '../../Redux/Slices/cooperative/coop_details';
// import { 
//   Leaf, Search, Filter, X, ChevronDown, 
//   MapPin, Calendar, DollarSign, SlidersHorizontal 
// } from 'lucide-react';
// import Navbar from '../../components/sidebar';

// // Modal Component
// const Modal = ({ product, cooperative, onClose }) => {
//   if (!product || !cooperative) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white rounded-lg shadow-lg border-4 border-green-600 w-4/5 md:w-1/2 lg:w-1/3 p-6 relative">
//         {/* Header */}
//         <h1 className="text-2xl font-bold text-center text-green-700 mb-6">
//           Product Details
//         </h1>
        
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
//           <h1 className="text-2xl font-bold text-center text-green-700 mb-6">
//             {cooperative.name}
//           </h1>
  
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
// };

// const ProductCard = ({ product, cooperativeName, BASE_URL, onViewMore }) => (
//   <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:shadow-xl border border-green-100">
//     <div className="relative">
//       <div 
//         className="h-48 bg-cover bg-center"
//         style={{ backgroundImage: `url(${BASE_URL}${product.image})` }}
//       />
//       <div className="absolute top-0 right-0 bg-green-500 text-white px-3 py-1 rounded-bl-lg">
//         {product.category}
//       </div>
//     </div>
    
//     <div className="p-4">
//       <h3 className="text-xl font-bold text-green-800 mb-2">{product.product_name}</h3>
      
//       <div className="space-y-2 text-sm">
//         <div className="flex items-center text-gray-600">
//           <Leaf className="w-4 h-4 mr-2 text-green-600" />
//           <span>{cooperativeName}</span>
//         </div>
//         <div className="flex items-center text-gray-600">
//           <MapPin className="w-4 h-4 mr-2 text-green-600" />
//           <span>{product.location || 'Location not specified'}</span>
//         </div>
//         <div className="flex items-center text-gray-600">
//           <Calendar className="w-4 h-4 mr-2 text-green-600" />
//           <span>Harvested: {new Date(product.harvest_date).toLocaleDateString()}</span>
//         </div>
//         <div className="flex items-center text-gray-600">
//           <DollarSign className="w-4 h-4 mr-2 text-green-600" />
//           <span className="text-lg font-semibold text-green-700">{product.price} RWF</span>
//         </div>
//       </div>
      
//       <button
//         onClick={() => onViewMore(product)}
//         className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg 
//                  transition-colors duration-200 flex items-center justify-center gap-2"
//       >
//         View Details
//       </button>
//     </div>
//   </div>
// );

// const SideFilter = ({ filters, setFilters, showMobileFilters, setShowMobileFilters, activeFilters, setActiveFilters }) => (
//   <div className={`
//     fixed md:relative inset-y-0 left-0 z-40 w-72 bg-white shadow-lg md:shadow-none
//     transform ${showMobileFilters ? 'translate-x-0' : '-translate-x-full'} 
//     md:transform-none transition-transform duration-200 ease-in-out
//   `}>
//     <div className="h-full overflow-y-auto p-6">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-xl font-bold text-green-800">Filters</h2>
//         <button 
//           onClick={() => setShowMobileFilters(false)}
//           className="md:hidden text-gray-500 hover:text-gray-700"
//         >
//           <X className="w-6 h-6" />
//         </button>
//       </div>

//       {/* Search */}
//       <div className="mb-6">
//         <label className="block text-sm font-medium text-green-800 mb-2">Search</label>
//         <div className="relative">
//           <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           <input
//             type="text"
//             value={filters.searchTerm}
//             onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
//             placeholder="Search products..."
//             className="w-full pl-10 pr-4 py-2 border-2 border-green-100 rounded-lg 
//                      focus:ring-2 focus:ring-green-500 focus:border-transparent"
//           />
//         </div>
//       </div>

//       {/* Categories */}
//       <div className="mb-6">
//         <label className="block text-sm font-medium text-green-800 mb-2">Category</label>
//         <div className="flex flex-wrap gap-2">
//           {['All', 'Fruits', 'Vegetables', 'Grain', 'Dairy'].map((category) => (
//             <button
//               key={category}
//               onClick={() => setActiveFilters({
//                 ...activeFilters,
//                 category: category === 'All' ? '' : category
//               })}
//               className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors
//                 ${activeFilters.category === category || (category === 'All' && !activeFilters.category)
//                   ? 'bg-green-600 text-white'
//                   : 'bg-green-50 text-green-700 hover:bg-green-100'}`}
//             >
//               {category}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Price Range */}
//       <div className="mb-6">
//         <label className="block text-sm font-medium text-green-800 mb-2">Price Range</label>
//         <select
//           value={activeFilters.priceRange}
//           onChange={(e) => setActiveFilters({ ...activeFilters, priceRange: e.target.value })}
//           className="w-full px-4 py-1.5 rounded-lg text-sm border border-green-200 
//                    focus:ring-2 focus:ring-green-500 focus:border-transparent"
//         >
//           <option value="">All Prices</option>
//           <option value="low">Under 1000 RWF</option>
//           <option value="medium">1000-5000 RWF</option>
//           <option value="high">Above 5000 RWF</option>
//         </select>
//       </div>

//       {/* Location */}
//       <div className="mb-6">
//         <label className="block text-sm font-medium text-green-800 mb-2">Location</label>
//         <div className="space-y-2">
//           {['All Locations', 'Kigali', 'Eastern', 'Western', 'Northern', 'Southern'].map((location) => (
//             <label key={location} className="flex items-center p-2 rounded-lg hover:bg-green-50">
//               <input
//                 type="radio"
//                 name="location"
//                 value={location}
//                 checked={filters.location === location}
//                 onChange={(e) => setFilters({ ...filters, location: e.target.value })}
//                 className="w-4 h-4 text-green-600 focus:ring-green-500 border-green-300"
//               />
//               <span className="ml-3 text-gray-700">{location}</span>
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Harvest Date Range */}
//       <div className="mb-6">
//         <label className="block text-sm font-medium text-green-800 mb-2">Harvest Date</label>
//         <input
//           type="date"
//           value={filters.harvestDate}
//           onChange={(e) => setFilters({ ...filters, harvestDate: e.target.value })}
//           className="w-full p-2 border-2 border-green-100 rounded-lg 
//                    focus:ring-2 focus:ring-green-500 focus:border-transparent"
//         />
//       </div>

//       {/* Quality Rating */}
//       <div className="mb-6">
//         <label className="block text-sm font-medium text-green-800 mb-2">Quality Rating</label>
//         <select
//           value={filters.quality}
//           onChange={(e) => setFilters({ ...filters, quality: e.target.value })}
//           className="w-full p-2 border-2 border-green-100 rounded-lg 
//                    focus:ring-2 focus:ring-green-500 focus:border-transparent"
//         >
//           <option value="">All Ratings</option>
//           <option value="premium">Premium Quality</option>
//           <option value="standard">Standard Quality</option>
//           <option value="economy">Economy Quality</option>
//         </select>
//       </div>

//       {/* Clear Filters Button */}
//       <button
//         onClick={() => {
//           setFilters({
//             searchTerm: '',
//             location: 'All Locations',
//             harvestDate: '',
//             quality: '',
//             categories: []
//           });
//           setActiveFilters({
//             category: '',
//             priceRange: ''
//           });
//         }}
//         className="w-full py-2 text-green-600 border-2 border-green-600 rounded-lg 
//                  hover:bg-green-50 transition-colors duration-200"
//       >
//         Clear All Filters
//       </button>
//     </div>
//   </div>
// );
// const MostRecentHarvestBanner = ({ latestProduct, BASE_URL }) => {
//   if (!latestProduct) return null; // Only display if there's a latest product

//   return (
//     <div className="w-full bg-gradient-to-r from-green-500 to-green-400 mb-8 overflow-hidden rounded-lg shadow-lg">
//       <div className="container mx-auto flex flex-col md:flex-row items-center">
//         {/* Left side - Image */}
//         <div className="w-full md:w-1/3 p-4 flex justify-center">
//           <img
//             src={`${BASE_URL}${latestProduct.image}`}
//             alt={latestProduct.product_name}
//             className="h-64 object-contain"
//           />
//         </div>

//         {/* Right side - Content */}
//         <div className="w-full md:w-2/3 p-8 text-white">
//           <p className="text-lg font-medium">Fresh, Recently Harvested</p>
//           <h2 className="text-4xl font-bold my-4">
//             {latestProduct.product_name}
//           </h2>
//           <p className="text-xl font-medium mb-6">
//             Price: {latestProduct.price} RWF
//           </p>

//           <button className="bg-white text-green-600 hover:bg-green-100 px-8 py-3 rounded-full font-bold transition-colors duration-300 shadow-md">
//             View Details
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };


// const ProductListingPage = () => {
//   const dispatch = useDispatch();
//   const [filters, setFilters] = useState({
//     searchTerm: '',
//     location: 'All Locations',
//     harvestDate: '',
//     quality: '',
//     categories: []
//   });
//   const [showMobileFilters, setShowMobileFilters] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [selectedCooperative, setSelectedCooperative] = useState(null);
//   const [cooperativeNames, setCooperativeNames] = useState({});
//   const [activeFilters, setActiveFilters] = useState({
//     category: '',
//     priceRange: ''
//   });

//   const products = useSelector((state) => state.product.products);
//   const loading = useSelector((state) => state.product.loading);
//   const error = useSelector((state) => state.product.error);
//   const BASE_URL = process.env.REACT_APP_API_BASE_URL;

//   // Get most recently harvested product (most recent harvest date)
//   const getMostRecentProduct = () => {
//     if (!products || products.length === 0) return null;
//     return [...products]
//       .sort((a, b) => new Date(b.harvest_date) - new Date(a.harvest_date))
//       .shift(); // Get the most recent product
//   };

//   useEffect(() => {
//     dispatch(listProducts());
//   }, [dispatch]);

//   useEffect(() => {
//     const fetchCoopNames = async () => {
//       const names = {};
//       for (const product of products) {
//         if (product.user && !names[product.user]) {
//           try {
//             const response = await dispatch(fetchCooperativeDetails(product.user)).unwrap();
//             names[product.user] = response.name || 'Unknown Cooperative';
//           } catch (error) {
//             console.error(`Failed to fetch cooperative name:`, error);
//           }
//         }
//       }
//       setCooperativeNames(names);
//     };

//     if (products.length > 0) {
//       fetchCoopNames();
//     }
//   }, [dispatch, products]);

//   // Handle viewing product details
//   const handleViewProduct = async (product) => {
//     try {
//       const cooperativeData = await dispatch(fetchCooperativeDetails(product.user)).unwrap();
//       setSelectedProduct(product);
//       setSelectedCooperative(cooperativeData);
//     } catch (error) {
//       console.error('Failed to fetch cooperative details:', error);
//     }
//   };

//   // Handle closing the modal
//   const handleCloseModal = () => {
//     setSelectedProduct(null);
//     setSelectedCooperative(null);
//   };

//   const filteredProducts = products.filter(product => {
//     const matchesSearch = !filters.searchTerm || 
//       product.product_name.toLowerCase().includes(filters.searchTerm.toLowerCase());
//     const matchesLocation = filters.location === 'All Locations' || 
//       product.location === filters.location;
//     const matchesDate = !filters.harvestDate || 
//       new Date(product.harvest_date) >= new Date(filters.harvestDate);
//     const matchesQuality = !filters.quality || 
//       product.quality === filters.quality;
//     const matchesTopCategory = !activeFilters.category || 
//       product.category === activeFilters.category;
//     const matchesTopPrice = !activeFilters.priceRange || 
//       (activeFilters.priceRange === 'low' && product.price < 1000) ||
//       (activeFilters.priceRange === 'medium' && product.price >= 1000 && product.price <= 5000) ||
//       (activeFilters.priceRange === 'high' && product.price > 5000);

//     return matchesSearch && matchesLocation && matchesDate && 
//            matchesQuality && matchesTopCategory && matchesTopPrice;
//   });

//   if (loading === 'loading') {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center p-8">
//         <p className="text-red-600">Failed to load products. Please try again later.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* <Navbar /> */}
      
//       <main className="container mx-auto px-4 py-8">
//         {/* Most Recent Harvest Banner */}
//         <MostRecentHarvestBanner
//           latestProduct={getMostRecentProduct()}
//           BASE_URL={BASE_URL}
//         />

//         <div className="flex flex-wrap items-center justify-between mb-8 bg-white shadow-sm p-4 rounded-lg border border-green-200">
//           <h1 className="text-2xl md:text-3xl font-bold text-green-800">Fresh Agricultural Products</h1>

//           {/* Filter Buttons */}
//           <div className="flex gap-4">
//             {/* Sort Dropdown */}
//             <select
//               className="px-4 py-2 rounded-lg border border-green-300 text-green-800 focus:ring-2 focus:ring-green-500"
//             >
//               <option>Sort by</option>
//               <option>Price: Low to High</option>
//               <option>Price: High to Low</option>
//               <option>Newest First</option>
//             </select>

//             {/* Filter Button (for Mobile) */}
//             <button
//               onClick={() => setShowMobileFilters(true)}
//               className="md:hidden flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md transition-all"
//             >
//               <SlidersHorizontal className="w-5 h-5" />
//               <span>Filters</span>
//             </button>
//           </div>
//         </div>

//         <div className="flex gap-8">
//           {/* Side Filters */}
//           <SideFilter
//             filters={filters}
//             setFilters={setFilters}
//             showMobileFilters={showMobileFilters}
//             setShowMobileFilters={setShowMobileFilters}
//             activeFilters={activeFilters}
//             setActiveFilters={setActiveFilters}
//           />

//           {/* Product Grid */}
//           <div className="flex-1">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {filteredProducts.map(product => (
//                 <ProductCard
//                   key={product.id}
//                   product={product}
//                   cooperativeName={cooperativeNames[product.user]}
//                   BASE_URL={BASE_URL}
//                   onViewMore={() => handleViewProduct(product)}
//                 />
//               ))}
//             </div>
            
//             {filteredProducts.length === 0 && (
//               <div className="text-center py-12">
//                 <p className="text-gray-500 text-lg">No products match your current filters.</p>
//                 <button
//                   onClick={() => {
//                     setFilters({
//                       searchTerm: '',
//                       location: 'All Locations',
//                       harvestDate: '',
//                       quality: '',
//                       categories: []
//                     });
//                     setActiveFilters({
//                       category: '',
//                       priceRange: ''
//                     });
//                   }}
//                   className="mt-4 text-green-600 hover:text-green-700 font-medium"
//                 >
//                   Clear all filters
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </main>
//       {selectedProduct && selectedCooperative && (
//         <Modal
//           product={selectedProduct}
//           cooperative={selectedCooperative}
//           onClose={handleCloseModal}
//         />
//       )}
//     </div>
//   );
// };

// export default ProductListingPage;


import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../Redux/Slices/product/product';
import { fetchCooperativeDetails } from '../../Redux/Slices/cooperative/coop_details';
import { 
  Leaf, Search, Filter, X, ChevronDown, 
  MapPin, Calendar, DollarSign, SlidersHorizontal,
  ChevronLeft, ChevronRight 
} from 'lucide-react';
import Navbar from '../../components/sidebar';

// Modal Component
const Modal = ({ product, cooperative, onClose }) => {
  if (!product || !cooperative) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg border-4 border-green-600 w-4/5 md:w-1/2 lg:w-1/3 p-6 relative">
        {/* Header */}
        <h1 className="text-2xl font-bold text-center text-green-700 mb-6">
          Product Details
        </h1>
        
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
};

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

const SideFilter = ({ filters, setFilters, showMobileFilters, setShowMobileFilters, activeFilters, setActiveFilters, isSticky }) => (
  <div className={`
    fixed md:relative inset-y-0 left-0 z-40 w-72 bg-white shadow-lg md:shadow-none
    transform ${showMobileFilters ? 'translate-x-0' : '-translate-x-full'} 
    md:transform-none transition-transform duration-200 ease-in-out
    ${isSticky ? 'md:sticky md:top-4' : ''}
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

      {/* Categories */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-green-800 mb-2">Category</label>
        <div className="flex flex-wrap gap-2">
          {['All', 'Fruits', 'Vegetables', 'Grain', 'Dairy'].map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilters({
                ...activeFilters,
                category: category === 'All' ? '' : category
              })}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors
                ${activeFilters.category === category || (category === 'All' && !activeFilters.category)
                  ? 'bg-green-600 text-white'
                  : 'bg-green-50 text-green-700 hover:bg-green-100'}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-green-800 mb-2">Price Range</label>
        <select
          value={activeFilters.priceRange}
          onChange={(e) => setActiveFilters({ ...activeFilters, priceRange: e.target.value })}
          className="w-full px-4 py-1.5 rounded-lg text-sm border border-green-200 
                   focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="">All Prices</option>
          <option value="low">Under 1000 RWF</option>
          <option value="medium">1000-5000 RWF</option>
          <option value="high">Above 5000 RWF</option>
        </select>
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
        className="w-full py-2 text-green-600 border-2 border-green-600 rounded-lg 
                 hover:bg-green-50 transition-colors duration-200"
      >
        Clear All Filters
      </button>
    </div>
  </div>
);

const HarvestCarousel = ({ recentProducts, BASE_URL, onViewMore }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % recentProducts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + recentProducts.length) % recentProducts.length);
  };

  // Auto-scroll every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(timer);
  }, [currentSlide, recentProducts.length]);

  if (!recentProducts || recentProducts.length === 0) return null;

  return (
    <div className="relative overflow-hidden rounded-xl shadow-xl mb-8">
      {/* Carousel track */}
      <div 
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {recentProducts.map((product, index) => (
          <div key={product.id} className="min-w-full flex-shrink-0">
            <div className="relative h-64 md:h-80 bg-gradient-to-r from-green-600 to-green-500 overflow-hidden">
              {/* Content */}
              <div className="container mx-auto h-full flex items-center">
                <div className="w-full md:w-1/2 p-6 md:p-12 text-white">
                  <div className="inline-block px-3 py-1 rounded-full bg-green-700 text-xs font-semibold mb-3">
                    Fresh Harvest
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">
                    {product.product_name}
                  </h2>
                  <p className="mb-4 opacity-90">
                    {product.description?.slice(0, 80) || 'Fresh from the farm to your table'}{product.description?.length > 80 ? '...' : ''}
                  </p>
                  <div className="flex items-center mb-6">
                    <DollarSign className="w-5 h-5 mr-1" />
                    <span className="text-2xl font-bold">{product.price} RWF</span>
                  </div>
                  <button 
                    onClick={() => onViewMore(product)}
                    className="px-6 py-2 bg-white text-green-700 rounded-lg font-medium hover:bg-green-50 transition-colors shadow-lg"
                  >
                    View Details
                  </button>
                </div>
                <div className="hidden md:block w-1/2 p-6">
                  <div className="relative h-full flex items-center justify-center">
                    <div className="absolute w-64 h-64 rounded-full bg-green-400 opacity-30"></div>
                    <img 
                      src={`${BASE_URL}${product.image}`} 
                      alt={product.product_name}
                      className="relative z-10 max-h-full object-contain"
                    />
                  </div>
                </div>
              </div>
              
              {/* Harvest date badge */}
              <div className="absolute bottom-4 left-6 bg-green-800 text-white text-xs px-3 py-1 rounded-full">
                Harvested: {new Date(product.harvest_date).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation dots */}
      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex justify-center gap-2">
          {recentProducts.map((_, index) => (
            <button 
              key={index} 
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-50'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Navigation arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white bg-opacity-30 flex items-center justify-center text-white hover:bg-opacity-50 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white bg-opacity-30 flex items-center justify-center text-white hover:bg-opacity-50 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

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
  const [selectedCooperative, setSelectedCooperative] = useState(null);
  const [cooperativeNames, setCooperativeNames] = useState({});
  const [activeFilters, setActiveFilters] = useState({
    category: '',
    priceRange: ''
  });
  const [isFilterSticky, setIsFilterSticky] = useState(false);
  const headerRef = useRef(null);

  const products = useSelector((state) => state.product.products);
  const loading = useSelector((state) => state.product.loading);
  const error = useSelector((state) => state.product.error);
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  // Get most recently harvested products (3 most recent harvest dates)
  const getRecentProducts = () => {
    if (!products || products.length === 0) return [];
    return [...products]
      .sort((a, b) => new Date(b.harvest_date) - new Date(a.harvest_date))
      .slice(0, 3); // Get the 3 most recent products
  };

  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const headerBottom = headerRef.current.getBoundingClientRect().bottom;
        setIsFilterSticky(headerBottom <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Handle viewing product details
  const handleViewProduct = async (product) => {
    try {
      const cooperativeData = await dispatch(fetchCooperativeDetails(product.user)).unwrap();
      setSelectedProduct(product);
      setSelectedCooperative(cooperativeData);
    } catch (error) {
      console.error('Failed to fetch cooperative details:', error);
    }
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setSelectedProduct(null);
    setSelectedCooperative(null);
  };

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
      {/* <Navbar /> */}
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div ref={headerRef} className="flex flex-wrap items-center justify-between mb-8 bg-white shadow-sm p-4 rounded-lg border border-green-200">
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

        {/* Recent Harvest Carousel */}
        <HarvestCarousel 
          recentProducts={getRecentProducts()}
          BASE_URL={BASE_URL}
          onViewMore={handleViewProduct}
        />

        <div className="flex gap-8">
          {/* Side Filters */}
          <SideFilter
            filters={filters}
            setFilters={setFilters}
            showMobileFilters={showMobileFilters}
            setShowMobileFilters={setShowMobileFilters}
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
            isSticky={isFilterSticky}
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
                  onViewMore={() => handleViewProduct(product)}
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
      {selectedProduct && selectedCooperative && (
        <Modal
          product={selectedProduct}
          cooperative={selectedCooperative}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ProductListingPage;