import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAcademyCooperativeCollaboration } from '../../Redux/Slices/reports/report_slice';
import { fetchProductDemandReport } from '../../Redux/Slices/reports/report_slice';

const CollaborationReport = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.reports.academyCoopCollaboration) || [];
  const loading = useSelector(state => state.reports.loading);
  const error = useSelector(state => state.reports.error);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchReport = (e) => {
    if (e) e.preventDefault();
    dispatch(fetchAcademyCooperativeCollaboration({ start_date: startDate, end_date: endDate }));
  };

      return (
    <div className="bg-white rounded-xl shadow-sm border p-6 mt-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Academy-Cooperative Collaboration Report</h2>
      <form className="flex flex-col md:flex-row md:items-end gap-4 mb-4" onSubmit={fetchReport}>
              <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <input type="date" className="border rounded px-3 py-2" value={startDate} onChange={e => setStartDate(e.target.value)} />
              </div>
            <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
          <input type="date" className="border rounded px-3 py-2" value={endDate} onChange={e => setEndDate(e.target.value)} />
            </div>
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">Filter</button>
              </form>
                    {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">{String(error)}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Academy</th>
                <th className="p-2 text-left">Cooperative</th>
                <th className="p-2 text-left">Order Count</th>
                <th className="p-2 text-left">Total Value (RWF)</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) && data.length > 0 ? data.map((row, idx) => (
                <tr key={idx} className="border-b">
                  <td className="p-2">{row.user__username}</td>
                  <td className="p-2">{row.cooperative__username}</td>
                  <td className="p-2">{row.order_count}</td>
                  <td className="p-2">{row.total_value}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="p-2 text-center text-gray-500">No data found for selected range.</td>
                </tr>
              )}
            </tbody>
          </table>
            </div>
          )}
        </div>
  );
};

const ProductDemandReport = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.reports.productDemandReport) || [];
  const loading = useSelector(state => state.reports.loading);
  const error = useSelector(state => state.reports.error);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchReport = (e) => {
    if (e) e.preventDefault();
    dispatch(fetchProductDemandReport({ start_date: startDate, end_date: endDate }));
  };

  useEffect(() => {
    dispatch(fetchProductDemandReport({ start_date: startDate, end_date: endDate }));
    // eslint-disable-next-line
  }, []);

                return (
    <div className="bg-white rounded-xl shadow-sm border p-6 mt-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Product Demand Report</h2>
      <div className="flex flex-col md:flex-row md:items-end gap-4 mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Start Date:
          <input type="date" className="border rounded px-3 py-2 ml-2" value={startDate} onChange={e => setStartDate(e.target.value)} />
                    </label>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          End Date:
          <input type="date" className="border rounded px-3 py-2 ml-2" value={endDate} onChange={e => setEndDate(e.target.value)} />
                    </label>
        <button onClick={fetchReport} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">Generate Report</button>
                  </div>
                    {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">{String(error)}</p>
      ) : Array.isArray(data) && data.length > 0 ? (
                    <div className="overflow-x-auto">
          <table className="min-w-full text-sm border rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Product</th>
                <th className="p-2 text-left">Total Quantity</th>
                <th className="p-2 text-left">Total Revenue (RWF)</th>
                <th className="p-2 text-left">Order Count</th>
                          </tr>
                        </thead>
                        <tbody>
              {data.map((row, idx) => (
                <tr key={idx} className="border-b">
                  <td className="p-2">{row.product__product_name}</td>
                  <td className="p-2">{row.total_quantity}</td>
                  <td className="p-2">{row.total_revenue}</td>
                  <td className="p-2">{row.order_count}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
      ) : (
        <p className="text-gray-500">No data found for selected filters.</p>
                )}
                    </div>
  );
};

// Main export: render both reports
const PlanPage = () => (
  <>
    <CollaborationReport />
    <ProductDemandReport />
  </>
);

export default PlanPage;

