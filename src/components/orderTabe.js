'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from './../Redux/Slices/order/orderSlice';
import { FiEye } from 'react-icons/fi';

const OrdersTable = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);

  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  useEffect(() => {
    let filtered = orders;

    if (filterStatus !== 'all') {
      filtered = filtered.filter((order) => order.status === filterStatus);
    }

    if (filterDate) {
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.created_at).toISOString().split('T')[0];
        return orderDate === filterDate;
      });
    }

    setFilteredOrders(filtered);
  }, [orders, filterStatus, filterDate]);

  const handleFilterChange = (status) => {
    setFilterStatus(status);
  };

  const handleDateChange = (event) => {
    setFilterDate(event.target.value);
  };

  return (
    <>
      {/* Filter Options */}
      <div className="flex flex-wrap space-x-4 mb-4">
        <select
          onChange={(e) => handleFilterChange(e.target.value)}
          className="px-4 py-2 border rounded-lg"
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
          className="px-4 py-2 border rounded-lg"
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
                  <td className="p-2 text-gray-700 border border-gray-300">{order.id}</td>
                  <td className="p-2 text-gray-700 border border-gray-300">
                    {order.user.academy_details ? order.user.academy_details.name : 'No Academy'}
                  </td>
                  <td className="p-2 text-gray-700 border border-gray-300">${order.total_price}</td>
                  <td className="p-2 text-gray-700 border border-gray-300 capitalize">{order.status}</td>
                  <td className="p-2 text-gray-700 border border-gray-300">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-2 flex justify-center space-x-2 border border-gray-300">
                    <button
                      className="text-green-500 hover:text-green-700"
                      title="View"
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
