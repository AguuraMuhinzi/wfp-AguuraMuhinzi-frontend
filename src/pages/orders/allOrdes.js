
import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, updateOrderStatus } from '../../Redux/Slices/order/orderSlice';
import { FiEdit, FiTrash2, FiEye, FiX } from 'react-icons/fi';

const OrdersTable = () => {
  const dispatch = useDispatch();
  const { orders = [], loading, error } = useSelector((state) => state.order || {});

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailsModalVisible, setDetailsModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('');

  const userId = parseInt(localStorage.getItem('user_id'), 10);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const filteredOrders = useMemo(() => {
    if (!orders || !Array.isArray(orders)) return [];
    let userOrders = orders.filter((order) => order.cooperative?.id === userId);

    if (filterStatus !== 'all') {
      userOrders = userOrders.filter((order) => order.status === filterStatus);
    }

    if (filterDate) {
      userOrders = userOrders.filter((order) => {
        const orderDate = new Date(order.created_at).toISOString().split('T')[0];
        return orderDate === filterDate;
      });
    }

    return userOrders;
  }, [orders, filterStatus, filterDate, userId]);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setDetailsModalVisible(true);
  };

  const handleEditOrder = (order) => {
    if (order.status === 'canceled') {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 5000); // Hide warning after 5 seconds
      return;
    }
    setSelectedOrder(order);
    setEditModalVisible(true);
  };

  const handleCloseDetailsModal = () => {
    setSelectedOrder(null);
    setDetailsModalVisible(false);
  };

  const handleCloseEditModal = () => {
    setSelectedOrder(null);
    setEditModalVisible(false);
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
  };

  const handleDateChange = (event) => {
    setFilterDate(event.target.value);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await dispatch(updateOrderStatus({ id: orderId, status: newStatus }));
      dispatch(fetchOrders()); // Reload the orders after updating
      handleCloseEditModal();
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  return (
    <div className="pt-20 px-4 md:px-8 flex-1 overflow-auto">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-4">
        <h1 className="text-2xl font-bold text-green-700 mb-6">Orders Management</h1>

        {showWarning && (
          <div className="flex items-start bg-yellow-100 text-yellow-800 p-4 rounded-lg mb-4" role="alert">
            <div className="flex items-center">
              <FiX className="w-5 h-5 fill-yellow-500 inline mr-3" />
              <strong className="font-bold">Warning!</strong>
            </div>
            <div className="ml-3">
              <p className="text-sm">This order has been canceled and cannot be edited.</p>
            </div>
          </div>
        )}

        {/* Filter Options */}
        <div className="flex space-x-2 mb-4">
          <select
            onChange={(e) => handleFilterChange(e.target.value)}
            className="px-3 py-2 border rounded-lg"
            value={filterStatus}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="canceled">Canceled</option>
          </select>
          <input
            type="date"
            onChange={handleDateChange}
            className="px-3 py-2 border rounded-lg"
            value={filterDate}
          />
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : filteredOrders.length === 0 ? (
          <p className="text-center text-gray-500">No orders available for this filter.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-200">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="p-3 text-left text-sm font-semibold border border-gray-300">Order ID</th>
                  <th className="p-3 text-left text-sm font-semibold border border-gray-300">Academy</th>
                  <th className="p-3 text-left text-sm font-semibold border border-gray-300">Total Price</th>
                  <th className="p-3 text-left text-sm font-semibold border border-gray-300">Status</th>
                  <th className="p-3 text-left text-sm font-semibold border border-gray-300">Created At</th>
                  <th className="p-3 text-center text-sm font-semibold border border-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 border-b border-gray-200">
                    <td className="p-3 text-sm text-gray-700 border border-gray-300">{order.id}</td>
                    <td className="p-3 text-sm text-gray-700 border border-gray-300">
                      {order.user.username ? order.user.username : 'No Academy'}
                    </td>
                    <td className="p-3 text-sm text-gray-700 border border-gray-300">${order.total_price}</td>
                    <td className="p-3 text-sm text-gray-700 border border-gray-300 capitalize">{order.status}</td>
                    <td className="p-3 text-sm text-gray-700 border border-gray-300">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-3 flex justify-center space-x-2 border border-gray-300">
                      <button onClick={() => handleViewOrder(order)} className="text-green-500 hover:text-green-700" title="View">
                        <FiEye size={18} />
                      </button>
                      <button onClick={() => handleEditOrder(order)} className="text-blue-500 hover:text-blue-700" title="Edit">
                        <FiEdit size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal for Viewing Order Details */}
      {isDetailsModalVisible && selectedOrder && (
         
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-xl w-full">
            <button onClick={handleCloseDetailsModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              <FiX size={24} />
            </button>

            <div className="border-2 border-dashed border-gray-200 p-4 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-center bg-green-100 py-2 rounded-full">Order Details</h2>
              <p className="mb-2"><strong>Order ID:</strong> {selectedOrder.id}</p>
              <p className="mb-2"><strong>Academy:</strong> {selectedOrder.user.academy_details ? selectedOrder.user.academy_details.name : 'No Academy'}</p>
              <p className="mb-2"><strong>Status:</strong> {selectedOrder.status}</p>
              <p className="mb-2"><strong>Created At:</strong> {new Date(selectedOrder.created_at).toLocaleDateString()}</p>
              <p className="mb-4"><strong>Total Price:</strong> ${selectedOrder.total_price}</p>

              <h3 className="text-lg font-semibold mb-2 bg-green-50 p-2 rounded">Order Items:</h3>
              <ul className="list-disc list-inside mb-4">
                {selectedOrder.products.map((item) => (
                  <li key={item.id} className="mb-1">
                    
                    <span className="font-semibold">{item?.product?.product_name || item.product}</span> - 
                    <span> Quantity: {item.quantity}, </span> 
                    <span>Amount: ${item.price}</span>
                    
                  </li>
                  
                ))}
              </ul>

              <button onClick={handleCloseDetailsModal} className="mt-4 w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 shadow-md">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Editing Order Status */}
      {isEditModalVisible && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-xl w-full">
            <button onClick={handleCloseEditModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              <FiX size={24} />
            </button>

            <div className="border-2 border-dashed border-gray-200 p-4 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-center bg-blue-100 py-2 rounded-full">Edit Order Status</h2>
              <p className="mb-2"><strong>Order ID:</strong> {selectedOrder.id}</p>
              <p className="mb-4"><strong>Current Status:</strong> {selectedOrder.status}</p>

              <div className="flex space-x-2">
                <button onClick={() => handleStatusChange(selectedOrder.id, 'shipped')} className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Mark as Shipped
                </button>
                <button onClick={() => handleStatusChange(selectedOrder.id, 'delivered')} className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                  Mark as Delivered
                </button>
                <button onClick={() => handleStatusChange(selectedOrder.id, 'canceled')} className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                  Cancel Order
                </button>
              </div>

              <button onClick={handleCloseEditModal} className="mt-4 w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 shadow-md">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersTable;
