'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from './../Redux/Slices/order/orderSlice';
import { FiEye, FiPackage } from 'react-icons/fi';

const OrdersTable = () => {
  const dispatch = useDispatch();
  const { orders = [], loading, error } = useSelector((state) => state.order || {});

  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('');

  // Get the user ID from localStorage (assuming it's stored there)
  const userId = parseInt(localStorage.getItem('user_id'), 10);

  useEffect(() => {
    // Fetch all orders
    dispatch(fetchOrders());
  }, [dispatch]);

  // Filter orders based on the cooperative field, status, and date
  const filteredOrders = useMemo(() => {
    if (!orders || !Array.isArray(orders)) return [];

    // Filter by cooperative
    let userOrders = orders.filter((order) => order.cooperative === userId);

    // Apply status filter
    if (filterStatus !== 'all') {
      userOrders = userOrders.filter((order) => order.status === filterStatus);
    }

    // Apply date filter
    if (filterDate) {
      userOrders = userOrders.filter((order) => {
        const orderDate = new Date(order.created_at).toISOString().split('T')[0];
        return orderDate === filterDate;
      });
    }

    return userOrders;
  }, [orders, filterStatus, filterDate, userId]);

  // Check if user has any orders at all (before filtering)
  const userHasOrders = useMemo(() => {
    if (!orders || !Array.isArray(orders)) return false;
    return orders.some((order) => order.cooperative === userId);
  }, [orders, userId]);

  const handleFilterChange = (status) => {
    setFilterStatus(status);
  };

  const handleDateChange = (event) => {
    setFilterDate(event.target.value);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading orders...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-red-600 font-medium">Error loading orders</p>
          <p className="text-red-500 text-sm mt-2">{error}</p>
          <button 
            onClick={() => dispatch(fetchOrders())}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // No orders at all
  if (!userHasOrders) {
    return (
      <div className="text-center py-12">
        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg p-8 max-w-md mx-auto">
          <FiPackage className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
          <p className="text-gray-500 text-sm">
            You haven't received any orders from academies yet. Orders will appear here once academies start placing orders with your cooperative.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Filter Options */}
      <div className="flex flex-wrap space-x-4 mb-4">
        <select
          onChange={(e) => handleFilterChange(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          value={filterDate}
        />
        {(filterStatus !== 'all' || filterDate) && (
          <button
            onClick={() => {
              setFilterStatus('all');
              setFilterDate('');
            }}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* No filtered results */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md mx-auto">
            <FiPackage className="mx-auto h-8 w-8 text-blue-400 mb-3" />
            <h3 className="text-md font-medium text-blue-900 mb-2">No orders match your filters</h3>
            <p className="text-blue-700 text-sm mb-3">
              Try adjusting your filters to see more results.
            </p>
            <button
              onClick={() => {
                setFilterStatus('all');
                setFilterDate('');
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              Show All Orders
            </button>
          </div>
        </div>
      ) : (
        /* Orders Table */
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200 text-sm">
            <thead className="bg-green-600 text-white text-sm">
              <tr>
                <th className="p-2 text-left font-semibold border border-gray-300">Order ID</th>
                <th className="p-2 text-left font-semibold border border-gray-300">Academy</th>
                <th className="p-2 text-left font-semibold border border-gray-300">Total Price</th>
                <th className="p-2 text-left font-semibold border border-gray-300">Status</th>
                <th className="p-2 text-left font-semibold border border-gray-300">Created At</th>
                <th className="p-2 text-center font-semibold border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 border-b border-gray-200">
                  <td className="p-2 text-gray-700 border border-gray-300">#{order.id}</td>
                  <td className="p-2 text-gray-700 border border-gray-300">
                    {order.user?.academy_details?.name || 'No Academy'}
                  </td>
                  <td className="p-2 text-gray-700 border border-gray-300">
                    ${parseFloat(order.total_price).toFixed(2)}
                  </td>
                  <td className="p-2 border border-gray-300">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'canceled' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-2 text-gray-700 border border-gray-300">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-2 text-center border border-gray-300">
                    <button 
                      className="text-green-500 hover:text-green-700 p-1 rounded transition-colors" 
                      title="View Order Details"
                    >
                      <FiEye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default OrdersTable;