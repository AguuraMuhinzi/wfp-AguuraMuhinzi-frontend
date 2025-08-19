// src/pages/CooperativeNotifications.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifications, markAsRead } from '../../Redux/Slices/notifications/notification_slice';
import { Bell, Check, RefreshCcw, ChevronRight, ChevronDown } from 'lucide-react';

const timeAgo = (ts) => {
  const d = new Date(ts);
  const t = d.getTime();
  if (Number.isNaN(t)) return '';
  const diff = Math.floor((Date.now() - t) / 1000);
  if (diff < 60) return `${diff}s ago`;
  const m = Math.floor(diff / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const days = Math.floor(h / 24);
  return `${days}d ago`;
};

const CooperativeNotifications = () => {
  const dispatch = useDispatch();

  const userId = localStorage.getItem('user_id');
  const { list = [], isLoading = false, error = null } = useSelector((state) => state.notifications);

  const [filter, setFilter] = useState('all'); // 'all' | 'unread' | 'read'
  const [expandedId, setExpandedId] = useState(null); // which notification is expanded

  const unreadCount = useMemo(() => list.filter((n) => !n.is_read).length, [list]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchNotifications(userId));
    }
  }, [dispatch, userId]);

  const handleRefresh = () => {
    if (userId) dispatch(fetchNotifications(userId));
  };

  const handleToggleExpand = (n) => {
    const willExpand = expandedId !== n.id;
    setExpandedId(willExpand ? n.id : null);

    // Mark as read when expanding
    if (willExpand && !n.is_read) {
      dispatch(markAsRead(n.id));
    }
  };

  const handleMarkAllAsRead = async () => {
    const unread = list.filter((n) => !n.is_read);
    await Promise.all(unread.map((n) => dispatch(markAsRead(n.id))));
  };

  const filtered = useMemo(() => {
    let arr = list;
    if (filter === 'unread') arr = list.filter((n) => !n.is_read);
    if (filter === 'read') arr = list.filter((n) => n.is_read);
    // Newest first
    return [...arr].sort((a, b) => {
      const da = new Date(a.created_at || a.timestamp || a.createdAt).getTime();
      const db = new Date(b.created_at || b.timestamp || b.createdAt).getTime();
      return db - da;
    });
  }, [list, filter]);

  if (!userId) {
    return (
      <div className="p-6">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-xl p-4">
          Please log in to view notifications.
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <Bell className="w-5 h-5 text-green-700" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            <p className="text-sm text-gray-500">{unreadCount} unread</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleMarkAllAsRead}
            disabled={unreadCount === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 disabled:opacity-50"
            title="Mark all as read"
          >
            <Check className="w-4 h-4" />
            Mark all as read
          </button>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white"
            title="Refresh"
          >
            <RefreshCcw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        {['all', 'unread', 'read'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl border ${
              filter === f
                ? 'bg-green-600 text-white border-green-600'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {isLoading && (
          <div className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-gray-100 rounded"></div>
              <div className="h-6 bg-gray-100 rounded"></div>
              <div className="h-6 bg-gray-100 rounded"></div>
            </div>
          </div>
        )}

        {!isLoading && error && (
          <div className="p-6 text-red-600">
            Failed to load notifications: {typeof error === 'string' ? error : JSON.stringify(error)}
          </div>
        )}

        {!isLoading && !error && filtered.length === 0 && (
          <div className="p-10 text-center text-gray-500">
            No notifications {filter !== 'all' ? `(${filter})` : ''} yet.
          </div>
        )}

        {!isLoading && !error && filtered.length > 0 && (
          <ul className="divide-y divide-gray-100">
            {filtered.map((n) => {
              const created = n.created_at || n.timestamp || n.createdAt;
              const expanded = expandedId === n.id;

              return (
                <li key={n.id} className={`p-4 sm:p-5 ${!n.is_read ? 'bg-green-50/60' : 'bg-white'}`}>
                  {/* Collapsed header: ONLY title (+ small time) */}
                  <button
                    className="w-full flex items-center justify-between text-left"
                    onClick={() => handleToggleExpand(n)}
                  >
                    <div className="flex items-center gap-2">
                      {expanded ? (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-500" />
                      )}
                      <span className="font-semibold text-gray-900">{n.title}</span>
                      {!n.is_read && <span className="inline-block w-2 h-2 rounded-full bg-green-600" />}
                    </div>
                    <div className="text-xs text-gray-400">{timeAgo(created)}</div>
                  </button>

                  {/* Expanded details */}
                  {expanded && (
                    <div className="mt-3 pl-7">
                      <p className="text-gray-700">{n.message}</p>
                      {/* You can place extra actions here, e.g., link to order page if type === 'order' */}
                      {/* {n.notification_type === 'order' && (
                        <Link to={`/dashboard/orders/${someId}`} className="text-green-600 text-sm mt-2 inline-block">
                          View order
                        </Link>
                      )} */}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CooperativeNotifications;