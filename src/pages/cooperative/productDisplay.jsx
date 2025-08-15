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
  X,
  Star,
  TrendingUp,
  Phone,
  Mail,
  Globe,
  ExternalLink,
  Shield,
  CheckCircle,
  Building2,
  Leaf,
  Trophy,
  Clock,
  Package,
  Eye,
  Handshake,
  Network,
} from "lucide-react"

const BASE_URL = process.env.REACT_APP_API_BASE_URL

// Main Component
const CooperativeProductListingPage = () => {
  const dispatch = useDispatch()
  const { products, loading } = useSelector((state) => state.product)
  const { cooperativeDetails } = useSelector((state) => state.cooperative)

  const [searchTerm, setSearchTerm] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedCooperative, setSelectedCooperative] = useState(null)
  const [showCooperativeModal, setShowCooperativeModal] = useState(false)
  const [selectedCooperativeProfile, setSelectedCooperativeProfile] = useState(null)

  // Fetch products and cooperative details
  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  // Get unique cooperatives for stories
  const uniqueCooperatives = Array.from(
    new Map(products.map((product) => [product.user, product])).values()
  ).slice(0, 10)

  // Get cooperative names
  const cooperativeNames = {}
  products.forEach((product) => {
    if (cooperativeDetails[product.user]) {
      cooperativeNames[product.user] = cooperativeDetails[product.user].name
    }
  })

  // Fetch cooperative details for products
  useEffect(() => {
    uniqueCooperatives.forEach((product) => {
      if (!cooperativeDetails[product.user]) {
        dispatch(fetchCooperativeDetails(product.user))
      }
    })
  }, [uniqueCooperatives, cooperativeDetails, dispatch])

  // Filter products based on search
  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (cooperativeNames[product.user] && cooperativeNames[product.user].toLowerCase().includes(searchTerm.toLowerCase()))
  )

  // Event handlers
  const handleViewProduct = (product) => {
    setSelectedProduct(product)
    if (cooperativeDetails[product.user]) {
      setSelectedCooperative(cooperativeDetails[product.user])
    }
  }

  const handleCloseModal = () => {
    setSelectedProduct(null)
    setSelectedCooperative(null)
  }

  const handleCooperativeClick = (cooperativeId) => {
    const cooperative = cooperativeDetails[cooperativeId]
    if (cooperative) {
      setSelectedCooperativeProfile(cooperative)
      setShowCooperativeModal(true)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900">Cooperative Network</h1>
              <span className="text-sm text-gray-500 bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                View Mode
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 hover:bg-blue-100 rounded-full transition-all duration-200 hover:scale-110"
              >
                <Search className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-blue-100 rounded-full transition-all duration-200 hover:scale-110">
                <Filter className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
          {showSearch && (
            <div className="max-w-md mx-auto px-4 pb-4">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search fellow cooperatives' products..."
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                autoFocus
              />
            </div>
          )}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="text-center py-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <p className="text-gray-500 text-lg mb-2">Cooperative Network View</p>
            <p className="text-gray-400">🤝 View fellow cooperatives' products for networking</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default CooperativeProductListingPage 