import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "../styles/reportStyles.css";

const ReportPreview = ({ reportData }) => {
  const reportRef = useRef();

  const downloadPDF = async () => {
    const input = reportRef.current;

    // Convert HTML to canvas
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pageWidth;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    let position = 0;
    pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
    pdf.save(`${reportData.name || "report"}.pdf`);
  };

  return (
    <div>
      <div ref={reportRef} className="report-container">
        <h2>{reportData.name}</h2>
        <p><strong>Type:</strong> {reportData.report_type}</p>
        <p><strong>Date:</strong> {reportData.generated_on}</p>
        <p><strong>Location:</strong> {reportData.location}</p>

        <h3>Trend Analysis</h3>
        <p>Trend: {reportData.trend_analysis.trend}</p>
        <p>Average Price: {reportData.trend_analysis.average_price}</p>

        <table>
          <thead>
            <tr>
              <th>Month</th>
              <th>Predicted Price</th>
              <th>Lower Bound</th>
              <th>Upper Bound</th>
            </tr>
          </thead>
          <tbody>
            {reportData.monthly_predictions.map((item, i) => (
              <tr key={i}>
                <td>{item.month_name}</td>
                <td>{item.predicted_price}</td>
                <td>{item.lower_bound}</td>
                <td>{item.upper_bound}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={downloadPDF}>📥 Download PDF</button>
    </div>
  );
};

export default ReportPreview;
