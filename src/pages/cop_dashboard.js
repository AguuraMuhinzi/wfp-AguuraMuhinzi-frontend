// pages/index.js or pages/DashboardPage.js (depending on your project structure)

import React from 'react';
import Dashboard from '../components/sidebar'; // Adjust the path as needed

const DashboardPage = () => {
  return (
    <div>
      <Dashboard />
      <div className="p-6 bg-gray-100">
        {/* Main content goes here */}
        <h1 className="text-3xl font-bold mb-4">Welcome to Your Dashboard</h1>
        <p className="text-gray-700">This is where your main content will be displayed.</p>
        {/* Add more content as needed */}
      </div>
    </div>
  );
};

export default DashboardPage;
