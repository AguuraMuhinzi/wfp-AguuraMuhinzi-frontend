// // src/pages/HarvestPlansPage.jsx
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchMyHarvestPlans } from '../../Redux/Slices/predictions/harvest_plan';

// const HarvestPlansPage = () => {
//   const dispatch = useDispatch();

//   const {
//     plans,
//     loading,
//     error
//   } = useSelector((state) => state.harvestPlan);

//   useEffect(() => {
//     dispatch(fetchMyHarvestPlans());
//   }, [dispatch]);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold mb-4">📋 My Harvest Plans</h1>

//       {loading && <p>Loading plans...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {!loading && !error && plans.length === 0 && (
//         <p>No harvest plans found. Start by generating a new one.</p>
//       )}

//       {!loading && !error && plans.length > 0 && (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {plans.map((plan) => (
//             <div key={plan.id} className="border rounded-xl shadow p-4 bg-white">
//               <h2 className="text-lg font-bold mb-2">🌾 {plan.commodity}</h2>
//               <p><strong>District:</strong> {plan.district}</p>
//               <p><strong>Market:</strong> {plan.market}</p>
//               <p><strong>Recommended Quantity:</strong> {plan.recommended_harvest_quantity}</p>
//               <p><strong>Expected Revenue:</strong> {plan.expected_revenue} RWF</p>
//               <p><strong>Profit Margin:</strong> {plan.profit_margin}%</p>
//               <p><strong>Optimal Month:</strong> {plan.optimal_harvest_month}</p>
//               <p><strong>Demand Trend:</strong> {plan.demand_trend}</p>
//               <p><strong>Risk:</strong> {plan.market_saturation_risk}</p>
//               <p className="text-xs text-gray-500 mt-2">🕐 Created: {new Date(plan.created_at).toLocaleString()}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default HarvestPlansPage;
