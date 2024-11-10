// 'use client';

// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addProduct } from '../../Redux/Slices/product/product';

// const InsertProductForm = ({ onClose }) => {
//   const dispatch = useDispatch();

//   // Retrieve user ID from localStorage if available
//   const userData = JSON.parse(localStorage.getItem('userData'));
//   const userId = userData ? userData.id : ''; // Adjust the key if necessary
//   const { userInfo } = useSelector((state) => state.user);

//   const [formData, setFormData] = useState({
//     user: userInfo?.id || localStorage.getItem('user_id') || '',
//     product_name: '',
//     category: '',
//     description: '',
//     price: '',
//     stock: '',
//     harvest_date: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Dispatch Redux action to add product
//       dispatch(addProduct(formData)).unwrap().then(() => {
//         alert('Product added successfully');
//         setFormData({
//           user: userId || '',
//           product_name: '',
//           description: '',
//           price: '',
//           stock: '',
//           harvest_date: ''
//         });
//         onClose(); // Close the modal after submission
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
//       <form onSubmit={handleSubmit}>
//         <input
//           type="hidden"
//           id="user"
//           name="user"
//           value={formData.user}
//           readOnly // Make it read-only since it's retrieved from local storage
//         />
//         <div className="mb-3">
//           <label className="block text-gray-700 mb-1" htmlFor="product_name">
//             Product Name:
//           </label>
//           <input
//             type="text"
//             id="product_name"
//             name="product_name"
//             value={formData.product_name}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-green-200"
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label className="block text-gray-700 mb-1" htmlFor="description">
//             Description:
//           </label>
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
//           <label className="block text-gray-700 mb-1" htmlFor="price">
//             Price:
//           </label>
//           <input
//             type="number"
//             id="price"
//             name="price"
//             value={formData.price}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-green-200"
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label className="block text-gray-700 mb-1" htmlFor="stock">
//             Stock:
//           </label>
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
//           <label className="block text-gray-700 mb-1" htmlFor="harvest_date">
//             Harvest Date:
//           </label>
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

'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../Redux/Slices/product/product';

const InsertProductForm = ({ onClose }) => {
  const dispatch = useDispatch();

  // Retrieve user ID from localStorage if available
  const userData = JSON.parse(localStorage.getItem('userData'));
  const userId = userData ? userData.id : ''; // Adjust the key if necessary
  const { userInfo } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    user: userInfo?.id || localStorage.getItem('user_id') || '',
    product_name: '',
    category: '',
    description: '',
    price: '',
    stock: '',
    harvest_date: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Dispatch Redux action to add product
      dispatch(addProduct(formData)).unwrap().then(() => {
        alert('Product added successfully');
        setFormData({
          user: userId || '',
          product_name: '',
          category: '',
          description: '',
          price: '',
          stock: '',
          harvest_date: ''
        });
        onClose(); // Close the modal after submission
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
      <form onSubmit={handleSubmit}>
        <input
          type="hidden"
          id="user"
          name="user"
          value={formData.user}
          readOnly // Make it read-only since it's retrieved from local storage
        />
        <div className="mb-3">
          <label className="block text-gray-700 mb-1" htmlFor="product_name">
            Product Name:
          </label>
          <input
            type="text"
            id="product_name"
            name="product_name"
            value={formData.product_name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-green-200"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block text-gray-700 mb-1" htmlFor="category">
            Category:
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-green-200"
            required
          >
            <option value="" disabled>Select a category</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Fruits">Fruits</option>
            <option value="Dairy">Dairy</option>
            <option value="Grain">Grain</option>
            <option value="Processed Grains">Processed Grains</option>
            <option value="Meat">Meat</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="block text-gray-700 mb-1" htmlFor="description">
            Description:
          </label>
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
          <label className="block text-gray-700 mb-1" htmlFor="price">
            Price:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-green-200"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block text-gray-700 mb-1" htmlFor="stock">
            Stock:
          </label>
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
          <label className="block text-gray-700 mb-1" htmlFor="harvest_date">
            Harvest Date:
          </label>
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
