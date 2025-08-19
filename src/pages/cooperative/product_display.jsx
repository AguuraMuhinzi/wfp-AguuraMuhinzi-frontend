"use client"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { listProducts } from "../../Redux/Slices/product/product"
import { fetchCooperativeDetails } from "../../Redux/Slices/cooperative/coop_details"
import { useNavigate } from "react-router-dom";
import {
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  MoreHorizontal,
  MapPin,
  Calendar,
  Users,
  Sprout,
  Sun,
  Droplets,
  Camera,
  Search,
  Filter,
  FaBackward,
  X,
  Star,
  TrendingUp,
  Phone,
  Mail,
  Globe,
  ExternalLink,
  CheckCircle,
  Building2,
  Leaf,
  Trophy,
  Package,
  Eye,
  Award,
  TrendingDown,
  BarChart3,
  Clock,
  HomeIcon,
} from "lucide-react"

const BASE_URL = process.env.REACT_APP_API_BASE_URL

// Enhanced Cooperative Profile Modal - Expanded version for cooperatives
const CooperativeProfileModal = ({ cooperative, onClose, products = [] }) => {

  if (!cooperative) return null




  const coopProducts = products.filter((p) => p.user === cooperative.id)
  const totalProducts = coopProducts.length
  const avgPrice =
    coopProducts.length > 0 ? Math.round(coopProducts.reduce((sum, p) => sum + p.price, 0) / coopProducts.length) : 0

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
        {/* Header with gradient background */}
        <div className="relative bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 p-8 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/30">
              <Building2 className="w-12 h-12 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">{cooperative.name}</h2>
              <div className="flex items-center gap-4 text-green-100">
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-5 h-5" />
                  <span>Verified Cooperative</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>
                    {cooperative.province}, {cooperative.district}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced stats grid for cooperatives */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/30">
              <Package className="w-6 h-6 mx-auto mb-2 text-green-100" />
              <p className="text-2xl font-bold">{totalProducts}</p>
              <p className="text-sm text-green-100">Products</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/30">
              <BarChart3 className="w-6 h-6 mx-auto mb-2 text-blue-200" />
              <p className="text-2xl font-bold">{avgPrice}</p>
              <p className="text-sm text-green-100">Avg Price</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/30">
              <Trophy className="w-6 h-6 mx-auto mb-2 text-yellow-200" />
              <p className="text-2xl font-bold">4.8</p>
              <p className="text-sm text-green-100">Rating</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/30">
              <Clock className="w-6 h-6 mx-auto mb-2 text-orange-200" />
              <p className="text-2xl font-bold">{Math.floor(Math.random() * 10) + 5}</p>
              <p className="text-sm text-green-100">Years</p>
            </div>
          </div>
        </div>

        {/* Enhanced Content */}
        <div className="p-8 max-h-[60vh] overflow-y-auto">
          {/* About Section */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-green-600" />
              About This Cooperative
            </h3>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
              <p className="text-gray-700 leading-relaxed mb-4">
                {cooperative.specialization ||
                  "This cooperative is dedicated to sustainable agriculture and providing high-quality produce. They focus on organic farming practices and community development."}
              </p>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Sprout className="w-4 h-4 text-green-600" />
                  <span className="text-gray-600">Organic Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-600">Quality Assured</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-600" />
                  <span className="text-gray-600">Community Focused</span>
                </div>
              </div>
            </div>
          </div>

          {/* Market Performance for cooperatives */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Market Performance
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <div className="flex items-center gap-3 mb-2">
                  <Eye className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-900">Product Views</span>
                </div>
                <p className="text-2xl font-bold text-blue-600">{Math.floor(Math.random() * 500) + 200}</p>
                <p className="text-sm text-gray-600">This month</p>
              </div>
              <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-gray-900">Market Interest</span>
                </div>
                <p className="text-2xl font-bold text-green-600">+{Math.floor(Math.random() * 30) + 10}%</p>
                <p className="text-sm text-gray-600">Growth rate</p>
              </div>
              <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                <div className="flex items-center gap-3 mb-2">
                  <Star className="w-5 h-5 text-orange-600" />
                  <span className="font-medium text-gray-900">Engagement</span>
                </div>
                <p className="text-2xl font-bold text-orange-600">{Math.floor(Math.random() * 100) + 50}</p>
                <p className="text-sm text-gray-600">Interactions</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5 text-blue-600" />
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-900">Phone</span>
                </div>
                <p className="text-gray-700">{cooperative.contact || "+250 788 123 456"}</p>
              </div>
              <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-gray-900">Email</span>
                </div>
                <p className="text-gray-700">{cooperative.name.toLowerCase().replace(/\s+/g, "")}@coop.rw</p>
              </div>
            </div>
          </div>

          {/* Featured Products Grid */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-orange-600" />
              Featured Products ({coopProducts.length})
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {coopProducts.slice(0, 6).map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-200 hover:scale-105"
                >
                  <img
                    src={`${BASE_URL}${product.image}`}
                    alt={product.product_name}
                    className="w-full h-20 object-cover"
                  />
                  <div className="p-3">
                    <p className="font-medium text-sm text-gray-900 truncate">{product.product_name}</p>
                    <p className="text-green-600 font-bold text-sm">{product.price} RWF</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Footer Actions for cooperatives */}
        <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
          <div className="flex gap-4">
            <button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Connect & Collaborate
            </button>
            <button className="flex-1 border-2 border-green-600 text-green-600 py-3 px-6 rounded-xl font-medium hover:bg-green-50 transition-colors flex items-center justify-center gap-2">
              <ExternalLink className="w-4 h-4" />
              View All Products
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Farm Stories component (same as original)
const FarmStories = ({ cooperatives, onStoryClick }) => {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 mb-8 scrollbar-hide">
      <div className="flex-shrink-0 text-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center mb-2 cursor-pointer hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl">
          <Camera className="w-6 h-6 text-white" />
        </div>
        <span className="text-xs text-gray-600 font-medium">Discover</span>
      </div>
      {cooperatives.slice(0, 8).map((coop, index) => (
        <div key={index} className="flex-shrink-0 text-center cursor-pointer group" onClick={() => onStoryClick(coop)}>
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600 p-0.5 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:shadow-green-500/25">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center group-hover:bg-green-50 transition-colors duration-200">
              <Building2 className="w-6 h-6 text-green-600 group-hover:scale-110 transition-transform duration-200" />
            </div>
          </div>
          <span className="text-xs text-gray-600 mt-1 block truncate w-16 font-medium group-hover:text-green-600 transition-colors duration-200">
            {coop.name || `Farm ${index + 1}`}
          </span>
        </div>
      ))}
    </div>
  )
}

// Simplified FarmPost without cart functionality
const FarmPost = ({
  product,
  cooperativeName,
  cooperativeId,
  BASE_URL,
  onViewMore,
  onLike,
  onCooperativeClick,
  isLiked = false,
}) => {
  const [likes, setLikes] = useState(Math.floor(Math.random() * 50) + 10)
  const [comments, setComments] = useState(Math.floor(Math.random() * 20) + 3)
  const [views, setViews] = useState(Math.floor(Math.random() * 100) + 25)
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [localLiked, setLocalLiked] = useState(isLiked)

  const handleLike = () => {
    setLocalLiked(!localLiked)
    setLikes((prev) => (localLiked ? prev - 1 : prev + 1))
    onLike && onLike(product.id)
  }

  const handleView = () => {
    setViews((prev) => prev + 1)
    onViewMore(product)
  }

  const timeAgo = () => {
    const harvestDate = new Date(product.harvest_date)
    const now = new Date()
    const diffInHours = Math.floor((now - harvestDate) / (1000 * 60 * 60))

    if (diffInHours < 24) return `${diffInHours}h`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d`
    return `${Math.floor(diffInHours / 168)}w`
  }

  const description =
    product.description ||
    "Fresh from our farm! 🌱 Grown with sustainable practices and lots of care. Perfect quality for the market."

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6 w-full break-inside-avoid hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200">
      {/* Post Header */}
      <div className="flex items-center justify-between p-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-200">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <button
              onClick={() => onCooperativeClick(cooperativeId)}
              className="font-semibold text-gray-900 text-base hover:text-green-600 transition-colors duration-200 cursor-pointer hover:underline"
            >
              {cooperativeName || "Farm Community"}
            </button>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {product.location || "Rwanda"}
            </p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
          <MoreHorizontal className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Post Image - Enhanced with overlay effects */}
      <div className="relative aspect-square group">
        <img
          src={`${BASE_URL}${product.image}`}
          alt={product.product_name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium border border-white/20">
          {product.category}
        </div>
        <div className="absolute bottom-4 left-4 bg-emerald-600/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium border border-white/20">
          🌾 Fresh Harvest
        </div>
        <div className="absolute top-4 left-4 bg-blue-600/90 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium border border-white/20 flex items-center gap-1">
          <Eye className="w-3 h-3" />
          {views}
        </div>
      </div>

      {/* Enhanced Post Actions for cooperatives */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className={`p-2 rounded-full transition-all duration-200 ${localLiked ? "text-red-500 bg-red-50" : "text-gray-700 hover:bg-gray-100"}`}
            >
              <Heart className={`w-7 h-7 ${localLiked ? "fill-current" : ""}`} />
            </button>
            <button
              onClick={handleView}
              className="p-2 rounded-full text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-all duration-200 hover:scale-110"
              title="View Details"
            >
              <Eye className="w-7 h-7" />
            </button>
            <button className="p-2 rounded-full text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-all duration-200">
              <Share2 className="w-7 h-7" />
            </button>
          </div>
          <button className="p-2 rounded-full text-gray-700 hover:bg-yellow-100 hover:text-yellow-600 transition-all duration-200">
            <Bookmark className="w-7 h-7" />
          </button>
        </div>

        {/* Enhanced stats for cooperatives */}
        <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
          <span className="font-medium">{likes} likes</span>
          <span>{comments} comments</span>
          <span>{views} views</span>
        </div>

        {/* Post Content */}
        <div className="mb-3">
          <p className="text-base">
            <button
              onClick={() => onCooperativeClick(cooperativeId)}
              className="font-semibold mr-2 hover:text-green-600 transition-colors duration-200 cursor-pointer"
            >
              {cooperativeName || "farm_community"}
            </button>
            <span className="font-bold text-green-700 text-xl">{product.product_name}</span>
            <span className="ml-2 text-green-600 font-semibold text-lg bg-green-50 px-2 py-1 rounded-lg">
              {product.price} RWF
            </span>
          </p>
          <p className="text-base text-gray-700 mt-2">
            {showFullDescription ? description : `${description.slice(0, 100)}${description.length > 100 ? "..." : ""}`}
            {description.length > 100 && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-gray-500 ml-1 font-medium hover:text-green-600 transition-colors duration-200"
              >
                {showFullDescription ? "less" : "more"}
              </button>
            )}
          </p>
        </div>

        {/* Enhanced Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-blue-600 text-sm bg-blue-50 px-2 py-1 rounded-full hover:bg-blue-100 transition-colors duration-200">
            #freshfarm
          </span>
          <span className="text-green-600 text-sm bg-green-50 px-2 py-1 rounded-full hover:bg-green-100 transition-colors duration-200">
            #{product.category.toLowerCase()}
          </span>
          <span className="text-purple-600 text-sm bg-purple-50 px-2 py-1 rounded-full hover:bg-purple-100 transition-colors duration-200">
            #organicfood
          </span>
          <span className="text-orange-600 text-sm bg-orange-50 px-2 py-1 rounded-full hover:bg-orange-100 transition-colors duration-200">
            #rwanda
          </span>
        </div>

        {/* Harvest Date */}
        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
          <span>{timeAgo()} ago</span>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Harvested {new Date(product.harvest_date).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Enhanced Action Button for cooperatives */}
        <button
          onClick={handleView}
          className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl hover:shadow-green-500/25 flex items-center justify-center gap-2"
        >
          <Eye className="w-5 h-5" />
          View Product Details 🌱
        </button>
      </div>
    </div>
  )
}

// Enhanced Trending section for cooperatives
const TrendingSection = ({ products, onViewMore }) => {
  const trendingProducts = products.slice(0, 6)

  return (
    <div className="bg-gradient-to-br from-white to-orange-50 rounded-2xl shadow-lg p-6 mb-8 w-full border border-orange-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <h3 className="font-bold text-xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          🔥 Market Trending Products
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trendingProducts.map((product, index) => (
          <div
            key={product.id}
            className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/80 cursor-pointer transition-all duration-200 border border-transparent hover:border-orange-200 hover:shadow-md group"
            onClick={() => onViewMore(product)}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <span className="text-xl font-bold text-orange-500 group-hover:scale-110 transition-transform duration-200">
                  #{index + 1}
                </span>
                {index < 3 && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                )}
              </div>
              <img
                src={`${BASE_URL}${product.image}`}
                alt={product.product_name}
                className="w-16 h-16 rounded-xl object-cover group-hover:scale-105 transition-transform duration-200 shadow-md"
              />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-base group-hover:text-green-600 transition-colors duration-200">
                {product.product_name}
              </p>
              <div className="flex items-center justify-between mt-1">
                <p className="font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-lg">{product.price} RWF</p>
                <div className="flex items-center text-sm text-gray-500 gap-2">
                  <Star className="w-4 h-4 fill-current text-yellow-400" />
                  <span>4.{Math.floor(Math.random() * 9) + 1}</span>
                  <Eye className="w-4 h-4 text-blue-400" />
                  <span>{Math.floor(Math.random() * 100) + 50}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Enhanced Weather widget component
const WeatherWidget = () => {
  return (
    <div className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-2xl p-6 text-white mb-6 w-full shadow-lg hover:shadow-xl transition-shadow duration-300 border border-blue-300">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-lg">Today's Agricultural Weather</h3>
          <p className="text-blue-100 text-sm">Optimal conditions for farming!</p>
        </div>
        <div className="relative">
          <Sun className="w-8 h-8 text-yellow-300 animate-pulse" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold">24°C</p>
          <p className="text-blue-100 text-sm">Sunny & Clear</p>
        </div>
        <div className="text-right text-sm space-y-2">
          <div className="flex items-center justify-end gap-2 bg-white/20 rounded-lg px-3 py-1">
            <Droplets className="w-4 h-4" />
            <span>65% Humidity</span>
          </div>
          <p className="text-blue-100">Perfect for field activities</p>
        </div>
      </div>
    </div>
  )
}

// Simplified Modal Component without order functionality
const Modal = ({ product, cooperative, onClose }) => {


  if (!product || !cooperative) return null




  const handleContact = () => {
    // The phone number should be in contact_phone field from User model
  const phoneNumber = cooperative?.contact_phone || cooperative?.user?.contact_phone
    
  if (!phoneNumber) {
    console.log("Cooperative object:", cooperative)
    console.log("Available fields:", Object.keys(cooperative || {}))
    alert("Contact phone number not available for this cooperative.")
    return
  }
    
    // Clean and format the phone number
  const cleanNumber = phoneNumber.toString().replace(/[\s\-\(\)]/g, '')
    
    // Format for Rwanda numbers
  let formattedNumber = cleanNumber
  if (cleanNumber.startsWith('0')) {
      // Replace leading 0 with Rwanda country code
    formattedNumber = '250' + cleanNumber.substring(1)
  } else if (!cleanNumber.startsWith('250') && !cleanNumber.startsWith('+250')) {
      // Add Rwanda country code if missing
    formattedNumber = '250' + cleanNumber
  }
    
    // Remove + if present for WhatsApp URL
  formattedNumber = formattedNumber.replace('+', '')
    
  const whatsappUrl = `https://wa.me/${formattedNumber}`
  window.open(whatsappUrl, "_blank")
}

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
        <div className="flex flex-col lg:flex-row h-full max-h-[95vh]">
          {/* Left Side - Image */}
          <div className="lg:w-1/2 relative">
            <img
              src={`${BASE_URL}${product.image}`}
              alt={product.product_name}
              className="w-full h-64 lg:h-full object-cover"
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm border border-white/20">
              🌾 {product.category}
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="lg:w-1/2 flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow-md">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-900">{cooperative.name}</h3>
                  <p className="text-green-600 flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    <span>Verified Cooperative</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>
                    {cooperative.province}, {cooperative.district}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current text-yellow-400" />
                  <span>4.{Math.floor(Math.random() * 9) + 1} rating</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4 text-blue-500" />
                  <span>{Math.floor(Math.random() * 200) + 100} views</span>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Product Details */}
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{product.product_name}</h2>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl font-bold text-green-600 bg-green-50 px-3 py-1 rounded-xl">
                    {product.price} RWF
                  </span>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Harvested {new Date(product.harvest_date).toLocaleDateString()}</span>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {product.description ||
                    "Fresh from the farm, grown with sustainable practices and lots of care! This premium quality produce is harvested at the perfect time to ensure maximum flavor and nutritional value. 🌱"}
                </p>

                {/* Enhanced Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full border border-green-200">
                    #organic
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full border border-blue-200">
                    #freshfarm
                  </span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full border border-orange-200">
                    #sustainable
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full border border-purple-200">
                    #localgrown
                  </span>
                </div>
              </div>

              {/* Market Insights for Cooperatives */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 mb-6 border border-blue-100">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-blue-600" />
                  Market Insights
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-700">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span>High demand product</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Award className="w-4 h-4 text-orange-600" />
                    <span>Premium quality</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Eye className="w-4 h-4 text-blue-600" />
                    <span>{Math.floor(Math.random() * 300) + 100} monthly views</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span>{Math.floor(Math.random() * 50) + 20} interested buyers</span>
                  </div>
                </div>
              </div>

              {/* Farm Specialization */}
              <div className="bg-gradient-to-r from-gray-50 to-green-50 rounded-2xl p-4 mb-6 border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-green-600" />
                  Cooperative Specialization
                </h4>
                <p className="text-gray-700 text-sm">{cooperative.specialization || "Sustainable agriculture and organic farming practices"}</p>
              </div>

              {/* Enhanced Stats for Cooperatives */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
                  <Package className="w-6 h-6 mx-auto mb-1 text-green-600" />
                  <p className="text-2xl font-bold text-green-600">{Math.floor(Math.random() * 50) + 20}</p>
                  <p className="text-xs text-gray-600">Similar Products</p>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-sky-50 rounded-xl border border-blue-100">
                  <Users className="w-6 h-6 mx-auto mb-1 text-blue-600" />
                  <p className="text-2xl font-bold text-blue-600">{Math.floor(Math.random() * 100) + 50}</p>
                  <p className="text-xs text-gray-600">Network Reach</p>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl border border-orange-100">
                  <Trophy className="w-6 h-6 mx-auto mb-1 text-orange-600" />
                  <p className="text-2xl font-bold text-orange-600">{Math.floor(Math.random() * 10) + 5}</p>
                  <p className="text-xs text-gray-600">Years Active</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 mb-6 border border-green-100">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-green-600" />
                  Contact Information
                </h4>
                <div className="space-y-2 text-sm">
                  {cooperative.contact && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <Phone className="w-4 h-4 text-green-600" />
                      <span>{cooperative.contact}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-gray-700">
                    <Mail className="w-4 h-4 text-green-600" />
                    <span>{cooperative.name.toLowerCase().replace(/\s+/g, "")}@farm.rw</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Globe className="w-4 h-4 text-green-600" />
                    <span>Visit cooperative profile</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions for Cooperatives */}
            <div className="p-6 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-green-50">
              <div className="flex gap-3">
                <button
                onClick={handleContact}

                className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Connect with Cooperative
                </button>
                {/* <button

                 className="px-6 py-3 border-2 border-green-600 text-green-600 rounded-xl font-medium hover:bg-green-50 transition-colors flex items-center justify-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  View Profile
                </button> */}
              </div>
              <p className="text-xs text-gray-500 text-center mt-3">
                🤝 Building cooperative networks and sustainable agriculture
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ProductDisplayCooperatives = () => {
  
  const dispatch = useDispatch()
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedCooperative, setSelectedCooperative] = useState(null)
  const [cooperativeNames, setCooperativeNames] = useState({})
  const [searchTerm, setSearchTerm] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const [showCooperativeModal, setShowCooperativeModal] = useState(false)
  const [selectedCooperativeProfile, setSelectedCooperativeProfile] = useState(null)

  const products = useSelector((state) => state.product.products)
  const loading = useSelector((state) => state.product.loading)
  const error = useSelector((state) => state.product.error)

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  useEffect(() => {
    const fetchCoopNames = async () => {
      const names = {}
      for (const product of products) {
        if (product.user && !names[product.user]) {
          try {
            const response = await dispatch(fetchCooperativeDetails(product.user)).unwrap()
            names[product.user] = response.name || "Farm Community"
          } catch (error) {
            console.error(`Failed to fetch cooperative name:`, error)
          }
        }
      }
      setCooperativeNames(names)
    }

    if (products.length > 0) {
      fetchCoopNames()
    }
  }, [dispatch, products])

  const handleViewProduct = async (product) => {
    try {
      const cooperativeData = await dispatch(fetchCooperativeDetails(product.user)).unwrap()
      setSelectedProduct(product)
      setSelectedCooperative(cooperativeData)
    } catch (error) {
      console.error("Failed to fetch cooperative details:", error)
    }
  }

  const handleCooperativeClick = async (cooperativeId) => {
    try {
      const cooperativeData = await dispatch(fetchCooperativeDetails(cooperativeId)).unwrap()
      setSelectedCooperativeProfile(cooperativeData)
      setShowCooperativeModal(true)
    } catch (error) {
      console.error("Failed to fetch cooperative details:", error)
    }
  }

  const navigate = useNavigate();
  
  const handleBackToDashboard = () => {
    // Try to get user info from localStorage
    const userInfoString = localStorage.getItem("userInfo");
    let userRole = null;
    
    if (userInfoString) {
      try {
        // Parse the JSON string to get the user object
        const userInfo = JSON.parse(userInfoString);
        userRole = userInfo.role;
      } catch (error) {
        console.error("Error parsing user info:", error);
      }
    }
    
    // If parsing failed or userInfo not found, try direct role access
    if (!userRole) {
      userRole = localStorage.getItem("role");
    }
  
    // Navigate based on role
    if (userRole === 'academy') {
      navigate('/aca_dashboard');
    } else if (userRole === 'cooperative') {
      navigate('/dashboard');
    } else if (userRole === 'admin') {
      navigate('/admin-dashboard');
    } else {
      // Default fallback if role is not set or recognized
      navigate("/dashboard");
    }
  };
  

  // const handleViewProfileFromModal = (cooperative) => {
  //   setSelectedCooperativeProfile(cooperative)
  //   setShowCooperativeModal(true)
  // }



  const handleCloseCooperativeModal = () => {
    setShowCooperativeModal(false)
    setSelectedCooperativeProfile(null)
  }



  const handleCloseModal = () => {
    
    setSelectedProduct(null)
    setSelectedCooperative(null)
  }

  const filteredProducts = products.filter(
    (product) => !searchTerm || product.product_name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const uniqueCooperatives = Array.from(
    new Map(products.map((p) => [p.user, { name: cooperativeNames[p.user], id: p.user }])).values(),
  )

  if (loading === "loading") {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading agricultural marketplace...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-gradient-to-br from-red-50 to-pink-50 min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-red-100">
          <p className="text-red-600 mb-4 text-lg">Oops! Couldn't load the cooperative marketplace.</p>
          <button
            onClick={() => dispatch(listProducts())}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Enhanced Header for Cooperatives */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 z-30">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            🌾 Cooperative Marketplace
          </h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 hover:bg-green-100 rounded-full transition-all duration-200 hover:scale-110"
            >
              <Search className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-green-100 rounded-full transition-all duration-200 hover:scale-110">
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
              <button 
  onClick={handleBackToDashboard}
  className="flex items-center gap-2 px-3 py-2 hover:bg-green-100 rounded-lg transition-all duration-200 text-gray-600 hover:text-green-600"
  title="Back to Dashboard"
>
  <HomeIcon className="w-4 h-4" />
  <span className="font-medium">Back to Dashboard</span>
</button>
          </div>
        </div>
        {showSearch && (
          <div className="max-w-md mx-auto px-4 pb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search cooperative products..."
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              autoFocus
            />
          </div>
        )}
      </div>

      {/* Enhanced Cooperative Profile Modal */}
      {showCooperativeModal && selectedCooperativeProfile && (
        <CooperativeProfileModal
          cooperative={selectedCooperativeProfile}
          products={products}
          onClose={() => {
            setShowCooperativeModal(false)
            setSelectedCooperativeProfile(null)
          }}
        />
      )}

      <main className="max-w-7xl mx-auto px-4 py-6">
        <FarmStories cooperatives={uniqueCooperatives} onStoryClick={(coop) => handleCooperativeClick(coop.id)} />
        <TrendingSection products={products} onViewMore={handleViewProduct} />
        <WeatherWidget />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <FarmPost
              key={product.id}
              product={product}
              cooperativeName={cooperativeNames[product.user]}
              cooperativeId={product.user}
              BASE_URL={BASE_URL}
              onViewMore={handleViewProduct}
              onCooperativeClick={handleCooperativeClick}

            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <p className="text-gray-500 text-lg mb-2">No products found in the cooperative network.</p>
              <p className="text-gray-400">🌱 Connect with more cooperatives to expand the marketplace!</p>
            </div>
          </div>
        )}
      </main>

      {selectedProduct && selectedCooperative && (
        <Modal
          product={selectedProduct}
          cooperative={selectedCooperative}
          onClose={handleCloseModal}
          // onViewProfile={handleViewProfileFromModal}

        />
      )}
    </div>
  )
}

export default ProductDisplayCooperatives