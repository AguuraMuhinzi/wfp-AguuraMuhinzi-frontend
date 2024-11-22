import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const GraphComponent = ({ priceData }) => {
  // Default data for demo purposes if no data is passed
  const demoData = [
    { date: '2023-11-01', price: 100 },
    { date: '2023-11-02', price: 150 },
    { date: '2023-11-03', price: 120 },
    { date: '2023-11-04', price: 200 },
    { date: '2023-11-05', price: 170 },
  ];

  const dataToShow = priceData?.length ? priceData : demoData;

  const data = {
    labels: dataToShow.map((entry) => entry.date),
    datasets: [
      {
        label: 'Price Trends',
        data: dataToShow.map((entry) => entry.price),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        tension: 0.4, // Smooth the line
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Price (RWF)',
        },
      },
    },
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold text-green-700 mb-4">Price Trends Over Time</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default GraphComponent;
