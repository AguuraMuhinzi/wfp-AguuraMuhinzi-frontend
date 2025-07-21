

// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { listProducts, updateProduct } from '../../Redux/Slices/product/product'; 
// import { FiEdit, FiTrash2, FiEye } from 'react-icons/fi';

// const ProductTable = () => {
//   const dispatch = useDispatch();
//   const products = useSelector((state) => state.product.products);
//   const loading = useSelector((state) => state.product.loading);
//   const error = useSelector((state) => state.product.error);

//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [displayCount, setDisplayCount] = useState(10);
//   const [formData, setFormData] = useState({
//     product_name: '',
//     description: '',
//     price: '',
//     stock: '',
//     harvest_date: '',
//   });

//   const userId = localStorage.getItem('user_id');

//   useEffect(() => {
//     dispatch(listProducts());
//   }, [dispatch]);

//   // Filter products based on the logged-in user
//   const userProducts = products.filter((product) => product.user === parseInt(userId, 10));

//   const openEditModal = (product) => {
//     setSelectedProduct(product);
//     setFormData({
//       product_name: product.product_name,
//       description: product.description,
//       price: product.price,
//       stock: product.stock,
//       harvest_date: product.harvest_date,
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

//   const handleDisplayCountChange = (e) => {
//     setDisplayCount(parseInt(e.target.value, 10));
//   };

//   return (
//     <div className="mt-20 px-4 md:px-8">
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border-collapse">
//           <thead>
//             <tr className="bg-gray-100 border-b">
//               <th className="p-4 text-left text-sm font-semibold text-gray-700">Product Name</th>
//               <th className="p-4 text-left text-sm font-semibold text-gray-700">Price</th>
//               <th className="p-4 text-left text-sm font-semibold text-gray-700">Stock</th>
//               <th className="p-4 text-left text-sm font-semibold text-gray-700">Harvest Date</th>
//               <th className="p-4 text-center text-sm font-semibold text-gray-700">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan="5" className="p-4 text-center text-gray-500">
//                   Loading...
//                 </td>
//               </tr>
//             ) : error ? (
//               <tr>
//                 <td colSpan="5" className="p-4 text-center text-red-500">
//                   {error}
//                 </td>
//               </tr>
//             ) : userProducts.length === 0 ? (
//               <tr>
//                 <td colSpan="5" className="p-4 text-center text-gray-500">
//                   No products found for this user.
//                 </td>
//               </tr>
//             ) : (
//               userProducts.slice(0, displayCount).map((product) => (
//                 <tr key={product.id} className="border-b hover:bg-gray-50 transition-colors">
//                   <td className="p-4 text-sm text-gray-700">{product.product_name}</td>
//                   <td className="p-4 text-sm text-gray-700">${product.price}</td>
//                   <td className="p-4 text-sm text-gray-700">{product.stock}</td>
//                   <td className="p-4 text-sm text-gray-700">
//                     {new Date(product.harvest_date).toLocaleDateString()}
//                   </td>
//                   <td className="p-4 flex justify-center space-x-2">
//                     <button
//                       onClick={() => openViewModal(product)}
//                       className="text-green-500 hover:text-green-700"
//                       title="View"
//                     >
//                       <FiEye size={18} />
//                     </button>
//                     <button
//                       onClick={() => openEditModal(product)}
//                       className="text-blue-500 hover:text-blue-700"
//                       title="Edit"
//                     >
//                       <FiEdit size={18} />
//                     </button>
//                     <button className="text-red-500 hover:text-red-700" title="Delete">
//                       <FiTrash2 size={18} />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//              {/* View Modal */}
//         {showViewModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
//             <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full overflow-hidden">
//               <h2 className="text-3xl font-bold mb-4 text-green-700">Product Details</h2>
//               <div className="space-y-4">
//                 <div>
//                   <p className="text-sm font-semibold text-gray-600">Product Name:</p>
//                   <p className="text-lg text-gray-800 truncate">{selectedProduct.product_name}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-semibold text-gray-600">Description:</p>
//                   <p className="text-lg text-gray-800 break-words overflow-hidden">{selectedProduct.description}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-semibold text-gray-600">Price:</p>
//                   <p className="text-lg text-gray-800">${selectedProduct.price}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-semibold text-gray-600">Stock:</p>
//                   <p className="text-lg text-gray-800">{selectedProduct.stock}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-semibold text-gray-600">Harvest Date:</p>
//                   <p className="text-lg text-gray-800">{new Date(selectedProduct.harvest_date).toLocaleDateString()}</p>
//                 </div>
//               </div>
//               <button
//                 onClick={closeModals}
//                 className="mt-6 w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )}

//  {/* Edit Modal */}
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
//          <div className="p-4 bg-gray-100 border-t mt-4 rounded-lg">
//          <p className="text-sm text-gray-600">Showing 1 to {Math.min(displayCount, products.length)} of {products.length} entries</p>
//          <div className="flex justify-between mt-2">
//           <div className="flex items-center">
//             <label className="text-sm text-gray-600 mr-2">Display</label>
//               <select
//                 value={displayCount}
//                 onChange={handleDisplayCountChange}
//                 className="text-sm border border-gray-400 rounded px-2 py-1 outline-none"
//               >
//                 <option value={5}>5</option>
//                 <option value={10}>10</option>
//                 <option value={20}>20</option>
//                 <option value={50}>50</option>
//                 <option value={100}>100</option>
//               </select>
//             </div>
//             <div className="flex">
//               <button className="px-4 py-2 border text-sm text-gray-600 hover:bg-gray-200">Previous</button>
//               <button className="px-4 py-2 border text-sm text-gray-600 hover:bg-gray-200">Next</button>
//             </div>
//             </div>
//      </div>
//     </div>
//   );
// };

// export default ProductTable;


"use client"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { listProducts, updateProduct, deleteProduct } from "../../Redux/Slices/product/product"
import { FiEdit, FiTrash2, FiEye, FiPackage, FiCalendar, FiDollarSign } from "react-icons/fi"
import { FaTimes } from "react-icons/fa"

const ProductTable = () => {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.product.products)
  const loading = useSelector((state) => state.product.loading)
  const error = useSelector((state) => state.product.error)

  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [displayCount, setDisplayCount] = useState(10)
  const [formData, setFormData] = useState({
    product_name: "",
    description: "",
    price: "",
    stock: "",
    harvest_date: "",
  })

  const userId = localStorage.getItem("user_id")

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  // Filter products based on the logged-in user
  const userProducts = products.filter((product) => product.user === Number.parseInt(userId, 10))

  const openEditModal = (product) => {
    setSelectedProduct(product)
    setFormData({
      product_name: product.product_name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      harvest_date: product.harvest_date,
    })
    setShowEditModal(true)
  }

  const openViewModal = (product) => {
    setSelectedProduct(product)
    setShowViewModal(true)
  }

  const closeModals = () => {
    setSelectedProduct(null)
    setShowEditModal(false)
    setShowViewModal(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleEditSubmit = (e) => {
    e.preventDefault()
    if (selectedProduct) {
      dispatch(updateProduct({ productId: selectedProduct.id, productData: formData }))
        .then(() => {
          alert("Product updated successfully!")
          closeModals()
        })
        .catch(() => {
          alert("Failed to update the product. Please try again.")
        })
    }
  }

  const handleDisplayCountChange = (e) => {
    setDisplayCount(Number.parseInt(e.target.value, 10))
  }

  // Add delete handler
  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(productId)).then(() => {
        dispatch(listProducts());
      });
    }
  };

  const getStockStatus = (stock) => {
    if (stock < 10) return { color: "text-red-600 bg-red-50", label: "Low Stock" }
    if (stock < 50) return { color: "text-yellow-600 bg-yellow-50", label: "Medium" }
    return { color: "text-emerald-600 bg-emerald-50", label: "In Stock" }
  }

  return (
    <div className="space-y-6">
      {/* Table Container */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gradient-to-r from-emerald-500 to-teal-600">
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Product Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Price</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Stock Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Harvest Date</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-white">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-100">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-gray-500 font-medium">Loading products...</span>
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <div className="text-red-500 font-medium">{error}</div>
                  </td>
                </tr>
              ) : userProducts.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <div className="text-gray-500 font-medium">No products found for this user.</div>
                  </td>
                </tr>
              ) : (
                userProducts.slice(0, displayCount).map((product, index) => {
                  const stockStatus = getStockStatus(product.stock)
                  return (
                    <tr
                      key={product.id}
                      className={`hover:bg-emerald-50/50 transition-colors duration-200 ${index % 2 === 0 ? "bg-white/50" : "bg-gray-50/30"}`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg">
                            <FiPackage className="text-white" size={16} />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{product.product_name}</div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">{product.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <FiDollarSign className="text-emerald-600" size={16} />
                          <span className="font-semibold text-gray-900">RWF {product.price}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${stockStatus.color}`}>
                            {product.stock} units
                          </span>
                          <span className="text-xs text-gray-500">({stockStatus.label})</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <FiCalendar className="text-gray-400" size={16} />
                          <span className="text-gray-700">{new Date(product.harvest_date).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => openViewModal(product)}
                            className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors duration-200"
                            title="View Details"
                          >
                            <FiEye size={18} />
                          </button>
                          <button
                            onClick={() => openEditModal(product)}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                            title="Edit Product"
                          >
                            <FiEdit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                            title="Delete Product"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-100 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="text-sm text-gray-600">
            Showing <span className="font-semibold text-emerald-600">1</span> to{" "}
            <span className="font-semibold text-emerald-600">{Math.min(displayCount, userProducts.length)}</span> of{" "}
            <span className="font-semibold text-emerald-600">{userProducts.length}</span> entries
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600 font-medium">Show:</label>
              <select
                value={displayCount}
                onChange={handleDisplayCountChange}
                className="px-3 py-2 border border-emerald-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>

            <div className="flex space-x-2">
              <button className="px-4 py-2 border border-emerald-200 text-sm text-gray-600 hover:bg-emerald-50 rounded-lg transition-colors duration-200">
                Previous
              </button>
              <button className="px-4 py-2 border border-emerald-200 text-sm text-gray-600 hover:bg-emerald-50 rounded-lg transition-colors duration-200">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* View Modal */}
      {showViewModal && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-emerald-200 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Product Details</h2>
              <button onClick={closeModals} className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200">
                <FaTimes className="text-white" size={18} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg">
                    <FiPackage className="text-white" size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600">Product Name</p>
                    <p className="text-lg font-semibold text-gray-900">{selectedProduct?.product_name}</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-600 mb-2">Description</p>
                  <p className="text-gray-800 leading-relaxed">{selectedProduct?.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <FiDollarSign className="text-emerald-600" size={20} />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Price</p>
                      <p className="text-lg font-semibold text-gray-900">RWF {selectedProduct?.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <FiPackage className="text-blue-600" size={20} />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Stock</p>
                      <p className="text-lg font-semibold text-gray-900">{selectedProduct?.stock} units</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <FiCalendar className="text-purple-600" size={20} />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Harvest Date</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {selectedProduct && new Date(selectedProduct.harvest_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={closeModals}
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-emerald-200 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Edit Product</h2>
              <button onClick={closeModals} className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200">
                <FaTimes className="text-white" size={18} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                <input
                  type="text"
                  name="product_name"
                  value={formData.product_name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Harvest Date</label>
                <input
                  type="date"
                  name="harvest_date"
                  value={formData.harvest_date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                  required
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={closeModals}
                  className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 font-medium"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductTable
