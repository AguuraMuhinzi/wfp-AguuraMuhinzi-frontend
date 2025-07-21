// import React, { useState, useMemo } from 'react';
// import jsPDF from 'jspdf';

// const PERIODS = [
//   { label: 'Monthly', value: 'monthly' },
//   { label: 'Quarterly', value: 'quarterly' },
//   { label: 'Annually', value: 'annually' },
// ];

// const getPeriodRange = (period, baseDate) => {
//   const date = new Date(baseDate);
//   let start, end;
//   if (period === 'monthly') {
//     start = new Date(date.getFullYear(), date.getMonth(), 1);
//     end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
//   } else if (period === 'quarterly') {
//     const quarter = Math.floor(date.getMonth() / 3);
//     start = new Date(date.getFullYear(), quarter * 3, 1);
//     end = new Date(date.getFullYear(), quarter * 3 + 3, 0);
//   } else if (period === 'annually') {
//     start = new Date(date.getFullYear(), 0, 1);
//     end = new Date(date.getFullYear(), 11, 31);
//   }
//   return { start, end };
// };

// const AcademyFinancialReportModal = ({ open, onClose, allUsers = [], orders = [], loadingUsers, loadingOrders }) => {
//   const [selectedAcademy, setSelectedAcademy] = useState(null);
//   const [period, setPeriod] = useState('monthly');
//   const [periodDate, setPeriodDate] = useState(() => new Date().toISOString().slice(0, 7)); // yyyy-mm
//   const [showReport, setShowReport] = useState(false);

//   const academyUsers = useMemo(() => allUsers.filter(user => user.role === 'academy'), [allUsers]);

//   // Filter orders for selected academy and period
//   const filteredOrders = useMemo(() => {
//     if (!selectedAcademy) return [];
//     const { start, end } = getPeriodRange(period, periodDate + '-01');
//     return orders.filter(order => {
//       return (
//         order.user && order.user.id === selectedAcademy.id &&
//         new Date(order.created_at) >= start &&
//         new Date(order.created_at) <= end
//       );
//     });
//   }, [orders, selectedAcademy, period, periodDate]);

//   const totalSpent = filteredOrders.reduce((sum, order) => sum + (order.total_price || order.total || 0), 0);

//   const handleGenerateReport = () => setShowReport(true);
//   const handleBack = () => setShowReport(false);

//   const handleDownloadPDF = () => {
//     if (!selectedAcademy) return;
//     const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
//     let y = 40;
//     pdf.setFontSize(20);
//     pdf.text(`Financial Report: ${selectedAcademy.username || selectedAcademy.email}`, 40, y);
//     y += 24;
//     pdf.setFontSize(12);
//     pdf.text(`Period: ${period.charAt(0).toUpperCase() + period.slice(1)} (${periodDate})`, 40, y);
//     y += 18;
//     pdf.text(`Total Orders: ${filteredOrders.length}`, 40, y);
//     y += 16;
//     pdf.text(`Total Spent: ${totalSpent} RWF`, 40, y);
//     y += 24;
//     pdf.setFontSize(14);
//     pdf.text('Orders:', 40, y);
//     y += 18;
//     pdf.setFontSize(10);
//     filteredOrders.forEach((order, idx) => {
//       if (y > 750) { pdf.addPage(); y = 40; }
//       pdf.text(`${idx + 1}. Date: ${new Date(order.created_at).toLocaleDateString()} | Amount: ${order.total_price || order.total || 0} RWF | Status: ${order.status}`, 50, y);
//       y += 14;
//     });
//     pdf.save(`academy_financial_report_${selectedAcademy.username || selectedAcademy.email}.pdf`);
//   };

//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
//       <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 relative animate-fadeIn">
//         <button
//           className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-2xl font-bold"
//           onClick={onClose}
//           aria-label="Close"
//         >
//           &times;
//         </button>
//         <h1 className="text-2xl font-bold mb-6 text-center">Academy Financial Spending Reports</h1>
//         {!showReport ? (
//           <div>
//             <h2 className="text-lg font-semibold mb-4">Select an Academy</h2>
//             {loadingUsers ? (
//               <div>Loading academies...</div>
//             ) : (
//               <table className="min-w-full divide-y divide-gray-200 mb-6">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//                     <th className="px-6 py-3"></th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-100">
//                   {academyUsers.map((user, idx) => (
//                     <tr key={user.id || idx}>
//                       <td className="px-6 py-4 whitespace-nowrap">{user.username || '-'}</td>
//                       <td className="px-6 py-4 whitespace-nowrap">{user.email || '-'}</td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <button
//                           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                           onClick={() => { setSelectedAcademy(user); setShowReport(false); }}
//                         >
//                           View Financial Report
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//             {selectedAcademy && (
//               <div className="mt-4 p-4 border rounded bg-gray-50">
//                 <h3 className="text-md font-semibold mb-2">Select Period for {selectedAcademy.username || selectedAcademy.email}</h3>
//                 <div className="flex items-center gap-4 mb-4 flex-wrap">
//                   <select
//                     className="border rounded px-2 py-1"
//                     value={period}
//                     onChange={e => setPeriod(e.target.value)}
//                   >
//                     {PERIODS.map(opt => (
//                       <option key={opt.value} value={opt.value}>{opt.label}</option>
//                     ))}
//                   </select>
//                   {/* Date input: month for monthly, quarter for quarterly, year for annually */}
//                   {period === 'monthly' && (
//                     <input
//                       type="month"
//                       className="border rounded px-2 py-1"
//                       value={periodDate}
//                       onChange={e => setPeriodDate(e.target.value)}
//                     />
//                   )}
//                   {period === 'quarterly' && (
//                     <select
//                       className="border rounded px-2 py-1"
//                       value={periodDate}
//                       onChange={e => setPeriodDate(e.target.value)}
//                     >
//                       {['Q1','Q2','Q3','Q4'].map((q, i) => {
//                         const year = new Date().getFullYear();
//                         return (
//                           <option key={q} value={`${year}-Q${i+1}`}>{year} {q}</option>
//                         );
//                       })}
//                     </select>
//                   )}
//                   {period === 'annually' && (
//                     <input
//                       type="number"
//                       min="2000"
//                       max={new Date().getFullYear()}
//                       className="border rounded px-2 py-1 w-24"
//                       value={periodDate}
//                       onChange={e => setPeriodDate(e.target.value)}
//                     />
//                   )}
//                   <button
//                     className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//                     onClick={handleGenerateReport}
//                     disabled={loadingOrders}
//                   >
//                     Generate Report
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         ) : (
//           <div>
//             <button className="mb-4 text-blue-600 underline" onClick={handleBack}>&larr; Back to Academies</button>
//             <h2 className="text-lg font-semibold mb-2">Financial Report for {selectedAcademy?.username || selectedAcademy?.email}</h2>
//             <div className="mb-4">Period: {period.charAt(0).toUpperCase() + period.slice(1)} ({periodDate})</div>
//             <div className="mb-4">Total Orders: {filteredOrders.length}</div>
//             <div className="mb-4">Total Spent: <span className="font-bold">{totalSpent} RWF</span></div>
//             <button
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
//               onClick={handleDownloadPDF}
//             >
//               Download PDF
//             </button>
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount (RWF)</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-100">
//                 {filteredOrders.map((order, idx) => (
//                   <tr key={order.id || idx}>
//                     <td className="px-6 py-4 whitespace-nowrap">{new Date(order.created_at).toLocaleDateString()}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">{order.total_price || order.total || 0}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">{order.status}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AcademyFinancialReportModal; 

"use client"

import { useState, useMemo } from "react"
import jsPDF from "jspdf"

const PERIODS = [
  { label: "Monthly", value: "monthly" },
  { label: "Quarterly", value: "quarterly" },
  { label: "Annually", value: "annually" },
]

const getPeriodRange = (period, baseDate) => {
  const date = new Date(baseDate)
  let start, end
  if (period === "monthly") {
    start = new Date(date.getFullYear(), date.getMonth(), 1)
    end = new Date(date.getFullYear(), date.getMonth() + 1, 0)
  } else if (period === "quarterly") {
    const quarter = Math.floor(date.getMonth() / 3)
    start = new Date(date.getFullYear(), quarter * 3, 1)
    end = new Date(date.getFullYear(), quarter * 3 + 3, 0)
  } else if (period === "annually") {
    start = new Date(date.getFullYear(), 0, 1)
    end = new Date(date.getFullYear(), 11, 31)
  }
  return { start, end }
}

const AcademyFinancialReportModal = ({ open, onClose, allUsers = [], orders = [], loadingUsers, loadingOrders }) => {
  const [selectedAcademy, setSelectedAcademy] = useState(null)
  const [period, setPeriod] = useState("monthly")
  const [periodDate, setPeriodDate] = useState(() => new Date().toISOString().slice(0, 7))
  const [showReport, setShowReport] = useState(false)

  const academyUsers = useMemo(() => allUsers.filter((user) => user.role === "academy"), [allUsers])

  const filteredOrders = useMemo(() => {
    if (!selectedAcademy) return []
    const { start, end } = getPeriodRange(period, periodDate + "-01")
    return orders.filter((order) => {
      return (
        order.user &&
        order.user.id === selectedAcademy.id &&
        new Date(order.created_at) >= start &&
        new Date(order.created_at) <= end
      )
    })
  }, [orders, selectedAcademy, period, periodDate])

  const totalSpent = filteredOrders.reduce((sum, order) => sum + (order.total_price || order.total || 0), 0)

  const handleGenerateReport = () => setShowReport(true)
  const handleBack = () => setShowReport(false)

  const handleDownloadPDF = () => {
    if (!selectedAcademy) return
    const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" })
    let y = 40

    pdf.setFontSize(18)
    pdf.text(`Financial Report: ${selectedAcademy.username || selectedAcademy.email}`, 40, y)
    y += 30

    pdf.setFontSize(12)
    pdf.text(`Period: ${period.charAt(0).toUpperCase() + period.slice(1)} (${periodDate})`, 40, y)
    y += 20
    pdf.text(`Total Orders: ${filteredOrders.length}`, 40, y)
    y += 16
    pdf.text(`Total Spent: RWF ${totalSpent.toLocaleString()}`, 40, y)
    y += 30

    pdf.setFontSize(14)
    pdf.text("Orders:", 40, y)
    y += 20

    pdf.setFontSize(10)
    filteredOrders.forEach((order, idx) => {
      if (y > 750) {
        pdf.addPage()
        y = 40
      }
      pdf.text(
        `${idx + 1}. ${new Date(order.created_at).toLocaleDateString()} - RWF ${(order.total_price || order.total || 0).toLocaleString()} - ${order.status}`,
        50,
        y,
      )
      y += 14
    })

    pdf.save(`academy_report_${selectedAcademy.username || selectedAcademy.email}.pdf`)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="bg-emerald-600 px-6 py-4 text-white flex justify-between items-center">
          <h1 className="text-xl font-semibold">Academy Financial Reports</h1>
          <button className="text-white hover:text-gray-200 text-2xl" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
          {!showReport ? (
            <div className="space-y-6">
              {/* Academy Selection */}
              <div>
                <h2 className="text-lg font-medium mb-4">Select Academy</h2>
                {loadingUsers ? (
                  <div className="text-center py-8">Loading academies...</div>
                ) : (
                  <div className="border rounded-lg overflow-hidden">
                    <table className="min-w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                          <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {academyUsers.map((user, idx) => (
                          <tr key={user.id || idx} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm">{user.username || "-"}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{user.email || "-"}</td>
                            <td className="px-4 py-3 text-center">
                              <button
                                className="bg-emerald-600 text-white px-4 py-2 rounded text-sm hover:bg-emerald-700"
                                onClick={() => setSelectedAcademy(user)}
                              >
                                Select
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Period Selection */}
              {selectedAcademy && (
                <div className="border rounded-lg p-4 bg-gray-50">
                  <h3 className="font-medium mb-3">Report for: {selectedAcademy.username || selectedAcademy.email}</h3>
                  <div className="flex gap-4 items-end">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Period</label>
                      <select
                        className="border rounded px-3 py-2 text-sm"
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                      >
                        {PERIODS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                      {period === "monthly" && (
                        <input
                          type="month"
                          className="border rounded px-3 py-2 text-sm"
                          value={periodDate}
                          onChange={(e) => setPeriodDate(e.target.value)}
                        />
                      )}
                      {period === "quarterly" && (
                        <select
                          className="border rounded px-3 py-2 text-sm"
                          value={periodDate}
                          onChange={(e) => setPeriodDate(e.target.value)}
                        >
                          {["Q1", "Q2", "Q3", "Q4"].map((q, i) => {
                            const year = new Date().getFullYear()
                            return (
                              <option key={q} value={`${year}-Q${i + 1}`}>
                                {year} {q}
                              </option>
                            )
                          })}
                        </select>
                      )}
                      {period === "annually" && (
                        <input
                          type="number"
                          min="2020"
                          max={new Date().getFullYear()}
                          className="border rounded px-3 py-2 text-sm w-24"
                          value={periodDate}
                          onChange={(e) => setPeriodDate(e.target.value)}
                        />
                      )}
                    </div>

                    <button
                      className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700"
                      onClick={handleGenerateReport}
                      disabled={loadingOrders}
                    >
                      {loadingOrders ? "Loading..." : "Generate Report"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Back Button */}
              <button className="text-emerald-600 hover:text-emerald-700 text-sm" onClick={handleBack}>
                ← Back to Selection
              </button>

              {/* Report Header */}
              <div className="border-b pb-4">
                <h2 className="text-lg font-medium">Report: {selectedAcademy?.username || selectedAcademy?.email}</h2>
                <p className="text-sm text-gray-600">
                  {period.charAt(0).toUpperCase() + period.slice(1)} - {periodDate}
                </p>
              </div>

              {/* Summary */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-800">{filteredOrders.length}</div>
                  <div className="text-sm text-emerald-600">Total Orders</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-800">RWF {totalSpent.toLocaleString()}</div>
                  <div className="text-sm text-green-600">Total Spent</div>
                </div>
              </div>

              {/* Download Button */}
              <div className="flex justify-end">
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
                  onClick={handleDownloadPDF}
                >
                  Download PDF
                </button>
              </div>

              {/* Orders Table */}
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Amount</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredOrders.map((order, idx) => (
                      <tr key={order.id || idx} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm">{new Date(order.created_at).toLocaleDateString()}</td>
                        <td className="px-4 py-3 text-sm font-medium">
                          RWF {(order.total_price || order.total || 0).toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              order.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : order.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredOrders.length === 0 && (
                  <div className="text-center py-8 text-gray-500">No orders found for this period</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AcademyFinancialReportModal
