// export_function.jsx
// Reusable CSV export utility

export function exportTableToCSV(data, filename = 'report.csv') {
  if (!data || !data.length) return;
  const csvRows = [];
  // Add headers
  csvRows.push(Object.keys(data[0]).join(','));
  // Add rows
  data.forEach(row => {
    csvRows.push(Object.values(row).map(v => `"${String(v).replace(/"/g, '""')}"`).join(','));
  });
  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}

// Academy Financial Report PDF Generator
export async function generateAcademyFinancialReportPDF(academyFinancial, coopCollab = [], filename = 'academy_financial_report.pdf') {
  // Import jsPDF and html2canvas dynamically
  const jsPDF = (await import('jspdf')).default;
  const html2canvas = (await import('html2canvas')).default;

  // Create a temporary div for the report content
  const reportDiv = document.createElement('div');
  reportDiv.style.width = '800px';
  reportDiv.style.padding = '20px';
  reportDiv.style.backgroundColor = 'white';
  reportDiv.style.fontFamily = 'Arial, sans-serif';
  reportDiv.style.position = 'absolute';
  reportDiv.style.left = '-9999px';
  reportDiv.style.top = '0';

  // Generate report HTML content
  reportDiv.innerHTML = `
    <div style="text-align: center; margin-bottom: 30px;">
      <h1 style="color: #1f2937; margin-bottom: 10px;">Academy Financial Report</h1>
      <p style="color: #6b7280; margin: 0;">Generated on ${new Date().toLocaleDateString()}</p>
    </div>

    <div style="margin-bottom: 30px;">
      <h2 style="color: #374151; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">Executive Summary</h2>
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 20px;">
        <div style="background: #f3f4f6; padding: 15px; border-radius: 8px;">
          <h3 style="margin: 0 0 10px 0; color: #374151;">Total Spend</h3>
          <p style="font-size: 24px; font-weight: bold; color: #059669; margin: 0;">${(academyFinancial.total_spend || 0).toLocaleString()} RWF</p>
        </div>
        <div style="background: #f3f4f6; padding: 15px; border-radius: 8px;">
          <h3 style="margin: 0 0 10px 0; color: #374151;">Total Orders</h3>
          <p style="font-size: 24px; font-weight: bold; color: #3b82f6; margin: 0;">${academyFinancial.order_count || 0}</p>
        </div>
        <div style="background: #f3f4f6; padding: 15px; border-radius: 8px;">
          <h3 style="margin: 0 0 10px 0; color: #374151;">Average Order Value</h3>
          <p style="font-size: 24px; font-weight: bold; color: #f59e0b; margin: 0;">${(academyFinancial.avg_order_value || 0).toLocaleString()} RWF</p>
        </div>
        <div style="background: #f3f4f6; padding: 15px; border-radius: 8px;">
          <h3 style="margin: 0 0 10px 0; color: #374151;">Active Cooperatives</h3>
          <p style="font-size: 24px; font-weight: bold; color: #7c3aed; margin: 0;">${coopCollab.length || 0}</p>
        </div>
      </div>
    </div>

    ${academyFinancial.spend_trend && academyFinancial.spend_trend.length > 0 ? `
    <div style="margin-bottom: 30px;">
      <h2 style="color: #374151; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">Monthly Spend Trend</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <thead>
          <tr style="background: #f9fafb;">
            <th style="border: 1px solid #d1d5db; padding: 12px; text-align: left;">Month</th>
            <th style="border: 1px solid #d1d5db; padding: 12px; text-align: right;">Monthly Spend (RWF)</th>
          </tr>
        </thead>
        <tbody>
          ${academyFinancial.spend_trend.map(row => `
            <tr>
              <td style="border: 1px solid #d1d5db; padding: 12px;">${row.month}</td>
              <td style="border: 1px solid #d1d5db; padding: 12px; text-align: right;">${row.monthly_spend.toLocaleString()}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    ` : ''}

    ${coopCollab && coopCollab.length > 0 ? `
    <div style="margin-bottom: 30px;">
      <h2 style="color: #374151; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">Cooperative Collaboration</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <thead>
          <tr style="background: #f9fafb;">
            <th style="border: 1px solid #d1d5db; padding: 12px; text-align: left;">Cooperative</th>
            <th style="border: 1px solid #d1d5db; padding: 12px; text-align: center;">Order Count</th>
            <th style="border: 1px solid #d1d5db; padding: 12px; text-align: right;">Total Value (RWF)</th>
          </tr>
        </thead>
        <tbody>
          ${coopCollab.map(row => `
            <tr>
              <td style="border: 1px solid #d1d5db; padding: 12px;">${row.cooperative__username || 'N/A'}</td>
              <td style="border: 1px solid #d1d5db; padding: 12px; text-align: center;">${row.order_count || 0}</td>
              <td style="border: 1px solid #d1d5db; padding: 12px; text-align: right;">${(row.total_value || 0).toLocaleString()}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    ` : ''}

    <div style="margin-bottom: 30px;">
      <h2 style="color: #374151; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">Financial Insights</h2>
      <div style="background: #f0f9ff; border: 1px solid #0ea5e9; border-radius: 8px; padding: 20px;">
        <ul style="margin: 0; padding-left: 20px; color: #0c4a6e;">
          <li style="margin-bottom: 8px;">Total financial activity: <strong>${(academyFinancial.total_spend || 0).toLocaleString()} RWF</strong></li>
          <li style="margin-bottom: 8px;">Average order value: <strong>${(academyFinancial.avg_order_value || 0).toLocaleString()} RWF</strong></li>
          <li style="margin-bottom: 8px;">Total orders processed: <strong>${academyFinancial.order_count || 0}</strong></li>
          <li style="margin-bottom: 8px;">Cooperatives collaborated with: <strong>${coopCollab.length || 0}</strong></li>
          ${academyFinancial.spend_trend && academyFinancial.spend_trend.length > 1 ? `
          <li style="margin-bottom: 8px;">Spend trend: <strong>${academyFinancial.spend_trend.length} months of data available</strong></li>
          ` : ''}
          ${coopCollab && coopCollab.length > 0 ? `
          <li style="margin-bottom: 8px;">Top cooperative: <strong>${coopCollab[0]?.cooperative__username || 'N/A'}</strong> with ${coopCollab[0]?.order_count || 0} orders</li>
          ` : ''}
        </ul>
      </div>
    </div>
  `;

  // Add the report div to the document
  document.body.appendChild(reportDiv);

  try {
    // Convert the div to canvas
    const canvas = await html2canvas(reportDiv, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    });

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgData = canvas.toDataURL('image/png');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    // Add image to PDF
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

    // Save the PDF
    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Error generating PDF. Please try again.');
  } finally {
    // Clean up
    document.body.removeChild(reportDiv);
  }
}

// 3-Month Prediction Report PDF Generator
export async function generatePredictionReportPDF(predictionData, filename = '3month_prediction_report.pdf') {
  // Import jsPDF and html2canvas dynamically
  const jsPDF = (await import('jspdf')).default;
  const html2canvas = (await import('html2canvas')).default;

  // Create a temporary div for the report content
  const reportDiv = document.createElement('div');
  reportDiv.style.width = '800px';
  reportDiv.style.padding = '20px';
  reportDiv.style.backgroundColor = 'white';
  reportDiv.style.fontFamily = 'Arial, sans-serif';
  reportDiv.style.position = 'absolute';
  reportDiv.style.left = '-9999px';
  reportDiv.style.top = '0';

  const predictions = predictionData?.predictions || [];
  const trendAnalysis = predictionData?.trend_analysis || {};
  const commodity = predictionData?.commodity || 'N/A';
  const location = predictionData?.location || 'N/A';

  // Generate report HTML content
  reportDiv.innerHTML = `
    <div style="text-align: center; margin-bottom: 30px;">
      <h1 style="color: #1f2937; margin-bottom: 10px;">3-Month Price Prediction Report</h1>
      <p style="color: #6b7280; margin: 0;">Generated on ${new Date().toLocaleDateString()}</p>
    </div>

    <div style="margin-bottom: 30px;">
      <h2 style="color: #374151; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">Report Overview</h2>
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 20px;">
        <div style="background: #f3f4f6; padding: 15px; border-radius: 8px;">
          <h3 style="margin: 0 0 10px 0; color: #374151;">Commodity</h3>
          <p style="font-size: 20px; font-weight: bold; color: #059669; margin: 0;">${commodity}</p>
        </div>
        <div style="background: #f3f4f6; padding: 15px; border-radius: 8px;">
          <h3 style="margin: 0 0 10px 0; color: #374151;">Location</h3>
          <p style="font-size: 18px; font-weight: bold; color: #3b82f6; margin: 0;">${location}</p>
        </div>
        <div style="background: #f3f4f6; padding: 15px; border-radius: 8px;">
          <h3 style="margin: 0 0 10px 0; color: #374151;">Prediction Period</h3>
          <p style="font-size: 18px; font-weight: bold; color: #f59e0b; margin: 0;">3 Months</p>
        </div>
        <div style="background: #f3f4f6; padding: 15px; border-radius: 8px;">
          <h3 style="margin: 0 0 10px 0; color: #374151;">Overall Trend</h3>
          <p style="font-size: 18px; font-weight: bold; color: #7c3aed; margin: 0;">${trendAnalysis.trend || 'N/A'}</p>
        </div>
      </div>
    </div>

    ${predictions && predictions.length > 0 ? `
    <div style="margin-bottom: 30px;">
      <h2 style="color: #374151; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">Monthly Price Predictions</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <thead>
          <tr style="background: #f9fafb;">
            <th style="border: 1px solid #d1d5db; padding: 12px; text-align: left;">Month</th>
            <th style="border: 1px solid #d1d5db; padding: 12px; text-align: center;">Predicted Price (RWF)</th>
            <th style="border: 1px solid #d1d5db; padding: 12px; text-align: center;">Lower Bound (RWF)</th>
            <th style="border: 1px solid #d1d5db; padding: 12px; text-align: center;">Upper Bound (RWF)</th>
            <th style="border: 1px solid #d1d5db; padding: 12px; text-align: center;">Margin (%)</th>
          </tr>
        </thead>
        <tbody>
          ${predictions.map(pred => `
            <tr>
              <td style="border: 1px solid #d1d5db; padding: 12px;">${pred.month_name}</td>
              <td style="border: 1px solid #d1d5db; padding: 12px; text-align: center; font-weight: bold;">${pred.predicted_price.toLocaleString()}</td>
              <td style="border: 1px solid #d1d5db; padding: 12px; text-align: center;">${pred.lower_bound.toLocaleString()}</td>
              <td style="border: 1px solid #d1d5db; padding: 12px; text-align: center;">${pred.upper_bound.toLocaleString()}</td>
              <td style="border: 1px solid #d1d5db; padding: 12px; text-align: center;">${pred.margin_percent}%</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    ` : ''}

    ${trendAnalysis && Object.keys(trendAnalysis).length > 0 ? `
    <div style="margin-bottom: 30px;">
      <h2 style="color: #374151; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">Trend Analysis</h2>
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 20px;">
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; border: 1px solid #0ea5e9;">
          <h3 style="margin: 0 0 10px 0; color: #0c4a6e;">Overall Change</h3>
          <p style="font-size: 20px; font-weight: bold; color: #0ea5e9; margin: 0;">${trendAnalysis.overall_change_percent || 0}%</p>
        </div>
        <div style="background: #fef3c7; padding: 15px; border-radius: 8px; border: 1px solid #f59e0b;">
          <h3 style="margin: 0 0 10px 0; color: #92400e;">Volatility</h3>
          <p style="font-size: 20px; font-weight: bold; color: #f59e0b; margin: 0;">${trendAnalysis.volatility || 0}%</p>
        </div>
        <div style="background: #ecfdf5; padding: 15px; border-radius: 8px; border: 1px solid #10b981;">
          <h3 style="margin: 0 0 10px 0; color: #065f46;">Average Price</h3>
          <p style="font-size: 20px; font-weight: bold; color: #10b981; margin: 0;">${(trendAnalysis.average_price || 0).toLocaleString()} RWF</p>
        </div>
        <div style="background: #fef2f2; padding: 15px; border-radius: 8px; border: 1px solid #ef4444;">
          <h3 style="margin: 0 0 10px 0; color: #991b1b;">Price Range</h3>
          <p style="font-size: 16px; font-weight: bold; color: #ef4444; margin: 0;">
            ${trendAnalysis.price_range?.min?.toLocaleString() || 0} - ${trendAnalysis.price_range?.max?.toLocaleString() || 0} RWF
          </p>
        </div>
      </div>
    </div>
    ` : ''}

    <div style="margin-bottom: 30px;">
      <h2 style="color: #374151; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">Key Insights & Recommendations</h2>
      <div style="background: #f0f9ff; border: 1px solid #0ea5e9; border-radius: 8px; padding: 20px;">
        <ul style="margin: 0; padding-left: 20px; color: #0c4a6e;">
          <li style="margin-bottom: 8px;">Commodity: <strong>${commodity}</strong> in <strong>${location}</strong></li>
          <li style="margin-bottom: 8px;">Prediction trend: <strong>${trendAnalysis.trend || 'N/A'}</strong></li>
          ${trendAnalysis.overall_change_percent !== undefined ? `
          <li style="margin-bottom: 8px;">Expected price change: <strong>${trendAnalysis.overall_change_percent}%</strong> over 3 months</li>
          ` : ''}
          ${trendAnalysis.volatility !== undefined ? `
          <li style="margin-bottom: 8px;">Price volatility: <strong>${trendAnalysis.volatility}%</strong> (${trendAnalysis.volatility > 10 ? 'High' : trendAnalysis.volatility > 5 ? 'Medium' : 'Low'} volatility)</li>
          ` : ''}
          ${trendAnalysis.price_range ? `
          <li style="margin-bottom: 8px;">Price range: <strong>${trendAnalysis.price_range.min.toLocaleString()} - ${trendAnalysis.price_range.max.toLocaleString()} RWF</strong></li>
          ` : ''}
          ${predictions && predictions.length > 0 ? `
          <li style="margin-bottom: 8px;">Best month to buy: <strong>${predictions.reduce((min, p) => p.predicted_price < min.predicted_price ? p : min).month_name}</strong></li>
          <li style="margin-bottom: 8px;">Peak price month: <strong>${predictions.reduce((max, p) => p.predicted_price > max.predicted_price ? p : max).month_name}</strong></li>
          ` : ''}
        </ul>
      </div>
    </div>

    <div style="margin-top: 30px; padding: 15px; background: #f9fafb; border-radius: 8px; text-align: center;">
      <p style="margin: 0; color: #6b7280; font-size: 14px;">
        This report is generated based on historical data and predictive modeling. 
        Actual prices may vary due to market conditions and other factors.
      </p>
    </div>
  `;

  // Add the report div to the document
  document.body.appendChild(reportDiv);

  try {
    // Convert the div to canvas
    const canvas = await html2canvas(reportDiv, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    });

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgData = canvas.toDataURL('image/png');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    // Add image to PDF
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

    // Save the PDF
    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Error generating PDF. Please try again.');
  } finally {
    // Clean up
    document.body.removeChild(reportDiv);
  }
} 

// Cooperative Sales Summary Report PDF Generator
export async function generateCooperativeSalesReportPDF(salesSummary, cooperativeData, filename = 'cooperative_sales_report.pdf') {
  // Import jsPDF and html2canvas dynamically
  const jsPDF = (await import('jspdf')).default;
  const html2canvas = (await import('html2canvas')).default;

  // Create a temporary div for the report content
  const reportDiv = document.createElement('div');
  reportDiv.style.width = '800px';
  reportDiv.style.padding = '20px';
  reportDiv.style.backgroundColor = 'white';
  reportDiv.style.fontFamily = 'Arial, sans-serif';
  reportDiv.style.position = 'absolute';
  reportDiv.style.left = '-9999px';
  reportDiv.style.top = '0';

  // Generate report HTML content
  reportDiv.innerHTML = `
    <div style="text-align: center; margin-bottom: 30px;">
      <h1 style="color: #1f2937; margin-bottom: 10px;">Cooperative Sales Summary Report</h1>
      <p style="color: #6b7280; margin: 0;">Generated on ${new Date().toLocaleDateString()}</p>
      <div style="margin-top: 15px; padding: 10px; background: #f0f9ff; border: 1px solid #0ea5e9; border-radius: 8px;">
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; text-align: left;">
          <div>
            <strong style="color: #0c4a6e;">Cooperative:</strong>
            <span style="color: #0c4a6e; margin-left: 8px;">${cooperativeData?.username || 'N/A'}</span>
          </div>
          <div>
            <strong style="color: #0c4a6e;">Report Period:</strong>
            <span style="color: #0c4a6e; margin-left: 8px;">${salesSummary.start_date || 'N/A'} to ${salesSummary.end_date || 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>

    <div style="margin-bottom: 30px;">
      <h2 style="color: #374151; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">Sales Overview</h2>
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 20px;">
        <div style="background: #f3f4f6; padding: 15px; border-radius: 8px;">
          <h3 style="margin: 0 0 10px 0; color: #374151;">Total Revenue</h3>
          <p style="font-size: 24px; font-weight: bold; color: #059669; margin: 0;">${(salesSummary.total_revenue || 0).toLocaleString()} RWF</p>
        </div>
        <div style="background: #f3f4f6; padding: 15px; border-radius: 8px;">
          <h3 style="margin: 0 0 10px 0; color: #374151;">Total Orders</h3>
          <p style="font-size: 24px; font-weight: bold; color: #3b82f6; margin: 0;">${salesSummary.total_orders || 0}</p>
        </div>
        <div style="background: #f3f4f6; padding: 15px; border-radius: 8px;">
          <h3 style="margin: 0 0 10px 0; color: #374151;">Average Order Value</h3>
          <p style="font-size: 24px; font-weight: bold; color: #f59e0b; margin: 0;">${(salesSummary.avg_order_value || 0).toLocaleString()} RWF</p>
        </div>
        <div style="background: #f3f4f6; padding: 15px; border-radius: 8px;">
          <h3 style="margin: 0 0 10px 0; color: #374151;">Cooperative</h3>
          <p style="font-size: 18px; font-weight: bold; color: #7c3aed; margin: 0;">${cooperativeData?.username || 'N/A'}</p>
        </div>
      </div>
    </div>

    ${salesSummary.top_products && salesSummary.top_products.length > 0 ? `
    <div style="margin-bottom: 30px;">
      <h2 style="color: #374151; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">Top Selling Products</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <thead>
          <tr style="background: #f9fafb;">
            <th style="border: 1px solid #d1d5db; padding: 12px; text-align: left;">Product</th>
            <th style="border: 1px solid #d1d5db; padding: 12px; text-align: center;">Quantity Sold</th>
            <th style="border: 1px solid #d1d5db; padding: 12px; text-align: right;">Revenue (RWF)</th>
          </tr>
        </thead>
        <tbody>
          ${salesSummary.top_products.map(product => `
            <tr>
              <td style="border: 1px solid #d1d5db; padding: 12px;">${product.product__product_name || 'N/A'}</td>
              <td style="border: 1px solid #d1d5db; padding: 12px; text-align: center;">${product.quantity_sold || 0}</td>
              <td style="border: 1px solid #d1d5db; padding: 12px; text-align: right;">${(product.revenue || 0).toLocaleString()}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    ` : ''}

    ${salesSummary.sales_trend && salesSummary.sales_trend.length > 0 ? `
    <div style="margin-bottom: 30px;">
      <h2 style="color: #374151; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">Sales Trend</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <thead>
          <tr style="background: #f9fafb;">
            <th style="border: 1px solid #d1d5db; padding: 12px; text-align: left;">Period</th>
            <th style="border: 1px solid #d1d5db; padding: 12px; text-align: center;">Orders</th>
            <th style="border: 1px solid #d1d5db; padding: 12px; text-align: right;">Revenue (RWF)</th>
          </tr>
        </thead>
        <tbody>
          ${salesSummary.sales_trend.map(trend => `
            <tr>
              <td style="border: 1px solid #d1d5db; padding: 12px;">${trend.month ? `Month ${trend.month}` : trend.period || 'N/A'}</td>
              <td style="border: 1px solid #d1d5db; padding: 12px; text-align: center;">${trend.orders || 0}</td>
              <td style="border: 1px solid #d1d5db; padding: 12px; text-align: right;">${(trend.revenue || 0).toLocaleString()}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    ` : ''}

    <div style="margin-bottom: 30px;">
      <h2 style="color: #374151; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">Sales Insights</h2>
      <div style="background: #f0f9ff; border: 1px solid #0ea5e9; border-radius: 8px; padding: 20px;">
        <ul style="margin: 0; padding-left: 20px; color: #0c4a6e;">
          <li style="margin-bottom: 8px;">Total sales revenue: <strong>${(salesSummary.total_revenue || 0).toLocaleString()} RWF</strong></li>
          <li style="margin-bottom: 8px;">Total orders processed: <strong>${salesSummary.total_orders || 0}</strong></li>
          <li style="margin-bottom: 8px;">Average order value: <strong>${(salesSummary.avg_order_value || 0).toLocaleString()} RWF</strong></li>
          ${salesSummary.top_products && salesSummary.top_products.length > 0 ? `
          <li style="margin-bottom: 8px;">Top selling product: <strong>${salesSummary.top_products[0]?.product__product_name || 'N/A'}</strong></li>
          ` : ''}
          ${salesSummary.sales_by_cooperative && salesSummary.sales_by_cooperative.length > 0 ? `
          <li style="margin-bottom: 8px;">Top academy partner: <strong>${salesSummary.sales_by_cooperative[0]?.user?.user || salesSummary.sales_by_cooperative[0]?.user?.username || salesSummary.sales_by_cooperative[0]?.user || 'N/A'}</strong></li>
          ` : ''}
          ${salesSummary.sales_trend && salesSummary.sales_trend.length > 1 ? `
          <li style="margin-bottom: 8px;">Sales trend: <strong>${salesSummary.sales_trend.length} periods of data available</strong></li>
          ` : ''}
        </ul>
      </div>
    </div>

    <div style="margin-top: 30px; padding: 15px; background: #f9fafb; border-radius: 8px; text-align: center;">
      <p style="margin: 0; color: #6b7280; font-size: 14px;">
        This report covers the period from ${salesSummary.start_date || 'N/A'} to ${salesSummary.end_date || 'N/A'}
      </p>
    </div>
  `;

  // Add the report div to the document
  document.body.appendChild(reportDiv);

  try {
    // Convert the div to canvas
    const canvas = await html2canvas(reportDiv, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    });

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgData = canvas.toDataURL('image/png');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    // Add image to PDF
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

    // Save the PDF
    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Error generating PDF. Please try again.');
  } finally {
    // Clean up
    document.body.removeChild(reportDiv);
  }
} 