
// import React, { useEffect, useState, useMemo } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchOrders, updateOrderStatus } from '../../Redux/Slices/order/orderSlice';
// import { FiEdit, FiTrash2, FiEye, FiX } from 'react-icons/fi';

// const OrdersTable = () => {
//   const dispatch = useDispatch();
//   const { orders = [], loading, error } = useSelector((state) => state.order || {});

//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [isDetailsModalVisible, setDetailsModalVisible] = useState(false);
//   const [isEditModalVisible, setEditModalVisible] = useState(false);
//   const [showWarning, setShowWarning] = useState(false);
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [filterDate, setFilterDate] = useState('');

//   const userId = parseInt(localStorage.getItem('user_id'), 10);

//   useEffect(() => {
//     dispatch(fetchOrders());
//   }, [dispatch]);

//   const filteredOrders = useMemo(() => {
//     if (!orders || !Array.isArray(orders)) return [];
//     let userOrders = orders.filter((order) => order.cooperative?.id === userId);

//     if (filterStatus !== 'all') {
//       userOrders = userOrders.filter((order) => order.status === filterStatus);
//     }

//     if (filterDate) {
//       userOrders = userOrders.filter((order) => {
//         const orderDate = new Date(order.created_at).toISOString().split('T')[0];
//         return orderDate === filterDate;
//       });
//     }

//     return userOrders;
//   }, [orders, filterStatus, filterDate, userId]);

//   const handleViewOrder = (order) => {
//     setSelectedOrder(order);
//     setDetailsModalVisible(true);
//   };

//   const handleEditOrder = (order) => {
//     if (order.status === 'canceled') {
//       setShowWarning(true);
//       setTimeout(() => setShowWarning(false), 5000); // Hide warning after 5 seconds
//       return;
//     }
//     setSelectedOrder(order);
//     setEditModalVisible(true);
//   };

//   const handleCloseDetailsModal = () => {
//     setSelectedOrder(null);
//     setDetailsModalVisible(false);
//   };

//   const handleCloseEditModal = () => {
//     setSelectedOrder(null);
//     setEditModalVisible(false);
//   };

//   const handleFilterChange = (status) => {
//     setFilterStatus(status);
//   };

//   const handleDateChange = (event) => {
//     setFilterDate(event.target.value);
//   };

//   const handleStatusChange = async (orderId, newStatus) => {
//     try {
//       await dispatch(updateOrderStatus({ id: orderId, status: newStatus }));
//       dispatch(fetchOrders()); // Reload the orders after updating
//       handleCloseEditModal();
//     } catch (error) {
//       console.error('Failed to update order status:', error);
//     }
//   };

//   return (
//     <div className="pt-20 px-4 md:px-8 flex-1 overflow-auto">
//       <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-4">
//         <h1 className="text-2xl font-bold text-green-700 mb-6">Orders Management</h1>

//         {showWarning && (
//           <div className="flex items-start bg-yellow-100 text-yellow-800 p-4 rounded-lg mb-4" role="alert">
//             <div className="flex items-center">
//               <FiX className="w-5 h-5 fill-yellow-500 inline mr-3" />
//               <strong className="font-bold">Warning!</strong>
//             </div>
//             <div className="ml-3">
//               <p className="text-sm">This order has been canceled and cannot be edited.</p>
//             </div>
//           </div>
//         )}

//         {/* Filter Options */}
//         <div className="flex space-x-2 mb-4">
//           <select
//             onChange={(e) => handleFilterChange(e.target.value)}
//             className="px-3 py-2 border rounded-lg"
//             value={filterStatus}
//           >
//             <option value="all">All Statuses</option>
//             <option value="pending">Pending</option>
//             <option value="shipped">Shipped</option>
//             <option value="delivered">Delivered</option>
//             <option value="canceled">Canceled</option>
//           </select>
//           <input
//             type="date"
//             onChange={handleDateChange}
//             className="px-3 py-2 border rounded-lg"
//             value={filterDate}
//           />
//         </div>

//         {loading ? (
//           <p className="text-center text-gray-500">Loading...</p>
//         ) : error ? (
//           <p className="text-center text-red-500">{error}</p>
//         ) : filteredOrders.length === 0 ? (
//           <p className="text-center text-gray-500">No orders available for this filter.</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full border-collapse border border-gray-200">
//               <thead className="bg-green-600 text-white">
//                 <tr>
//                   <th className="p-3 text-left text-sm font-semibold border border-gray-300">Order ID</th>
//                   <th className="p-3 text-left text-sm font-semibold border border-gray-300">Academy</th>
//                   <th className="p-3 text-left text-sm font-semibold border border-gray-300">Total Price</th>
//                   <th className="p-3 text-left text-sm font-semibold border border-gray-300">Status</th>
//                   <th className="p-3 text-left text-sm font-semibold border border-gray-300">Created At</th>
//                   <th className="p-3 text-center text-sm font-semibold border border-gray-300">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredOrders.map((order) => (
//                   <tr key={order.id} className="hover:bg-gray-50 border-b border-gray-200">
//                     <td className="p-3 text-sm text-gray-700 border border-gray-300">{order.id}</td>
//                     <td className="p-3 text-sm text-gray-700 border border-gray-300">
//                       {order.user.username ? order.user.username : 'No Academy'}
//                     </td>
//                     <td className="p-3 text-sm text-gray-700 border border-gray-300">${order.total_price}</td>
//                     <td className="p-3 text-sm text-gray-700 border border-gray-300 capitalize">{order.status}</td>
//                     <td className="p-3 text-sm text-gray-700 border border-gray-300">
//                       {new Date(order.created_at).toLocaleDateString()}
//                     </td>
//                     <td className="p-3 flex justify-center space-x-2 border border-gray-300">
//                       <button onClick={() => handleViewOrder(order)} className="text-green-500 hover:text-green-700" title="View">
//                         <FiEye size={18} />
//                       </button>
//                       <button onClick={() => handleEditOrder(order)} className="text-blue-500 hover:text-blue-700" title="Edit">
//                         <FiEdit size={18} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* Modal for Viewing Order Details */}
//       {isDetailsModalVisible && selectedOrder && (
         
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-xl w-full">
//             <button onClick={handleCloseDetailsModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
//               <FiX size={24} />
//             </button>

//             <div className="border-2 border-dashed border-gray-200 p-4 rounded-lg">
//               <h2 className="text-2xl font-bold mb-4 text-center bg-green-100 py-2 rounded-full">Order Details</h2>
//               <p className="mb-2"><strong>Order ID:</strong> {selectedOrder.id}</p>
//               <p className="mb-2"><strong>Academy:</strong> {selectedOrder.user.academy_details ? selectedOrder.user.academy_details.name : 'No Academy'}</p>
//               <p className="mb-2"><strong>Status:</strong> {selectedOrder.status}</p>
//               <p className="mb-2"><strong>Created At:</strong> {new Date(selectedOrder.created_at).toLocaleDateString()}</p>
//               <p className="mb-4"><strong>Total Price:</strong> ${selectedOrder.total_price}</p>

//               <h3 className="text-lg font-semibold mb-2 bg-green-50 p-2 rounded">Order Items:</h3>
//               <ul className="list-disc list-inside mb-4">
//                 {selectedOrder.products.map((item) => (
//                   <li key={item.id} className="mb-1">
                    
//                     <span className="font-semibold">{item?.product?.product_name || item.product}</span> - 
//                     <span> Quantity: {item.quantity}, </span> 
//                     <span>Amount: ${item.price}</span>
                    
//                   </li>
                  
//                 ))}
//               </ul>

//               <button onClick={handleCloseDetailsModal} className="mt-4 w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 shadow-md">
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Modal for Editing Order Status */}
//       {isEditModalVisible && selectedOrder && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-xl w-full">
//             <button onClick={handleCloseEditModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
//               <FiX size={24} />
//             </button>

//             <div className="border-2 border-dashed border-gray-200 p-4 rounded-lg">
//               <h2 className="text-2xl font-bold mb-4 text-center bg-blue-100 py-2 rounded-full">Edit Order Status</h2>
//               <p className="mb-2"><strong>Order ID:</strong> {selectedOrder.id}</p>
//               <p className="mb-4"><strong>Current Status:</strong> {selectedOrder.status}</p>

//               <div className="flex space-x-2">
//                 <button onClick={() => handleStatusChange(selectedOrder.id, 'shipped')} className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
//                   Mark as Shipped
//                 </button>
//                 <button onClick={() => handleStatusChange(selectedOrder.id, 'delivered')} className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700">
//                   Mark as Delivered
//                 </button>
//                 <button onClick={() => handleStatusChange(selectedOrder.id, 'canceled')} className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700">
//                   Cancel Order
//                 </button>
//               </div>

//               <button onClick={handleCloseEditModal} className="mt-4 w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 shadow-md">
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrdersTable;


"use client"
import { useEffect, useState, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchOrders, updateOrderStatus } from "../../Redux/Slices/order/orderSlice"
import {
  FiEdit,
  FiEye,
  FiX,
  FiClock,
  FiCheck,
  FiTruck,
  FiPackage,
  FiUser,
  FiCalendar,
  FiDollarSign,
  FiFilter,
  FiAlertTriangle,
} from "react-icons/fi"

const OrdersTable = () => {
  const dispatch = useDispatch()
  const { orders = [], loading, error } = useSelector((state) => state.order || {})
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isDetailsModalVisible, setDetailsModalVisible] = useState(false)
  const [isEditModalVisible, setEditModalVisible] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterDate, setFilterDate] = useState("")
  const [displayCount, setDisplayCount] = useState(10)
  const userId = Number.parseInt(localStorage.getItem("user_id"), 10)

  useEffect(() => {
    dispatch(fetchOrders())
  }, [dispatch])

  const filteredOrders = useMemo(() => {
    if (!orders || !Array.isArray(orders)) return []
    let userOrders = orders.filter((order) => order.cooperative?.id === userId)

    if (filterStatus !== "all") {
      userOrders = userOrders.filter((order) => order.status === filterStatus)
    }

    if (filterDate) {
      userOrders = userOrders.filter((order) => {
        const orderDate = new Date(order.created_at).toISOString().split("T")[0]
        return orderDate === filterDate
      })
    }

    return userOrders
  }, [orders, filterStatus, filterDate, userId])

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: FiClock },
      shipped: { color: "bg-purple-100 text-purple-800 border-purple-200", icon: FiTruck },
      delivered: { color: "bg-green-100 text-green-800 border-green-200", icon: FiCheck },
      canceled: { color: "bg-red-100 text-red-800 border-red-200", icon: FiX },
    }

    const config = statusConfig[status] || statusConfig.pending
    const IconComponent = config.icon

    return (
      <span
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${config.color}`}
      >
        <IconComponent size={12} />
        {status?.charAt(0).toUpperCase() + status?.slice(1) || "Pending"}
      </span>
    )
  }

  const handleViewOrder = (order) => {
    setSelectedOrder(order)
    setDetailsModalVisible(true)
  }

  const handleEditOrder = (order) => {
    if (order.status === "canceled") {
      setShowWarning(true)
      setTimeout(() => setShowWarning(false), 5000)
      return
    }
    setSelectedOrder(order)
    setEditModalVisible(true)
  }

  const handleCloseDetailsModal = () => {
    setSelectedOrder(null)
    setDetailsModalVisible(false)
  }

  const handleCloseEditModal = () => {
    setSelectedOrder(null)
    setEditModalVisible(false)
  }

  const handleFilterChange = (status) => {
    setFilterStatus(status)
  }

  const handleDateChange = (event) => {
    setFilterDate(event.target.value)
  }

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await dispatch(updateOrderStatus({ id: orderId, status: newStatus }))
      dispatch(fetchOrders())
      handleCloseEditModal()
    } catch (error) {
      console.error("Failed to update order status:", error)
    }
  }

  const handleDisplayCountChange = (e) => {
    setDisplayCount(Number.parseInt(e.target.value, 10))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-emerald-200 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <FiPackage />
                Orders Management
              </h1>
              <p className="text-emerald-100">Manage and track all your orders</p>
            </div>
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
              <p className="mt-4 text-gray-600">Loading orders...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-emerald-200 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <FiPackage />
                Orders Management
              </h1>
              <p className="text-emerald-100">Manage and track all your orders</p>
            </div>
            <div className="p-8 text-center text-red-600">
              <FiX className="mx-auto mb-4" size={48} />
              <p>Error loading orders: {error}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
            Orders Management
          </h1>
          <p className="text-gray-600 text-lg">Manage and track all your orders efficiently</p>
        </div>

        {/* Warning Alert */}
        {showWarning && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg shadow-sm">
            <div className="flex items-center">
              <FiAlertTriangle className="text-yellow-400 mr-3" size={20} />
              <div>
                <p className="text-yellow-800 font-medium">Warning!</p>
                <p className="text-yellow-700 text-sm">This order has been canceled and cannot be edited.</p>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl p-6 border border-emerald-200">
          <div className="flex items-center gap-2 mb-4">
            <FiFilter className="text-emerald-600" size={20} />
            <h2 className="text-lg font-semibold text-gray-800">Filter Orders</h2>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Status:</label>
              <select
                onChange={(e) => handleFilterChange(e.target.value)}
                className="px-3 py-2 border border-emerald-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={filterStatus}
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="canceled">Canceled</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Date:</label>
              <input
                type="date"
                onChange={handleDateChange}
                className="px-3 py-2 border border-emerald-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={filterDate}
              />
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-emerald-200 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FiPackage />
              Orders Inventory
            </h2>
            <p className="text-emerald-100">Complete list of all your orders</p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-2 text-sm font-semibold text-emerald-800">
                      <FiPackage size={16} />
                      Order ID
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-2 text-sm font-semibold text-emerald-800">
                      <FiUser size={16} />
                      Academy
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-2 text-sm font-semibold text-emerald-800">
                      <FiDollarSign size={16} />
                      Total Price
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-2 text-sm font-semibold text-emerald-800">
                      <FiClock size={16} />
                      Status
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-2 text-sm font-semibold text-emerald-800">
                      <FiCalendar size={16} />
                      Created At
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center">
                    <span className="text-sm font-semibold text-emerald-800">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-100">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                      <FiPackage className="mx-auto mb-4 text-gray-300" size={48} />
                      <p className="text-lg font-medium">No orders found</p>
                      <p className="text-sm">Orders matching your filter criteria will appear here</p>
                    </td>
                  </tr>
                ) : (
                  filteredOrders.slice(0, displayCount).map((order, index) => (
                    <tr
                      key={order.id}
                      className={`hover:bg-emerald-50/50 transition-colors duration-200 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">#{order.id}</span>
                          </div>
                          <span className="font-medium text-gray-900">Order #{order.id}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                            <FiUser className="text-white" size={14} />
                          </div>
                          <span className="text-gray-900">
                            {order.user.username ? order.user.username : "No Academy"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-emerald-600">RWF {order.total_price?.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">{new Date(order.created_at).toLocaleDateString()}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleViewOrder(order)}
                            className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors duration-200"
                            title="View Details"
                          >
                            <FiEye size={16} />
                          </button>
                          <button
                            onClick={() => handleEditOrder(order)}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                            title="Edit Status"
                          >
                            <FiEdit size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-4 border-t border-emerald-100">
            <div className="flex items-center justify-between">
              <p className="text-sm text-emerald-700">
                Showing 1 to {Math.min(displayCount, filteredOrders.length)} of {filteredOrders.length} entries
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm text-emerald-700">Display:</label>
                  <select
                    value={displayCount}
                    onChange={handleDisplayCountChange}
                    className="text-sm border border-emerald-300 rounded-lg px-3 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 text-sm border border-emerald-300 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors duration-200">
                    Previous
                  </button>
                  <button className="px-4 py-2 text-sm border border-emerald-300 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors duration-200">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* View Details Modal */}
        {isDetailsModalVisible && selectedOrder && (
          <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto border border-emerald-200">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <FiEye />
                  Order Details
                </h2>
                <button
                  onClick={handleCloseDetailsModal}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
                >
                  <FiX className="text-white" size={20} />
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-100 rounded-lg">
                        <FiPackage className="text-emerald-600" size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Order ID</p>
                        <p className="text-lg text-gray-800">#{selectedOrder.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <FiUser className="text-blue-600" size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Academy</p>
                        <p className="text-lg text-gray-800">
                          {selectedOrder.user.academy_details ? selectedOrder.user.academy_details.name : "No Academy"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <FiClock className="text-purple-600" size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Status</p>
                        <div className="mt-1">{getStatusBadge(selectedOrder.status)}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <FiDollarSign className="text-green-600" size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Price</p>
                        <p className="text-lg font-bold text-emerald-600">
                          RWF {selectedOrder.total_price?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <FiCalendar className="text-orange-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Created At</p>
                    <p className="text-lg text-gray-800">{new Date(selectedOrder.created_at).toLocaleDateString()}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FiPackage className="text-emerald-600" />
                    Order Items
                  </h3>
                  <div className="space-y-3">
                    {selectedOrder.products?.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{item?.product?.product_name || item.product}</p>
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-emerald-600">RWF {item.price?.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Status Modal */}
        {isEditModalVisible && selectedOrder && (
          <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-emerald-200">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <FiEdit />
                  Edit Order Status
                </h2>
                <button
                  onClick={handleCloseEditModal}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
                >
                  <FiX className="text-white" size={20} />
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                      <FiPackage className="text-emerald-600" size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Order ID</p>
                      <p className="text-lg text-gray-800">#{selectedOrder.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <FiClock className="text-purple-600" size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Current Status</p>
                      <div className="mt-1">{getStatusBadge(selectedOrder.status)}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Update Status</h3>
                  <div className="grid grid-cols-1 gap-3">
                    <button
                      onClick={() => handleStatusChange(selectedOrder.id, "shipped")}
                      className="flex items-center gap-3 p-4 border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors duration-200"
                    >
                      <FiTruck className="text-purple-600" size={20} />
                      <span className="font-medium text-gray-800">Mark as Shipped</span>
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedOrder.id, "delivered")}
                      className="flex items-center gap-3 p-4 border border-green-200 rounded-lg hover:bg-green-50 transition-colors duration-200"
                    >
                      <FiCheck className="text-green-600" size={20} />
                      <span className="font-medium text-gray-800">Mark as Delivered</span>
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedOrder.id, "canceled")}
                      className="flex items-center gap-3 p-4 border border-red-200 rounded-lg hover:bg-red-50 transition-colors duration-200"
                    >
                      <FiX className="text-red-600" size={20} />
                      <span className="font-medium text-gray-800">Cancel Order</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrdersTable

