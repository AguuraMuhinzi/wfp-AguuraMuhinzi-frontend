'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
  FiHome,
  FiBox,
  FiClipboard,
  FiBarChart2,
  FiTrendingUp,
  FiUser,
  FiSettings,
  FiMessageCircle,
  FiMenu,
  FiBell,
  FiSearch
} from 'react-icons/fi'

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const sidebarRef = useRef(null)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  // Close sidebar when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isSidebarOpen) {
        setIsSidebarOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isSidebarOpen])

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <nav
        ref={sidebarRef}
        className={`bg-white shadow-xl h-[calc(100vh-80px)] fixed top-[80px] left-0 min-w-[250px] py-6 px-4 font-[sans-serif] overflow-auto transition-transform transform z-50 rounded-br-lg ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Navigation Links */}
          <ul className="space-y-4 px-2">
            <SidebarItem name="Dashboard" icon={<FiHome />} />
            <SidebarItem name="Stock" icon={<FiBox />} />
            <SidebarItem name="Orders" icon={<FiClipboard />} />
            <SidebarItem name="Report" icon={<FiBarChart2 />} />
            <SidebarItem name="Price Trends" icon={<FiTrendingUp />} />
            <SidebarItem name="Profile Settings" icon={<FiUser />} />
            <SidebarItem name="Chat" icon={<FiMessageCircle />} />
          </ul>

          {/* Footer Links */}
          <div className="mt-auto">
            <hr className="my-4 border-gray-300" />
            <ul className="space-y-4 px-2">
              <SidebarItem name="Help" icon={<FiSettings />} />
              <SidebarItem name="Profile" icon={<FiUser />} />
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content with Header */}
      <div className="flex-1 flex flex-col">
        <header className="flex flex-col md:flex-row items-center justify-between p-4 bg-white shadow-md font-[sans-serif] md:h-[80px] h-auto z-40 border-b border-gray-300 w-full fixed top-0 left-0 right-0">
          <div className="flex items-center justify-between w-full md:w-auto mb-4 md:mb-0">
            {/* Logo */}
            <h1 className="text-2xl font-bold text-green-600 flex items-center space-x-1">
              <img
                src={`${process.env.PUBLIC_URL}/imgs/plant.png`}
                alt="Leaf Icon"
                className="w-6 h-6 text-green-500"
              />
              <span>AguuraMuhinzi</span>
            </h1>

            {/* Hamburger Button for Mobile */}
            <button className="md:hidden text-gray-600" onClick={toggleSidebar}>
              <FiMenu size={24} />
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex items-center border border-gray-300 rounded-full px-3 py-1 w-full max-w-md">
            <FiSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="ml-2 flex-grow outline-none text-sm"
            />
          </div>

          {/* Right-side Navigation and Buttons */}
          <nav className="flex flex-col md:flex-row items-center mt-4 md:mt-0 space-y-2 md:space-y-0 md:space-x-3 w-full md:w-auto">
            <a href="#" className="text-gray-600 hover:text-green-600">
              Home
            </a>
            <a href="#" className="text-gray-600 hover:text-green-600">
              Bids
            </a>
           
            <button className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]">
              Logout
            </button>
           
          </nav>
        </header>

        {/* Content Placeholder */}
        <div className="pt-[80px] p-6 bg-gray-100 flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  )
}

const SidebarItem = ({ name, icon }) => {
  return (
    <li>
      <a
        href="#"
        className="text-[#333] text-sm flex items-center p-2 rounded-lg transition-all hover:bg-green-600 hover:text-white"
      >
        <span className="mr-3">{icon}</span>
        <span>{name}</span>
      </a>
    </li>
  )
}

export default DashboardLayout
