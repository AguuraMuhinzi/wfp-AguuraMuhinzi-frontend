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

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const uniqueCommodities = [...new Set(Object.values(mockData.commodities).flat())];

  useEffect(() => {
    if (selectedCommodity && selectedDistrict && selectedYear) {
      dispatch(fetchCommodityTrend({ commodity: selectedCommodity, district: selectedDistrict, year: selectedYear }));
    }
  }, [selectedCommodity, selectedDistrict, selectedYear, dispatch]);

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

  const formatChartData = () => trendData.map(d => ({
    month: months[d.month - 1],
    price: d.predicted_price,
    lower: d.lower_bound,
    upper: d.upper_bound
  }));

  return (
    <div className="p-6 bg-white shadow rounded-xl">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2 flex items-center gap-2"><BarChart3 /> Market Insight Analysis</h2>
        <p className="text-sm text-gray-600">Select commodity and district to analyze trends</p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <select value={selectedCommodity} onChange={e => setSelectedCommodity(e.target.value)} className="p-3 border rounded">
          <option value="">Select Commodity</option>
          {uniqueCommodities.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={selectedDistrict} onChange={e => setSelectedDistrict(e.target.value)} className="p-3 border rounded">
          <option value="">Select District</option>
          {Object.values(mockData.districts).flat().map(d => <option key={d} value={d}>{d}</option>)}
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
      ) : trendData?.length ? (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={formatChartData()}>
            <defs>
              <linearGradient id="c1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="price" stroke="#3b82f6" fillOpacity={1} fill="url(#c1)" />
            <Line type="monotone" dataKey="lower" stroke="#10b981" strokeDasharray="4 4" />
            <Line type="monotone" dataKey="upper" stroke="#ef4444" strokeDasharray="4 4" />
          </AreaChart>
        </ResponsiveContainer>
      ) : null}

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
