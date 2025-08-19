


// import React, { useState, useMemo, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addProduct, listProducts } from '../../Redux/Slices/product/product';
// import { selectReferencePrices, fetchReferencePrices } from '../../Redux/Slices/price_upload/price_upload_slice';

// const InsertProductForm = ({ onClose }) => {
//   const dispatch = useDispatch();
//   const userData = JSON.parse(localStorage.getItem('userData'));
//   const userId = userData ? userData.id : '';
//   const { userInfo } = useSelector((state) => state.user);

//   // Get all reference prices from Redux
//   const reduxReferencePrices = useSelector(selectReferencePrices).prices;

//   // Fetch reference prices on mount if not already loaded
//   useEffect(() => {
//     if (!reduxReferencePrices || reduxReferencePrices.length === 0) {
//       dispatch(fetchReferencePrices());
//     }
//   }, [dispatch, reduxReferencePrices]);

//   // Debug log
//   useEffect(() => {
//     console.log('Redux reference prices:', reduxReferencePrices);
//   }, [reduxReferencePrices]);

//   // Extract unique categories from reference prices
//   const categories = useMemo(() => {
//     const set = new Set();
//     (reduxReferencePrices || []).forEach(ref => {
//       if (ref.category) set.add(ref.category);
//     });
//     return Array.from(set);
//   }, [reduxReferencePrices]);

//   // Extract unique product names (commodities) for selected category
//   const [formData, setFormData] = useState({
//     user: userInfo?.id || localStorage.getItem('user_id') || '',
//     product_name: '',
//     category: '',
//     description: '',
//     price: '',
//     stock: '',
//     harvest_date: '',
//     image: null
//   });

//   const productNames = useMemo(() => {
//     if (!formData.category) return [];
//     const set = new Set();
//     (reduxReferencePrices || []).forEach(ref => {
//       if (ref.category === formData.category && ref.commodity) set.add(ref.commodity);
//     });
//     return Array.from(set);
//   }, [reduxReferencePrices, formData.category]);

//   // Filter reference prices for selected category and product name
//   const priceOptions = useMemo(() => {
//     if (!formData.category || !formData.product_name) return [];
//     return (reduxReferencePrices || []).filter(
//       ref => ref.category === formData.category && ref.commodity === formData.product_name
//     );
//   }, [reduxReferencePrices, formData.category, formData.product_name]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     // Reset dependent fields
//     if (name === 'category') {
//       setFormData(prev => ({ ...prev, product_name: '', price: '' }));
//     }
//     if (name === 'product_name') {
//       setFormData(prev => ({ ...prev, price: '' }));
//     }
//   };

//   const handleImageChange = (e) => {
//     setFormData({ ...formData, image: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const productData = new FormData();
//     Object.keys(formData).forEach(key => {
//       productData.append(key, formData[key]);
//     });
//     try {
//       dispatch(addProduct(productData)).unwrap().then(() => {
//         alert('Product added successfully');
//         setFormData({
//           user: userId || '',
//           product_name: '',
//           category: '',
//           description: '',
//           price: '',
//           stock: '',
//           harvest_date: '',
//           image: null
//         });
//         dispatch(listProducts());
//         onClose();
//       }).catch((error) => {
//         alert(`Failed to add product: ${error}`);
//       });
//     } catch (error) {
//       console.error('Error:', error);
//       alert('An error occurred. Please try again later.');
//     }
//   };

//   return (
//     <div className="w-full max-w-md mx-auto">
//       <h2 className="text-xl font-bold mb-4 text-center text-green-700">Insert Product</h2>
//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         <input type="hidden" id="user" name="user" value={formData.user} readOnly />
//         <div className="mb-3">
//           <label className="block text-gray-700 mb-1" htmlFor="category">Category:</label>
//           <select
//             id="category"
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-green-200"
//             required
//           >
//             <option value="" disabled>Select a category</option>
//             {categories.map((cat, idx) => (
//               <option key={cat || idx} value={cat}>{cat}</option>
//             ))}
//           </select>
//         </div>
//         <div className="mb-3">
//           <label className="block text-gray-700 mb-1" htmlFor="product_name">Product Name:</label>
//           <select
//             id="product_name"
//             name="product_name"
//             value={formData.product_name}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-green-200"
//             required
//             disabled={!formData.category}
//           >
//             <option value="" disabled>Select a product</option>
//             {productNames.map((prod, idx) => (
//               <option key={prod || idx} value={prod}>{prod}</option>
//             ))}
//           </select>
//         </div>
//         <div className="mb-3">
//           <label className="block text-gray-700 mb-1" htmlFor="price">Price:</label>
//           <select
//             id="price"
//             name="price"
//             value={formData.price}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-green-200"
//             required
//             disabled={!formData.category || !formData.product_name}
//           >
//             <option value="" disabled>Select a reference price</option>
//             {priceOptions.map((ref, idx) => (
//               <option key={ref.id || idx} value={ref.price}>
//                 {ref.price} {ref.currency} ({ref.admin1}, {ref.admin2}, {ref.market}, {ref.pricetype})
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="mb-3">
//           <label className="block text-gray-700 mb-1" htmlFor="description">Description:</label>
//           <textarea
//             id="description"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-green-200"
//             required
//             rows="3"
//           />
//         </div>
//         <div className="mb-3">
//           <label className="block text-gray-700 mb-1" htmlFor="stock">Stock:</label>
//           <input
//             type="number"
//             id="stock"
//             name="stock"
//             value={formData.stock}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-green-200"
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label className="block text-gray-700 mb-1" htmlFor="harvest_date">Harvest Date:</label>
//           <input
//             type="date"
//             id="harvest_date"
//             name="harvest_date"
//             value={formData.harvest_date}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-green-200"
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label className="block text-gray-700 mb-1" htmlFor="image">Product Image:</label>
//           <input
//             type="file"
//             id="image"
//             name="image"
//             onChange={handleImageChange}
//             className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-green-200"
//             accept="image/*"
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default InsertProductForm;

"use client"

import { useState, useMemo, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addProduct, listProducts } from "../../Redux/Slices/product/product"
import { selectReferencePrices, fetchReferencePrices } from "../../Redux/Slices/price_upload/price_upload_slice"
import {
  FaLeaf,
  FaSeedling,
  FaDollarSign,
  FaCalendarAlt,
  FaImage,
  FaBox,
  FaFileAlt,
  FaSpinner,
  FaCheck,
} from "react-icons/fa"

const InsertProductForm = ({ onClose }) => {
  const dispatch = useDispatch()
  const userData = JSON.parse(localStorage.getItem("userData"))
  const userId = userData ? userData.id : ""
  const { userInfo } = useSelector((state) => state.user)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Get all reference prices from Redux
  const reduxReferencePrices = useSelector(selectReferencePrices).prices

  // Fetch reference prices on mount if not already loaded
  useEffect(() => {
    if (!reduxReferencePrices || reduxReferencePrices.length === 0) {
      dispatch(fetchReferencePrices())
    }
  }, [dispatch, reduxReferencePrices])

  // Debug log
  useEffect(() => {
    console.log("Redux reference prices:", reduxReferencePrices)
  }, [reduxReferencePrices])

  // Extract unique categories from reference prices
  const categories = useMemo(() => {
    const set = new Set()
    ;(reduxReferencePrices || []).forEach((ref) => {
      if (ref.category) set.add(ref.category)
    })
    return Array.from(set)
  }, [reduxReferencePrices])

  // Extract unique product names (commodities) for selected category
  const [formData, setFormData] = useState({
    user: userInfo?.id || localStorage.getItem("user_id") || "",
    product_name: "",
    category: "",
    description: "",
    price: "",
    stock: "",
    harvest_date: "",
    image: null,
    unit: '',
  });

  // Unit options based on category
  const unitOptions = useMemo(() => {
    if (formData.category.toLowerCase().includes('oil')) return ['Liters', 'Milliliters'];
    if (formData.category.toLowerCase().includes('grain') || formData.category.toLowerCase().includes('vegetable') || formData.category.toLowerCase().includes('fruit')) return ['Kilograms', 'Grams'];
    return ['Units', 'Kilograms', 'Liters'];
  }, [formData.category]);

  const productNames = useMemo(() => {
    if (!formData.category) return []
    const set = new Set()
    ;(reduxReferencePrices || []).forEach((ref) => {
      if (ref.category === formData.category && ref.commodity) set.add(ref.commodity)
    })
    return Array.from(set)
  }, [reduxReferencePrices, formData.category])

  // Filter reference prices for selected category and product name
  const priceOptions = useMemo(() => {
    if (!formData.category || !formData.product_name) return []
    return (reduxReferencePrices || []).filter(
      (ref) => ref.category === formData.category && ref.commodity === formData.product_name,
    )
  }, [reduxReferencePrices, formData.category, formData.product_name])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    // Reset dependent fields
    if (name === "category") {
      setFormData((prev) => ({ ...prev, product_name: "", price: "", unit: "" }))
    }
    if (name === "product_name") {
      setFormData((prev) => ({ ...prev, price: "", unit: "" }))
    }
  }

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const productData = new FormData()
    Object.keys(formData).forEach((key) => {
      productData.append(key, formData[key])
    })

    try {
      dispatch(addProduct(productData))
        .unwrap()
        .then(() => {
          alert("Product added successfully")
          setFormData({
            user: userId || "",
            product_name: "",
            category: "",
            description: "",
            price: "",
            stock: "",
            harvest_date: "",
            image: null,
            unit: '',
          })
          dispatch(listProducts())
          onClose()
        })
        .catch((error) => {
          alert(`Failed to add product: ${error}`)
        })
        .finally(() => {
          setIsSubmitting(false)
        })
    } catch (error) {
      console.error("Error:", error)
      alert("An error occurred. Please try again later.")
      setIsSubmitting(false)
    }
  }

  const FormField = ({ icon: Icon, label, children, required = false }) => (
    <div className="mb-6">
      <label className="flex items-center text-gray-700 font-semibold mb-3">
        <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg mr-3 shadow-lg">
          <Icon className="text-white" size={16} />
        </div>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
    </div>
  )

  const SelectField = ({ name, value, onChange, options, placeholder, disabled = false, required = false }) => (
    <select
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      required={required}
      className="w-full border-2 border-emerald-200 rounded-xl p-4 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 bg-white/80 backdrop-blur-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option, idx) => (
        <option key={option.value || option || idx} value={option.value || option}>
          {option.label || option}
        </option>
      ))}
    </select>
  )

  const InputField = ({ type = "text", name, value, onChange, placeholder, required = false, ...props }) => (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full border-2 border-emerald-200 rounded-xl p-4 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 bg-white/80 backdrop-blur-sm"
      {...props}
    />
  )

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg mb-4">
          <FaLeaf className="text-white text-2xl" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
          Add New Product
        </h2>
        <p className="text-gray-600">Fill in the details to add a new product to your inventory</p>
      </div>

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
        <input type="hidden" name="user" value={formData.user} readOnly />

        <FormField icon={FaSeedling} label="Category" required>
          <SelectField
            name="category"
            value={formData.category}
            onChange={handleChange}
            options={categories}
            placeholder="Select a category"
            required
          />
        </FormField>

        <FormField icon={FaLeaf} label="Product Name" required>
          <SelectField
            name="product_name"
            value={formData.product_name}
            onChange={handleChange}
            options={productNames}
            placeholder="Select a product"
            disabled={!formData.category}
            required
          />
        </FormField>

        <FormField icon={FaDollarSign} label="Reference Price" required>
          <SelectField
            name="price"
            value={formData.price}
            onChange={handleChange}
            options={priceOptions.map((ref) => ({
              value: ref.price,
              label: `${ref.price} ${ref.currency} (${ref.admin1}, ${ref.admin2}, ${ref.market}, ${ref.pricetype})`,
            }))}
            placeholder="Select a reference price"
            disabled={!formData.category || !formData.product_name}
            required
          />
        </FormField>

        <FormField icon={FaLeaf} label="Unit" required>
          <SelectField
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            options={unitOptions}
            placeholder="Select a unit"
            disabled={!formData.category}
            required
          />
        </FormField>

        <FormField icon={FaFileAlt} label="Description" required>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description..."
            required
            rows="4"
            className="w-full border-2 border-emerald-200 rounded-xl p-4 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 bg-white/80 backdrop-blur-sm resize-none"
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField icon={FaBox} label="Stock Quantity" required>
            <InputField
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Enter stock quantity"
              min="0"
              required
            />
          </FormField>

          <FormField icon={FaCalendarAlt} label="Harvest Date" required>
            <InputField
              type="date"
              name="harvest_date"
              value={formData.harvest_date}
              onChange={handleChange}
              required
            />
          </FormField>
        </div>

        <FormField icon={FaImage} label="Product Image">
          <div className="relative">
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
             accept="image/jpeg, image/png, image/gif, image/webp, image/svg+xml, image/*"
              className="w-full border-2 border-dashed border-emerald-300 rounded-xl p-6 focus:outline-none focus:border-emerald-500 transition-all duration-300 bg-emerald-50/50 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 file:cursor-pointer"
            />
            <div className="absolute top-2 right-2 text-emerald-500">
              <FaImage size={20} />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Upload a high-quality image of your product (optional)</p>
        </FormField>

        <div className="flex gap-4 pt-6">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-4 px-6 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 py-4 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-emerald-500/25 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="animate-spin" size={18} />
                Adding Product...
              </>
            ) : (
              <>
                <FaCheck size={18} />
                Add Product
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default InsertProductForm
