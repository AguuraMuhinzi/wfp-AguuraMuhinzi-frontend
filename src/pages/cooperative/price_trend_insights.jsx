import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommodityTrend } from "../../Redux/Slices/predictions/harvest_plan";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const commodities = ["Maize", "Rice", "Beans", "Sorghum", "Cassava"];

const CommodityInsights = () => {
  const dispatch = useDispatch();
  const { predictions, trend_analysis, commodity, location, loading, error } = useSelector((state) => state.commodityTrend);

  const [selectedCommodity, setSelectedCommodity] = useState("Maize");

  useEffect(() => {
    dispatch(
      fetchCommodityTrend({
        commodity: selectedCommodity,
        district: "Gasabo",
        province: "Kigali",
        market: "Kimironko Market",
        category: "Grains",
        unit: "Kg",
        pricetype: "Wholesale"
      })
    );
  }, [selectedCommodity, dispatch]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">📊 Commodity Price Trends & Insights</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        {commodities.map((item) => (
          <button
            key={item}
            onClick={() => setSelectedCommodity(item)}
            className={`px-4 py-2 rounded border ${
              selectedCommodity === item ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"
            } hover:bg-blue-500 hover:text-white transition`}
          >
            {item}
          </button>
        ))}
      </div>

      {loading && <p className="text-blue-600">Loading predictions...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && predictions?.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">{selectedCommodity} Price Forecast (Next 3 Months)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={predictions} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month_name" />
              <YAxis domain={['dataMin - 100', 'dataMax + 100']} />
              <Tooltip />
              <Line type="monotone" dataKey="predicted_price" stroke="#2563EB" strokeWidth={2} name="Predicted Price (RWF)" />
              <Line type="monotone" dataKey="lower_bound" stroke="#10B981" strokeDasharray="4 4" name="Lower Bound" />
              <Line type="monotone" dataKey="upper_bound" stroke="#EF4444" strokeDasharray="4 4" name="Upper Bound" />
            </LineChart>
          </ResponsiveContainer>

          <div className="bg-white mt-6 p-4 shadow rounded-lg">
            <h3 className="text-lg font-bold mb-2">📈 Insights</h3>
            <p><strong>Trend:</strong> {trend_analysis?.trend}</p>
            <p><strong>Overall Change:</strong> {trend_analysis?.overall_change_percent}%</p>
            <p><strong>Average Price:</strong> {trend_analysis?.average_price} RWF</p>
            <p><strong>Price Range:</strong> {trend_analysis?.price_range?.min} – {trend_analysis?.price_range?.max} RWF</p>
            <p><strong>Volatility:</strong> {trend_analysis?.volatility}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommodityInsights;
