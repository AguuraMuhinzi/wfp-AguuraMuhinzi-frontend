import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../Redux/Slices/order/orderSlice.js';
import { FiSearch, FiFilter, FiDownload, FiEye } from 'react-icons/fi';

const AcademyOrders = () => {
  const dispatch = useDispatch();
  const { orders = [], loading, error } = useSelector((state) => state.order || {});
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailsModalVisible, setDetailsModalVisible] = useState(false);

  const userId = parseInt(localStorage.getItem('user_id'), 10);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  // Use useMemo to filter orders efficiently
  const filteredOrders = useMemo(() => {
    if (!orders || !Array.isArray(orders)) return [];
    let academyOrders = orders.filter((order) => order.user.id === userId);
    
    // Apply status filter
    if (filterStatus !== 'all') {
      academyOrders = academyOrders.filter((order) => order.status === filterStatus);
    }
    
    // Apply date filter
    if (filterDate) {
      academyOrders = academyOrders.filter((order) => {
        const orderDate = new Date(order.created_at).toISOString().split('T')[0];
        return orderDate === filterDate;
      });
    }
    
    // Apply search term filter
    if (searchTerm) {
      academyOrders = academyOrders.filter(order => 
        (order.id?.toString().includes(searchTerm)) ||
        (order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (order.course?.title?.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    return academyOrders;
  }, [orders, filterStatus, filterDate, searchTerm, userId]);

  // Format date to readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setDetailsModalVisible(true);
  };

  const handleCloseDetailsModal = () => {
    setSelectedOrder(null);
    setDetailsModalVisible(false);
  };

  // Get counts for different order statuses
  const getStatusCounts = () => {
    if (!orders || !Array.isArray(orders)) return { total: 0, completed: 0, pending: 0, cancelled: 0 };
    
    const academyOrders = orders.filter((order) => order.user === userId);
    
    return {
      total: academyOrders.length,
      completed: academyOrders.filter(order => order.status === 'completed').length,
      pending: academyOrders.filter(order => order.status === 'pending').length,
      cancelled: academyOrders.filter(order => order.status === 'canceled').length
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Dashboard Header with collage background */}
      <div className="relative">
        <div 
          className="h-72 bg-cover bg-center"
          style={{ 
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/child.jpg')" 
          }}
        >
          <div className="container mx-auto px-4 pt-16 text-center">
            <h1 className="text-4xl font-bold text-white mb-2">ORDERS</h1>
            <div className="text-white">
              <span>Dashboard</span>
              <span className="mx-2">›</span>
              <span className="text-green-400">Orders</span>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Content */}
      <div className="container mx-auto px-4 pb-8 -mt-20">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between mb-6">
            <h2 className="text-2xl font-semibold mb-4 md:mb-0">Course Orders</h2>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search orders..."
                  className="pl-10 pr-4 py-2 border rounded-lg w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
              
              {/* Status Filter */}
              <div className="relative">
                <select
                  className="pl-10 pr-4 py-2 border rounded-lg appearance-none w-full"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Orders</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="canceled">Canceled</option>
                </select>
                <FiFilter className="absolute left-3 top-3 text-gray-400" />
              </div>
              
              {/* Date Filter */}
              <div className="relative">
                <input
                  type="date"
                  className="pl-10 pr-4 py-2 border rounded-lg w-full"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                />
                <FiFilter className="absolute left-3 top-3 text-gray-400" />
              </div>
              
              {/* Export */}
              <button className="flex items-center justify-center gap-2 bg-green-600 text-white rounded-lg px-4 py-2">
                <FiDownload />
                <span>Export</span>
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-2 text-gray-600">Loading orders...</p>
            </div>
          ) : error ? (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg">
              <p>Error loading orders: {error?.message || JSON.stringify(error)}</p>
              <button 
                className="mt-2 text-red-700 underline"
                onClick={() => dispatch(fetchOrders())}
              >
                Try again
              </button>
            </div>
          ) : (
            <>
              {/* Orders count summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <h3 className="text-blue-800 text-lg font-medium">Total Orders</h3>
                  <p className="text-3xl font-bold">{statusCounts.total}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                  <h3 className="text-green-800 text-lg font-medium">Completed</h3>
                  <p className="text-3xl font-bold">{statusCounts.completed}</p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
                  <h3 className="text-yellow-800 text-lg font-medium">Pending</h3>
                  <p className="text-3xl font-bold">{statusCounts.pending}</p>
                </div>
                <div className="bg-red-50 rounded-lg p-4 border border-red-100">
                  <h3 className="text-red-800 text-lg font-medium">Cancelled</h3>
                  <p className="text-3xl font-bold">{statusCounts.cancelled}</p>
                </div>
              </div>

              {/* Orders table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Made To</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">More</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map((order) => (
                        <tr key={order.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">  {order.cooperative ? order.cooperative.username : 'N/A'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(order.created_at)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.user.id || "N/A"}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${order.status === 'completed' ? 'bg-green-100 text-green-800' : 
                                order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                order.status === 'delivered' ? 'bg-purple-100 text-purple-800' :
                                'bg-red-100 text-red-800'}`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button 
                              className="text-green-600 hover:text-green-800 mr-3"
                              onClick={() => handleViewOrder(order)}
                            >
                              <FiEye size={18} />
                            </button>
                            <button className="text-blue-600 hover:text-blue-800">Invoice</button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                          {searchTerm || filterStatus !== 'all' || filterDate ? 
                            "No orders match your search criteria" : 
                            "No orders found. Your orders will appear here once you start receiving them."}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex justify-between items-center mt-6">
                <div className="text-sm text-gray-500">
                  Showing {filteredOrders.length} of {statusCounts.total} orders
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 border rounded-md bg-white text-gray-700 disabled:opacity-50" disabled>Previous</button>
                  <button className="px-4 py-2 border rounded-md bg-white text-gray-700 disabled:opacity-50" disabled>Next</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
     {/* Order Details Modal */}
{isDetailsModalVisible && selectedOrder && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-t-lg">
        <div className="p-6 flex justify-between items-center">
          <h3 className="text-xl font-bold text-white">
            Order #{selectedOrder.id}
          </h3>
          <button 
            onClick={handleCloseDetailsModal}
            className="text-white hover:text-gray-200 transition duration-150"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Order Status Banner */}
      <div className={`w-full px-6 py-2 
        ${selectedOrder.status === 'completed' ? 'bg-green-100 text-green-800' : 
          selectedOrder.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
          selectedOrder.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
          selectedOrder.status === 'delivered' ? 'bg-purple-100 text-purple-800' :
          'bg-red-100 text-red-800'}`}
      >
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium capitalize">Status: {selectedOrder.status}</span>
        </div>
      </div>
      
      {/* Order Content */}
      <div className="p-6">
        {/* Order and Cooperative Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Order Information */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-lg mb-3 text-gray-800 border-b pb-2">Order Information</h4>
            <div className="space-y-3">
              <div className="flex">
                <span className="font-medium text-gray-600 w-24">Date:</span>
                <span>{formatDate(selectedOrder.created_at)}</span>
              </div>
              <div className="flex">
                <span className="font-medium text-gray-600 w-24">Total:</span>
                <span className="font-bold text-emerald-600">${selectedOrder.total_price}</span>
              </div>
            </div>
          </div>
          
          {/* Cooperative Information */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-lg mb-3 text-gray-800 border-b pb-2">Cooperative Info</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="font-medium text-gray-600 w-24">Name:</span>
                <span>{selectedOrder.cooperative?.username || "N/A"}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-600 w-24">Email:</span>
                <span>{selectedOrder.cooperative?.email || "N/A"}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-600 w-24">Phone:</span>
                <span>{selectedOrder.cooperative?.contact_phone || "N/A"}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Order Items */}
        <div className="mb-6">
          <h4 className="font-semibold text-lg mb-3 text-gray-800">Order Items</h4>
          <div className="bg-white border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {selectedOrder.products && selectedOrder.products.length > 0 ? (
                  selectedOrder.products.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {item.product}
                      </td>
                      <td className="px-6 py-4 text-sm text-center text-gray-600">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 text-sm text-right font-medium text-gray-900">
                        ${item.price}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-4 text-sm text-center text-gray-500">
                      No items found in this order
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan="2" className="px-6 py-4 text-sm font-medium text-gray-900 text-right">
                    Total:
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-right text-emerald-600">
                    ${selectedOrder.total_price}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        
        {/* Academy Information (if applicable) */}
        {selectedOrder.user && selectedOrder.user.academy_details && (
          <div className="mb-6">
            <h4 className="font-semibold text-lg mb-3 text-gray-800">Academy Information</h4>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="space-y-3">
                <div className="flex">
                  <span className="font-medium text-gray-600 w-24">Name:</span>
                  <span>{selectedOrder.user.academy_details.name || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="flex justify-end mt-6 space-x-3">
          <button 
            onClick={handleCloseDetailsModal}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-150"
          >
            Close
          </button>
          {selectedOrder.status !== 'completed' && (
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-150"
            >
              Update Status
            </button>
          )}
        </div>
      </div>
    </div>
  </div>
)}
   
    
    </div>
  );
};

export default AcademyOrders;