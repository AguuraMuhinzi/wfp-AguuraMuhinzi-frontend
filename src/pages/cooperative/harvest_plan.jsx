
"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Tooltip } from "recharts"
import {
  FiTrendingUp,
  FiTrendingDown,
  FiMinus,
  FiInfo,
  FiMapPin,
  FiShoppingCart,
  FiPackage,
  FiDollarSign,
  FiCalendar,
  FiBarChart2,
  FiAlertCircle,
  FiRefreshCw,
  FiTarget,
  FiZap,
  FiActivity,
  FiPieChart,
  FiTrendingDown as FiTrendDown,
} from "react-icons/fi"
import { fetchCommodityTrend } from "../../Redux/Slices/predictions/harvest_plan"

const CommodityTrendPage = () => {
  const dispatch = useDispatch()
  const { predictions, trend_analysis, commodity, location, loading, error } = useSelector(
    (state) => state.commodityTrend,
  )

  const [form, setForm] = useState({
    commodity: "",
    district: "",
    province: "",
    market: "",
    category: "",
    unit: "",
    pricetype: "",
    year: new Date().getFullYear(),
  })

  const [viewMode, setViewMode] = useState("table")
  const [activeTab, setActiveTab] = useState("price-trends")
  const [selectedInsightCommodity, setSelectedInsightCommodity] = useState("Maize")

  const commodityOptions = ["Maize", "Rice", "Beans", "Irish Potatoes", "Tomatoes", "Onions", "Bananas", "Avocados"]
  const provinceOptions = ["Kigali", "Eastern Province", "Western Province", "Northern Province", "Southern Province"]
  const districtOptions = {
    Kigali: ["Gasabo", "Kicukiro", "Nyarugenge"],
    "Eastern Province": ["Rwamagana", "Kayonza", "Gatsibo"],
    "Western Province": ["Rusizi", "Nyamasheke", "Karongi"],
    "Northern Province": ["Musanze", "Gicumbi", "Rulindo"],
    "Southern Province": ["Huye", "Muhanga", "Ruhango"],
  }
  const marketOptions = {
    Gasabo: ["Kimironko Market", "Remera Market"],
    Kicukiro: ["Nyabugogo Market", "Gikondo Market"],
    Nyarugenge: ["Nyarugenge Market", "Central Market"],
  }
  const categoryOptions = ["Grains", "Vegetables", "Fruits", "Legumes"]
  const unitOptions = ["Kg", "Ton", "Bag (50kg)", "Crate"]
  const priceTypeOptions = ["Wholesale", "Retail", "Farm Gate"]

  const [availableDistricts, setAvailableDistricts] = useState([])
  const [availableMarkets, setAvailableMarkets] = useState([])

  useEffect(() => {
    if (form.province) {
      setAvailableDistricts(districtOptions[form.province] || [])
      setForm((prev) => ({ ...prev, district: "", market: "" }))
    }
  }, [form.province])

  useEffect(() => {
    if (form.district) {
      setAvailableMarkets(marketOptions[form.district] || [])
      setForm((prev) => ({ ...prev, market: "" }))
    }
  }, [form.district])

  // Load insights data when insights tab is active
  useEffect(() => {
    if (activeTab === "insights") {
      dispatch(
        fetchCommodityTrend({
          commodity: selectedInsightCommodity,
          district: "Gasabo",
          province: "Kigali",
          market: "Kimironko Market",
          category: "Grains",
          unit: "Kg",
          pricetype: "Wholesale",
          year: new Date().getFullYear(),
        }),
      )
    }
  }, [selectedInsightCommodity, activeTab, dispatch])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(fetchCommodityTrend(form))
  }

  const getTrendIcon = (trend) => {
    if (!trend) return <FiMinus className="w-5 h-5 text-gray-500" />
    const trendLower = trend.toLowerCase()
    if (trendLower.includes("increasing") || trendLower.includes("rising")) {
      return <FiTrendingUp className="w-5 h-5 text-green-500" />
    } else if (trendLower.includes("decreasing") || trendLower.includes("falling")) {
      return <FiTrendingDown className="w-5 h-5 text-red-500" />
    }
    return <FiMinus className="w-5 h-5 text-yellow-500" />
  }

  const getTrendColor = (trend) => {
    if (!trend) return "text-gray-600"
    const trendLower = trend.toLowerCase()
    if (trendLower.includes("increasing") || trendLower.includes("rising")) {
      return "text-green-600"
    } else if (trendLower.includes("decreasing") || trendLower.includes("falling")) {
      return "text-red-600"
    }
    return "text-yellow-600"
  }

  const TooltipComponent = ({ children, content }) => (
    <div className="relative inline-block group">
      {children}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-xs text-white bg-gray-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 pointer-events-none">
        {content}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
      </div>
    </div>
  )

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center py-12">
      <FiRefreshCw className="w-8 h-8 text-green-600 animate-spin mr-3" />
      <span className="text-gray-600 text-lg">Analyzing market trends...</span>
    </div>
  )

  const ErrorMessage = ({ message }) => (
    <div className="text-center py-12">
      <FiAlertCircle className="w-16 h-16 mx-auto mb-4 text-red-400" />
      <p className="text-red-600 text-lg mb-4">{message}</p>
      <button
        onClick={() => dispatch(fetchCommodityTrend(form))}
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
      >
        Try Again
      </button>
    </div>
  )

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800 mb-2">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.name}: ${entry.value} RWF`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const PriceChart = ({ data, commodity, unit }) => {
    if (!data || data.length === 0) return null

    const chartData = data.map((item) => ({
      month: item.month_name,
      year: item.year,
      monthYear: `${item.month_name} ${item.year}`,
      predicted_price: item.predicted_price,
      lower_bound: item.lower_bound,
      upper_bound: item.upper_bound,
    }))

    return (
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-6 border-b bg-gray-50">
          <div className="flex items-center space-x-2">
            <FiBarChart2 className="w-5 h-5 text-green-600" />
            <h3 className="text-xl font-semibold text-gray-800">📉 3-Month Price Trend Chart</h3>
          </div>
          <p className="text-gray-600 mt-1">{commodity} price forecast with confidence intervals</p>
        </div>

        <div className="p-6">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="monthYear" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
              <YAxis
                domain={["auto", "auto"]}
                label={{ value: "Price (RWF)", angle: -90, position: "insideLeft" }}
                tick={{ fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="predicted_price"
                name="Predicted Price"
                stroke="#16a34a"
                strokeWidth={3}
                dot={{ fill: "#16a34a", strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: "#16a34a", strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="lower_bound"
                name="Lower Bound"
                stroke="#ef4444"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="upper_bound"
                name="Upper Bound"
                stroke="#f59e0b"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: "#f59e0b", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <FiInfo className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-800 mb-1">Chart Reading Guide</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>
                    • <strong>Green solid line</strong> shows predicted prices for each month
                  </li>
                  <li>
                    • <strong>Red dashed line</strong> shows the minimum expected price (lower bound)
                  </li>
                  <li>
                    • <strong>Orange dashed line</strong> shows the maximum expected price (upper bound)
                  </li>
                  <li>• Hover over data points to see detailed price information</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {Math.max(...chartData.map((d) => d.predicted_price))} RWF
              </div>
              <div className="text-sm text-green-700">Highest Predicted Price</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {Math.round(chartData.reduce((sum, d) => sum + d.predicted_price, 0) / chartData.length)} RWF
              </div>
              <div className="text-sm text-blue-700">Average Predicted Price</div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-red-600">
                {Math.min(...chartData.map((d) => d.predicted_price))} RWF
              </div>
              <div className="text-sm text-red-700">Lowest Predicted Price</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Insights Tab Content
  const InsightsContent = () => (
    <div className="space-y-6">
      {/* Commodity Selection for Insights */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-center space-x-2 mb-6">
          <FiZap className="w-5 h-5 text-yellow-600" />
          <h3 className="text-xl font-semibold text-gray-800">📊 Commodity Price Trends & Insights</h3>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          {commodityOptions.map((item) => (
            <button
              key={item}
              onClick={() => setSelectedInsightCommodity(item)}
              className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                selectedInsightCommodity === item
                  ? "bg-blue-600 text-white border-blue-600 shadow-md"
                  : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-blue-500 hover:text-white hover:border-blue-500"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}

        {!loading && predictions?.length > 0 && (
          <div className="space-y-6">
            {/* Price Chart for Insights */}
            <div className="bg-white rounded-lg border p-6">
              <h4 className="text-lg font-semibold mb-4 text-gray-800">
                {selectedInsightCommodity} Price Forecast (Next 3 Months)
              </h4>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={predictions} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month_name" />
                  <YAxis domain={["dataMin - 100", "dataMax + 100"]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="predicted_price"
                    stroke="#2563EB"
                    strokeWidth={3}
                    name="Predicted Price (RWF)"
                    dot={{ fill: "#2563EB", strokeWidth: 2, r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="lower_bound"
                    stroke="#10B981"
                    strokeDasharray="4 4"
                    strokeWidth={2}
                    name="Lower Bound"
                  />
                  <Line
                    type="monotone"
                    dataKey="upper_bound"
                    stroke="#EF4444"
                    strokeDasharray="4 4"
                    strokeWidth={2}
                    name="Upper Bound"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Insights Summary */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <FiActivity className="w-6 h-6 text-blue-600" />
                <h4 className="text-lg font-bold text-blue-800">📈 Market Analysis</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2 mb-2">
                    {getTrendIcon(trend_analysis?.trend)}
                    <span className="font-medium text-gray-700">Trend</span>
                  </div>
                  <p className={`text-lg font-bold ${getTrendColor(trend_analysis?.trend)}`}>
                    {trend_analysis?.trend || "Stable"}
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <FiTrendingUp className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-gray-700">Overall Change</span>
                  </div>
                  <p className="text-lg font-bold text-green-600">
                    {trend_analysis?.overall_change_percent > 0 ? "+" : ""}
                    {trend_analysis?.overall_change_percent || 0}%
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <FiDollarSign className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-gray-700">Average Price</span>
                  </div>
                  <p className="text-lg font-bold text-blue-600">{trend_analysis?.average_price || 0} RWF</p>
                </div>

                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <FiBarChart2 className="w-5 h-5 text-purple-600" />
                    <span className="font-medium text-gray-700">Price Range</span>
                  </div>
                  <p className="text-sm font-medium text-purple-600">
                    {trend_analysis?.price_range?.min || 0} – {trend_analysis?.price_range?.max || 0} RWF
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <FiActivity className="w-5 h-5 text-orange-600" />
                    <span className="font-medium text-gray-700">Volatility</span>
                  </div>
                  <p className="text-lg font-bold text-orange-600">{trend_analysis?.volatility || "Low"}</p>
                </div>

                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <FiTarget className="w-5 h-5 text-red-600" />
                    <span className="font-medium text-gray-700">Market Status</span>
                  </div>
                  <p className="text-sm font-medium text-red-600">
                    {trend_analysis?.trend?.includes("increasing")
                      ? "Bullish"
                      : trend_analysis?.trend?.includes("decreasing")
                        ? "Bearish"
                        : "Neutral"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Market Intelligence Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Market Trends */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
          <div className="flex items-center space-x-2 mb-4">
            <FiActivity className="w-6 h-6 text-green-600" />
            <h4 className="text-lg font-semibold text-green-800">Market Trends</h4>
          </div>
          <ul className="space-y-3 text-sm text-green-700">
            <li className="flex items-start space-x-2">
              <span className="text-green-500 mt-1">•</span>
              <span>Seasonal demand patterns show peak prices during harvest months</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-green-500 mt-1">•</span>
              <span>Weather conditions significantly impact price volatility</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-green-500 mt-1">•</span>
              <span>Export opportunities drive premium pricing for quality produce</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-green-500 mt-1">•</span>
              <span>Storage facilities help farmers capitalize on price peaks</span>
            </li>
          </ul>
        </div>

        {/* Risk Factors */}
        <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl border border-red-200">
          <div className="flex items-center space-x-2 mb-4">
            <FiAlertCircle className="w-6 h-6 text-red-600" />
            <h4 className="text-lg font-semibold text-red-800">Risk Factors</h4>
          </div>
          <ul className="space-y-3 text-sm text-red-700">
            <li className="flex items-start space-x-2">
              <span className="text-red-500 mt-1">•</span>
              <span>Climate change affecting traditional growing seasons</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-red-500 mt-1">•</span>
              <span>Market oversupply during peak harvest periods</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-red-500 mt-1">•</span>
              <span>Transportation costs impacting final market prices</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-red-500 mt-1">•</span>
              <span>Currency fluctuations affecting export competitiveness</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Strategic Recommendations */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-200">
        <div className="flex items-center space-x-2 mb-4">
          <FiTarget className="w-6 h-6 text-yellow-600" />
          <h4 className="text-lg font-semibold text-yellow-800">Strategic Recommendations</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-medium text-yellow-700 mb-2">Short-term Actions</h5>
            <ul className="space-y-2 text-sm text-yellow-600">
              <li>• Monitor weekly price movements</li>
              <li>• Establish relationships with multiple buyers</li>
              <li>• Invest in basic storage solutions</li>
              <li>• Join farmer cooperatives for better pricing</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-yellow-700 mb-2">Long-term Strategy</h5>
            <ul className="space-y-2 text-sm text-yellow-600">
              <li>• Diversify crop portfolio to reduce risk</li>
              <li>• Implement sustainable farming practices</li>
              <li>• Explore value-addition opportunities</li>
              <li>• Build direct market relationships</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )

  // Harvest Plan Tab Content
  const HarvestPlanContent = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-center space-x-2 mb-6">
          <FiCalendar className="w-5 h-5 text-green-600" />
          <h3 className="text-xl font-semibold text-gray-800">Harvest Planning & Optimization</h3>
        </div>

        {/* Planting Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
            <div className="flex items-center space-x-2 mb-4">
              <FiCalendar className="w-6 h-6 text-green-600" />
              <h4 className="text-lg font-semibold text-green-800">Optimal Planting Calendar</h4>
            </div>
            <div className="space-y-4">
              {[
                { crop: "Maize", season: "Season A", months: "Sep - Dec", yield: "High" },
                { crop: "Beans", season: "Season B", months: "Jan - May", yield: "Medium" },
                { crop: "Irish Potatoes", season: "Season C", months: "Jun - Aug", yield: "High" },
              ].map((item, index) => (
                <div key={index} className="bg-white p-3 rounded border border-green-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <h5 className="font-medium text-green-700">{item.crop}</h5>
                      <p className="text-sm text-green-600">
                        {item.season} • {item.months}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        item.yield === "High" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.yield} Yield
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resource Planning */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-2 mb-4">
              <FiPieChart className="w-6 h-6 text-blue-600" />
              <h4 className="text-lg font-semibold text-blue-800">Resource Allocation</h4>
            </div>
            <div className="space-y-4">
              <div className="bg-white p-3 rounded border border-blue-200">
                <h5 className="font-medium text-blue-700 mb-2">Land Distribution</h5>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Food Crops</span>
                    <span className="font-medium">60%</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "60%" }}></div>
                  </div>
                </div>
                <div className="space-y-2 mt-3">
                  <div className="flex justify-between text-sm">
                    <span>Cash Crops</span>
                    <span className="font-medium">40%</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "40%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Harvest Timeline */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg border border-yellow-200">
          <div className="flex items-center space-x-2 mb-4">
            <FiActivity className="w-6 h-6 text-yellow-600" />
            <h4 className="text-lg font-semibold text-yellow-800">Harvest Timeline & Market Windows</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                month: "January",
                activities: ["Bean harvest", "Maize planting prep"],
                marketCondition: "High demand",
                color: "green",
              },
              {
                month: "April",
                activities: ["Irish potato planting", "Bean processing"],
                marketCondition: "Stable prices",
                color: "blue",
              },
              {
                month: "July",
                activities: ["Maize harvest", "Storage planning"],
                marketCondition: "Peak season",
                color: "yellow",
              },
            ].map((item, index) => (
              <div key={index} className="bg-white p-4 rounded border border-yellow-200">
                <h5 className="font-medium text-yellow-700 mb-2">{item.month}</h5>
                <ul className="text-sm text-yellow-600 space-y-1 mb-3">
                  {item.activities.map((activity, idx) => (
                    <li key={idx}>• {activity}</li>
                  ))}
                </ul>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    item.color === "green"
                      ? "bg-green-100 text-green-700"
                      : item.color === "blue"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {item.marketCondition}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const navigationTabs = [
    {
      id: "price-trends",
      label: "Price Trends",
      icon: FiBarChart2,
      description: "AI-powered price forecasts and market analysis",
    },
    {
      id: "insights",
      label: "Insights",
      icon: FiZap,
      description: "Market intelligence and strategic recommendations",
    },
    {
      id: "harvest-plan",
      label: "Harvest Plan",
      icon: FiCalendar,
      description: "Optimal planting and harvest scheduling",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-3 bg-green-100 rounded-lg">
              <FiBarChart2 className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">🌾 Smart Farming Dashboard</h1>
              <p className="text-gray-600 text-lg">AI-powered insights for better farming decisions</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="flex flex-col sm:flex-row">
            {navigationTabs.map((tab) => {
              const IconComponent = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 p-6 text-left transition-all duration-200 border-b-4 ${
                    activeTab === tab.id
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-transparent hover:bg-gray-50 text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <IconComponent className={`w-6 h-6 ${activeTab === tab.id ? "text-green-600" : "text-gray-500"}`} />
                    <h3 className="text-lg font-semibold">{tab.label}</h3>
                  </div>
                  <p className="text-sm opacity-75">{tab.description}</p>
                </button>
              )
            })}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "price-trends" && (
          <>
            {/* Form Section */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center space-x-2 mb-6">
                <FiTarget className="w-5 h-5 text-green-600" />
                <h2 className="text-xl font-semibold text-gray-800">Market Analysis Request</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">🌾 Commodity</label>
                    <select
                      name="commodity"
                      value={form.commodity}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      required
                    >
                      <option value="">Select Commodity</option>
                      {commodityOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <FiMapPin className="w-4 h-4 mr-1" />
                      Province
                    </label>
                    <select
                      name="province"
                      value={form.province}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      required
                    >
                      <option value="">Select Province</option>
                      {provinceOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <FiMapPin className="w-4 h-4 mr-1" />
                      District
                    </label>
                    <select
                      name="district"
                      value={form.district}
                      onChange={handleChange}
                      disabled={!form.province}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100 transition-colors"
                      required
                    >
                      <option value="">Select District</option>
                      {availableDistricts.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <FiShoppingCart className="w-4 h-4 mr-1" />
                      Market
                    </label>
                    <select
                      name="market"
                      value={form.market}
                      onChange={handleChange}
                      disabled={!form.district}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100 transition-colors"
                      required
                    >
                      <option value="">Select Market</option>
                      {availableMarkets.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <FiPackage className="w-4 h-4 mr-1" />
                      Category
                    </label>
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      required
                    >
                      <option value="">Select Category</option>
                      {categoryOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <FiPackage className="w-4 h-4 mr-1" />
                      Unit
                    </label>
                    <select
                      name="unit"
                      value={form.unit}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      required
                    >
                      <option value="">Select Unit</option>
                      {unitOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <FiDollarSign className="w-4 h-4 mr-1" />
                      Price Type
                    </label>
                    <select
                      name="pricetype"
                      value={form.pricetype}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      required
                    >
                      <option value="">Select Price Type</option>
                      {priceTypeOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <FiCalendar className="w-4 h-4 mr-1" />
                      Year
                    </label>
                    <input
                      type="number"
                      name="year"
                      value={form.year}
                      onChange={handleChange}
                      min="2020"
                      max="2030"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <FiRefreshCw className="w-5 h-5 animate-spin" />
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <FiBarChart2 className="w-5 h-5" />
                        <span>View Trends</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Results Section */}
            {loading && (
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <LoadingSpinner />
              </div>
            )}

            {error && (
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <ErrorMessage message={error} />
              </div>
            )}

            {predictions?.length > 0 && !loading && (
              <div className="space-y-6">
                {/* Summary Card */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <FiInfo className="w-5 h-5 text-blue-600" />
                    <h3 className="text-xl font-semibold text-gray-800">Market Analysis Summary</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-2xl">🌾</span>
                        <h4 className="font-semibold text-gray-800">Commodity</h4>
                      </div>
                      <p className="text-lg font-bold text-green-700">{commodity}</p>
                      <p className="text-sm text-gray-600">{location}</p>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <FiDollarSign className="w-5 h-5 text-blue-600" />
                        <h4 className="font-semibold text-gray-800">Average Price</h4>
                      </div>
                      <p className="text-lg font-bold text-blue-700">{trend_analysis?.average_price} RWF</p>
                      <p className="text-sm text-gray-600">per {form.unit}</p>
                    </div>

                    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg border border-yellow-200">
                      <div className="flex items-center space-x-2 mb-2">
                        {getTrendIcon(trend_analysis?.trend)}
                        <h4 className="font-semibold text-gray-800">Price Trend</h4>
                      </div>
                      <p className={`text-lg font-bold ${getTrendColor(trend_analysis?.trend)}`}>
                        {trend_analysis?.trend}
                      </p>
                      <p className="text-sm text-gray-600">
                        {trend_analysis?.overall_change_percent > 0 ? "+" : ""}
                        {trend_analysis?.overall_change_percent}% change
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <FiBarChart2 className="w-5 h-5 text-purple-600" />
                        <h4 className="font-semibold text-gray-800">Market Info</h4>
                        <TooltipComponent content="Volatility measures how much prices fluctuate. Lower volatility means more stable prices.">
                          <FiInfo className="w-4 h-4 text-gray-400 cursor-help" />
                        </TooltipComponent>
                      </div>
                      <p className="text-lg font-bold text-purple-700">{trend_analysis?.volatility}</p>
                      <p className="text-sm text-gray-600">
                        Range: {trend_analysis?.price_range?.min} - {trend_analysis?.price_range?.max} RWF
                      </p>
                    </div>
                  </div>
                </div>

                {/* View Toggle Buttons */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <FiBarChart2 className="w-5 h-5 text-green-600" />
                      <h3 className="text-xl font-semibold text-gray-800">Price Forecast Analysis</h3>
                    </div>

                    <div className="flex bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => setViewMode("table")}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                          viewMode === "table"
                            ? "bg-white text-green-700 shadow-sm"
                            : "text-gray-600 hover:text-gray-800"
                        }`}
                      >
                        <FiCalendar className="w-4 h-4" />
                        <span>Table View</span>
                      </button>
                      <button
                        onClick={() => setViewMode("chart")}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                          viewMode === "chart"
                            ? "bg-white text-green-700 shadow-sm"
                            : "text-gray-600 hover:text-gray-800"
                        }`}
                      >
                        <FiBarChart2 className="w-4 h-4" />
                        <span>Chart View</span>
                      </button>
                    </div>
                  </div>

                  <p className="text-gray-600">
                    {viewMode === "table"
                      ? "Detailed monthly predictions with confidence intervals"
                      : "Visual representation of price trends and forecasts"}
                  </p>
                </div>

                {/* Conditional Content Rendering */}
                {viewMode === "chart" ? (
                  <PriceChart data={predictions} commodity={commodity} unit={form.unit} />
                ) : (
                  <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                    <div className="p-6 border-b bg-gray-50">
                      <div className="flex items-center space-x-2">
                        <FiCalendar className="w-5 h-5 text-green-600" />
                        <h3 className="text-xl font-semibold text-gray-800">3-Month Price Forecast</h3>
                      </div>
                      <p className="text-gray-600 mt-1">Detailed monthly predictions with confidence intervals</p>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                          <tr>
                            <th className="text-left p-4 font-semibold text-gray-700">
                              <div className="flex items-center space-x-1">
                                <FiCalendar className="w-4 h-4" />
                                <span>Month</span>
                              </div>
                            </th>
                            <th className="text-left p-4 font-semibold text-gray-700">
                              <div className="flex items-center space-x-1">
                                <FiTarget className="w-4 h-4" />
                                <span>Predicted Price</span>
                              </div>
                            </th>
                            <th className="text-left p-4 font-semibold text-gray-700">
                              <div className="flex items-center space-x-1">
                                <FiTrendDown className="w-4 h-4 text-red-500" />
                                <span>Lower Bound</span>
                              </div>
                            </th>
                            <th className="text-left p-4 font-semibold text-gray-700">
                              <div className="flex items-center space-x-1">
                                <FiTrendingUp className="w-4 h-4 text-green-500" />
                                <span>Upper Bound</span>
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {predictions.map((item, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50 transition-colors duration-150">
                              <td className="p-4 font-medium text-gray-800">
                                {item.month_name} {item.year}
                              </td>
                              <td className="p-4">
                                <span className="text-lg font-bold text-green-600">{item.predicted_price} RWF</span>
                              </td>
                              <td className="p-4 text-gray-600">{item.lower_bound} RWF</td>
                              <td className="p-4 text-gray-600">{item.upper_bound} RWF</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Insights Card */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200 p-6">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <FiInfo className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">💡 Market Insights</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Plan your harvest timing based on price peaks</li>
                          <li>• Consider storage if prices are expected to rise</li>
                        </ul>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Monitor market volatility for risk management</li>
                          <li>• Diversify crops to reduce price risk exposure</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === "insights" && <InsightsContent />}
        {activeTab === "harvest-plan" && <HarvestPlanContent />}
      </div>
    </div>
  )
}

export default CommodityTrendPage
