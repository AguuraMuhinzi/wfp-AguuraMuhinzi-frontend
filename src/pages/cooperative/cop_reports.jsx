import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGeneratedReports,
  generateReport,
} from "../../Redux/Slices/reports/report_slice";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./../../styles/reportStyles.css";

const CooperativeReportPage = () => {
    const dispatch = useDispatch();
    const { currentReport, loading, error } = useSelector((state) => state.reports);
  
    const [selectedReportId, setSelectedReportId] = useState("");
  
    const handleGenerate = () => {
      if (selectedReportId) {
        dispatch(generateReport(selectedReportId));
      }
    };
  
    const downloadAsPDF = () => {
      const input = document.getElementById("report-content");
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("report.pdf");
      });
    };
  
    return (
      <div className="report-page">
        <h2>📄 Generate a Report</h2>
  
        <input
          type="text"
          value={selectedReportId}
          onChange={(e) => setSelectedReportId(e.target.value)}
          placeholder="Enter Report Configuration ID"
          style={{ marginRight: "1rem", padding: "0.5rem" }}
        />
        <button onClick={handleGenerate}>Generate Report</button>
  
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
  
        {currentReport && (
          <div>
            <h3>✅ Report Generated</h3>
            <div id="report-content" className="report-box">
  <h3 style={{ textAlign: "center", color: "#2c3e50" }}>📊 Price Prediction Report</h3>
  <p><strong>Type:</strong> {currentReport.report_data.report_type}</p>
  <p><strong>Commodity:</strong> {currentReport.report_data.commodity}</p>
  <p><strong>Location:</strong> {currentReport.report_data.location}</p>
  <p><strong>Trend:</strong> {currentReport.report_data.trend_analysis?.trend}</p>
  <p><strong>Average Price:</strong> {currentReport.report_data.trend_analysis?.average_price} RWF</p>

  <h4>📅 Monthly Predictions</h4>
  <ul>
    {currentReport.report_data.monthly_predictions?.map((item, idx) => (
      <li key={idx}>
        <b>{item.month_name}:</b> {item.predicted_price} RWF (±15%)
      </li>
    ))}
  </ul>

  <h4>📈 Trend Details</h4>
  <p><strong>Change:</strong> {currentReport.report_data.trend_analysis?.overall_change_percent}%</p>
  <p><strong>Volatility:</strong> {currentReport.report_data.trend_analysis?.volatility}</p>
  <p><strong>Min Price:</strong> {currentReport.report_data.trend_analysis?.price_range.min} RWF</p>
  <p><strong>Max Price:</strong> {currentReport.report_data.trend_analysis?.price_range.max} RWF</p>
</div>

            <button onClick={downloadAsPDF}>Download as PDF 🖨️</button>
          </div>
        )}
      </div>
    );
  };
  
  export default CooperativeReportPage;