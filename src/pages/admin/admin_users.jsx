// import React, { useEffect, useState, useMemo } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchAllUsers } from '../../Redux/Slices/user_slice';
// import { fetchCooperativeDetails } from '../../Redux/Slices/cooperative/coop_details';
// import { getAcademyDetails } from '../../Redux/Slices/academy/academy_details';
// import { FiSearch, FiUsers, FiCheckCircle, FiXCircle, FiUser, FiPackage, FiBookOpen, FiMail, FiX } from 'react-icons/fi';

// const ROLE_LABELS = {
//   cooperative: 'Cooperative',
//   academy: 'Academy',
// };

// const UserDetailModal = ({ user, coopDetails, academyDetails, loading, onClose }) => {
//   if (!user) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
//       <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
//         <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
//           <FiX className="w-6 h-6" />
//         </button>
//         <div className="flex flex-col items-center gap-3 mb-6">
//           <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-3xl font-bold">
//             {(user.username || user.email || 'U')[0].toUpperCase()}
//           </div>
//           <h2 className="text-xl font-bold text-gray-900">{user.username}</h2>
//           <div className="flex items-center gap-2 text-gray-600">
//             <FiMail /> <span>{user.email}</span>
//           </div>
//           <div className="flex items-center gap-2 text-gray-600">
//             <span className={`px-2 py-1 rounded-full text-xs font-semibold ${user.role === 'cooperative' ? 'bg-green-100 text-green-700' : user.role === 'academy' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>{ROLE_LABELS[user.role] || user.role}</span>
//           </div>
//         </div>
//         <div className="space-y-2">
//           <div className="flex items-center gap-2">
//             <span className="font-medium text-gray-700 w-28">Joined On:</span>
//             <span>{user.date_joined ? new Date(user.date_joined).toLocaleDateString() : '-'}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <span className="font-medium text-gray-700 w-28">Status:</span>
//             {user.is_active === true || user.is_active === 'true' ? (
//               <span className="flex items-center gap-1 text-green-600 font-medium"><FiCheckCircle /> Active</span>
//             ) : (
//               <span className="flex items-center gap-1 text-red-500 font-medium"><FiXCircle /> Inactive</span>
//             )}
//           </div>
//           {/* Show extra details for cooperative or academy */}
//           {loading && ( <div className="text-center text-blue-600 py-4">Loading details...</div> )}
//           {user.role === 'cooperative' && coopDetails && (
//             <>
//               <div className="flex items-center gap-2">
//                 <span className="font-medium text-gray-700 w-28">Coop Name:</span>
//                 <span>{coopDetails.name || '-'}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <span className="font-medium text-gray-700 w-28">Specialization:</span>
//                 <span>{coopDetails.specialization || '-'}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <span className="font-medium text-gray-700 w-28">District:</span>
//                 <span>{coopDetails.district || '-'}</span>
//               </div>
//             </>
//           )}
//           {user.role === 'academy' && academyDetails && (
//             <>
//               <div className="flex items-center gap-2">
//                 <span className="font-medium text-gray-700 w-28">Academy Name:</span>
//                 <span>{academyDetails.name || '-'}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <span className="font-medium text-gray-700 w-28">Level:</span>
//                 <span>{academyDetails.level || '-'}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <span className="font-medium text-gray-700 w-28">District:</span>
//                 <span>{academyDetails.district || '-'}</span>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const AdminUsers = () => {
//   const dispatch = useDispatch();
//   const allUsers = useSelector((state) => state.user.allUsers || []);
//   const loading = useSelector((state) => state.user.loading);
//   const coopDetails = useSelector((state) => state.cooperative.data);
//   const coopLoading = useSelector((state) => state.cooperative.isLoading);
//   const academyDetails = useSelector((state) => state.academy.academyDetails);
//   const academyLoading = useSelector((state) => state.academy.isLoading);
//   const [roleFilter, setRoleFilter] = useState('all');
//   const [search, setSearch] = useState('');
//   const [selectedUser, setSelectedUser] = useState(null);

//   useEffect(() => {
//     dispatch(fetchAllUsers());
//   }, [dispatch]);

//   // Fetch details when a user is selected
//   useEffect(() => {
//     if (selectedUser) {
//       if (selectedUser.role === 'cooperative') {
//         dispatch(fetchCooperativeDetails(selectedUser.id));
//       } else if (selectedUser.role === 'academy') {
//         dispatch(getAcademyDetails(selectedUser.id));
//       }
//     }
//   }, [selectedUser, dispatch]);

//   // Filtered users (exclude admins)
//   const filteredUsers = useMemo(() => {
//     let users = allUsers.filter((u) => u.role !== 'admin');
//     if (roleFilter === 'cooperative') {
//       users = users.filter((u) => u.role === 'cooperative');
//     } else if (roleFilter === 'academy') {
//       users = users.filter((u) => u.role === 'academy');
//     }
//     if (search.trim()) {
//       const s = search.trim().toLowerCase();
//       users = users.filter(
//         (u) =>
//           (u.username && u.username.toLowerCase().includes(s)) ||
//           (u.email && u.email.toLowerCase().includes(s))
//       );
//     }
//     return users;
//   }, [allUsers, roleFilter, search]);

//   return (
//     <div className="p-6 space-y-6">
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
//           <FiUsers className="text-blue-600" /> User Management
//         </h1>
//         <div className="flex gap-2">
//           <button
//             className={`px-4 py-2 rounded-lg border font-medium transition-all duration-150 ${roleFilter === 'all' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'}`}
//             onClick={() => setRoleFilter('all')}
//           >
//             All
//           </button>
//           <button
//             className={`px-4 py-2 rounded-lg border font-medium transition-all duration-150 ${roleFilter === 'cooperative' ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-green-50'}`}
//             onClick={() => setRoleFilter('cooperative')}
//           >
//             Cooperatives
//           </button>
//           <button
//             className={`px-4 py-2 rounded-lg border font-medium transition-all duration-150 ${roleFilter === 'academy' ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-purple-50'}`}
//             onClick={() => setRoleFilter('academy')}
//           >
//             Academies
//           </button>
//         </div>
//         <div className="relative w-full md:w-72">
//           <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//           <input
//             type="text"
//             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//             placeholder="Search by username or email..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>
//       </div>

//       <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined On</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-100">
//             {loading ? (
//               <tr>
//                 <td colSpan={6} className="text-center py-8 text-gray-400">Loading users...</td>
//               </tr>
//             ) : filteredUsers.length === 0 ? (
//               <tr>
//                 <td colSpan={6} className="text-center py-8 text-gray-400">No users found.</td>
//               </tr>
//             ) : (
//               filteredUsers.map((user) => (
//                 <tr key={user.id} className="hover:bg-blue-50 transition-colors cursor-pointer" onClick={() => setSelectedUser(user)}>
//                   <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 flex items-center gap-2">
//                     <FiUser className="text-blue-400" /> {user.username || '-'}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">{user.email || '-'}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`px-2 py-1 rounded-full text-xs font-semibold ${user.role === 'cooperative' ? 'bg-green-100 text-green-700' : user.role === 'academy' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>
//                       {ROLE_LABELS[user.role] || user.role}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">{user.date_joined || '-'}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     {user.is_active === true || user.is_active === 'true' ? (
//                       <span className="flex items-center gap-1 text-green-600 font-medium"><FiCheckCircle /> Active</span>
//                     ) : (
//                       <span className="flex items-center gap-1 text-red-500 font-medium"><FiXCircle /> Inactive</span>
//                     )}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <button className="text-blue-600 hover:underline text-sm font-medium" onClick={e => { e.stopPropagation(); setSelectedUser(user); }}>Manage</button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//       <UserDetailModal
//         user={selectedUser}
//         coopDetails={selectedUser?.role === 'cooperative' ? coopDetails : null}
//         academyDetails={selectedUser?.role === 'academy' ? academyDetails : null}
//         loading={selectedUser?.role === 'cooperative' ? coopLoading : selectedUser?.role === 'academy' ? academyLoading : false}
//         onClose={() => setSelectedUser(null)}
//       />
//     </div>
//   );
// };

// export default AdminUsers;


"use client"

import { useEffect, useState, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllUsers } from "../../Redux/Slices/user_slice"
import { fetchCooperativeDetails } from "../../Redux/Slices/cooperative/coop_details"
import { getAcademyDetails } from "../../Redux/Slices/academy/academy_details"
import { FiSearch, FiUsers, FiCheckCircle, FiXCircle, FiPackage, FiBookOpen, FiMail, FiX } from "react-icons/fi"

const ROLE_LABELS = {
  cooperative: "Cooperative",
  academy: "Academy",
}

const UserDetailModal = ({ user, coopDetails, academyDetails, loading, onClose }) => {
  if (!user) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative border border-emerald-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors duration-200 p-1 rounded-full hover:bg-red-50"
        >
          <FiX className="w-6 h-6" />
        </button>

        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            {(user.username || user.email || "U")[0].toUpperCase()}
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{user.username}</h2>
            <div className="flex items-center gap-2 text-gray-600 justify-center">
              <FiMail className="w-4 h-4" />
              <span className="text-sm">{user.email}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                user.role === "cooperative"
                  ? "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border border-emerald-200"
                  : user.role === "academy"
                    ? "bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-700 border border-teal-200"
                    : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border border-gray-200"
              }`}
            >
              {ROLE_LABELS[user.role] || user.role}
            </span>
          </div>
        </div>

        <div className="space-y-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-gray-700 w-32">Joined On:</span>
            <span className="text-gray-600">
              {user.date_joined ? new Date(user.date_joined).toLocaleDateString() : "-"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-semibold text-gray-700 w-32">Status:</span>
            {user.is_active === true || user.is_active === "true" ? (
              <span className="flex items-center gap-2 text-emerald-600 font-semibold">
                <FiCheckCircle className="w-4 h-4" /> Active
              </span>
            ) : (
              <span className="flex items-center gap-2 text-red-500 font-semibold">
                <FiXCircle className="w-4 h-4" /> Inactive
              </span>
            )}
          </div>

          {loading && (
            <div className="text-center text-emerald-600 py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-600 mx-auto mb-2"></div>
              Loading details...
            </div>
          )}

          {user.role === "cooperative" && coopDetails && (
            <>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-700 w-32">Coop Name:</span>
                <span className="text-gray-600">{coopDetails.name || "-"}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-700 w-32">Specialization:</span>
                <span className="text-gray-600">{coopDetails.specialization || "-"}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-700 w-32">District:</span>
                <span className="text-gray-600">{coopDetails.district || "-"}</span>
              </div>
            </>
          )}

          {user.role === "academy" && academyDetails && (
            <>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-700 w-32">Academy Name:</span>
                <span className="text-gray-600">{academyDetails.name || "-"}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-700 w-32">Level:</span>
                <span className="text-gray-600">{academyDetails.level || "-"}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-700 w-32">District:</span>
                <span className="text-gray-600">{academyDetails.district || "-"}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

const AdminUsers = () => {
  const dispatch = useDispatch()
  const allUsers = useSelector((state) => state.user.allUsers || [])
  const loading = useSelector((state) => state.user.loading)
  const coopDetails = useSelector((state) => state.cooperative.data)
  const coopLoading = useSelector((state) => state.cooperative.isLoading)
  const academyDetails = useSelector((state) => state.academy.academyDetails)
  const academyLoading = useSelector((state) => state.academy.isLoading)

  const [roleFilter, setRoleFilter] = useState("all")
  const [search, setSearch] = useState("")
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [dispatch])

  // Fetch details when a user is selected
  useEffect(() => {
    if (selectedUser) {
      if (selectedUser.role === "cooperative") {
        dispatch(fetchCooperativeDetails(selectedUser.id))
      } else if (selectedUser.role === "academy") {
        dispatch(getAcademyDetails(selectedUser.id))
      }
    }
  }, [selectedUser, dispatch])

  // Filtered users (exclude admins)
  const filteredUsers = useMemo(() => {
    let users = allUsers.filter((u) => u.role !== "admin")
    if (roleFilter === "cooperative") {
      users = users.filter((u) => u.role === "cooperative")
    } else if (roleFilter === "academy") {
      users = users.filter((u) => u.role === "academy")
    }
    if (search.trim()) {
      const s = search.trim().toLowerCase()
      users = users.filter(
        (u) => (u.username && u.username.toLowerCase().includes(s)) || (u.email && u.email.toLowerCase().includes(s)),
      )
    }
    return users
  }, [allUsers, roleFilter, search])

  const stats = useMemo(() => {
    const total = filteredUsers.length
    const active = filteredUsers.filter((u) => u.is_active === true || u.is_active === "true").length
    const cooperatives = filteredUsers.filter((u) => u.role === "cooperative").length
    const academies = filteredUsers.filter((u) => u.role === "academy").length
    return { total, active, cooperatives, academies }
  }, [filteredUsers])

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl shadow-lg">
                  <FiUsers className="text-white w-8 h-8" />
                </div>
                User Management
              </h1>
              <p className="text-gray-600 mt-2 text-lg">Manage system users and their roles</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl p-4 border border-emerald-200">
                <div className="text-2xl font-bold text-emerald-700">{stats.total}</div>
                <div className="text-sm text-emerald-600">Total Users</div>
              </div>
              <div className="bg-gradient-to-br from-green-100 to-teal-100 rounded-xl p-4 border border-green-200">
                <div className="text-2xl font-bold text-green-700">{stats.active}</div>
                <div className="text-sm text-green-600">Active</div>
              </div>
              <div className="bg-gradient-to-br from-teal-100 to-cyan-100 rounded-xl p-4 border border-teal-200">
                <div className="text-2xl font-bold text-teal-700">{stats.cooperatives}</div>
                <div className="text-sm text-teal-600">Cooperatives</div>
              </div>
              <div className="bg-gradient-to-br from-cyan-100 to-blue-100 rounded-xl p-4 border border-cyan-200">
                <div className="text-2xl font-bold text-cyan-700">{stats.academies}</div>
                <div className="text-sm text-cyan-600">Academies</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex flex-wrap gap-3">
              <button
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  roleFilter === "all"
                    ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg transform scale-105"
                    : "bg-white text-gray-700 border-2 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300"
                }`}
                onClick={() => setRoleFilter("all")}
              >
                All Users
              </button>
              <button
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  roleFilter === "cooperative"
                    ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg transform scale-105"
                    : "bg-white text-gray-700 border-2 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300"
                }`}
                onClick={() => setRoleFilter("cooperative")}
              >
                <FiPackage className="inline w-4 h-4 mr-2" />
                Cooperatives
              </button>
              <button
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  roleFilter === "academy"
                    ? "bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-lg transform scale-105"
                    : "bg-white text-gray-700 border-2 border-teal-200 hover:bg-teal-50 hover:border-teal-300"
                }`}
                onClick={() => setRoleFilter("academy")}
              >
                <FiBookOpen className="inline w-4 h-4 mr-2" />
                Academies
              </button>
            </div>

            <div className="relative w-full lg:w-80">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400 w-5 h-5" />
              <input
                type="text"
                className="w-full pl-12 pr-4 py-3 border-2 border-emerald-200 rounded-xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400 outline-none transition-all duration-200 bg-white"
                placeholder="Search by username or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-emerald-100">
              <thead className="bg-gradient-to-r from-emerald-500 to-green-600">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-emerald-50">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12">
                      <div className="flex flex-col items-center gap-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                        <span className="text-emerald-600 font-medium">Loading users...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12">
                      <div className="flex flex-col items-center gap-4">
                        <FiUsers className="w-12 h-12 text-gray-300" />
                        <span className="text-gray-500 font-medium">No users found</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gradient-to-r hover:from-emerald-50 hover:to-green-50 transition-all duration-200 cursor-pointer group"
                      onClick={() => setSelectedUser(user)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center text-white font-bold">
                            {(user.username || user.email || "U")[0].toUpperCase()}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{user.username || "-"}</div>
                            <div className="text-sm text-gray-500">ID: {user.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{user.email || "-"}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            user.role === "cooperative"
                              ? "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border border-emerald-200"
                              : user.role === "academy"
                                ? "bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-700 border border-teal-200"
                                : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border border-gray-200"
                          }`}
                        >
                          {ROLE_LABELS[user.role] || user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        {user.date_joined ? new Date(user.date_joined).toLocaleDateString() : "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.is_active === true || user.is_active === "true" ? (
                          <span className="flex items-center gap-2 text-emerald-600 font-semibold">
                            <FiCheckCircle className="w-4 h-4" /> Active
                          </span>
                        ) : (
                          <span className="flex items-center gap-2 text-red-500 font-semibold">
                            <FiXCircle className="w-4 h-4" /> Inactive
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-4 py-2 rounded-lg font-medium hover:from-emerald-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 shadow-md"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedUser(user)
                          }}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <UserDetailModal
          user={selectedUser}
          coopDetails={selectedUser?.role === "cooperative" ? coopDetails : null}
          academyDetails={selectedUser?.role === "academy" ? academyDetails : null}
          loading={
            selectedUser?.role === "cooperative"
              ? coopLoading
              : selectedUser?.role === "academy"
                ? academyLoading
                : false
          }
          onClose={() => setSelectedUser(null)}
        />
      </div>
    </div>
  )
}

export default AdminUsers
