"use client"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { listProducts } from "../../Redux/Slices/product/product"
import { fetchCooperativeDetails } from "../../Redux/Slices/cooperative/coop_details"
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
  TrendingUp,
  Phone,
  Mail,
  Globe,
  ExternalLink,
  CheckCircle,
  ShoppingCart,
  Building2,
  Leaf,
  Trophy,
  Package,
  X,
  Star,
  LogOut,
  HomeIcon,
} from "lucide-react"
import OrderModal from "../../pages/orders/createOrder"
import { EnhancedCartModal, CartIcon } from "../../pages/orders/cart"
import {
  addToCart,
  fetchCart,
  updateCartItem,
  removeFromCart,
  checkoutCart,
} from "../../Redux/Slices/order/cartSlice"
// import { HomeIcon } from "react-icons/fa"
import { useNavigate } from "react-router-dom";


const BASE_URL = process.env.REACT_APP_API_BASE_URL

// Simplified Cooperative Profile Modal - Small version
const CooperativeProfileModal = ({ cooperative, onClose, products = [] }) => {
  if (!cooperative) return null

  const coopProducts = products.filter((p) => p.user === cooperative.id)
  const totalProducts = coopProducts.length

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
        {/* Compact Header */}
        <div className="relative bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-1">{cooperative.name}</h2>
              <div className="flex items-center gap-1 text-green-100 text-sm">
                <CheckCircle className="w-4 h-4" />
                <span>Verified Cooperative</span>
              </div>
              <div className="flex items-center gap-1 text-green-100 text-sm mt-1">
                <MapPin className="w-3 h-3" />
                <span>
                  {cooperative.province}, {cooperative.district}
                </span>
              </div>
            </div>
          </div>
          {/* Compact stats */}
          <div className="flex justify-center gap-6 mt-4">
            <div className="text-center">
              <p className="text-lg font-bold">{totalProducts}</p>
              <p className="text-xs text-green-100">Products</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">4.8</p>
              <p className="text-xs text-green-100">Rating</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">{Math.floor(Math.random() * 10) + 5}</p>
              <p className="text-xs text-green-100">Years</p>
            </div>
          </div>
        </div>
        {/* Compact Footer Actions */}
        <div className="p-4 bg-gray-50">
          <div className="flex gap-3">
            <button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-2.5 px-4 rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2 text-sm">
              <MessageSquare className="w-4 h-4" />
              Contact
            </button>
            <button className="flex-1 border-2 border-green-600 text-green-600 py-2.5 px-4 rounded-xl font-medium hover:bg-green-50 transition-colors flex items-center justify-center gap-2 text-sm">
              <Package className="w-4 h-4" />
              View Products
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Enhanced Story-style highlights component
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
        <div
          key={index}
          className="flex-shrink-0 text-center cursor-pointer group"
          onClick={() => onStoryClick(coop)}
        >
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

const FarmPost = ({
  product,
  cooperativeName,
  cooperativeId,
  BASE_URL,
  onViewMore,
  onLike,
  onComment,
  onAddToCart,
  onCooperativeClick,
  isLiked = false,
}) => {
  const [likes, setLikes] = useState(Math.floor(Math.random() * 50) + 10)
  const [comments, setComments] = useState(Math.floor(Math.random() * 20) + 3)
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [localLiked, setLocalLiked] = useState(isLiked)

  const handleLike = () => {
    setLocalLiked(!localLiked)
    setLikes((prev) => (localLiked ? prev - 1 : prev + 1))
    onLike && onLike(product.id)
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
    "Fresh from our farm to your table! 🌱 Grown with love and care using sustainable farming practices."

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
      </div>

      {/* Post Actions */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className={`p-2 rounded-full transition-all duration-200 ${
                localLiked
                  ? "text-red-500 bg-red-50"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Heart className={`w-7 h-7 ${localLiked ? "fill-current" : ""}`} />
            </button>
            <button
              onClick={() => onAddToCart(product)}
              className="p-2 rounded-full text-gray-700 hover:bg-green-100 hover:text-green-600 transition-all duration-200 hover:scale-110"
              title="Add to Cart"
            >
              <ShoppingCart className="w-7 h-7" />
            </button>
            <button className="p-2 rounded-full text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-all duration-200">
              <Share2 className="w-7 h-7" />
            </button>
          </div>
          <button className="p-2 rounded-full text-gray-700 hover:bg-yellow-100 hover:text-yellow-600 transition-all duration-200">
            <Bookmark className="w-7 h-7" />
          </button>
        </div>

        {/* Likes and comments */}
        <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
          <span className="font-medium">{likes} likes</span>
          <span>{comments} comments</span>
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
            <span className="font-bold text-green-700 text-xl">
              {product.product_name}
            </span>
            <span className="ml-2 text-green-600 font-semibold text-lg bg-green-50 px-2 py-1 rounded-lg">
              {product.price} RWF
            </span>
          </p>
          <p className="text-base text-gray-700 mt-2">
            {showFullDescription
              ? description
              : `${description.slice(0, 100)}${
                  description.length > 100 ? "..." : ""
                }`}
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
            <span>
              Harvested {new Date(product.harvest_date).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Enhanced Action Button */}
        <button
          onClick={() => onViewMore(product)}
          className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl hover:shadow-green-500/25 flex items-center justify-center gap-2"
        >
          <Sprout className="w-5 h-5" />
          Connect with Farm 🌱
        </button>
      </div>
    </div>
  )
}

// Enhanced Trending section component
const TrendingSection = ({ products, onViewMore }) => {
  const trendingProducts = products.slice(0, 6)

  return (
    <div className="bg-gradient-to-br from-white to-orange-50 rounded-2xl shadow-lg p-6 mb-8 w-full border border-orange-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <h3 className="font-bold text-xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          🔥 Trending Harvests
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
                <p className="font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                  {product.price} RWF
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <Star className="w-4 h-4 fill-current text-yellow-400 mr-1" />
                  4.{Math.floor(Math.random() * 9) + 1}
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
          <h3 className="font-bold text-lg">Today's Farming Weather</h3>
          <p className="text-blue-100 text-sm">Perfect for harvesting!</p>
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
          <p className="text-blue-100">Great for outdoor work</p>
        </div>
      </div>
    </div>
  )
}

// Enhanced Modal Component
const Modal = ({ product, cooperative, onClose, onMakeOrder }) => {
  if (!product || !cooperative) return null

  // Debug version of handleContact function
// Updated handleContact function for User model contact_phone field
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
                  <h3 className="font-bold text-xl text-gray-900">
                    {cooperative.name}
                  </h3>
                  <p className="text-green-600 flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    <span>Verified Farm</span>
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
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Product Details */}
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.product_name}
                </h2>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl font-bold text-green-600 bg-green-50 px-3 py-1 rounded-xl">
                    {product.price} RWF
                  </span>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Harvested{" "}
                      {new Date(product.harvest_date).toLocaleDateString()}
                    </span>
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

              {/* Farm Specialization */}
              <div className="bg-gradient-to-r from-gray-50 to-green-50 rounded-2xl p-4 mb-6 border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-green-600" />
                  Farm Specialization
                </h4>
                <p className="text-gray-700 text-sm">
                  {cooperative.specialization}
                </p>
              </div>

              {/* Enhanced Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
                  <Package className="w-6 h-6 mx-auto mb-1 text-green-600" />
                  <p className="text-2xl font-bold text-green-600">
                    {Math.floor(Math.random() * 50) + 20}
                  </p>
                  <p className="text-xs text-gray-600">Products</p>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-sky-50 rounded-xl border border-blue-100">
                  <Users className="w-6 h-6 mx-auto mb-1 text-blue-600" />
                  <p className="text-2xl font-bold text-blue-600">
                    {Math.floor(Math.random() * 100) + 50}
                  </p>
                  <p className="text-xs text-gray-600">Happy Buyers</p>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl border border-orange-100">
                  <Trophy className="w-6 h-6 mx-auto mb-1 text-orange-600" />
                  <p className="text-2xl font-bold text-orange-600">
                    {Math.floor(Math.random() * 10) + 5}
                  </p>
                  <p className="text-xs text-gray-600">Years Experience</p>
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
                    <span>
                      {cooperative.name.toLowerCase().replace(/\s+/g, "")}
                      @farm.rw
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Globe className="w-4 h-4 text-green-600" />
                    <span>Visit our farm location</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-green-50">
              <div className="flex gap-3">
                <button
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  onClick={onMakeOrder}
                >
                  <MessageSquare className="w-5 h-5" />
                  Make an Order
                </button>
                <button
                  onClick={handleContact}
                  className="px-6 py-3 border-2 border-green-600 text-green-600 rounded-xl font-medium hover:bg-green-50 transition-colors flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Contact Cooperative
                </button>
              </div>
              <p className="text-xs text-gray-500 text-center mt-3">
                💚 Supporting local farmers and sustainable agriculture
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ProductListingPage = () => {
  const dispatch = useDispatch()
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedCooperative, setSelectedCooperative] = useState(null)
  const [cooperativeNames, setCooperativeNames] = useState({})
  const [searchTerm, setSearchTerm] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const [showOrderModal, setShowOrderModal] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const [showCooperativeModal, setShowCooperativeModal] = useState(false)
  const [selectedCooperativeProfile, setSelectedCooperativeProfile] = useState(null)

  const products = useSelector((state) => state.product.products)
  const loading = useSelector((state) => state.product.loading)
  const error = useSelector((state) => state.product.error)
  const cart = useSelector((state) => state.cart)

  useEffect(() => {
    dispatch(listProducts())
    const userId = localStorage.getItem("user_id")
    if (userId) {
      dispatch(fetchCart(userId))
    }
  }, [dispatch])

  useEffect(() => {
    const fetchCoopNames = async () => {
      const names = {}
      for (const product of products) {
        if (product.user && !names[product.user]) {
          try {
            const response = await dispatch(
              fetchCooperativeDetails(product.user)
            ).unwrap()
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
      const cooperativeData = await dispatch(
        fetchCooperativeDetails(product.user)
      ).unwrap()
      setSelectedProduct(product)
      setSelectedCooperative(cooperativeData)
    } catch (error) {
      console.error("Failed to fetch cooperative details:", error)
    }
  }

  const handleCooperativeClick = async (cooperativeId) => {
    try {
      const cooperativeData = await dispatch(
        fetchCooperativeDetails(cooperativeId)
      ).unwrap()
      setSelectedCooperativeProfile(cooperativeData)
      setShowCooperativeModal(true)
    } catch (error) {
      console.error("Failed to fetch cooperative details:", error)
    }
  }

  const handleAddToCart = async (product) => {
    const userId = localStorage.getItem("user_id")
    if (!userId) return alert("Please log in first")

    try {
      await dispatch(
        addToCart({ userId, productId: product.id, quantity: 1 })
      ).unwrap()
      await dispatch(fetchCart(userId))
      alert(`${product.product_name} added to cart! 🛒`)
    } catch (err) {
      if (err?.error?.includes("cooperative")) {
        alert("You can only add products from one cooperative at a time.")
      } else {
        alert("Failed to add to cart.")
        console.error("Add to cart error:", err)
      }
    }
  }

  const handleUpdateQuantity = async (itemId, quantity) => {
    const userId = localStorage.getItem("user_id")
    try {
      await dispatch(updateCartItem({ itemId, quantity })).unwrap()
      await dispatch(fetchCart(userId))
    } catch (error) {
      console.error("Update quantity error:", error)
    }
  }

  const handleRemoveItem = async (itemId) => {
    const userId = localStorage.getItem("user_id")
    try {
      await dispatch(removeFromCart(itemId)).unwrap()
      await dispatch(fetchCart(userId))
    } catch (error) {
      console.error("Remove item error:", error)
    }
  }

  const handleCheckout = async () => {
    const userId = localStorage.getItem("user_id")
    const cooperativeId =
      selectedCooperative?.id || cart.items[0]?.product?.user

    try {
      await dispatch(checkoutCart({ userId, cooperativeId })).unwrap()
      await dispatch(fetchCart(userId))
      alert("🎉 Order placed successfully!")
      setShowCart(false)
    } catch (error) {
      alert("❌ Failed to place order.")
      console.error("Checkout error:", error)
    }
  }

  const handleCloseModal = () => {
    setSelectedProduct(null)
    setSelectedCooperative(null)
    setShowOrderModal(false)
  }

  const filteredProducts = products.filter(
    (product) =>
      !searchTerm ||
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  )


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

  const uniqueCooperatives = Array.from(
    new Map(
      products.map((p) => [
        p.user,
        { name: cooperativeNames[p.user], id: p.user },
      ])
    ).values()
  )

  if (loading === "loading") {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading fresh harvests...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-gradient-to-br from-red-50 to-pink-50 min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-red-100">
          <p className="text-red-600 mb-4 text-lg">
            Oops! Couldn't load the farm feed.
          </p>
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
      {/* Enhanced Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 z-30">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            🌾 Farm Feed
          </h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 hover:bg-green-100 rounded-full transition-all duration-200 hover:scale-110"
            >
              <Search className="w-5 h-5 text-gray-600" />
            </button>
            <CartIcon cart={cart} onClick={() => setShowCart(true)} />
            <button className="p-2 hover:bg-green-100 rounded-full transition-all duration-200 hover:scale-110">
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
            <button 
            onClick={() => { localStorage.clear(); window.location.href = '/login'; }}
            className="p-2 hover:bg-green-100 rounded-full transition-all duration-200 hover:scale-110">
              <LogOut className="w-5 h-5 text-gray-600" />
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
              placeholder="Search fresh harvests..."
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              autoFocus
            />
          </div>
        )}
      </div>

      {/* Enhanced Cart Modal */}
      <EnhancedCartModal
        cart={cart}
        showCart={showCart}
        setShowCart={setShowCart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
        BASE_URL={BASE_URL}
      />

      {/* Simplified Cooperative Profile Modal */}
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
        <FarmStories
          cooperatives={uniqueCooperatives}
          onStoryClick={(coop) => handleCooperativeClick(coop.id)}
        />
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
              onAddToCart={handleAddToCart}
              onCooperativeClick={handleCooperativeClick}
            />
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <p className="text-gray-500 text-lg mb-2">
                No fresh harvests found. Try adjusting your search.
              </p>
              <p className="text-gray-400">🌱 New products are added daily!</p>
            </div>
          </div>
        )}
      </main>

      {selectedProduct && selectedCooperative && (
        <Modal
          product={selectedProduct}
          cooperative={selectedCooperative}
          onClose={handleCloseModal}
          onMakeOrder={() => setShowOrderModal(true)}
        />
      )}

      {showOrderModal && selectedProduct && selectedCooperative && (
        <OrderModal
          product={selectedProduct}
          cooperative={selectedCooperative}
          currentUser={{ id: localStorage.getItem("user_id") }}
          onClose={() => setShowOrderModal(false)}
        />
      )}
    </div>
  )
}

export default ProductListingPage