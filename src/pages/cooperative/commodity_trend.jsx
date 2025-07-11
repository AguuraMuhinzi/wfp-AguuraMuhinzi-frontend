"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
} from "recharts"
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
  FiTrendingDown as FiTrendDown,
  FiCheckCircle,
  FiClock,
  FiAlertTriangle,
  FiPlus,
  FiDownload,
} from "react-icons/fi"
import { fetchCommodityTrend, comparePricesAcrossLocations } from "../../Redux/Slices/predictions/harvest_plan"
import { generatePriceComparisonReportPDF } from "../../components/export_function"

const CommodityTrendPage = () => {
  const dispatch = useDispatch()
  const { predictions, trend_analysis, commodity, location, loading, error, priceComparison } = useSelector(
    (state) => state.commodityTrend,
  )
  const user = useSelector(state => state.user.userInfo) || {}

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

  // Price comparison form state
  const [priceComparisonForm, setPriceComparisonForm] = useState({
    commodity: "",
    year: new Date().getFullYear(),
    month: "",
    category: "",
    unit: "Kg",
    pricetype: "Retail",
    locations: [],
  })

  // Separate state for form fields to prevent conflicts
  const [formData, setFormData] = useState({
    commodity: "",
    year: new Date().getFullYear(),
    month: "",
    monthNumber: "",
    category: "",
    unit: "kg",
    pricetype: "Retail",
    currency: "RWF",
  })

  const commodityOptions = [
    "Maize",
    "Rice",
    "Beans",
    "Irish Potatoes",
    "Tomatoes",
    "Onions",
    "Bananas",
    "Avocados",
    "Oil",
    "Salt",
  ]
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
    Rwamagana: ["Rwamagana Market"],
    Kayonza: ["Kayonza Market"],
    Gatsibo: ["Gatsibo Market"],
    Rusizi: ["Rusizi Market"],
    Nyamasheke: ["Nyamasheke Market"],
    Karongi: ["Karongi Market"],
    Musanze: ["Musanze Market"],
    Gicumbi: ["Gicumbi Market"],
    Rulindo: ["Rulindo Market"],
    Huye: ["Huye Market"],
    Muhanga: ["Muhanga Market"],
    Ruhango: ["Ruhango Market"],
  }
  const categoryOptions = ["Cereals", "Vegetables", "Fruits", "Legumes", "Grains"]
  const unitOptions = ["kg", "ton", "bag (50kg)", "crate"]
  const priceTypeOptions = ["Wholesale", "Retail", "Farm Gate"]
  const monthOptions = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

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

  const handlePriceComparisonChange = (e) => {
    const { name, value } = e.target
    setPriceComparisonForm((prev) => ({ ...prev, [name]: value }))
  }

  // Fixed location selection handler
  const handleLocationSelection = (location) => {
    setPriceComparisonForm((prevForm) => {
      const isLocationAlreadySelected = prevForm.locations.some(
        (loc) =>
          loc.province === location.province && loc.district === location.district && loc.market === location.market,
      )

      let updatedLocations
      if (isLocationAlreadySelected) {
        // Remove location if already selected
        updatedLocations = prevForm.locations.filter(
          (loc) =>
            !(
              loc.province === location.province &&
              loc.district === location.district &&
              loc.market === location.market
            ),
        )
      } else {
        // Add location if not selected
        updatedLocations = [...prevForm.locations, location]
      }

      return {
        ...prevForm,
        locations: updatedLocations,
      }
    })
  }

  const handlePriceComparisonSubmit = (e) => {
    e.preventDefault()
    if (priceComparisonForm.commodity && priceComparisonForm.locations.length > 0) {
      dispatch(comparePricesAcrossLocations(priceComparisonForm))
    }
  }

  // Smart Insights Generator
  const generateSmartInsights = (predictions, trendAnalysis, commodityName) => {
    if (!predictions || predictions.length === 0 || !trendAnalysis) return []

    const insights = []
    const currentPrice = predictions[0]?.predicted_price || 0
    const futurePrice = predictions[predictions.length - 1]?.predicted_price || 0
    const priceChange = ((futurePrice - currentPrice) / currentPrice) * 100

    // Safe string handling with proper null checks
    const volatility =
      trendAnalysis.volatility && typeof trendAnalysis.volatility === "string"
        ? trendAnalysis.volatility.toLowerCase()
        : ""
    const trend =
      trendAnalysis.trend && typeof trendAnalysis.trend === "string" ? trendAnalysis.trend.toLowerCase() : ""

    // Price Increase Insights
    if (priceChange > 10) {
      insights.push({
        type: "bullish",
        icon: "📈",
        title: "Strong Price Growth Expected",
        message: `The price of ${commodityName.toLowerCase()} is expected to increase by ${Math.abs(priceChange).toFixed(1)}% in the next 3 months. Consider holding stocks for better returns.`,
        action: "Hold & Store",
        urgency: "high",
        color: "green",
      })
    } else if (priceChange > 5) {
      insights.push({
        type: "positive",
        icon: "✅",
        title: "Moderate Price Increase",
        message: `${commodityName} prices are projected to rise by ${Math.abs(priceChange).toFixed(1)}%. Good time to store produce if you have storage facilities.`,
        action: "Consider Storage",
        urgency: "medium",
        color: "green",
      })
    }

    // Price Decrease Insights
    if (priceChange < -8) {
      insights.push({
        type: "bearish",
        icon: "📉",
        title: "Price Decline Expected",
        message: `The price of ${commodityName.toLowerCase()} is expected to decrease by ${Math.abs(priceChange).toFixed(1)}%. It might be better to sell now before prices drop further.`,
        action: "Sell Now",
        urgency: "high",
        color: "red",
      })
    } else if (priceChange < -3) {
      insights.push({
        type: "caution",
        icon: "⚠️",
        title: "Slight Price Decline",
        message: `${commodityName} prices may drop by ${Math.abs(priceChange).toFixed(1)}%. Consider selling soon or wait for market recovery.`,
        action: "Monitor Closely",
        urgency: "medium",
        color: "yellow",
      })
    }

    // Volatility Insights - with safe string checking
    if (volatility && volatility.includes("high")) {
      insights.push({
        type: "warning",
        icon: "⚠️",
        title: "High Market Volatility",
        message: `${commodityName} prices show high volatility. Stay alert for sharp market shifts and be ready to act quickly.`,
        action: "Stay Alert",
        urgency: "high",
        color: "orange",
      })
    }

    // Seasonal Timing Insights
    if (predictions.length >= 2) {
      const nextMonthPrice = predictions[1]?.predicted_price || 0
      const monthAfterPrice = predictions[2]?.predicted_price || 0

      if (nextMonthPrice > currentPrice && nextMonthPrice > monthAfterPrice) {
        insights.push({
          type: "timing",
          icon: "🕐",
          title: "Optimal Selling Window",
          message: `Selling your ${commodityName.toLowerCase()} next month will be better for maximum gains. Prices peak in ${predictions[1]?.month_name || "next month"}.`,
          action: "Sell Next Month",
          urgency: "medium",
          color: "blue",
        })
      }
    }

    // Storage Recommendations - with safe volatility check
    if (priceChange > 5 && volatility && volatility.includes("low")) {
      insights.push({
        type: "storage",
        icon: "🏪",
        title: "Storage Opportunity",
        message: `With rising prices and low volatility, investing in storage for ${commodityName.toLowerCase()} could yield ${Math.abs(priceChange).toFixed(1)}% returns.`,
        action: "Invest in Storage",
        urgency: "medium",
        color: "purple",
      })
    }

    // Market Stability Insights - with safe volatility check
    if (volatility && volatility.includes("low") && Math.abs(priceChange) < 3) {
      insights.push({
        type: "stable",
        icon: "📊",
        title: "Stable Market Conditions",
        message: `${commodityName} market shows stability with minimal price fluctuations. Good for consistent planning and contracts.`,
        action: "Plan Long-term",
        urgency: "low",
        color: "gray",
      })
    }

    // Risk Warnings - with safe volatility check
    if (volatility && volatility.includes("high") && Math.abs(priceChange) > 10) {
      insights.push({
        type: "risk",
        icon: "🚨",
        title: "High Risk Market",
        message: `${commodityName} shows both high volatility and significant price changes. Consider diversifying your crops to reduce risk.`,
        action: "Diversify Portfolio",
        urgency: "high",
        color: "red",
      })
    }

    // If no specific insights, add a default one
    if (insights.length === 0) {
      insights.push({
        type: "stable",
        icon: "📊",
        title: "Market Analysis Available",
        message: `${commodityName} market data is available for analysis. Monitor trends regularly for better decision making.`,
        action: "Monitor Trends",
        urgency: "low",
        color: "gray",
      })
    }

    return insights.slice(0, 4) // Return top 4 insights
  }

  const getTrendIcon = (trend) => {
    if (!trend || typeof trend !== "string") return <FiMinus className="w-5 h-5 text-gray-500" />
    const trendLower = trend.toLowerCase()
    if (trendLower.includes("increasing") || trendLower.includes("rising")) {
      return <FiTrendingUp className="w-5 h-5 text-green-500" />
    } else if (trendLower.includes("decreasing") || trendLower.includes("falling")) {
      return <FiTrendingDown className="w-5 h-5 text-red-500" />
    }
    return <FiMinus className="w-5 h-5 text-yellow-500" />
  }

  const getTrendColor = (trend) => {
    if (!trend || typeof trend !== "string") return "text-gray-600"
    const trendLower = trend.toLowerCase()
    if (trendLower.includes("increasing") || trendLower.includes("rising")) {
      return "text-green-600"
    } else if (trendLower.includes("decreasing") || trendLower.includes("falling")) {
      return "text-red-600"
    }
    return "text-yellow-600"
  }

  const getInsightIcon = (type) => {
    switch (type) {
      case "bullish":
        return <FiTrendingUp className="w-5 h-5" />
      case "bearish":
        return <FiTrendingDown className="w-5 h-5" />
      case "warning":
        return <FiAlertTriangle className="w-5 h-5" />
      case "timing":
        return <FiClock className="w-5 h-5" />
      case "storage":
        return <FiPackage className="w-5 h-5" />
      case "stable":
        return <FiCheckCircle className="w-5 h-5" />
      case "risk":
        return <FiAlertCircle className="w-5 h-5" />
      default:
        return <FiInfo className="w-5 h-5" />
    }
  }

  const getInsightColorClasses = (color, urgency) => {
    const baseClasses = "border-l-4 rounded-lg p-4 shadow-sm"
    const urgencyClasses = urgency === "high" ? "shadow-md" : urgency === "medium" ? "shadow" : "shadow-sm"

    switch (color) {
      case "green":
        return `${baseClasses} ${urgencyClasses} bg-green-50 border-green-400 text-green-800`
      case "red":
        return `${baseClasses} ${urgencyClasses} bg-red-50 border-red-400 text-red-800`
      case "yellow":
        return `${baseClasses} ${urgencyClasses} bg-yellow-50 border-yellow-400 text-yellow-800`
      case "blue":
        return `${baseClasses} ${urgencyClasses} bg-blue-50 border-blue-400 text-blue-800`
      case "orange":
        return `${baseClasses} ${urgencyClasses} bg-orange-50 border-orange-400 text-orange-800`
      case "purple":
        return `${baseClasses} ${urgencyClasses} bg-purple-50 border-purple-400 text-purple-800`
      case "gray":
        return `${baseClasses} ${urgencyClasses} bg-gray-50 border-gray-400 text-gray-800`
      default:
        return `${baseClasses} ${urgencyClasses} bg-blue-50 border-blue-400 text-blue-800`
    }
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

  // Enhanced Insights Tab Content
  const InsightsContent = () => {
    const smartInsights = generateSmartInsights(predictions, trend_analysis, selectedInsightCommodity)

    // Safe insights rendering function
    const renderInsightValue = (value) => {
      if (value === null || value === undefined) {
        return "No data available"
      }
      
      if (typeof value === "object") {
        // Handle nested objects like best_location
        if (value.location && value.price && value.market) {
          return (
            <div className="space-y-1">
              <div><strong>Location:</strong> {value.location}</div>
              <div><strong>Price:</strong> {value.price} RWF</div>
              <div><strong>Market:</strong> {value.market}</div>
            </div>
          )
        }
        
        // Handle other object types
        return (
          <div className="space-y-1">
            {Object.entries(value).map(([key, val]) => (
              <div key={key}>
                <strong>{key.replace(/_/g, " ").toUpperCase()}:</strong> {val}
              </div>
            ))}
          </div>
        )
      }
      
      // Handle primitive values
      return String(value)
    }

    return (
      <div className="space-y-6">
        {/* Commodity Selection for Insights */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center space-x-2 mb-6">
            <FiZap className="w-5 h-5 text-yellow-600" />
            <h3 className="text-xl font-semibold text-gray-800">🧠 Smart Market Intelligence</h3>
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
              {/* Smart Insights Cards */}
              {smartInsights.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <FiZap className="w-5 h-5 text-yellow-600" />
                    <h4 className="text-lg font-semibold text-gray-800">🎯 Actionable Insights</h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {smartInsights.map((insight, index) => (
                      <div key={index} className={getInsightColorClasses(insight.color, insight.urgency)}>
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            <span className="text-2xl">{insight.icon}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="font-semibold text-sm">{insight.title}</h5>
                              <div className="flex items-center space-x-2">
                                {getInsightIcon(insight.type)}
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    insight.urgency === "high"
                                      ? "bg-red-100 text-red-700"
                                      : insight.urgency === "medium"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : "bg-gray-100 text-gray-700"
                                  }`}
                                >
                                  {insight.urgency.toUpperCase()}
                                </span>
                              </div>
                            </div>
                            <p className="text-sm mb-3 leading-relaxed">{insight.message}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-medium opacity-75">Recommended Action:</span>
                              <span className="text-sm font-semibold">{insight.action}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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

              {/* Market Analysis Summary */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <FiActivity className="w-6 h-6 text-blue-600" />
                  <h4 className="text-lg font-bold text-blue-800">📈 Market Analysis Summary</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-2 mb-2">
                      {getTrendIcon(trend_analysis?.trend)}
                      <span className="font-medium text-gray-700">Market Trend</span>
                    </div>
                    <p className={`text-lg font-bold ${getTrendColor(trend_analysis?.trend)}`}>
                      {trend_analysis?.trend || "Stable"}
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <FiTrendingUp className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-gray-700">Price Change</span>
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
                        ? "Bullish 🐂"
                        : trend_analysis?.trend?.includes("decreasing")
                          ? "Bearish 🐻"
                          : "Neutral ⚖️"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Market Intelligence Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Market Opportunities */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
            <div className="flex items-center space-x-2 mb-4">
              <FiTrendingUp className="w-6 h-6 text-green-600" />
              <h4 className="text-lg font-semibold text-green-800">Market Opportunities</h4>
            </div>
            <ul className="space-y-3 text-sm text-green-700">
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">💰</span>
                <span>Export markets showing increased demand for quality produce</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">🏪</span>
                <span>Storage facilities can help capitalize on seasonal price peaks</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">🤝</span>
                <span>Cooperative farming reduces costs and improves bargaining power</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">📱</span>
                <span>Digital platforms connecting farmers directly to buyers</span>
              </li>
            </ul>
          </div>

          {/* Risk Management */}
          <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl border border-red-200">
            <div className="flex items-center space-x-2 mb-4">
              <FiAlertTriangle className="w-6 h-6 text-red-600" />
              <h4 className="text-lg font-semibold text-red-800">Risk Management</h4>
            </div>
            <ul className="space-y-3 text-sm text-red-700">
              <li className="flex items-start space-x-2">
                <span className="text-red-500 mt-1">🌦️</span>
                <span>Weather patterns affecting traditional growing seasons</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-500 mt-1">📉</span>
                <span>Market oversupply during peak harvest periods</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-500 mt-1">🚛</span>
                <span>Transportation costs impacting final market prices</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-500 mt-1">💱</span>
                <span>Currency fluctuations affecting export competitiveness</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Strategic Action Plan */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-200">
          <div className="flex items-center space-x-2 mb-4">
            <FiTarget className="w-6 h-6 text-yellow-600" />
            <h4 className="text-lg font-semibold text-yellow-800">📋 Strategic Action Plan</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h5 className="font-medium text-yellow-700 mb-3 flex items-center">
                <FiClock className="w-4 h-4 mr-2" />
                This Week
              </h5>
              <ul className="space-y-2 text-sm text-yellow-600">
                <li>• Monitor daily price movements</li>
                <li>• Check weather forecasts</li>
                <li>• Contact potential buyers</li>
                <li>• Assess current stock levels</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-yellow-700 mb-3 flex items-center">
                <FiCalendar className="w-4 h-4 mr-2" />
                This Month
              </h5>
              <ul className="space-y-2 text-sm text-yellow-600">
                <li>• Establish buyer relationships</li>
                <li>• Invest in storage solutions</li>
                <li>• Join farmer cooperatives</li>
                <li>• Plan next season crops</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-yellow-700 mb-3 flex items-center">
                <FiTarget className="w-4 h-4 mr-2" />
                Long-term
              </h5>
              <ul className="space-y-2 text-sm text-yellow-600">
                <li>• Diversify crop portfolio</li>
                <li>• Implement sustainable practices</li>
                <li>• Explore value-addition</li>
                <li>• Build direct market access</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Enhanced Price Comparison Tab Content - Completely Redesigned
  const PriceComparisonContent = () => {
    const [showComparisonForm, setShowComparisonForm] = useState(false)

    // Separate state for form fields to prevent conflicts
    const [formData, setFormData] = useState({
      commodity: "",
      year: new Date().getFullYear(),
      month: "",
      monthNumber: "",
      category: "",
      unit: "kg",
      pricetype: "Retail",
      currency: "RWF",
    })

    // Separate state for selected locations
    const [selectedLocations, setSelectedLocations] = useState([])

    // Available locations for comparison
    const availableLocations = [
      { id: 1, province: "Kigali", district: "Gasabo", market: "Kimironko Market" },
      { id: 2, province: "Kigali", district: "Kicukiro", market: "Nyabugogo Market" },
      { id: 3, province: "Kigali", district: "Nyarugenge", market: "Nyarugenge Market" },
      { id: 4, province: "Eastern Province", district: "Rwamagana", market: "Rwamagana Market" },
      { id: 5, province: "Eastern Province", district: "Kayonza", market: "Kayonza Market" },
      { id: 6, province: "Western Province", district: "Rusizi", market: "Rusizi Market" },
      { id: 7, province: "Western Province", district: "Nyamasheke", market: "Nyamasheke Market" },
      { id: 8, province: "Northern Province", district: "Musanze", market: "Musanze Market" },
      { id: 9, province: "Northern Province", district: "Gicumbi", market: "Gicumbi Market" },
      { id: 10, province: "Southern Province", district: "Huye", market: "Huye Market" },
      { id: 11, province: "Southern Province", district: "Muhanga", market: "Muhanga Market" },
    ]

    // Handle form field changes
    const handleFormFieldChange = (field, value) => {
      setFormData((prev) => {
        const updated = { ...prev, [field]: value }
        
        // Convert month name to number when month changes
        if (field === "month" && value) {
          const monthMap = {
            "January": 1, "February": 2, "March": 3, "April": 4,
            "May": 5, "June": 6, "July": 7, "August": 8,
            "September": 9, "October": 10, "November": 11, "December": 12
          }
          updated.monthNumber = monthMap[value] || ""
        }
        
        return updated
      })
    }

    // Handle location toggle
    const toggleLocation = (location) => {
      setSelectedLocations((prev) => {
        const isSelected = prev.some((loc) => loc.id === location.id)
        if (isSelected) {
          return prev.filter((loc) => loc.id !== location.id)
        } else {
          return [...prev, location]
        }
      })
    }

    // Check if location is selected
    const isLocationSelected = (location) => {
      return selectedLocations.some((loc) => loc.id === location.id)
    }

    // Handle form submission
    const handleSubmitComparison = () => {
      if (formData.commodity && selectedLocations.length >= 2) {
        const submissionData = {
          commodity: formData.commodity,
          year: formData.year,
          month: formData.monthNumber, // Use the numeric month value
          base_data: {
            category: formData.category || "Cereals",
            unit: formData.unit, // Already lowercase from options
            pricetype: formData.pricetype.toLowerCase(), // Convert to lowercase
            currency: formData.currency
          },
          locations: selectedLocations.map((loc) => ({
            province: loc.province,
            district: loc.district,
            market: loc.market,
          })),
        }
        console.log("Submitting price comparison data:", submissionData)
        dispatch(comparePricesAcrossLocations(submissionData))
      }
    }

    // Reset form
    const resetForm = () => {
      setFormData({
        commodity: "",
        year: new Date().getFullYear(),
        month: "",
        monthNumber: "",
        category: "",
        unit: "kg",
        pricetype: "Retail",
        currency: "RWF",
      })
      setSelectedLocations([])
      setShowComparisonForm(false)
    }

    // Process comparison data for charts
    const processComparisonData = () => {
      if (!priceComparison.predictions || priceComparison.predictions.length === 0) return []

      return priceComparison.predictions.map((item) => ({
        location: `${item.district}, ${item.province}`,
        market: item.market,
        price: item.predicted_price || item.price || 0,
        district: item.district,
        province: item.province,
      }))
    }

    const comparisonChartData = processComparisonData()
    const avgPrice =
      comparisonChartData.length > 0
        ? comparisonChartData.reduce((sum, item) => sum + item.price, 0) / comparisonChartData.length
        : 0

    const getPriceStatus = (price) => {
      if (avgPrice === 0) return { status: "N/A", color: "text-gray-600", bg: "bg-gray-50" }
      const difference = ((price - avgPrice) / avgPrice) * 100
      if (difference > 10) return { status: "High", color: "text-red-600", bg: "bg-red-50" }
      if (difference < -10) return { status: "Low", color: "text-green-600", bg: "bg-green-50" }
      return { status: "Average", color: "text-yellow-600", bg: "bg-yellow-50" }
    }

    return (
      <div className="space-y-6">
        {/* Header with Action Button */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800 flex items-center">
                <FiBarChart2 className="w-6 h-6 mr-2 text-blue-600" />📊 Price Comparison Dashboard
              </h1>
              <p className="text-gray-600 mt-1">Compare commodity prices across different markets and locations</p>
            </div>
            <button
              onClick={() => setShowComparisonForm(!showComparisonForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
            >
              <FiBarChart2 className="w-5 h-5" />
              <span>{showComparisonForm ? "Hide Form" : "New Comparison"}</span>
            </button>
          </div>

          {/* New Comparison Form - Redesigned */}
          {showComparisonForm && (
            <div className="mt-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">📊 Create Price Comparison</h3>
                  <p className="text-sm text-gray-600">
                    Select a commodity and multiple locations to compare prices across different markets.
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Selected Locations</div>
                  <div className="text-2xl font-bold text-blue-600">{selectedLocations.length}</div>
                </div>
              </div>

              {/* Step 1: Basic Information */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">
                    1
                  </span>
                  Basic Information
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">🌾 Commodity *</label>
                    <select
                      value={formData.commodity}
                      onChange={(e) => handleFormFieldChange("commodity", e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    >
                      <option value="">Select Commodity</option>
                      {commodityOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">📅 Month *</label>
                    <select
                      value={formData.month}
                      onChange={(e) => handleFormFieldChange("month", e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    >
                      <option value="">Select Month</option>
                      {monthOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">📦 Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleFormFieldChange("category", e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    >
                      <option value="">Select Category</option>
                      {categoryOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">⚖️ Unit</label>
                    <select
                      value={formData.unit}
                      onChange={(e) => handleFormFieldChange("unit", e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    >
                      {unitOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">💰 Price Type</label>
                    <select
                      value={formData.pricetype}
                      onChange={(e) => handleFormFieldChange("pricetype", e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    >
                      <option value="Retail">Retail</option>
                      <option value="Wholesale">Wholesale</option>
                      <option value="Farm Gate">Farm Gate</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">📅 Year</label>
                    <input
                      type="number"
                      value={formData.year}
                      onChange={(e) => handleFormFieldChange("year", Number.parseInt(e.target.value))}
                      min="2020"
                      max="2030"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">💱 Currency</label>
                    <select
                      value={formData.currency}
                      onChange={(e) => handleFormFieldChange("currency", e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    >
                      <option value="RWF">RWF (Rwandan Franc)</option>
                      <option value="USD">USD (US Dollar)</option>
                      <option value="EUR">EUR (Euro)</option>
                      <option value="GBP">GBP (British Pound)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 2: Location Selection */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">
                    2
                  </span>
                  Select Locations (Choose 2-6 locations)
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {availableLocations.map((location) => (
                    <div
                      key={location.id}
                      onClick={() => toggleLocation(location)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        isLocationSelected(location)
                          ? "border-blue-500 bg-blue-50 shadow-md"
                          : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-25"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-800">{location.market}</div>
                          <div className="text-sm text-gray-600">
                            {location.district}, {location.province}
                          </div>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            isLocationSelected(location) ? "border-blue-500 bg-blue-500" : "border-gray-300"
                          }`}
                        >
                          {isLocationSelected(location) && <FiCheckCircle className="w-3 h-3 text-white" />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Selected:</strong> {selectedLocations.length} locations
                    {selectedLocations.length > 0 && (
                      <span className="ml-2">({selectedLocations.map((loc) => loc.market).join(", ")})</span>
                    )}
                  </p>
                </div>
              </div>

              {/* Error Display */}
              {priceComparison.error && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-600 text-sm flex items-center">
                    <FiAlertCircle className="w-4 h-4 mr-2" />
                    {priceComparison.error}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 justify-between items-center pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  {!formData.commodity && "⚠️ Please select a commodity"}
                  {formData.commodity && selectedLocations.length < 2 && "⚠️ Please select at least 2 locations"}
                  {formData.commodity && selectedLocations.length >= 2 && "✅ Ready to compare prices"}
                  {formData.monthNumber && (
                    <div className="mt-2 text-xs text-blue-600">
                      📅 Month Number: {formData.monthNumber}
                    </div>
                  )}
                  {formData.commodity && selectedLocations.length >= 2 && (
                    <div className="mt-2 text-xs text-blue-600">
                      ✅ Ready to compare prices across {selectedLocations.length} locations
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={resetForm}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleSubmitComparison}
                    disabled={priceComparison.loading || !formData.commodity || selectedLocations.length < 2}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {priceComparison.loading ? (
                      <>
                        <FiRefreshCw className="w-4 h-4 animate-spin" />
                        <span>Comparing...</span>
                      </>
                    ) : (
                      <>
                        <FiBarChart2 className="w-4 h-4" />
                        <span>Compare Prices</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Loading and Error States */}
        {priceComparison.loading && (
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <LoadingSpinner />
          </div>
        )}

        {priceComparison.error && !showComparisonForm && (
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="text-center py-12">
              <FiAlertCircle className="w-16 h-16 mx-auto mb-4 text-red-400" />
              <p className="text-red-600 text-lg mb-4">{priceComparison.error}</p>
              <button
                onClick={() => setShowComparisonForm(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Price Comparison Results */}
        {comparisonChartData && comparisonChartData.length > 0 && (
          <div className="space-y-6">
            {/* Export Button */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <FiDownload className="text-blue-600" /> Export Price Comparison Report
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">Generate a comprehensive PDF report of your price comparison analysis</p>
                </div>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
                  onClick={() => generatePriceComparisonReportPDF(priceComparison, user, 'price_comparison_report.pdf')}
                >
                  <FiDownload className="w-5 h-5" />
                  <span>Export PDF</span>
                </button>
              </div>
            </div>

            {/* Summary Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-blue-200 rounded-lg">
                    <FiMapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-blue-700">Locations</h3>
                    <p className="text-lg font-bold text-blue-800">{comparisonChartData.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-green-200 rounded-lg">
                    <FiTrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-green-700">Highest Price</h3>
                    <p className="text-lg font-bold text-green-800">
                      {Math.max(...comparisonChartData.map((d) => d.price)).toLocaleString()} RWF
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl border border-yellow-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-yellow-200 rounded-lg">
                    <FiTarget className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-yellow-700">Average Price</h3>
                    <p className="text-lg font-bold text-yellow-800">{avgPrice.toLocaleString()} RWF</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl border border-red-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-red-200 rounded-lg">
                    <FiTrendingDown className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-red-700">Lowest Price</h3>
                    <p className="text-lg font-bold text-red-800">
                      {Math.min(...comparisonChartData.map((d) => d.price)).toLocaleString()} RWF
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Comparison Chart */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center space-x-2 mb-6">
                <FiBarChart2 className="w-5 h-5 text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-800">📊 Price Comparison Chart</h3>
              </div>

              <div className="mb-8">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={comparisonChartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="location" angle={-45} textAnchor="end" height={80} interval={0} />
                    <YAxis label={{ value: "Price (RWF)", angle: -90, position: "insideLeft" }} />
                    <Tooltip
                      formatter={(value) => [`${value.toLocaleString()} RWF`, "Price"]}
                      labelFormatter={(label) => `Location: ${label}`}
                    />
                    <Bar dataKey="price" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="p-6 border-b bg-gray-50">
                <div className="flex items-center space-x-2">
                  <FiTarget className="w-5 h-5 text-green-600" />
                  <h3 className="text-xl font-semibold text-gray-800">📋 Detailed Comparison</h3>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left p-4 font-semibold text-gray-700">Location</th>
                      <th className="text-left p-4 font-semibold text-gray-700">Market</th>
                      <th className="text-left p-4 font-semibold text-gray-700">Price (RWF)</th>
                      <th className="text-left p-4 font-semibold text-gray-700">Status</th>
                      <th className="text-left p-4 font-semibold text-gray-700">Difference from Avg</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonChartData.map((item, index) => {
                      const priceStatus = getPriceStatus(item.price)
                      const difference = avgPrice > 0 ? ((item.price - avgPrice) / avgPrice) * 100 : 0

                      return (
                        <tr key={index} className="border-b hover:bg-gray-50 transition-colors duration-150">
                          <td className="p-4 font-medium text-gray-800">
                            {item.district}, {item.province}
                          </td>
                          <td className="p-4 text-gray-600">{item.market}</td>
                          <td className="p-4">
                            <span className="text-lg font-bold text-blue-600">{item.price.toLocaleString()} RWF</span>
                          </td>
                          <td className="p-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${priceStatus.bg} ${priceStatus.color}`}
                            >
                              {priceStatus.status}
                            </span>
                          </td>
                          <td className="p-4">
                            <span
                              className={`font-medium ${difference > 0 ? "text-red-600" : difference < 0 ? "text-green-600" : "text-gray-600"}`}
                            >
                              {difference > 0 ? "+" : ""}
                              {difference.toFixed(1)}%
                            </span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Insights from Comparison */}
            {priceComparison.insights && Object.keys(priceComparison.insights).length > 0 && (
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-200 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <FiZap className="w-6 h-6 text-purple-600" />
                  <h3 className="text-xl font-semibold text-purple-800">🧠 Comparison Insights</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(priceComparison.insights).map(([key, value], index) => (
                    <div key={index} className="bg-white p-4 rounded-lg border border-purple-200">
                      <h4 className="font-medium text-purple-700 mb-2 capitalize">{key.replace(/_/g, " ")}</h4>
                      <div className="text-sm text-purple-600">
                        {value === null || value === undefined ? (
                          "No data available"
                        ) : typeof value === "object" ? (
                          <div className="space-y-1">
                            {Object.entries(value).map(([subKey, subValue]) => (
                              <div key={subKey}>
                                <strong>{subKey.replace(/_/g, " ").toUpperCase()}:</strong> {String(subValue)}
                              </div>
                            ))}
                          </div>
                        ) : (
                          String(value)
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Comparison Reports */}
            {priceComparison.comparison_reports && priceComparison.comparison_reports.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <FiActivity className="w-5 h-5 text-orange-600" />
                  <h3 className="text-xl font-semibold text-gray-800">📈 Market Analysis Reports</h3>
                </div>

                <div className="space-y-4">
                  {priceComparison.comparison_reports.map((report, index) => (
                    <div key={index} className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <h4 className="font-medium text-orange-800 mb-2">{report.title || `Report ${index + 1}`}</h4>
                      <p className="text-sm text-orange-700">{report.description || report.content}</p>
                      {report.recommendation && (
                        <div className="mt-2 p-2 bg-orange-100 rounded border border-orange-300">
                          <p className="text-xs font-medium text-orange-800">Recommendation: {report.recommendation}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!priceComparison.loading &&
          !priceComparison.error &&
          (!comparisonChartData || comparisonChartData.length === 0) &&
          !showComparisonForm && (
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="text-center py-12">
                <FiBarChart2 className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Price Comparisons Yet</h3>
                <p className="text-gray-500 mb-6">
                  Create your first price comparison to analyze market differences across locations.
                </p>
                <button
                  onClick={() => setShowComparisonForm(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2 mx-auto"
                >
                  <FiPlus className="w-5 h-5" />
                  <span>Create First Comparison</span>
                </button>
              </div>
            </div>
          )}
      </div>
    )
  }

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
      description: "Smart recommendations and actionable insights",
    },
    {
      id: "price-comparison",
      label: "Price Comparison",
      icon: FiTarget,
      description: "Compare prices across different markets and locations",
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
                {/* Smart Insights for Price Trends Tab */}
                {(() => {
                  const trendInsights = generateSmartInsights(predictions, trend_analysis, form.commodity)
                  return (
                    trendInsights.length > 0 && (
                      <div className="bg-white rounded-xl shadow-sm border p-6">
                        <div className="flex items-center space-x-2 mb-6">
                          <FiZap className="w-5 h-5 text-yellow-600" />
                          <h3 className="text-xl font-semibold text-gray-800">🎯 Smart Recommendations</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {trendInsights.slice(0, 2).map((insight, index) => (
                            <div key={index} className={getInsightColorClasses(insight.color, insight.urgency)}>
                              <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0">
                                  <span className="text-2xl">{insight.icon}</span>
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-2">
                                    <h5 className="font-semibold text-sm">{insight.title}</h5>
                                    <span
                                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        insight.urgency === "high"
                                          ? "bg-red-100 text-red-700"
                                          : insight.urgency === "medium"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-gray-100 text-gray-700"
                                      }`}
                                    >
                                      {insight.urgency.toUpperCase()}
                                    </span>
                                  </div>
                                  <p className="text-sm mb-3 leading-relaxed">{insight.message}</p>
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-medium opacity-75">Action:</span>
                                    <span className="text-sm font-semibold">{insight.action}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  )
                })()}

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
        {activeTab === "price-comparison" && <PriceComparisonContent />}
      </div>
    </div>
  )
}

export default CommodityTrendPage
