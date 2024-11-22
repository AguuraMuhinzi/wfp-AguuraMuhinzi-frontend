import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md dark:bg-gray-800 fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto px-6 py-3 md:flex md:justify-between md:items-center">
        {/* Logo Section */}
        <div className="flex justify-between items-center">
          <a href="#" className="text-2xl font-bold text-green-600 dark:text-white">
            MyApp
          </a>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:text-gray-400"
              aria-label="toggle menu"
            >
              {isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div
          className={`${
            isOpen ? 'block' : 'hidden'
          } md:flex md:items-center md:justify-between w-full md:w-auto`}
        >
          <div className="flex flex-col md:flex-row md:mx-6">
            <a
              href="#"
              className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-green-500 dark:hover:text-green-400 md:mx-4 md:my-0"
            >
              Home
            </a>
            <a
              href="#dashboard"
              className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-green-500 dark:hover:text-green-400 md:mx-4 md:my-0"
            >
              Dashboard
            </a>
            <a
              href="#logout"
              className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-green-500 dark:hover:text-green-400 md:mx-4 md:my-0"
            >
              Logout
            </a>
          </div>

          {/* Notification Icon */}
          <div className="relative flex items-center justify-center md:mx-4">
            <a
              href="#notifications"
              className="relative text-gray-700 dark:text-gray-200 hover:text-green-500 dark:hover:text-green-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 7.165 6 9.388 6 12v2.159c0 .538-.214 1.055-.595 1.437L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute top-0 right-0 inline-block w-2.5 h-2.5 bg-red-600 border-2 border-white dark:border-gray-800 rounded-full"></span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
