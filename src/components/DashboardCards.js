'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from './../Redux/Slices/order/orderSlice';

const DashboardCards = () => {
  const dispatch = useDispatch();
  const { orders = [], loading, error } = useSelector((state) => state.order || {});

  const [contracts, setContracts] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [completedOrders, setCompletedOrders] = useState(0);

  const userId = parseInt(localStorage.getItem('user_id'), 10); // Retrieve the logged-in user's ID

  useEffect(() => {
    // Fetch all orders
    dispatch(fetchOrders());
  }, [dispatch]);

  useEffect(() => {
    if (orders?.length) {
      // Filter orders associated with the cooperative
      const cooperativeOrders = orders.filter((order) => order.cooperative === userId);

      // Calculate unique academies (active contracts)
      const uniqueAcademies = new Set(cooperativeOrders.map((order) => order.user.academy_details?.name));
      setContracts(uniqueAcademies.size);

      // Calculate pending and completed orders
      setPendingOrders(cooperativeOrders.filter((order) => order.status === 'pending').length);
      setCompletedOrders(cooperativeOrders.filter((order) => order.status === 'completed').length);
    }
  }, [orders, userId]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      {/* Active Contracts */}
      <div className="bg-white shadow-md rounded-lg p-4 border-l-4 border-green-600">
        <h3 className="text-sm font-semibold text-gray-600">Active Contracts</h3>
        <p className="text-2xl font-bold text-green-700">{contracts}</p>
        <p className="text-xs text-gray-500">Number of academies placing orders</p>
      </div>

      {/* Pending Orders */}
      <div className="bg-white shadow-md rounded-lg p-4 border-l-4 border-yellow-600">
        <h3 className="text-sm font-semibold text-gray-600">Pending Orders</h3>
        <p className="text-2xl font-bold text-yellow-700">{pendingOrders}</p>
        <p className="text-xs text-gray-500">Orders awaiting processing</p>
      </div>

      {/* Completed Orders */}
      <div className="bg-white shadow-md rounded-lg p-4 border-l-4 border-blue-600">
        <h3 className="text-sm font-semibold text-gray-600">Completed Orders</h3>
        <p className="text-2xl font-bold text-blue-700">{completedOrders}</p>
        <p className="text-xs text-gray-500">Orders successfully delivered</p>
      </div>
    </div>
  );
};

export default DashboardCards;
