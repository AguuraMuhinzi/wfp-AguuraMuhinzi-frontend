import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  FiGrid,
  FiUser,
  FiTrendingUp,
  FiMessageCircle,
  FiBell,
  FiLogOut,
} from 'react-icons/fi';
import { getUserById } from '../../Redux/Slices/user_slice';
import { getAcademyDetails } from '../../Redux/Slices/academy/academy_details';
import { fetchOrders } from '../../Redux/Slices/order/orderSlice';
import { fetchNotifications } from '../../Redux/Slices/notifications/notification_slice';

const AcademyDashboard = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const user = useSelector((state) => state.user.userInfo);
  const { academyDetails } = useSelector((state) => state.academy);
  const orders = useSelector((state) => state.order.orders || []);
  const location = useLocation();

  // Notifications state + unread count (safe fallback)
  const notificationsState = useSelector((s) => s.notifications) || {};
  const { list = [] } = notificationsState;
  const unread = list.filter((n) => !n.is_read).length;

  const totalOrders = Array.isArray(orders) && user && user.id
    ? orders.filter((o) => o.user && String(o.user.id) === String(user.id)).length
    : 0;

  const [stats, setStats] = useState({
    totalOrders,
    activeClasses: 0,
    remainingClasses: 10,
  });

  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    if (userId) {
      dispatch(getUserById(userId));
      dispatch(getAcademyDetails(userId));
      dispatch(fetchOrders());
      // Prefetch notifications
      dispatch(fetchNotifications(userId));
    }
  }, [dispatch, userId]);

  // Optional: Poll every 20s to keep the bell fresh
  useEffect(() => {
    if (!userId) return;
    const id = setInterval(() => dispatch(fetchNotifications(userId)), 20000);
    return () => clearInterval(id);
  }, [dispatch, userId]);

  // Logout via nav item
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  const menuItems = [
    { name: 'DASHBOARD', icon: <FiGrid />, path: '/aca_dashboard/overview' },
    { name: 'PROFILE', icon: <FiUser />, path: '/aca_dashboard/acad_profile' },
    { name: 'ORDERS', icon: <FiGrid />, path: '/aca_dashboard/acad_orders' },
    { name: 'SMART MARKET', icon: <FiTrendingUp />, path: '/aca_dashboard/acad_prediction' },
    { name: 'ANALYTICS', icon: <FiMessageCircle />, path: '/aca_dashboard/analytics' },
    { name: 'NOTIFICATIONS', icon: <FiBell />, path: '/aca_dashboard/notifications' },
    { name: 'Contact Us', icon: <FiMessageCircle />, path: '/aca_dashboard/contact_us' },
    { name: 'NOTIFICATIONS', icon: <FiBell />, path: '/aca_dashboard/acadNotification' },
    { name: 'LOGOUT', icon: <FiLogOut />, path: '/aca_dashboard/logout' },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="relative">
        <div
          className="h-72 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/child.jpg')",
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
                  {user?.name?.charAt(0) || 'A'}
                </div>
                <div className="ml-6">
                  <h2 className="text-2xl font-semibold">
                    {userInfo.username || 'Academy User'}
                  </h2>
                  <div className="flex flex-col text-sm text-gray-600 mt-1">
                    <div className="flex items-center mb-1">
                      <span className={user?.isVerified ? 'text-green-600' : 'text-red-500'}>
                        {user?.isVerified ? '✅ Yes' : '❌ No'}
                      </span>
                      <span className="text-green-600">✉</span>
                    </div>
                    <div className="flex items-center mb-1">
                      <span className="mr-2">📅 Joined:</span>
                      <span>{user?.date_joined || 'Unknown'}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">📍 Location:</span>
                      <span>
                        {[
                          academyDetails?.province,
                          academyDetails?.district,
                          academyDetails?.sector,
                        ]
                          .filter(Boolean)
                          .join(', ') || 'Unknown'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions: Order Now + Bell */}
              <div className="flex flex-col md:flex-row justify-end md:w-2/3 mt-6 md:mt-0">
                <div className="flex items-center justify-center mt-4 md:mt-0 md:ml-4 gap-3">
                  <Link
                    to="/home"
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg transition-colors duration-200"
                  >
                    Order Now
                  </Link>

                  {/* Notifications Bell with unread badge */}
                  <Link
                    to="/aca_dashboard/acadNotification"
                    className="relative p-3 bg-white border border-gray-200 rounded-full hover:bg-gray-50 shadow-sm"
                    title="Notifications"
                    onClick={() => userId && dispatch(fetchNotifications(userId))}
                  >
                    <FiBell className="w-5 h-5 text-gray-600" />
                    {unread > 0 && (
                      <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 text-xs leading-[18px] rounded-full bg-red-600 text-white text-center">
                        {unread > 99 ? '99+' : unread}
                      </span>
                    )}
                  </Link>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="border-t border-gray-200">
              <div className="flex overflow-x-auto">
                {menuItems.map((item, index) => {
                  const isActive = location.pathname === item.path;

                  // Special-case: Logout as a button
                  if (item.name === 'LOGOUT') {
                    return (
                      <button
                        key={index}
                        onClick={handleLogout}
                        className="px-6 py-4 text-center flex-shrink-0 text-gray-600 hover:text-green-600"
                        title="Logout"
                      >
                        <div className="flex items-center justify-center">
                          <span className="mr-2">{item.icon}</span>
                          <span>{item.name}</span>
                        </div>
                      </button>
                    );
                  }

                  // Default nav links
                  return (
                    <Link
                      key={index}
                      to={item.path}
                      className={`px-6 py-4 text-center flex-shrink-0 ${
                        isActive
                          ? 'text-green-600 border-b-2 border-green-600 font-medium'
                          : 'text-gray-600 hover:text-green-600'
                      }`}
                    >
                      <div className="flex items-center justify-center">
                        <span className="mr-2">{item.icon}</span>
                        <span>{item.name}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto px-4 pb-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AcademyDashboard;