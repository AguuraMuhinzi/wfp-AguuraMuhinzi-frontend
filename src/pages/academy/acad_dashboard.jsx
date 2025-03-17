// import React, { useEffect, useState } from 'react';
// import { NavLink, Outlet, useLocation, Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import {
//   FiHome,
//   FiBox,
//   FiClipboard,
//   FiBarChart2,
//   FiTrendingUp,
//   FiUser,
//   FiMessageCircle,
//   FiBell,
//   FiUser as FiUserIcon,
// } from 'react-icons/fi';
// import { fetchCooperativeDetails } from '../../Redux/Slices/cooperative/coop_details';

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
//   const userId = localStorage.getItem('user_id');

//   useEffect(() => {
//     if (userId) {
//       dispatch(fetchCooperativeDetails(userId));
//     }
//   }, [dispatch, userId]);

//   useEffect(() => {
//     if (!isLoading && (!cooperativeDetails || !cooperativeDetails.name)) {
//       toast.warning('Your cooperative profile is incomplete. Please set it up.', {
//         position: 'top-right',
//         autoClose: 5000,
//         hideProgressBar: true,
//       });
//     }
//   }, [cooperativeDetails, isLoading]);

//   const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

//   const generateBreadcrumbs = () => {
//     const pathnames = location.pathname.split('/').filter((x) => x);
//     return pathnames.map((value, index) => {
//       const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
//       const isLast = index === pathnames.length - 1;
//       return (
//         <li
//           key={routeTo}
//           className={`text-gray-800 dark:text-neutral-400 ${isLast ? 'font-semibold' : ''}`}
//         >
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
//       {/* Toast Notifications */}
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
//               <SidebarItem name="Dashboard" icon={<FiHome />} path="/aca_dashboard/Overview_acad" />
//               <SidebarItem name="Stock" icon={<FiBox />} path="/dashboard/stock" />
//               <SidebarItem name="Orders" icon={<FiClipboard />} path="/dashboard/orders" />
//               <SidebarItem name="Report" icon={<FiBarChart2 />} path="/dashboard/report" />
//               <SidebarItem name="Price Trends" icon={<FiTrendingUp />} path="/dashboard/price-trends" />
//               <SidebarItem name="Profile" icon={<FiUser />} path="/aca_dashboard/acad_profile" />
//               <SidebarItem name="Chat" icon={<FiMessageCircle />} path="/dashboard/chat" />
//             </nav>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex flex-col flex-1 lg:pl-[260px] overflow-y-auto">
//         {/* Header */}
//         <header className="sticky top-0 z-50 flex items-center justify-between bg-white border-b dark:bg-neutral-800 dark:border-neutral-700 px-4 py-2">
//           <button onClick={toggleSidebar} className="text-gray-500 dark:text-white lg:hidden">
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           </button>
//           <div className="relative w-full max-w-xs">
//             <input
//               type="text"
//               placeholder="Search"
//               className="w-full py-2 pl-10 pr-4 bg-white border rounded-lg dark:bg-neutral-800 dark:text-neutral-400 focus:border-blue-500 focus:outline-none"
//             />
//             <svg
//               className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-neutral-500"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
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
//           <Outlet /> {/* This will render child routes */}
//         </main>
//       </div>

//       {/* Sidebar Overlay */}
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
  // import { Link } from 'react-router-dom';
  // import { useSelector } from 'react-redux';
  // import {
  //   FiGrid,
  //   FiUser,
  //   FiSettings,
  //   FiMessageCircle,
  //   FiBell,
  //   FiLogOut,
  // } from 'react-icons/fi';

  // const AcademyDashboard = () => {
  //   const { user } = useSelector((state) => state.auth || {});
  //   const [stats, setStats] = useState({
  //     totalCourses: 104,
  //     totalStudents: 0,
  //     activeClasses: 0,
  //     remainingClasses: 10,
  //   });

  //   const menuItems = [
  //     { name: 'DASHBOARD', icon: <FiGrid />, active: true, path: '/aca_dashboard/overview' },
  //     { name: 'PROFILE', icon: <FiUser />, active: false, path: '/aca_dashboard/acad_profile' },
  //     { name: 'ORDERS', icon: <FiGrid />, active: false, path: "/aca_dashboard/acad_orders" },
  //     { name: 'SETTINGS', icon: <FiSettings />, active: false, path: '/aca_dashboard/settings' },
  //     { name: 'CHATS', icon: <FiMessageCircle />, active: false, path: '/aca_dashboard/chats' },
  //     { name: 'NOTIFICATIONS', icon: <FiBell />, active: false, path: '/aca_dashboard/notifications' },
  //     { name: 'LOGOUT', icon: <FiLogOut />, active: false, path: '/logout' },
  //   ];

  //   return (
  //     <div className="bg-gray-100 min-h-screen">
  //       {/* Dashboard Header with collage background */}
  //       <div className="relative">
  //         <div 
  //           className="h-72 bg-cover bg-center"
  //           style={{ 
  //             backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/child.jpg')" 
  //           }}
  //         >
  //           <div className="container mx-auto px-4 pt-16 text-center">
  //             <h1 className="text-4xl font-bold text-white mb-2">DASHBOARD</h1>
  //             <div className="text-white">
  //               <span>Home</span>
  //               <span className="mx-2">›</span>
  //               <span className="text-green-400">Dashboard</span>
  //             </div>
  //           </div>
  //         </div>

  //         {/* Profile Card */}
  //         <div className="container mx-auto px-4">
  //           <div className="bg-white rounded-lg shadow-md -mt-20 mb-8 overflow-hidden">
  //             <div className="flex flex-col md:flex-row p-6">
  //               <div className="flex items-center md:w-1/3">
  //                 <div className="w-24 h-24 rounded-full bg-green-600 flex items-center justify-center text-white text-5xl font-bold">
  //                   {user?.name?.charAt(0) || "A"}
  //                 </div>
  //                 <div className="ml-6">
  //                   <h2 className="text-2xl font-semibold">{user?.name || "Academy User"}</h2>
  //                   <div className="flex flex-col text-sm text-gray-600 mt-1">
  //                     <div className="flex items-center mb-1">
  //                       <span className="mr-2">✓ Verified:</span>
  //                       <span className="text-green-600">✉</span>
  //                     </div>
  //                     <div className="flex items-center mb-1">
  //                       <span className="mr-2">📅 Joined:</span>
  //                       <span>Mar 7, 2025</span>
  //                     </div>
  //                     <div className="flex items-center">
  //                       <span className="mr-2">📍 Location:</span>
  //                       <span>Rwanda, Kigali</span>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>

  //               <div className="flex flex-col md:flex-row justify-end md:w-2/3 mt-6 md:mt-0">
  //                 <div className="bg-red-500 text-white rounded-lg p-4 text-center w-full md:w-56 md:mr-4">
  //                   <div className="text-4xl font-bold">{stats.totalCourses}</div>
  //                   <div>Total Courses</div>
  //                 </div>
  //                 <div className="bg-green-500 text-white rounded-lg p-4 text-center w-full md:w-56 mt-4 md:mt-0">
  //                   <div className="text-4xl font-bold">{stats.totalStudents}</div>
  //                   <div>Total Students</div>
  //                 </div>
  //               </div>
  //             </div>

  //             {/* Navigation Tabs */}
  //             <div className="border-t border-gray-200">
  //               <div className="flex overflow-x-auto">
  //                 {menuItems.map((item, index) => (
  //                   <Link 
  //                     key={index} 
  //                     to={item.path}
  //                     className={`px-6 py-4 text-center flex-shrink-0 ${
  //                       item.active 
  //                         ? 'text-green-600 border-b-2 border-green-600 font-medium' 
  //                         : 'text-gray-600 hover:text-green-600'
  //                     }`}
  //                   >
  //                     <div className="flex items-center justify-center">
  //                       <span className="mr-2">{item.icon}</span>
  //                       <span>{item.name}</span>
  //                     </div>
  //                   </Link>
  //                 ))}
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>

  //       {/* Dashboard Content */}
  //       <div className="container mx-auto px-4 pb-8">
  //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //           {/* Membership Card */}
  //           <div className="bg-white rounded-lg shadow-md p-6">
  //             <h2 className="text-xl font-semibold mb-6 border-b pb-2">Membership</h2>
              
  //             <div className="space-y-4">
  //               <div className="flex justify-between items-center">
  //                 <span className="text-gray-600">Account Type</span>
  //                 <span className="font-medium">Free</span>
  //               </div>
                
  //               <div className="flex justify-between items-center">
  //                 <span className="text-gray-600">Limit of live courses</span>
  //                 <span className="font-medium">10</span>
  //               </div>
                
  //               <div className="flex justify-between items-center">
  //                 <span className="text-gray-600">Live Courses</span>
  //                 <span className="font-medium">{stats.activeClasses}</span>
  //               </div>
                
  //               <div className="flex justify-between items-center">
  //                 <span className="text-gray-600">Remaining</span>
  //                 <span className="font-medium">{stats.remainingClasses}</span>
  //               </div>
                
  //               <div className="flex justify-between items-center">
  //                 <span className="text-gray-600">Premium Courses</span>
  //                 <span className="font-medium">0</span>
  //               </div>
  //             </div>
  //           </div>

  //           {/* Activity Summary Card */}
  //           <div className="bg-white rounded-lg shadow-md p-6">
  //             <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Free <span className="float-right">10 Courses</span></h2>
              
  //             <div className="mt-4">
  //               <div className="grid grid-cols-2 gap-4 mb-4">
  //                 <div className="bg-gray-100 rounded-md p-3 text-center">
  //                   <div className="text-gray-600">Active courses ({stats.activeClasses})</div>
  //                 </div>
  //                 <div className="bg-gray-100 rounded-md p-3 text-center">
  //                   <div className="text-gray-600">Remaining courses ({stats.remainingClasses})</div>
  //                 </div>
  //               </div>
                
  //               <div className="mt-4">
  //                 <div className="w-full bg-gray-200 rounded-full h-2.5">
  //                   <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${(stats.activeClasses / 10) * 100}%` }}></div>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
          
  //         {/* Recent Activity Section */}
  //         <div className="bg-white rounded-lg shadow-md p-6 mt-6">
  //           <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
            
  //           <div className="border rounded-lg overflow-hidden">
  //             <table className="min-w-full divide-y divide-gray-200">
  //               <thead className="bg-gray-50">
  //                 <tr>
  //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
  //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
  //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
  //                 </tr>
  //               </thead>
  //               <tbody className="bg-white divide-y divide-gray-200">
  //                 <tr>
  //                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Mar 07, 2025</td>
  //                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Account created</td>
  //                   <td className="px-6 py-4 whitespace-nowrap text-sm">
  //                     <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completed</span>
  //                   </td>
  //                 </tr>
  //                 <tr>
  //                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Mar 07, 2025</td>
  //                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Email verification</td>
  //                   <td className="px-6 py-4 whitespace-nowrap text-sm">
  //                     <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completed</span>
  //                   </td>
  //                 </tr>
  //                 <tr>
  //                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Mar 07, 2025</td>
  //                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Profile setup</td>
  //                   <td className="px-6 py-4 whitespace-nowrap text-sm">
  //                     <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>
  //                   </td>
  //                 </tr>
  //               </tbody>
  //             </table>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  // export default AcademyDashboard;

 

// Modified AcademyDashboard.js

import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import {
  FiGrid,
  FiUser,
  FiSettings,
  FiMessageCircle,
  FiBell,
  FiLogOut,
} from 'react-icons/fi';
import { getUserById } from '../../Redux/Slices/user_slice';
import { getAcademyDetails } from '../../Redux/Slices/academy/academy_details';
const AcademyDashboard = () => {
  const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.auth || {});
  const { userInfo } = useSelector((state) => state.user);
  const user = useSelector((state) => state.user.userInfo);
  const { academyDetails, isLoading, error } = useSelector((state) => state.academy);
  const location = useLocation();
  const [stats, setStats] = useState({
    totalCourses: 104,
    totalStudents: 0,
    activeClasses: 0,
    remainingClasses: 10,
  });
   
 
  const userId = localStorage.getItem('user_id'); 
  
  useEffect(() => {
    if (userId) {
      dispatch(getUserById(userId));
      dispatch(getAcademyDetails(userId));
    }
  }, [dispatch, userId]);

  const menuItems = [
    { name: 'DASHBOARD', icon: <FiGrid />, path: '/aca_dashboard/overview' },
    { name: 'PROFILE', icon: <FiUser />, path: '/aca_dashboard/acad_profile' },
    { name: 'ORDERS', icon: <FiGrid />, path: '/aca_dashboard/acad_orders' },
    { name: 'SETTINGS', icon: <FiSettings />, path: '/aca_dashboard/settings' },
    { name: 'CHATS', icon: <FiMessageCircle />, path: '/aca_dashboard/chats' },
    { name: 'NOTIFICATIONS', icon: <FiBell />, path: '/aca_dashboard/notifications' },
    { name: 'LOGOUT', icon: <FiLogOut />, path: '/aca_dashboard/logout' },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Dashboard Header with collage background */}
      <div className="relative">
        <div 
          className="h-72 bg-cover bg-center"
          style={{ 
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/child.jpg')" 
          }}
        >
          <div className="container mx-auto px-4 pt-16 text-center">
            <h1 className="text-4xl font-bold text-white mb-2">DASHBOARD</h1>
            <div className="text-white">
              <span>Home</span>
              <span className="mx-2">›</span>
              <span className="text-green-400">Dashboard</span>
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md -mt-20 mb-8 overflow-hidden">
            <div className="flex flex-col md:flex-row p-6">
              <div className="flex items-center md:w-1/3">
                <div className="w-24 h-24 rounded-full bg-green-600 flex items-center justify-center text-white text-5xl font-bold">
                  {user?.name?.charAt(0) || "A"}
                </div>
                <div className="ml-6">
                  <h2 className="text-2xl font-semibold">{userInfo.username || "Academy User"}</h2>
                  <div className="flex flex-col text-sm text-gray-600 mt-1">
                    <div className="flex items-center mb-1">
                    <span className={user.isVerified ? "text-green-600" : "text-red-500"}>
                        {user.isVerified ? "✅ Yes" : "❌ No"}
                      </span>
                      <span className="text-green-600">✉</span>
                    </div>
                    <div className="flex items-center mb-1">
                      <span className="mr-2">📅 Joined:</span>
                      <span>Mar 7, 2025</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">📍 Location:</span>
                      <span>
  {[
    academyDetails?.province,
    academyDetails?.district,
    academyDetails?.sector
  ].filter(Boolean).join(', ') || "Unknown"}
</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-end md:w-2/3 mt-6 md:mt-0">
                <div className="bg-red-500 text-white rounded-lg p-4 text-center w-full md:w-56 md:mr-4">
                  <div className="text-4xl font-bold">{stats.totalCourses}</div>
                  <div>Total Courses</div>
                </div>
                <div className="bg-green-500 text-white rounded-lg p-4 text-center w-full md:w-56 mt-4 md:mt-0">
                  <div className="text-4xl font-bold">{stats.totalStudents}</div>
                  <div>Total Students</div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="border-t border-gray-200">
              <div className="flex overflow-x-auto">
                {menuItems.map((item, index) => (
                  <Link 
                    key={index} 
                    to={item.path}
                    className={`px-6 py-4 text-center flex-shrink-0 ${
                      location.pathname === item.path
                        ? 'text-green-600 border-b-2 border-green-600 font-medium' 
                        : 'text-gray-600 hover:text-green-600'
                    }`}
                  >
                    <div className="flex items-center justify-center">
                      <span className="mr-2">{item.icon}</span>
                      <span>{item.name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area - This is where route components will be rendered */}
      <div className="container mx-auto px-4 pb-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AcademyDashboard;