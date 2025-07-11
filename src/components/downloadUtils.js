import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Download a DOM node as PDF using jsPDF and html2canvas.
 * @param {HTMLElement} node - The DOM node to render as PDF (should be in the DOM, can be hidden).
 * @param {string} filename - The filename for the downloaded PDF.
 */
export const downloadAsPDF = (node, filename = 'report.pdf') => {
  if (!node) return;
  html2canvas(node).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(filename);
  });
};

/**
 * Download data as CSV file.
 * @param {object|array} data - The data to convert to CSV (array of objects or a single object).
 * @param {string} filename - The filename for the downloaded CSV.
 */
export const downloadAsCSV = (data, filename = 'report.csv') => {
  let csv = '';
  if (Array.isArray(data)) {
    if (data.length === 0) return;
    const headers = Object.keys(data[0]);
    csv += headers.join(',') + '\n';
    data.forEach(row => {
      csv += headers.map(h => JSON.stringify(row[h] ?? '')).join(',') + '\n';
    });
  } else if (typeof data === 'object' && data !== null) {
    const headers = Object.keys(data);
    csv += headers.join(',') + '\n';
    csv += headers.map(h => JSON.stringify(data[h] ?? '')).join(',') + '\n';
  } else {
    return;
  }
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Usage:
// import { downloadAsPDF, downloadAsCSV } from './downloadUtils';
// downloadAsPDF(domNodeRef.current, 'myreport.pdf');
// downloadAsCSV(reportData, 'myreport.csv'); 