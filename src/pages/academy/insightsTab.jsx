import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line } from 'recharts';
import { fetchCommodityTrend } from '../../Redux/Slices/predictions/price_prediction';
import { BarChart3, Lightbulb, Clock, AlertTriangle, TrendingUp, TrendingDown, Target, ShoppingCart, DollarSign } from 'lucide-react';

const InsightsTab = ({ mockData }) => {
  const dispatch = useDispatch();
  const { trendData, loading, error } = useSelector(state => state.prediction);
  const [selectedCommodity, setSelectedCommodity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [insights, setInsights] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedMarket, setSelectedMarket] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [selectedPriceType, setSelectedPriceType] = useState('');

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const uniqueCommodities = [...new Set(Object.values(mockData.commodities).flat())];

  useEffect(() => {
    if (
      selectedCommodity &&
      selectedDistrict &&
      selectedProvince &&
      selectedMarket &&
      selectedCategory &&
      selectedUnit &&
      selectedPriceType &&
      selectedYear
    ) {
      dispatch(fetchCommodityTrend({
        commodity: selectedCommodity,
        district: selectedDistrict,
        province: selectedProvince,
        market: selectedMarket,
        category: selectedCategory,
        unit: selectedUnit,
        pricetype: selectedPriceType,
        year: selectedYear
      }));
    }
  }, [selectedCommodity, selectedDistrict, selectedProvince, selectedMarket, selectedCategory, selectedUnit, selectedPriceType, selectedYear, dispatch]);

  useEffect(() => {
    if (trendData?.length) generateInsights(trendData);
  }, [trendData]);

  const generateInsights = (data) => {
    const sorted = [...data].sort((a, b) => a.month - b.month);
    const prices = sorted.map(d => d.predicted_price);
    const max = Math.max(...prices), min = Math.min(...prices);
    const maxM = sorted.find(d => d.predicted_price === max), minM = sorted.find(d => d.predicted_price === min);

    const vol = sorted.slice(1).map((d, i) => Math.abs((d.predicted_price - sorted[i].predicted_price) / sorted[i].predicted_price * 100));
    const avgVol = vol.reduce((a, b) => a + b, 0) / vol.length;

    const q = [[1, 3], [4, 6], [7, 9], [10, 12]];
    const qAvg = q.map(([start, end]) => ({
      quarter: `Q${(start + 2) / 3}`,
      avg: sorted.filter(d => d.month >= start && d.month <= end).reduce((sum, d, _, arr) => sum + d.predicted_price / arr.length, 0)
    })).filter(q => q.avg);

    const highestQ = qAvg.reduce((max, curr) => curr.avg > max.avg ? curr : max);

    const [firstHalf, secondHalf] = [sorted.slice(0, 6), sorted.slice(6)];
    const [fAvg, sAvg] = [
      firstHalf.reduce((sum, d) => sum + d.predicted_price, 0) / firstHalf.length,
      secondHalf.reduce((sum, d) => sum + d.predicted_price, 0) / secondHalf.length
    ];

    const format = (n) => n.toLocaleString();

    const messages = [
      {
        type: 'price_peak', icon: TrendingUp, color: 'red',
        title: 'Price Peak Alert',
        msg: `**${selectedCommodity}** peaks at **${format(max)} RWF** in **${months[maxM.month - 1]}**.`
      },
      {
        type: 'best_buy', icon: Target, color: 'green',
        title: 'Optimal Purchase Time',
        msg: `Best price for **${selectedCommodity}** is **${format(min)} RWF** in **${months[minM.month - 1]}**.`
      },
      avgVol > 10 && {
        type: 'volatility', icon: AlertTriangle, color: 'yellow',
        title: 'High Price Volatility',
        msg: `Average change is **${avgVol.toFixed(1)}%**. Plan ahead.`
      },
      sAvg > fAvg * 1.1 && {
        type: 'rising', icon: TrendingUp, color: 'orange',
        title: 'Rising Price Trend',
        msg: `Prices are increasing in the 2nd half of ${selectedYear}.`
      },
      fAvg > sAvg * 1.1 && {
        type: 'falling', icon: TrendingDown, color: 'blue',
        title: 'Falling Price Trend',
        msg: `Prices are decreasing in the 2nd half of ${selectedYear}.`
      }
    ].filter(Boolean);

    setInsights(messages);
  };

  // Use predictions array for chart data
  const chartData = Array.isArray(trendData?.predictions) ? trendData.predictions : [];
  const trendAnalysis = trendData?.trend_analysis || {};

  return (
    <div className="p-6 bg-white shadow rounded-xl">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2 flex items-center gap-2"><BarChart3 /> Market Insight Analysis</h2>
        <p className="text-sm text-gray-600">Select commodity and district to analyze trends</p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <select value={selectedCommodity} onChange={e => setSelectedCommodity(e.target.value)} className="p-3 border rounded">
          <option value="">Select Commodity</option>
          {uniqueCommodities.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="p-3 border rounded">
          <option value="">Select Category</option>
          {mockData.categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <select value={selectedProvince} onChange={e => setSelectedProvince(e.target.value)} className="p-3 border rounded">
          <option value="">Select Province</option>
          {mockData.provinces.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <select value={selectedDistrict} onChange={e => setSelectedDistrict(e.target.value)} className="p-3 border rounded">
          <option value="">Select District</option>
          {selectedProvince && mockData.districts[selectedProvince]?.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        <select value={selectedMarket} onChange={e => setSelectedMarket(e.target.value)} className="p-3 border rounded">
          <option value="">Select Market</option>
          {/* You may need to adjust this if you have market data */}
          <option value="Main Market">Main Market</option>
        </select>
        <select value={selectedUnit} onChange={e => setSelectedUnit(e.target.value)} className="p-3 border rounded">
          <option value="">Select Unit</option>
          {mockData.units.map(u => <option key={u} value={u}>{u}</option>)}
        </select>
        <select value={selectedPriceType} onChange={e => setSelectedPriceType(e.target.value)} className="p-3 border rounded">
          <option value="">Select Price Type</option>
          {mockData.pricetypes.map(pt => <option key={pt} value={pt}>{pt}</option>)}
        </select>
        <select value={selectedYear} onChange={e => setSelectedYear(+e.target.value)} className="p-3 border rounded">
          {[2024, 2025, 2026].map(y => <option key={y} value={y}>{y}</option>)}
        </select>
      </div>

      {/* Chart */}
      {loading ? (
        <p>Loading chart...</p>
      ) : error ? (
        <p className="text-red-600">Error loading data</p>
      ) : chartData.length ? (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="c1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month_name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="predicted_price" stroke="#3b82f6" fillOpacity={1} fill="url(#c1)" />
            <Line type="monotone" dataKey="lower_bound" stroke="#10b981" strokeDasharray="4 4" />
            <Line type="monotone" dataKey="upper_bound" stroke="#ef4444" strokeDasharray="4 4" />
          </AreaChart>
        </ResponsiveContainer>
      ) : null}

      {/* Trend Analysis Smart Insights */}
      {trendAnalysis && (
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2"><Lightbulb /> Smart Insights</h3>
          <ul className="list-disc pl-6 text-blue-900 space-y-1">
            {trendAnalysis.trend && <li>Trend: <span className="font-bold">{trendAnalysis.trend}</span></li>}
            {trendAnalysis.overall_change_percent !== undefined && <li>Overall Change: <span className="font-bold">{trendAnalysis.overall_change_percent}%</span></li>}
            {trendAnalysis.volatility !== undefined && <li>Volatility: <span className="font-bold">{trendAnalysis.volatility}%</span></li>}
            {trendAnalysis.average_price !== undefined && <li>Average Price: <span className="font-bold">{trendAnalysis.average_price} RWF</span></li>}
            {trendAnalysis.price_range && <li>Price Range: <span className="font-bold">{trendAnalysis.price_range.min} - {trendAnalysis.price_range.max} RWF</span></li>}
          </ul>
        </div>
      )}

      {/* Insights */}
      <div className="mt-6">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2"><Lightbulb /> Insights</h3>
        {insights.map((ins, idx) => (
          <div key={idx} className="bg-gray-50 p-4 rounded-lg mb-3 shadow border-l-4 border-gray-200 flex items-start gap-4">
            <ins.icon className="text-gray-600 w-6 h-6 mt-1" />
            <div>
              <h4 className="font-semibold text-gray-700">{ins.title}</h4>
              <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: ins.msg.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsightsTab;
