import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../../Redux/Slices/user_slice';
import { FiSearch, FiUsers, FiCheckCircle, FiXCircle, FiUser, FiPackage, FiBookOpen } from 'react-icons/fi';

const ROLE_LABELS = {
  cooperative: 'Cooperative',
  academy: 'Academy',
};

const AdminUsers = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.user.allUsers || []);
  const loading = useSelector((state) => state.user.loading);
  const [roleFilter, setRoleFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  // Filtered users (exclude admins)
  const filteredUsers = useMemo(() => {
    let users = allUsers.filter((u) => u.role !== 'admin');
    if (roleFilter === 'cooperative') {
      users = users.filter((u) => u.role === 'cooperative');
    } else if (roleFilter === 'academy') {
      users = users.filter((u) => u.role === 'academy');
    }
    if (search.trim()) {
      const s = search.trim().toLowerCase();
      users = users.filter(
        (u) =>
          (u.username && u.username.toLowerCase().includes(s)) ||
          (u.name && u.name.toLowerCase().includes(s))
      );
    }
    return users;
  }, [allUsers, roleFilter, search]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <FiUsers className="text-blue-600" /> User Management
        </h1>
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded-lg border font-medium transition-all duration-150 ${roleFilter === 'all' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'}`}
            onClick={() => setRoleFilter('all')}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded-lg border font-medium transition-all duration-150 ${roleFilter === 'cooperative' ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-green-50'}`}
            onClick={() => setRoleFilter('cooperative')}
          >
            Cooperatives
          </button>
          <button
            className={`px-4 py-2 rounded-lg border font-medium transition-all duration-150 ${roleFilter === 'academy' ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-purple-50'}`}
            onClick={() => setRoleFilter('academy')}
          >
            Academies
          </button>
        </div>
        <div className="relative w-full md:w-72">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Search by username or name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">District</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-400">Loading users...</td>
              </tr>
            ) : filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-400">No users found.</td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 flex items-center gap-2">
                    <FiUser className="text-blue-400" /> {user.username || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${user.role === 'cooperative' ? 'bg-green-100 text-green-700' : user.role === 'academy' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>
                      {ROLE_LABELS[user.role] || user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.district || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {Boolean(user.is_active) ? (
                      <span className="flex items-center gap-1 text-green-600 font-medium"><FiCheckCircle /> Active</span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-500 font-medium"><FiXCircle /> Inactive</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {/* Placeholder for actions (edit, deactivate, etc.) */}
                    <button className="text-blue-600 hover:underline text-sm font-medium">Manage</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
