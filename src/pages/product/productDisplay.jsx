// import React, { useEffect, useState, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { listProducts } from '../../Redux/Slices/product/product';
// import { fetchCooperativeDetails } from '../../Redux/Slices/cooperative/coop_details';
// import { 
//   Leaf, Search, Filter, X, ChevronDown, 
//   MapPin, Calendar, DollarSign, SlidersHorizontal,
//   ChevronLeft, ChevronRight 
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

// const SideFilter = ({ filters, setFilters, showMobileFilters, setShowMobileFilters, activeFilters, setActiveFilters, isSticky }) => (
//   <div className={`
//     fixed md:relative inset-y-0 left-0 z-40 w-72 bg-white shadow-lg md:shadow-none
//     transform ${showMobileFilters ? 'translate-x-0' : '-translate-x-full'} 
//     md:transform-none transition-transform duration-200 ease-in-out
//     ${isSticky ? 'md:sticky md:top-4' : ''}
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

// const HarvestCarousel = ({ recentProducts, BASE_URL, onViewMore }) => {
//   const [currentSlide, setCurrentSlide] = useState(0);
  
//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % recentProducts.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + recentProducts.length) % recentProducts.length);
//   };

//   // Auto-scroll every 5 seconds
//   useEffect(() => {
//     const timer = setInterval(() => {
//       nextSlide();
//     }, 5000);
    
//     return () => clearInterval(timer);
//   }, [currentSlide, recentProducts.length]);

//   if (!recentProducts || recentProducts.length === 0) return null;

//   return (
//     <div className="relative overflow-hidden rounded-xl shadow-xl mb-8">
//       {/* Carousel track */}
//       <div 
//         className="flex transition-transform duration-500 ease-out"
//         style={{ transform: `translateX(-${currentSlide * 100}%)` }}
//       >
//         {recentProducts.map((product, index) => (
//           <div key={product.id} className="min-w-full flex-shrink-0">
//             <div className="relative h-64 md:h-80 bg-gradient-to-r from-green-600 to-green-500 overflow-hidden">
//               {/* Content */}
//               <div className="container mx-auto h-full flex items-center">
//                 <div className="w-full md:w-1/2 p-6 md:p-12 text-white">
//                   <div className="inline-block px-3 py-1 rounded-full bg-green-700 text-xs font-semibold mb-3">
//                     Fresh Harvest
//                   </div>
//                   <h2 className="text-3xl md:text-4xl font-bold mb-2">
//                     {product.product_name}
//                   </h2>
//                   <p className="mb-4 opacity-90">
//                     {product.description?.slice(0, 80) || 'Fresh from the farm to your table'}{product.description?.length > 80 ? '...' : ''}
//                   </p>
//                   <div className="flex items-center mb-6">
//                     <DollarSign className="w-5 h-5 mr-1" />
//                     <span className="text-2xl font-bold">{product.price} RWF</span>
//                   </div>
//                   <button 
//                     onClick={() => onViewMore(product)}
//                     className="px-6 py-2 bg-white text-green-700 rounded-lg font-medium hover:bg-green-50 transition-colors shadow-lg"
//                   >
//                     View Details
//                   </button>
//                 </div>
//                 <div className="hidden md:block w-1/2 p-6">
//                   <div className="relative h-full flex items-center justify-center">
//                     <div className="absolute w-64 h-64 rounded-full bg-green-400 opacity-30"></div>
//                     <img 
//                       src={`${BASE_URL}${product.image}`} 
//                       alt={product.product_name}
//                       className="relative z-10 max-h-full object-contain"
//                     />
//                   </div>
//                 </div>
//               </div>
              
//               {/* Harvest date badge */}
//               <div className="absolute bottom-4 left-6 bg-green-800 text-white text-xs px-3 py-1 rounded-full">
//                 Harvested: {new Date(product.harvest_date).toLocaleDateString()}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
      
//       {/* Navigation dots */}
//       <div className="absolute bottom-4 right-0 left-0">
//         <div className="flex justify-center gap-2">
//           {recentProducts.map((_, index) => (
//             <button 
//               key={index} 
//               onClick={() => setCurrentSlide(index)}
//               className={`w-3 h-3 rounded-full transition-colors ${currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-50'}`}
//               aria-label={`Go to slide ${index + 1}`}
//             />
//           ))}
//         </div>
//       </div>
      
//       {/* Navigation arrows */}
//       <button 
//         onClick={prevSlide}
//         className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white bg-opacity-30 flex items-center justify-center text-white hover:bg-opacity-50 transition-colors"
//         aria-label="Previous slide"
//       >
//         <ChevronLeft className="w-6 h-6" />
//       </button>
//       <button 
//         onClick={nextSlide}
//         className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white bg-opacity-30 flex items-center justify-center text-white hover:bg-opacity-50 transition-colors"
//         aria-label="Next slide"
//       >
//         <ChevronRight className="w-6 h-6" />
//       </button>
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
//   const [isFilterSticky, setIsFilterSticky] = useState(false);
//   const headerRef = useRef(null);

//   const products = useSelector((state) => state.product.products);
//   const loading = useSelector((state) => state.product.loading);
//   const error = useSelector((state) => state.product.error);
//   const BASE_URL = process.env.REACT_APP_API_BASE_URL;

//   // Get most recently harvested products (3 most recent harvest dates)
//   const getRecentProducts = () => {
//     if (!products || products.length === 0) return [];
//     return [...products]
//       .sort((a, b) => new Date(b.harvest_date) - new Date(a.harvest_date))
//       .slice(0, 3); // Get the 3 most recent products
//   };

//   // Handle scroll for sticky header
//   useEffect(() => {
//     const handleScroll = () => {
//       if (headerRef.current) {
//         const headerBottom = headerRef.current.getBoundingClientRect().bottom;
//         setIsFilterSticky(headerBottom <= 0);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

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
//         {/* Header */}
//         <div ref={headerRef} className="flex flex-wrap items-center justify-between mb-8 bg-white shadow-sm p-4 rounded-lg border border-green-200">
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

//         {/* Recent Harvest Carousel */}
//         <HarvestCarousel 
//           recentProducts={getRecentProducts()}
//           BASE_URL={BASE_URL}
//           onViewMore={handleViewProduct}
//         />

//         <div className="flex gap-8">
//           {/* Side Filters */}
//           <SideFilter
//             filters={filters}
//             setFilters={setFilters}
//             showMobileFilters={showMobileFilters}
//             setShowMobileFilters={setShowMobileFilters}
//             activeFilters={activeFilters}
//             setActiveFilters={setActiveFilters}
//             isSticky={isFilterSticky}
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
  Heart, MessageSquare, Share2, Bookmark, MoreHorizontal,
  MapPin, Calendar, Users, Sprout, Sun, Droplets, Camera,
  Search, Filter, X, ChevronDown, Star, Award, TrendingUp,
  Phone, Mail, Globe, ExternalLink, Shield, CheckCircle,ShoppingCart 
} from 'lucide-react';
import Navbar from '../../components/sidebar';
import OrderModal from '../../pages/orders/createOrder';
import { EnhancedCartModal, CartIcon } from '../../pages/orders/cart'
import { addToCart,fetchCart,updateCartItem, removeFromCart   } from '../../Redux/Slices/order/cartSlice';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
// Story-style highlights component
const FarmStories = ({ cooperatives, onStoryClick }) => {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 mb-6 scrollbar-hide">
      <div className="flex-shrink-0 text-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mb-2 cursor-pointer hover:scale-105 transition-transform">
          <Camera className="w-6 h-6 text-white" />
        </div>
        <span className="text-xs text-gray-600">Your Story</span>
      </div>
      {cooperatives.slice(0, 8).map((coop, index) => (
        <div key={index} className="flex-shrink-0 text-center cursor-pointer" onClick={() => onStoryClick(coop)}>
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 via-green-500 to-green-600 p-0.5 hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <span className="text-xs text-gray-600 mt-1 block truncate w-16">{coop.name || `Farm ${index + 1}`}</span>
        </div>
      ))}
    </div>
  );
};

// Instagram-style post component - Made slightly bigger
const FarmPost = ({ product, cooperativeName, BASE_URL, onViewMore, onLike, onComment, onAddToCart,isLiked = false }) => {
  const [likes, setLikes] = useState(Math.floor(Math.random() * 50) + 10);
  const [comments, setComments] = useState(Math.floor(Math.random() * 20) + 3);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [localLiked, setLocalLiked] = useState(isLiked);

  const handleLike = () => {
    setLocalLiked(!localLiked);
    setLikes(prev => localLiked ? prev - 1 : prev + 1);
    onLike && onLike(product.id);
  };

  const timeAgo = () => {
    const harvestDate = new Date(product.harvest_date);
    const now = new Date();
    const diffInHours = Math.floor((now - harvestDate) / (1000 * 60 * 60));
    
    if (diffInHours < 24) return `${diffInHours}h`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d`;
    return `${Math.floor(diffInHours / 168)}w`;
  };

  const description = product.description || "Fresh from our farm to your table! 🌱 Grown with love and care using sustainable farming practices.";

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6 w-full break-inside-avoid">
      {/* Post Header */}
      <div className="flex items-center justify-between p-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
            <Sprout className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-base">{cooperativeName || 'Farm Community'}</p>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {product.location || 'Rwanda'}
            </p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <MoreHorizontal className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Post Image - Made slightly taller */}
      <div className="relative aspect-square">
        <img 
          src={`${BASE_URL}${product.image}`} 
          alt={product.product_name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-black bg-opacity-60 text-white px-3 py-1.5 rounded-full text-sm font-medium">
          {product.category}
        </div>
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white px-3 py-1.5 rounded-full text-sm">
          🌾 Fresh Harvest
        </div>
      </div>

      {/* Post Actions */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={handleLike}
              className={`p-2 rounded-full transition-colors ${localLiked ? 'text-red-500' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <Heart className={`w-7 h-7 ${localLiked ? 'fill-current' : ''}`} />
            </button>
            <button 
              onClick={() => onComment && onComment(product.id)}
              className="p-2 rounded-full text-gray-700 hover:bg-gray-100"
            >
              <MessageSquare className="w-7 h-7" />
            </button>
            <button 
      onClick={() => onAddToCart(product)}
      className="p-2 rounded-full text-gray-700 hover:bg-green-100 hover:text-green-600 transition-colors"
      title="Add to Cart"
    >
      <ShoppingCart className="w-7 h-7" />
    </button>
            {/* <button className="p-2 rounded-full text-gray-700 hover:bg-gray-100">
              <Share2 className="w-7 h-7" />
            </button> */}
          </div>
          {/* <button className="p-2 rounded-full text-gray-700 hover:bg-gray-100">
            <Bookmark className="w-7 h-7" />
          </button> */}
        </div>

      
        {/* Post Content */}
        <div className="mb-3">
          <p className="text-base">
            <span className="font-semibold mr-2">{cooperativeName || 'farm_community'}</span>
            <span className="font-bold text-green-700 text-xl">{product.product_name}</span>
            <span className="ml-2 text-green-600 font-semibold text-lg">{product.price} RWF</span>
          </p>
          <p className="text-base text-gray-700 mt-2">
            {showFullDescription ? description : `${description.slice(0, 100)}${description.length > 100 ? '...' : ''}`}
            {description.length > 100 && (
              <button 
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-gray-500 ml-1 font-medium"
              >
                {showFullDescription ? 'less' : 'more'}
              </button>
            )}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          <span className="text-blue-600 text-sm">#freshfarm</span>
          <span className="text-blue-600 text-sm">#{product.category.toLowerCase()}</span>
          <span className="text-blue-600 text-sm">#organicfood</span>
          <span className="text-blue-600 text-sm">#rwanda</span>
        </div>

        

        {/* Harvest Date */}
        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
          <span>{timeAgo()} ago</span>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Harvested {new Date(product.harvest_date).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onViewMore(product)}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
        >
          Connect with Farm 🌱
        </button>
      </div>
    </div>
  );
};

// Trending section component - Made bigger and full width
const TrendingSection = ({ products, onViewMore }) => {
  const trendingProducts = products.slice(0, 6);
  
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 w-full">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="w-6 h-6 text-orange-500" />
        <h3 className="font-bold text-xl">🔥 Trending Harvests</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trendingProducts.map((product, index) => (
          <div key={product.id} className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => onViewMore(product)}>
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold text-orange-500">#{index + 1}</span>
              <img 
                src={`${BASE_URL}${product.image}`} 
                alt={product.product_name}
                className="w-16 h-16 rounded-xl object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-base">{product.product_name}</p>
              <div className="flex items-center justify-between mt-1">
                <p className="font-semibold text-green-600">{product.price} RWF</p>
                {/* <div className="flex items-center text-sm text-gray-500">
                  <Star className="w-4 h-4 fill-current text-yellow-400 mr-1" />
                  4.{Math.floor(Math.random() * 9) + 1}
                </div> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Weather widget component
const WeatherWidget = () => {
  return (
    <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-6 text-white mb-6 w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-lg">Today's Farming Weather</h3>
          <p className="text-blue-100 text-sm">Perfect for harvesting!</p>
        </div>
        <Sun className="w-8 h-8 text-yellow-300" />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold">24°C</p>
          <p className="text-blue-100 text-sm">Sunny & Clear</p>
        </div>
        <div className="text-right text-sm">
          <div className="flex items-center mb-1">
            <Droplets className="w-4 h-4 mr-1" />
            <span>65% Humidity</span>
          </div>
          <p className="text-blue-100">Great for outdoor work</p>
        </div>
      </div>
    </div>
  );
};

// Enhanced Modal Component
const Modal = ({ product, cooperative, onClose,onMakeOrder }) => {
  if (!product || !cooperative) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden">
        <div className="flex flex-col lg:flex-row h-full max-h-[95vh]">
          {/* Left Side - Image */}
          <div className="lg:w-1/2 relative">
            <img 
              src={`${BASE_URL}${product.image}`} 
              alt={product.product_name}
              className="w-full h-64 lg:h-full object-cover"
            />
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
              🌾 {product.category}
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="lg:w-1/2 flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                  <Sprout className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-900">{cooperative.name}</h3>
                  <p className="text-green-600 flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    <span>Verified Farm</span>
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{cooperative.province}, {cooperative.district}</span>
                </div>
                {/* <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current text-yellow-400" />
                  <span>4.{Math.floor(Math.random() * 9) + 1} rating</span>
                </div> */}
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Product Details */}
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{product.product_name}</h2>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl font-bold text-green-600">{product.price} RWF</span>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Harvested {new Date(product.harvest_date).toLocaleDateString()}</span>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {product.description || 'Fresh from the farm, grown with sustainable practices and lots of care! This premium quality produce is harvested at the perfect time to ensure maximum flavor and nutritional value. 🌱'}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">#organic</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">#freshfarm</span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full">#sustainable</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">#localgrown</span>
                </div>
              </div>

              {/* Farm Specialization */}
              <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Farm Specialization</h4>
                <p className="text-gray-700 text-sm">{cooperative.specialization}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-green-50 rounded-xl">
                  <p className="text-2xl font-bold text-green-600">{Math.floor(Math.random() * 50) + 20}</p>
                  <p className="text-xs text-gray-600">Products</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-xl">
                  <p className="text-2xl font-bold text-blue-600">{Math.floor(Math.random() * 100) + 50}</p>
                  <p className="text-xs text-gray-600">Happy Buyers</p>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-xl">
                  <p className="text-2xl font-bold text-orange-600">{Math.floor(Math.random() * 10) + 5}</p>
                  <p className="text-xs text-gray-600">Years Experience</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-green-50 rounded-2xl p-4 mb-6">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Contact Information
                </h4>
                <div className="space-y-2 text-sm">
                  {cooperative.contact && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <Phone className="w-4 h-4 text-green-600" />
                      <span>{cooperative.contact}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-gray-700">
                    <Mail className="w-4 h-4 text-green-600" />
                    <span>{cooperative.name.toLowerCase().replace(/\s+/g, '')}@farm.rw</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Globe className="w-4 h-4 text-green-600" />
                    <span>Visit our farm location</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex gap-3">
                <button
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2"
                   onClick={onMakeOrder}
                >
                  <MessageSquare className="w-5 h-5" />
                  make an Order
                </button>
                <button className="px-6 py-3 border-2 border-green-600 text-green-600 rounded-xl font-medium hover:bg-green-50 transition-colors flex items-center justify-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  contact cooperative
                </button>
              </div>
              <p className="text-xs text-gray-500 text-center mt-3">
                💚 Supporting local farmers and sustainable agriculture
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const ProductListingPage = () => {
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCooperative, setSelectedCooperative] = useState(null);
  const [cooperativeNames, setCooperativeNames] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const products = useSelector((state) => state.product.products);
  const loading = useSelector((state) => state.product.loading);
  const error = useSelector((state) => state.product.error);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(listProducts());
    const userId = localStorage.getItem('user_id');
    if (userId) {
      dispatch(fetchCart(userId));
    }
  }, [dispatch]);

  useEffect(() => {
    const fetchCoopNames = async () => {
      const names = {};
      for (const product of products) {
        if (product.user && !names[product.user]) {
          try {
            const response = await dispatch(fetchCooperativeDetails(product.user)).unwrap();
            names[product.user] = response.name || 'Farm Community';
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

  const handleViewProduct = async (product) => {
    try {
      const cooperativeData = await dispatch(fetchCooperativeDetails(product.user)).unwrap();
      setSelectedProduct(product);
      setSelectedCooperative(cooperativeData);
    } catch (error) {
      console.error('Failed to fetch cooperative details:', error);
    }
  };

  const handleAddToCart = async (product) => {
  const userId = localStorage.getItem('user_id');
  if (!userId) return alert('Please log in first');

  try {
    await dispatch(addToCart({ userId, productId: product.id, quantity: 1 })).unwrap();
    await dispatch(fetchCart(userId));
    alert(`${product.product_name} added to cart! 🛒`);
  } catch (err) {
    if (err?.error?.includes('cooperative')) {
      alert('You can only add products from one cooperative at a time.');
    } else {
      alert('Failed to add to cart.');
      console.error('Add to cart error:', err);
    }
  }
};
  const handleUpdateQuantity = async (itemId, quantity) => {
  const userId = localStorage.getItem('user_id');
  try {
    await dispatch(updateCartItem({ itemId, quantity })).unwrap();
    await dispatch(fetchCart(userId));
  } catch (error) {
    console.error('Update quantity error:', error);
  }
};

  const handleRemoveItem = async (itemId) => {
  const userId = localStorage.getItem('user_id');
  try {
    await dispatch(removeFromCart(itemId)).unwrap();
    await dispatch(fetchCart(userId));
  } catch (error) {
    console.error('Remove item error:', error);
  }
};

const handleCloseModal = () => {
  setSelectedProduct(null);
  setSelectedCooperative(null);
  setShowOrderModal(false);
};

  const filteredProducts = products.filter(product =>
    !searchTerm || product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const uniqueCooperatives = Array.from(
    new Map(products.map(p => [p.user, { name: cooperativeNames[p.user], id: p.user }])).values()
  );

  if (loading === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-gray-600">Loading fresh harvests...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <p className="text-red-600 mb-4">Oops! Couldn't load the farm feed.</p>
          <button onClick={() => dispatch(listProducts())} className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 bg-white shadow-sm border-b border-gray-200 z-30">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">🌾 Farm Feed</h1>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowSearch(!showSearch)} className="p-2 hover:bg-gray-100 rounded-full">
              <Search className="w-5 h-5 text-gray-600" />
            </button>
            <CartIcon cart={cart} onClick={() => setShowCart(true)} />
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
        {showSearch && (
          <div className="max-w-md mx-auto mt-3">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search fresh harvests..."
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
              autoFocus
            />
          </div>
        )}
      </div>

      {/* Enhanced Cart Modal */}
      <EnhancedCartModal
        cart={cart}
        showCart={showCart}
        setShowCart={setShowCart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        BASE_URL={BASE_URL}
      />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <FarmStories cooperatives={uniqueCooperatives} onStoryClick={() => {}} />
        <TrendingSection products={products} onViewMore={handleViewProduct} />
        <WeatherWidget />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <FarmPost
              key={product.id}
              product={product}
              cooperativeName={cooperativeNames[product.user]}
              BASE_URL={BASE_URL}
              onViewMore={handleViewProduct}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No fresh harvests found. Try adjusting your search.</p>
          </div>
        )}
      </main>

      {selectedProduct && selectedCooperative && (
        <Modal
          product={selectedProduct}
          cooperative={selectedCooperative}
          onClose={handleCloseModal}
          onMakeOrder={() => setShowOrderModal(true)}
        />
      )}

      {showOrderModal && selectedProduct && selectedCooperative && (
        <OrderModal
          product={selectedProduct}
          cooperative={selectedCooperative}
          currentUser={{ id: localStorage.getItem('user_id') }}
          onClose={() => setShowOrderModal(false)}
        />
      )}
    </div>
  );
};




export default ProductListingPage;