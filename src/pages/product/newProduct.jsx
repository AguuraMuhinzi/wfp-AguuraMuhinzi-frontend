


import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, listProducts } from '../../Redux/Slices/product/product';
import { selectReferencePrices, fetchReferencePrices } from '../../Redux/Slices/price_upload/price_upload_slice';

const InsertProductForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem('userData'));
  const userId = userData ? userData.id : '';
  const { userInfo } = useSelector((state) => state.user);

  // Get all reference prices from Redux
  const reduxReferencePrices = useSelector(selectReferencePrices).prices;

  // Fetch reference prices on mount if not already loaded
  useEffect(() => {
    if (!reduxReferencePrices || reduxReferencePrices.length === 0) {
      dispatch(fetchReferencePrices());
    }
  }, [dispatch, reduxReferencePrices]);

  // Debug log
  useEffect(() => {
    console.log('Redux reference prices:', reduxReferencePrices);
  }, [reduxReferencePrices]);

  // Extract unique categories from reference prices
  const categories = useMemo(() => {
    const set = new Set();
    (reduxReferencePrices || []).forEach(ref => {
      if (ref.category) set.add(ref.category);
    });
    return Array.from(set);
  }, [reduxReferencePrices]);

  // Extract unique product names (commodities) for selected category
  const [formData, setFormData] = useState({
    user: userInfo?.id || localStorage.getItem('user_id') || '',
    product_name: '',
    category: '',
    description: '',
    price: '',
    stock: '',
    harvest_date: '',
    image: null
  });

  const productNames = useMemo(() => {
    if (!formData.category) return [];
    const set = new Set();
    (reduxReferencePrices || []).forEach(ref => {
      if (ref.category === formData.category && ref.commodity) set.add(ref.commodity);
    });
    return Array.from(set);
  }, [reduxReferencePrices, formData.category]);

  // Filter reference prices for selected category and product name
  const priceOptions = useMemo(() => {
    if (!formData.category || !formData.product_name) return [];
    return (reduxReferencePrices || []).filter(
      ref => ref.category === formData.category && ref.commodity === formData.product_name
    );
  }, [reduxReferencePrices, formData.category, formData.product_name]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Reset dependent fields
    if (name === 'category') {
      setFormData(prev => ({ ...prev, product_name: '', price: '' }));
    }
    if (name === 'product_name') {
      setFormData(prev => ({ ...prev, price: '' }));
    }
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = new FormData();
    Object.keys(formData).forEach(key => {
      productData.append(key, formData[key]);
    });
    try {
      dispatch(addProduct(productData)).unwrap().then(() => {
        alert('Product added successfully');
        setFormData({
          user: userId || '',
          product_name: '',
          category: '',
          description: '',
          price: '',
          stock: '',
          harvest_date: '',
          image: null
        });
        dispatch(listProducts());
        onClose();
      }).catch((error) => {
        alert(`Failed to add product: ${error}`);
      });
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center text-green-700">Insert Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="hidden" id="user" name="user" value={formData.user} readOnly />
        <div className="mb-3">
          <label className="block text-gray-700 mb-1" htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-green-200"
            required
          >
            <option value="" disabled>Select a category</option>
            {categories.map((cat, idx) => (
              <option key={cat || idx} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="block text-gray-700 mb-1" htmlFor="product_name">Product Name:</label>
          <select
            id="product_name"
            name="product_name"
            value={formData.product_name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-green-200"
            required
            disabled={!formData.category}
          >
            <option value="" disabled>Select a product</option>
            {productNames.map((prod, idx) => (
              <option key={prod || idx} value={prod}>{prod}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="block text-gray-700 mb-1" htmlFor="price">Price:</label>
          <select
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-green-200"
            required
            disabled={!formData.category || !formData.product_name}
          >
            <option value="" disabled>Select a reference price</option>
            {priceOptions.map((ref, idx) => (
              <option key={ref.id || idx} value={ref.price}>
                {ref.price} {ref.currency} ({ref.admin1}, {ref.admin2}, {ref.market}, {ref.pricetype})
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="block text-gray-700 mb-1" htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-green-200"
            required
            rows="3"
          />
        </div>
        <div className="mb-3">
          <label className="block text-gray-700 mb-1" htmlFor="stock">Stock:</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-green-200"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block text-gray-700 mb-1" htmlFor="harvest_date">Harvest Date:</label>
          <input
            type="date"
            id="harvest_date"
            name="harvest_date"
            value={formData.harvest_date}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-green-200"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block text-gray-700 mb-1" htmlFor="image">Product Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-green-200"
            accept="image/*"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default InsertProductForm;
