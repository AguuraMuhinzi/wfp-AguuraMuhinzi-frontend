
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { listProducts } from '../../Redux/Slices/product/product';
// import { fetchCooperativeDetails } from '../../Redux/Slices/cooperative/coop_details';
// import FilterComponent from '../../components/filter'; // Import the Filter Component

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

//   useEffect(() => {
//     dispatch(listProducts());
//   }, [dispatch]);

//   useEffect(() => {
//     const fetchCooperativeNames = async () => {
//       const names = {};
//       for (const product of products) {
//         if (product.user && !names[product.user]) {
//           try {
//             const response = await dispatch(fetchCooperativeDetails(product.user)).unwrap();
//             names[product.user] = response.name || 'Unknown Cooperative';
//           } catch (error) {
//             console.error(`Failed to fetch details for user ID ${product.user}:`, error);
//           }
//         }
//       }
//       setCooperativeNames(names);
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
//     const matchesLocation = selectedLocation === 'All' || product.location === selectedLocation;
//     const matchesDate = selectedDate === '' || product.harvest_date >= selectedDate;
//     const matchesPrice = selectedPriceRange === 'All' || (selectedPriceRange === 'Low' ? product.price <= 1000 : product.price > 1000);
//     const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
//     const matchesSearch = searchTerm === '' || product.product_name.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesLocation && matchesDate && matchesPrice && matchesCategory && matchesSearch;
//   });

//   if (loading === 'loading') {
//     return <p>Loading...</p>;
//   }

//   if (error === 'failed') {
//     return <p>Failed to load products.</p>;
//   }

//   return (
//     <div className="flex min-h-screen bg-gray-100 p-4">
//       {/* Sidebar Filter Section */}
//       <FilterComponent
//         searchTerm={searchTerm}
//         setSearchTerm={setSearchTerm}
//         selectedCategories={selectedCategories}
//         handleCategoryChange={handleCategoryChange}
//         selectedLocation={selectedLocation}
//         setSelectedLocation={setSelectedLocation}
//         selectedPriceRange={selectedPriceRange}
//         setSelectedPriceRange={setSelectedPriceRange}
//         selectedDate={selectedDate}
//         setSelectedDate={setSelectedDate}
//       />

//       {/* Product Cards Section */}
//       <div className="ml-64 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredProducts.map((product) => (
//           <div key={product.id} className="bg-white shadow-md rounded-lg max-w-xs mx-auto mt-4 border border-green-200">
//             <div className="bg-green-600 text-white text-center py-3 rounded-t-lg">
//               <h3 className="text-lg font-bold uppercase">{product.product_name}</h3>
//             </div>
//             <div className="relative h-48 bg-gray-300 bg-center bg-cover" style={{ backgroundImage: `url(${BASE_URL}${product.image})` }}>
//               <div className="absolute inset-0 bg-black bg-opacity-10"></div>
//             </div>
//             <div className="p-4">
//               <div className="bg-green-100 rounded-lg p-3 text-gray-700 text-sm shadow-sm">
//                 <p><strong>Cooperative:</strong> {cooperativeNames[product.user] || 'Loading...'}</p>
//                 <p><strong>Harvest Date:</strong> {new Date(product.harvest_date).toLocaleDateString()}</p>
//                 <p><strong>Price:</strong> {product.price} RWF</p>
//               </div>
//             </div>
//             <div className="p-4 border-t border-green-200 bg-green-50 rounded-b-lg">
//               <button className="w-full px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700">
//                 View More
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductListingPage;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../Redux/Slices/product/product';
import { fetchCooperativeDetails } from '../../Redux/Slices/cooperative/coop_details';
import Navbar from '../../components/sidebar'; // Import Navbar
import FilterComponent from '../../components/filter'; // Import the Filter Component

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

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  useEffect(() => {
    const fetchCooperativeNames = async () => {
      const names = {};
      for (const product of products) {
        if (product.user && !names[product.user]) {
          try {
            const response = await dispatch(fetchCooperativeDetails(product.user)).unwrap();
            names[product.user] = response.name || 'Unknown Cooperative';
          } catch (error) {
            console.error(`Failed to fetch details for user ID ${product.user}:`, error);
          }
        }
      }
      setCooperativeNames(names);
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
    const matchesLocation = selectedLocation === 'All' || product.location === selectedLocation;
    const matchesDate = selectedDate === '' || product.harvest_date >= selectedDate;
    const matchesPrice = selectedPriceRange === 'All' || (selectedPriceRange === 'Low' ? product.price <= 1000 : product.price > 1000);
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesSearch = searchTerm === '' || product.product_name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLocation && matchesDate && matchesPrice && matchesCategory && matchesSearch;
  });

  if (loading === 'loading') {
    return <p>Loading...</p>;
  }

  if (error === 'failed') {
    return <p>Failed to load products.</p>;
  }

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Filter Component */}
      <div className="bg-gray-100 py-4 px-6">
        <FilterComponent
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategories={selectedCategories}
          handleCategoryChange={handleCategoryChange}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          selectedPriceRange={selectedPriceRange}
          setSelectedPriceRange={setSelectedPriceRange}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>

      {/* Product Cards Section */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white shadow-md rounded-lg max-w-xs mx-auto mt-4 border border-green-200">
            <div className="bg-green-600 text-white text-center py-3 rounded-t-lg">
              <h3 className="text-lg font-bold uppercase">{product.product_name}</h3>
            </div>
            <div className="relative h-48 bg-gray-300 bg-center bg-cover" style={{ backgroundImage: `url(${BASE_URL}${product.image})` }}>
              <div className="absolute inset-0 bg-black bg-opacity-10"></div>
            </div>
            <div className="p-4">
              <div className="bg-green-100 rounded-lg p-3 text-gray-700 text-sm shadow-sm">
                <p><strong>Cooperative:</strong> {cooperativeNames[product.user] || 'Loading...'}</p>
                <p><strong>Harvest Date:</strong> {new Date(product.harvest_date).toLocaleDateString()}</p>
                <p><strong>Price:</strong> {product.price} RWF</p>
              </div>
            </div>
            <div className="p-4 border-t border-green-200 bg-green-50 rounded-b-lg">
              <button className="w-full px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700">
                View More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListingPage;
