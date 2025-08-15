"use client"

import { useState, useMemo, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { addProduct, listProducts } from "../../Redux/Slices/product/product"
import { selectReferencePrices, fetchReferencePrices } from "../../Redux/Slices/price_upload/price_upload_slice"
import {
  FaLeaf,
  FaSeedling,
  FaDollarSign,
  FaCalendarAlt,
  FaImage,
  FaBox,
  FaFileAlt,
  FaSpinner,
  FaCheck,
  FaArrowLeft,
} from "react-icons/fa"

const NewProductForm = ({ onClose }) => {
  const dispatch = useDispatch()
  const userData = JSON.parse(localStorage.getItem("userData"))
  const userId = userData ? userData.id : ""
  const { userInfo } = useSelector((state) => state.user)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Get all reference prices from Redux
  const reduxReferencePrices = useSelector(selectReferencePrices).prices

  // Fetch reference prices on mount if not already loaded
  useEffect(() => {
    if (!reduxReferencePrices || reduxReferencePrices.length === 0) {
      dispatch(fetchReferencePrices())
    }
  }, [dispatch, reduxReferencePrices])

  // Debug log
  useEffect(() => {
    console.log("Redux reference prices:", reduxReferencePrices)
  }, [reduxReferencePrices])

  // Extract unique categories from reference prices
  const categories = useMemo(() => {
    const set = new Set()
    ;(reduxReferencePrices || []).forEach((ref) => {
      if (ref.category) set.add(ref.category)
    })
    return Array.from(set)
  }, [reduxReferencePrices])

  // Extract unique product names (commodities) for selected category
  const [formData, setFormData] = useState({
    user: userInfo?.id || localStorage.getItem("user_id") || "",
    product_name: "",
    category: "",
    description: "",
    price: "",
    stock: "",
    harvest_date: "",
    image: null,
    unit: '',
  });

  // Unit options based on category
  const unitOptions = useMemo(() => {
    if (formData.category.toLowerCase().includes('oil')) return ['Liters', 'Milliliters'];
    if (formData.category.toLowerCase().includes('grain') || formData.category.toLowerCase().includes('vegetable') || formData.category.toLowerCase().includes('fruit')) return ['Kilograms', 'Grams'];
    return ['Units', 'Kilograms', 'Liters'];
  }, [formData.category]);

  const productNames = useMemo(() => {
    if (!formData.category) return []
    const set = new Set()
    ;(reduxReferencePrices || []).forEach((ref) => {
      if (ref.category === formData.category && ref.commodity) set.add(ref.commodity)
    })
    return Array.from(set)
  }, [reduxReferencePrices, formData.category])

  // Filter reference prices for selected category and product name
  const priceOptions = useMemo(() => {
    if (!formData.category || !formData.product_name) return []
    return (reduxReferencePrices || []).filter(
      (ref) => ref.category === formData.category && ref.commodity === formData.product_name,
    )
  }, [reduxReferencePrices, formData.category, formData.product_name])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    // Reset dependent fields
    if (name === "category") {
      setFormData((prev) => ({ ...prev, product_name: "", price: "", unit: "" }))
    }
    if (name === "product_name") {
      setFormData((prev) => ({ ...prev, price: "", unit: "" }))
    }
  }

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const productData = new FormData()
    Object.keys(formData).forEach((key) => {
      productData.append(key, formData[key])
    })

    try {
      dispatch(addProduct(productData))
      // Reset form after successful submission
      setFormData({
        user: userInfo?.id || localStorage.getItem("user_id") || "",
        product_name: "",
        category: "",
        description: "",
        price: "",
        stock: "",
        harvest_date: "",
        image: null,
        unit: '',
      })
      if (onClose) onClose()
    } catch (error) {
      console.error("Error adding product:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Form field components
  const FormField = ({ icon: Icon, label, children, required }) => (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <Icon className="w-4 h-4 text-emerald-600" />
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  )

  const InputField = ({ type = "text", name, value, onChange, placeholder, required, min, ...props }) => (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      min={min}
      {...props}
      className="w-full border-2 border-emerald-200 rounded-xl p-4 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 bg-white/80 backdrop-blur-sm"
    />
  )

  const SelectField = ({ name, value, onChange, options, placeholder, disabled, required }) => (
    <select
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      required={required}
      className="w-full border-2 border-emerald-200 rounded-xl p-4 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 bg-white/80 backdrop-blur-sm"
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField icon={FaSeedling} label="Category" required>
          <SelectField
            name="category"
            value={formData.category}
            onChange={handleChange}
            options={categories}
            placeholder="Select a category"
            required
          />
        </FormField>

        <FormField icon={FaLeaf} label="Product Name" required>
          <SelectField
            name="product_name"
            value={formData.product_name}
            onChange={handleChange}
            options={productNames}
            placeholder="Select a product name"
            disabled={!formData.category}
            required
          />
        </FormField>

        <FormField icon={FaDollarSign} label="Price" required>
          <InputField
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            min="0"
            step="0.01"
            required
          />
        </FormField>

        <FormField icon={FaLeaf} label="Unit" required>
          <SelectField
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            options={unitOptions}
            placeholder="Select a unit"
            disabled={!formData.category}
            required
          />
        </FormField>

        <FormField icon={FaFileAlt} label="Description" required>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description..."
            required
            rows="4"
            className="w-full border-2 border-emerald-200 rounded-xl p-4 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 bg-white/80 backdrop-blur-sm resize-none"
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField icon={FaBox} label="Stock Quantity" required>
            <InputField
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Enter stock quantity"
              min="0"
              required
            />
          </FormField>

          <FormField icon={FaCalendarAlt} label="Harvest Date" required>
            <InputField
              type="date"
              name="harvest_date"
              value={formData.harvest_date}
              onChange={handleChange}
              required
            />
          </FormField>
        </div>

        <FormField icon={FaImage} label="Product Image">
          <div className="relative">
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
              className="w-full border-2 border-dashed border-emerald-300 rounded-xl p-6 focus:outline-none focus:border-emerald-500 transition-all duration-300 bg-emerald-50/50 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 file:cursor-pointer"
            />
            <div className="absolute top-2 right-2 text-emerald-500">
              <FaImage size={20} />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Upload a high-quality image of your product (optional)</p>
        </FormField>

        <div className="flex gap-4 pt-6">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-4 px-6 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 py-4 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-emerald-500/25 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="animate-spin" size={18} />
                Adding Product...
              </>
            ) : (
              <>
                <FaCheck size={18} />
                Add Product
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

// Main page component
const NewProduct = () => {
  const navigate = useNavigate()

  const handleClose = () => {
    navigate('/dashboard/overview')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleClose}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <FaArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Product Information</h2>
            <p className="text-gray-600">Fill in the details below to add a new product to your inventory.</p>
          </div>
          
          <NewProductForm onClose={handleClose} />
        </div>
      </div>
    </div>
  )
}

export default NewProduct
