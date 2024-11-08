'use client'

import React, { useState } from 'react'

const InsertProductForm = () => {
  const [formData, setFormData] = useState({
    user: '',
    product_name: '',
    description: '',
    price: '',
    stock: '',
    harvest_date: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/products/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        alert('Product added successfully')
        setFormData({
          user: '',
          product_name: '',
          description: '',
          price: '',
          stock: '',
          harvest_date: ''
        })
      } else {
        alert('Failed to add product')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred. Please try again later.')
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Insert New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="user">
            User ID:
          </label>
          <input
            type="text"
            id="user"
            name="user"
            value={formData.user}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="product_name">
            Product Name:
          </label>
          <input
            type="text"
            id="product_name"
            name="product_name"
            value={formData.product_name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="description">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="price">
            Price:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="stock">
            Stock:
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="harvest_date">
            Harvest Date:
          </label>
          <input
            type="date"
            id="harvest_date"
            name="harvest_date"
            value={formData.harvest_date}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default InsertProductForm
