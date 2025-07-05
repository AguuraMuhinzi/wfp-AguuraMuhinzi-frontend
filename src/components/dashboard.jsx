

// import React, { useState } from 'react';
// import { NavLink, Outlet, useLocation, Link } from 'react-router-dom';
// import { FiHome, FiBox, FiClipboard, FiBarChart2, FiTrendingUp, FiUser, FiMessageCircle, FiBell, FiUser as FiUserIcon } from 'react-icons/fi';

// const SidebarItem = ({ name, icon, path }) => (
//   <NavLink
//     to={path}
//     className={({ isActive }) =>
//       `flex items-center gap-3 py-2 px-2 text-sm rounded-lg transition-colors ${
//         isActive
//           ? 'text-white bg-green-600'
//           : 'text-gray-800 dark:text-white hover:bg-green-600 hover:text-white'
//       }`
//     }
//   >
//     {icon}
//     <span>{name}</span>
//   </NavLink>
// );

// const DashboardLayout = () => {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);
//   const location = useLocation();

//   const toggleSidebar = () => {
//     setSidebarOpen(!isSidebarOpen);
//   };

//   const generateBreadcrumbs = () => {
//     const pathnames = location.pathname.split('/').filter((x) => x);
//     return pathnames.map((value, index) => {
//       const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
//       const isLast = index === pathnames.length - 1;
//       return (
//         <li key={routeTo} className={`text-gray-800 dark:text-neutral-400 ${isLast ? 'font-semibold' : ''}`}>
//           {!isLast ? (
//             <Link to={routeTo} className="hover:underline text-green-600">
//               {value.charAt(0).toUpperCase() + value.slice(1)}
//             </Link>
//           ) : (
//             <span>{value.charAt(0).toUpperCase() + value.slice(1)}</span>
//           )}
//           {!isLast && (
//             <svg
//               className="w-4 h-4 mx-2 text-gray-400 dark:text-neutral-500 inline"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1l5.7 6.2a.5.5 0 0 1 0 .6L5 14" />
//             </svg>
//           )}
//         </li>
//       );
//     });
//   };

//   return (
//     <div className="flex h-screen bg-gray-100 dark:bg-neutral-800 overflow-hidden">
//       {/* Sidebar */}
//       <div
//         id="hs-application-sidebar"
//         className={`fixed inset-y-0 left-0 z-50 w-[260px] bg-white border-e border-gray-200 dark:bg-neutral-800 dark:border-neutral-700 transition-transform duration-300 transform ${
//           isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
//         } lg:translate-x-0 lg:block`}
//       >
//         <div className="flex flex-col h-full">
//           <div className="px-6 pt-4">
//             <h1 className="text-2xl font-bold text-green-600 flex items-center space-x-1">
//               <img
//                 src={`${process.env.PUBLIC_URL}/imgs/plant.png`}
//                 alt="Leaf Icon"
//                 className="w-6 h-6 text-green-500"
//               />
//               <span>AguuraMuhinzi</span>
//             </h1>
//           </div>
//           <div className="h-full overflow-y-auto p-3 mt-8">
//             <nav className="space-y-1">
//               <SidebarItem name="Dashboard" icon={<FiHome />} path="/dashboard/overview" />
//               <SidebarItem name="Stock" icon={<FiBox />} path="/dashboard/stock" />
//               <SidebarItem name="Orders" icon={<FiClipboard />} path="/dashboard/orders" />
//               <SidebarItem name="Report" icon={<FiBarChart2 />} path="/dashboard/report" />
//               <SidebarItem name="Price Trends" icon={<FiTrendingUp />} path="/dashboard/price-trends" />
//               <SidebarItem name="Profile" icon={<FiUser />} path="/dashboard/coopProfile" />
//               <SidebarItem name="Chat" icon={<FiMessageCircle />} path="/dashboard/chat" />
//             </nav>
//           </div>
//         </div>
//       </div>

//       {/* Main content */}
//       <div className="flex flex-col flex-1 lg:pl-[260px] overflow-y-auto">
//         {/* Header */}
//         <header className="sticky top-0 z-50 flex items-center justify-between bg-white border-b dark:bg-neutral-800 dark:border-neutral-700 px-4 py-2">
//           <button onClick={toggleSidebar} className="text-gray-500 dark:text-white lg:hidden">
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           </button>
//           <div className="relative w-full max-w-xs">
//             <input type="text" placeholder="Search" className="w-full py-2 pl-10 pr-4 bg-white border rounded-lg dark:bg-neutral-800 dark:text-neutral-400 focus:border-blue-500 focus:outline-none" />
//             <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <circle cx="11" cy="11" r="8" />
//               <path d="m21 21-4.3-4.3" />
//             </svg>
//           </div>
//           <div className="flex items-center space-x-4">
//             <Link to="/overview" className="text-gray-500 dark:text-white hover:text-green-600">
//               <FiHome className="w-6 h-6" />
//             </Link>
//             <button className="text-gray-500 dark:text-white hover:text-green-600">
//               <FiBell className="w-6 h-6" />
//             </button>
//             <Link to="/dashboard/profile-settings" className="text-gray-500 dark:text-white hover:text-green-600">
//               <FiUserIcon className="w-6 h-6" />
//             </Link>
//           </div>
//         </header>

//         {/* Breadcrumb */}
//         <div className="bg-white dark:bg-neutral-800 border-b dark:border-neutral-700 px-4 py-3">
//           <nav className="text-sm">
//             <ol className="flex items-center space-x-1">{generateBreadcrumbs()}</ol>
//           </nav>
//         </div>

//         {/* Page Content */}
//         <main className="flex-1 p-4 overflow-auto max-w-full">
//           <Outlet /> {/* This will render StockPage or other child routes */}
//         </main>
//       </div>

//       {/* Overlay for small screen sidebar */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
//           onClick={toggleSidebar}
//         ></div>
//       )}
//     </div>
//   );
// };

// export default DashboardLayout;

// import React, { useEffect, useState } from 'react';
// import { NavLink, Outlet, useLocation, Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCooperativeDetails } from '../Redux/Slices/cooperative/coop_details';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { FiHome, FiBox, FiClipboard, FiBarChart2, FiTrendingUp, FiUser, FiMessageCircle, FiBell, FiUser as FiUserIcon } from 'react-icons/fi';

// const SidebarItem = ({ name, icon, path }) => (
//   <NavLink
//     to={path}
//     className={({ isActive }) =>
//       `flex items-center gap-3 py-2 px-2 text-sm rounded-lg transition-colors ${
//         isActive
//           ? 'text-white bg-green-600'
//           : 'text-gray-800 dark:text-white hover:bg-green-600 hover:text-white'
//       }`
//     }
//   >
//     {icon}
//     <span>{name}</span>
//   </NavLink>
// );

// const DashboardLayout = () => {
//   const dispatch = useDispatch();
//   const { cooperativeDetails, isLoading } = useSelector((state) => state.cooperative);

//   const [isSidebarOpen, setSidebarOpen] = useState(false);
//   const location = useLocation();

//   const userId = localStorage.getItem('user_id'); // Get user ID from local storage

//   useEffect(() => {
//     if (userId && !isLoading) {
//       dispatch(fetchCooperativeDetails(userId));
//     }
//   }, [dispatch, userId, isLoading]);

//   useEffect(() => {
//     if (
//       cooperativeDetails &&
//       typeof cooperativeDetails === 'object' &&
//       !Array.isArray(cooperativeDetails) &&
//       cooperativeDetails.name
//     ) {
//       // All good
//     } else if (cooperativeDetails && cooperativeDetails.detail) {
//       // Fix: Handle object or string detail
//       const errorMessage = typeof cooperativeDetails.detail === 'object' 
//         ? JSON.stringify(cooperativeDetails.detail) 
//         : cooperativeDetails.detail;
//       toast.error(`Error: ${errorMessage}`);
//     } else if (cooperativeDetails && typeof cooperativeDetails === 'object' && cooperativeDetails.code) {
//       // Handle case where cooperativeDetails has error structure
//       const errorMessage = cooperativeDetails.detail 
//         ? (typeof cooperativeDetails.detail === 'string' ? cooperativeDetails.detail : 'Unknown error')
//         : 'An error occurred';
//       toast.error(`Error: ${errorMessage}`);
//     } else {
//       // Only show warning if cooperativeDetails is not loading and not null
//       if (!isLoading && cooperativeDetails !== null) {
//         toast.warning('Your cooperative profile is incomplete. Please set it up.');
//       }
//     }
//   }, [cooperativeDetails, isLoading]);

//   const toggleSidebar = () => {
//     setSidebarOpen(!isSidebarOpen);
//   };

//   const generateBreadcrumbs = () => {
//     const pathnames = location.pathname.split('/').filter((x) => x);
//     return pathnames.map((value, index) => {
//       const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
//       const isLast = index === pathnames.length - 1;
//       return (
//         <li key={routeTo} className={`text-gray-800 dark:text-neutral-400 ${isLast ? 'font-semibold' : ''}`}>
//           {!isLast ? (
//             <Link to={routeTo} className="hover:underline text-green-600">
//               {value.charAt(0).toUpperCase() + value.slice(1)}
//             </Link>
//           ) : (
//             <span>{value.charAt(0).toUpperCase() + value.slice(1)}</span>
//           )}
//           {!isLast && (
//             <svg
//               className="w-4 h-4 mx-2 text-gray-400 dark:text-neutral-500 inline"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1l5.7 6.2a.5.5 0 0 1 0 .6L5 14" />
//             </svg>
//           )}
//         </li>
//       );
//     });
//   };

//   return (
//     <div className="flex h-screen bg-gray-100 dark:bg-neutral-800 overflow-hidden">
//       {/* Toast Container */}
//       <ToastContainer />

//       {/* Sidebar */}
//       <div
//         id="hs-application-sidebar"
//         className={`fixed inset-y-0 left-0 z-50 w-[260px] bg-white border-e border-gray-200 dark:bg-neutral-800 dark:border-neutral-700 transition-transform duration-300 transform ${
//           isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
//         } lg:translate-x-0 lg:block`}
//       >
//         <div className="flex flex-col h-full">
//           <div className="px-6 pt-4">
//             <h1 className="text-2xl font-bold text-green-600 flex items-center space-x-1">
//               <img
//                 src={`${process.env.PUBLIC_URL}/imgs/plant.png`}
//                 alt="Leaf Icon"
//                 className="w-6 h-6 text-green-500"
//               />
//               <span>AguuraMuhinzi</span>
//             </h1>
//           </div>
//           <div className="h-full overflow-y-auto p-3 mt-8">
//             <nav className="space-y-1">
//               <SidebarItem name="Dashboard" icon={<FiHome />} path="/dashboard/overview" />
//               <SidebarItem name="Stock" icon={<FiBox />} path="/dashboard/stock" />
//               <SidebarItem name="Orders" icon={<FiClipboard />} path="/dashboard/orders" />
//               <SidebarItem name="Report" icon={<FiBarChart2 />} path="/dashboard/report" />
//               <SidebarItem name="Price Trends" icon={<FiTrendingUp />} path="/dashboard/price-trends" />
//               <SidebarItem name="Profile" icon={<FiUser />} path="/dashboard/coopProfile" />
//               <SidebarItem name="Chat" icon={<FiMessageCircle />} path="/dashboard/chat" />
//             </nav>
//           </div>
//         </div>
//       </div>

//       {/* Main content */}
//       <div className="flex flex-col flex-1 lg:pl-[260px] overflow-y-auto">
//         {/* Header */}
//         <header className="sticky top-0 z-50 flex items-center justify-between bg-white border-b dark:bg-neutral-800 dark:border-neutral-700 px-4 py-2">
//           <button onClick={toggleSidebar} className="text-gray-500 dark:text-white lg:hidden">
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           </button>
//           <div className="relative w-full max-w-xs">
//             <input type="text" placeholder="Search" className="w-full py-2 pl-10 pr-4 bg-white border rounded-lg dark:bg-neutral-800 dark:text-neutral-400 focus:border-blue-500 focus:outline-none" />
//             <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <circle cx="11" cy="11" r="8" />
//               <path d="m21 21-4.3-4.3" />
//             </svg>
//           </div>
//           <div className="flex items-center space-x-4">
//             <Link to="/overview" className="text-gray-500 dark:text-white hover:text-green-600">
//               <FiHome className="w-6 h-6" />
//             </Link>
//             <button className="text-gray-500 dark:text-white hover:text-green-600">
//               <FiBell className="w-6 h-6" />
//             </button>
//             <Link to="/dashboard/profile-settings" className="text-gray-500 dark:text-white hover:text-green-600">
//               <FiUserIcon className="w-6 h-6" />
//             </Link>
//           </div>
//         </header>

//         {/* Breadcrumb */}
//         <div className="bg-white dark:bg-neutral-800 border-b dark:border-neutral-700 px-4 py-3">
//           <nav className="text-sm">
//             <ol className="flex items-center space-x-1">{generateBreadcrumbs()}</ol>
//           </nav>
//         </div>

//         {/* Page Content */}
//         <main className="flex-1 p-4 overflow-auto max-w-full">
//           <Outlet /> {/* This will render StockPage or other child routes */}
//         </main>
//       </div>

//       {/* Overlay for small screen sidebar */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
//           onClick={toggleSidebar}
//         ></div>
//       )}
//     </div>
//   );
// };

// export default DashboardLayout;

import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCooperativeDetails } from '../Redux/Slices/cooperative/coop_details';
import {
  FiHome, FiBox, FiClipboard, FiBarChart2,
  FiTrendingUp, FiUser, FiMessageCircle, FiBell, FiUser as FiUserIcon
} from 'react-icons/fi';

const SidebarItem = ({ name, icon, path }) => (
  <NavLink
    to={path}
    className={({ isActive }) =>
      `flex items-center gap-3 py-2 px-2 text-sm rounded-lg transition-colors ${
        isActive
          ? 'text-white bg-green-600'
          : 'text-gray-800 dark:text-white hover:bg-green-600 hover:text-white'
      }`
    }
  >
    {icon}
    <span>{name}</span>
  </NavLink>
);

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.cooperative);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    if (userId ) {
      dispatch(fetchCooperativeDetails(userId));
    }
  }, [dispatch, userId]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const generateBreadcrumbs = () => {
    const pathnames = location.pathname.split('/').filter((x) => x);
    return pathnames.map((value, index) => {
      const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
      const isLast = index === pathnames.length - 1;
      return (
        <li key={routeTo} className={`text-gray-800 dark:text-neutral-400 ${isLast ? 'font-semibold' : ''}`}>
          {!isLast ? (
            <Link to={routeTo} className="hover:underline text-green-600">
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </Link>
          ) : (
            <span>{value.charAt(0).toUpperCase() + value.slice(1)}</span>
          )}
          {!isLast && (
            <svg
              className="w-4 h-4 mx-2 text-gray-400 dark:text-neutral-500 inline"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1l5.7 6.2a.5.5 0 0 1 0 .6L5 14" />
            </svg>
          )}
        </li>
      );
    });
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-neutral-800 overflow-hidden">
      {/* Sidebar */}
      <div
        id="hs-application-sidebar"
        className={`fixed inset-y-0 left-0 z-50 w-[260px] bg-white border-e border-gray-200 dark:bg-neutral-800 dark:border-neutral-700 transition-transform duration-300 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:block`}
      >
        <div className="flex flex-col h-full">
          <div className="px-6 pt-4">
            <h1 className="text-2xl font-bold text-green-600 flex items-center space-x-1">
              <img
                src={`${process.env.PUBLIC_URL}/imgs/plant.png`}
                alt="Leaf Icon"
                className="w-6 h-6 text-green-500"
              />
              <span>AguuraMuhinzi</span>
            </h1>
          </div>
          <div className="h-full overflow-y-auto p-3 mt-8">
            <nav className="space-y-1">
              <SidebarItem name="Dashboard" icon={<FiHome />} path="/dashboard/overview" />
              <SidebarItem name="Stock" icon={<FiBox />} path="/dashboard/stock" />
              <SidebarItem name="Orders" icon={<FiClipboard />} path="/dashboard/orders" />
              <SidebarItem name="Report" icon={<FiBarChart2 />} path="/dashboard/report" />
              <SidebarItem name="Price Trends" icon={<FiTrendingUp />} path="/dashboard/trends" />
              <SidebarItem name="Profile" icon={<FiUser />} path="/dashboard/coopProfile" />
              <SidebarItem name="Chat" icon={<FiMessageCircle />} path="/dashboard/chat" />
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 lg:pl-[260px] overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 z-50 flex items-center justify-between bg-white border-b dark:bg-neutral-800 dark:border-neutral-700 px-4 py-2">
          <button onClick={toggleSidebar} className="text-gray-500 dark:text-white lg:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="relative w-full max-w-xs">
            <input type="text" placeholder="Search" className="w-full py-2 pl-10 pr-4 bg-white border rounded-lg dark:bg-neutral-800 dark:text-neutral-400 focus:border-blue-500 focus:outline-none" />
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/overview" className="text-gray-500 dark:text-white hover:text-green-600">
              <FiHome className="w-6 h-6" />
            </Link>
            <button className="text-gray-500 dark:text-white hover:text-green-600">
              <FiBell className="w-6 h-6" />
            </button>
            <Link to="/dashboard/profile-settings" className="text-gray-500 dark:text-white hover:text-green-600">
              <FiUserIcon className="w-6 h-6" />
            </Link>
          </div>
        </header>

        {/* Breadcrumb */}
        <div className="bg-white dark:bg-neutral-800 border-b dark:border-neutral-700 px-4 py-3">
          <nav className="text-sm">
            <ol className="flex items-center space-x-1">{generateBreadcrumbs()}</ol>
          </nav>
        </div>

        {/* Page Content */}
        <main className="flex-1 p-4 overflow-auto max-w-full">
          <Outlet />
        </main>
      </div>

      {/* Overlay for small screen sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default DashboardLayout;
