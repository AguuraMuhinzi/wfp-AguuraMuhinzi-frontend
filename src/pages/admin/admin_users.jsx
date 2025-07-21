import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../../Redux/Slices/user_slice';
import { fetchCooperativeDetails } from '../../Redux/Slices/cooperative/coop_details';
import { getAcademyDetails } from '../../Redux/Slices/academy/academy_details';
import { FiSearch, FiUsers, FiCheckCircle, FiXCircle, FiUser, FiPackage, FiBookOpen, FiMail, FiX } from 'react-icons/fi';

const ROLE_LABELS = {
  cooperative: 'Cooperative',
  academy: 'Academy',
};

const UserDetailModal = ({ user, coopDetails, academyDetails, loading, onClose }) => {
  if (!user) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
          <FiX className="w-6 h-6" />
        </button>
        <div className="flex flex-col items-center gap-3 mb-6">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-3xl font-bold">
            {(user.username || user.email || 'U')[0].toUpperCase()}
          </div>
          <h2 className="text-xl font-bold text-gray-900">{user.username}</h2>
          <div className="flex items-center gap-2 text-gray-600">
            <FiMail /> <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${user.role === 'cooperative' ? 'bg-green-100 text-green-700' : user.role === 'academy' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>{ROLE_LABELS[user.role] || user.role}</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-700 w-28">Joined On:</span>
            <span>{user.date_joined ? new Date(user.date_joined).toLocaleDateString() : '-'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-700 w-28">Status:</span>
            {user.is_active === true || user.is_active === 'true' ? (
              <span className="flex items-center gap-1 text-green-600 font-medium"><FiCheckCircle /> Active</span>
            ) : (
              <span className="flex items-center gap-1 text-red-500 font-medium"><FiXCircle /> Inactive</span>
            )}
          </div>
          {/* Show extra details for cooperative or academy */}
          {loading && ( <div className="text-center text-blue-600 py-4">Loading details...</div> )}
          {user.role === 'cooperative' && coopDetails && (
            <>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700 w-28">Coop Name:</span>
                <span>{coopDetails.name || '-'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700 w-28">Specialization:</span>
                <span>{coopDetails.specialization || '-'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700 w-28">District:</span>
                <span>{coopDetails.district || '-'}</span>
              </div>
            </>
          )}
          {user.role === 'academy' && academyDetails && (
            <>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700 w-28">Academy Name:</span>
                <span>{academyDetails.name || '-'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700 w-28">Level:</span>
                <span>{academyDetails.level || '-'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700 w-28">District:</span>
                <span>{academyDetails.district || '-'}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const AdminUsers = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.user.allUsers || []);
  const loading = useSelector((state) => state.user.loading);
  const coopDetails = useSelector((state) => state.cooperative.data);
  const coopLoading = useSelector((state) => state.cooperative.isLoading);
  const academyDetails = useSelector((state) => state.academy.academyDetails);
  const academyLoading = useSelector((state) => state.academy.isLoading);
  const [roleFilter, setRoleFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  // Fetch details when a user is selected
  useEffect(() => {
    if (selectedUser) {
      if (selectedUser.role === 'cooperative') {
        dispatch(fetchCooperativeDetails(selectedUser.id));
      } else if (selectedUser.role === 'academy') {
        dispatch(getAcademyDetails(selectedUser.id));
      }
    }
  }, [selectedUser, dispatch]);

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
          (u.email && u.email.toLowerCase().includes(s))
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
            placeholder="Search by username or email..."
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined On</th>
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
                <tr key={user.id} className="hover:bg-blue-50 transition-colors cursor-pointer" onClick={() => setSelectedUser(user)}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 flex items-center gap-2">
                    <FiUser className="text-blue-400" /> {user.username || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${user.role === 'cooperative' ? 'bg-green-100 text-green-700' : user.role === 'academy' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>
                      {ROLE_LABELS[user.role] || user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.date_joined || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.is_active === true || user.is_active === 'true' ? (
                      <span className="flex items-center gap-1 text-green-600 font-medium"><FiCheckCircle /> Active</span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-500 font-medium"><FiXCircle /> Inactive</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-600 hover:underline text-sm font-medium" onClick={e => { e.stopPropagation(); setSelectedUser(user); }}>Manage</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <UserDetailModal
        user={selectedUser}
        coopDetails={selectedUser?.role === 'cooperative' ? coopDetails : null}
        academyDetails={selectedUser?.role === 'academy' ? academyDetails : null}
        loading={selectedUser?.role === 'cooperative' ? coopLoading : selectedUser?.role === 'academy' ? academyLoading : false}
        onClose={() => setSelectedUser(null)}
      />
    </div>
  );
};

export default AdminUsers;
