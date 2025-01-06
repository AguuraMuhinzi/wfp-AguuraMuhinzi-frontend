'use client';

import React from 'react';
import DashboardCards from './../../components/DashboardCards';
import GraphComponent from './../../components/price_graph';
import OrdersTable from './../../components/orderTabe';

const DashboardPage = () => {
  // Example price data for the graph (can be fetched from API)
  const priceData = [
    { date: '2023-11-01', price: 100 },
    { date: '2023-11-02', price: 150 },
    { date: '2023-11-03', price: 120 },
    { date: '2023-11-04', price: 200 },
    { date: '2023-11-05', price: 170 },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-green-700">Academy Dashboard</h1>

        {/* Dashboard Cards */}
        <DashboardCards />

        {/* Graph */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <GraphComponent priceData={priceData} />
        </div>

        {/* Orders Table */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <OrdersTable />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
