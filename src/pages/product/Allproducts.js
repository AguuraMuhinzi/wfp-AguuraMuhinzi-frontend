
// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { listProducts, updateProduct } from '../../Redux/Slices/product/product'; // Replace with your actual import path
// import { FiEdit, FiTrash2, FiEye } from 'react-icons/fi';

// const ProductTable = () => {
//   const dispatch = useDispatch();
//   const products = useSelector((state) => state.product.products);
//   const loading = useSelector((state) => state.product.loading);
//   const error = useSelector((state) => state.product.error);

//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [formData, setFormData] = useState({
//     product_name: '',
//     description: '',
//     price: '',
//     stock: '',
//     harvest_date: ''
//   });

//   useEffect(() => {
//     dispatch(listProducts());
//   }, [dispatch]);

//   const openEditModal = (product) => {
//     setSelectedProduct(product);
//     setFormData({
//       product_name: product.product_name,
//       description: product.description,
//       price: product.price,
//       stock: product.stock,
//       harvest_date: product.harvest_date
//     });
//     setShowEditModal(true);
//   };

//   const openViewModal = (product) => {
//     setSelectedProduct(product);
//     setShowViewModal(true);
//   };

//   const closeModals = () => {
//     setSelectedProduct(null);
//     setShowEditModal(false);
//     setShowViewModal(false);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleEditSubmit = (e) => {
//     e.preventDefault();
//     if (selectedProduct) {
//       dispatch(updateProduct({ productId: selectedProduct.id, productData: formData }))
//         .then(() => {
//           alert('Product updated successfully!');
//           closeModals();
//         })
//         .catch(() => {
//           alert('Failed to update the product. Please try again.');
//         });
//     }
//   };


//   return (
//     <div className="mt-20 px-4 md:px-8">
//       <div className="overflow-x-auto">
//         <div className="w-full max-w-7xl mx-auto bg-white shadow-lg rounded-lg">
//           <table className="min-w-full bg-white">
//             <thead>
//               <tr className="bg-gray-100 border-b">
//                 <th className="p-4 text-left text-sm font-semibold text-gray-700">Product Name</th>
//                 <th className="p-4 text-left text-sm font-semibold text-gray-700">Price</th>
//                 <th className="p-4 text-left text-sm font-semibold text-gray-700">Stock</th>
//                 <th className="p-4 text-left text-sm font-semibold text-gray-700">Harvest Date</th>
//                 <th className="p-4 text-center text-sm font-semibold text-gray-700">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="6" className="p-4 text-center text-gray-500">Loading...</td>
//                 </tr>
//               ) : error ? (
//                 <tr>
//                   <td colSpan="6" className="p-4 text-center text-red-500">{error}</td>
//                 </tr>
//               ) : (
//                 products.map((product) => (
//                   <tr key={product.id} className="border-b hover:bg-gray-50 transition-colors">
//                     <td className="p-4 text-sm text-gray-700">{product.product_name}</td>
//                     <td className="p-4 text-sm text-gray-700">${product.price}</td>
//                     <td className="p-4 text-sm text-gray-700">{product.stock}</td>
//                     <td className="p-4 text-sm text-gray-700">
//                       {new Date(product.harvest_date).toLocaleDateString()}
//                     </td>
//                     <td className="p-4 flex justify-center space-x-2">
//                       <button onClick={() => openViewModal(product)} className="text-green-500 hover:text-green-700" title="View">
//                         <FiEye size={18} />
//                       </button>
//                       <button onClick={() => openEditModal(product)} className="text-blue-500 hover:text-blue-700" title="Edit">
//                         <FiEdit size={18} />
//                       </button>
//                       <button className="text-red-500 hover:text-red-700" title="Delete">
//                         <FiTrash2 size={18} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//      {/* View Modal */}
// {/* View Modal */}
// {showViewModal && (
//   <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
//     <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full overflow-hidden">
//       <h2 className="text-3xl font-bold mb-4 text-green-700">Product Details</h2>
//       <div className="space-y-4">
//         <div>
//           <p className="text-sm font-semibold text-gray-600">Product Name:</p>
//           <p className="text-lg text-gray-800 truncate">{selectedProduct.product_name}</p>
//         </div>
//         <div>
//           <p className="text-sm font-semibold text-gray-600">Description:</p>
//           <p className="text-lg text-gray-800 break-words overflow-hidden">{selectedProduct.description}</p>
//         </div>
//         <div>
//           <p className="text-sm font-semibold text-gray-600">Price:</p>
//           <p className="text-lg text-gray-800">${selectedProduct.price}</p>
//         </div>
//         <div>
//           <p className="text-sm font-semibold text-gray-600">Stock:</p>
//           <p className="text-lg text-gray-800">{selectedProduct.stock}</p>
//         </div>
//         <div>
//           <p className="text-sm font-semibold text-gray-600">Harvest Date:</p>
//           <p className="text-lg text-gray-800">{new Date(selectedProduct.harvest_date).toLocaleDateString()}</p>
//         </div>
//       </div>
//       <button
//         onClick={closeModals}
//         className="mt-6 w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300"
//       >
//         Close
//       </button>
//     </div>
//   </div>
// )}



//         {/* Edit Modal */}
//         {showEditModal && (
//           <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
//             <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
//               <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
//               <form onSubmit={handleEditSubmit}>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700">Product Name</label>
//                   <input
//                     type="text"
//                     name="product_name"
//                     value={formData.product_name}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700">Description</label>
//                   <textarea
//                     name="description"
//                     value={formData.description}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700">Price</label>
//                   <input
//                     type="number"
//                     name="price"
//                     value={formData.price}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700">Stock</label>
//                   <input
//                     type="number"
//                     name="stock"
//                     value={formData.stock}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700">Harvest Date</label>
//                   <input
//                     type="date"
//                     name="harvest_date"
//                     value={formData.harvest_date}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                     required
//                   />
//                 </div>
//                 <div className="flex justify-end space-x-2">
//                   <button type="button" onClick={closeModals} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
//                   <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Save Changes</button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         <div className="p-4 bg-gray-100 border-t mt-4 rounded-lg">
//           <p className="text-sm text-gray-600">Showing 1 to {products.length} of {products.length} entries</p>
//           <div className="flex justify-between mt-2">
//             <div className="flex items-center">
//               <label className="text-sm text-gray-600 mr-2">Display</label>
//               <select className="text-sm border border-gray-400 rounded px-2 py-1 outline-none">
//                 <option>5</option>
//                 <option>10</option>
//                 <option>20</option>
//                 <option>50</option>
//                 <option>100</option>
//               </select>
//             </div>
//             <div className="flex">
//               <button className="px-4 py-2 border text-sm text-gray-600 hover:bg-gray-200">Previous</button>
//               <button className="px-4 py-2 border text-sm text-gray-600 hover:bg-gray-200">Next</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductTable;


'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts, updateProduct } from '../../Redux/Slices/product/product'; // Adjust import path as needed
import { FiEdit, FiTrash2, FiEye } from 'react-icons/fi';

const ProductTable = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const loading = useSelector((state) => state.product.loading);
  const error = useSelector((state) => state.product.error);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [displayCount, setDisplayCount] = useState(10); // State for filtering the display count
  const [formData, setFormData] = useState({
    product_name: '',
    description: '',
    price: '',
    stock: '',
    harvest_date: ''
  });

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setFormData({
      product_name: product.product_name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      harvest_date: product.harvest_date
    });
    setShowEditModal(true);
  };

  const openViewModal = (product) => {
    setSelectedProduct(product);
    setShowViewModal(true);
  };

  const closeModals = () => {
    setSelectedProduct(null);
    setShowEditModal(false);
    setShowViewModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (selectedProduct) {
      dispatch(updateProduct({ productId: selectedProduct.id, productData: formData }))
        .then(() => {
          alert('Product updated successfully!');
          closeModals();
        })
        .catch(() => {
          alert('Failed to update the product. Please try again.');
        });
    }
  };

  const handleDisplayCountChange = (e) => {
    setDisplayCount(parseInt(e.target.value, 10));
  };

  return (
    <div className="mt-20 px-4 md:px-8">
      <div className="overflow-x-auto">
        <div className="w-full max-w-7xl mx-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-4 text-left text-sm font-semibold text-gray-700">Product Name</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">Price</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">Stock</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">Harvest Date</th>
                <th className="p-4 text-center text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-500">Loading...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-red-500">{error}</td>
                </tr>
              ) : (
                products.slice(0, displayCount).map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-sm text-gray-700">{product.product_name}</td>
                    <td className="p-4 text-sm text-gray-700">${product.price}</td>
                    <td className="p-4 text-sm text-gray-700">{product.stock}</td>
                    <td className="p-4 text-sm text-gray-700">
                      {new Date(product.harvest_date).toLocaleDateString()}
                    </td>
                    <td className="p-4 flex justify-center space-x-2">
                      <button onClick={() => openViewModal(product)} className="text-green-500 hover:text-green-700" title="View">
                        <FiEye size={18} />
                      </button>
                      <button onClick={() => openEditModal(product)} className="text-blue-500 hover:text-blue-700" title="Edit">
                        <FiEdit size={18} />
                      </button>
                      <button className="text-red-500 hover:text-red-700" title="Delete">
                        <FiTrash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* View Modal */}
        {showViewModal && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full overflow-hidden">
              <h2 className="text-3xl font-bold mb-4 text-green-700">Product Details</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-gray-600">Product Name:</p>
                  <p className="text-lg text-gray-800 truncate">{selectedProduct.product_name}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">Description:</p>
                  <p className="text-lg text-gray-800 break-words overflow-hidden">{selectedProduct.description}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">Price:</p>
                  <p className="text-lg text-gray-800">${selectedProduct.price}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">Stock:</p>
                  <p className="text-lg text-gray-800">{selectedProduct.stock}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">Harvest Date:</p>
                  <p className="text-lg text-gray-800">{new Date(selectedProduct.harvest_date).toLocaleDateString()}</p>
                </div>
              </div>
              <button
                onClick={closeModals}
                className="mt-6 w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
              <form onSubmit={handleEditSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Product Name</label>
                  <input
                    type="text"
                    name="product_name"
                    value={formData.product_name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Harvest Date</label>
                  <input
                    type="date"
                    name="harvest_date"
                    value={formData.harvest_date}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button type="button" onClick={closeModals} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="p-4 bg-gray-100 border-t mt-4 rounded-lg">
          <p className="text-sm text-gray-600">Showing 1 to {Math.min(displayCount, products.length)} of {products.length} entries</p>
          <div className="flex justify-between mt-2">
            <div className="flex items-center">
              <label className="text-sm text-gray-600 mr-2">Display</label>
              <select
                value={displayCount}
                onChange={handleDisplayCountChange}
                className="text-sm border border-gray-400 rounded px-2 py-1 outline-none"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
            <div className="flex">
              <button className="px-4 py-2 border text-sm text-gray-600 hover:bg-gray-200">Previous</button>
              <button className="px-4 py-2 border text-sm text-gray-600 hover:bg-gray-200">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
