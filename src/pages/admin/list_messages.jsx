// // import React, { useState, useEffect } from 'react';
// // import { MessageSquare, RefreshCw, Mail, User, Calendar, Search, Filter, Trash2, Eye, Reply, Archive } from 'lucide-react';

// // const AdminMessagesPage = () => {
// //   const [messages, setMessages] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [selectedMessage, setSelectedMessage] = useState(null);
// //   const [filterStatus, setFilterStatus] = useState('all'); // all, read, unread
// //   const [sortBy, setSortBy] = useState('newest'); // newest, oldest, subject

// //   // Base URL for API calls
// //   const API_BASE_URL = 'http://localhost:8000';

// //   // Get auth token (adjust this based on your auth system)
// //   const getAuthToken = () => {
// //     return localStorage.getItem('authToken') || sessionStorage.getItem('authToken') || '';
// //   };

// //   const fetchMessages = async () => {
// //     setLoading(true);
// //     setError(null);
    
// //     try {
// //       const response = await fetch(`${API_BASE_URL}/api/v1/contact/messages/`, {
// //         headers: {
// //           'Authorization': `Bearer ${getAuthToken()}`,
// //           'Content-Type': 'application/json'
// //         }
// //       });

// //       if (!response.ok) {
// //         if (response.status === 401) {
// //           throw new Error('Unauthorized. Please log in as admin.');
// //         }
// //         if (response.status === 403) {
// //           throw new Error('Access forbidden. Admin privileges required.');
// //         }
// //         throw new Error(`Failed to fetch messages. Status: ${response.status}`);
// //       }

// //       const data = await response.json();
// //       setMessages(Array.isArray(data) ? data : []);
// //     } catch (err) {
// //       console.error('Error fetching messages:', err);
// //       setError(err.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Mark message as read/unread
// //   const toggleMessageStatus = async (messageId, currentStatus) => {
// //     try {
// //       // This would need to be implemented in your Django backend
// //       const response = await fetch(`${API_BASE_URL}/api/v1/contact/messages/${messageId}/status/`, {
// //         method: 'PATCH',
// //         headers: {
// //           'Authorization': `Bearer ${getAuthToken()}`,
// //           'Content-Type': 'application/json'
// //         },
// //         body: JSON.stringify({ is_read: !currentStatus })
// //       });

// //       if (response.ok) {
// //         fetchMessages(); // Refresh messages
// //       }
// //     } catch (err) {
// //       console.error('Error updating message status:', err);
// //     }
// //   };

// //   // Delete message
// //   const deleteMessage = async (messageId) => {
// //     if (!confirm('Are you sure you want to delete this message?')) return;

// //     try {
// //       const response = await fetch(`${API_BASE_URL}/api/v1/contact/messages/${messageId}/`, {
// //         method: 'DELETE',
// //         headers: {
// //           'Authorization': `Bearer ${getAuthToken()}`
// //         }
// //       });

// //       if (response.ok) {
// //         setMessages(messages.filter(msg => msg.id !== messageId));
// //         setSelectedMessage(null);
// //       }
// //     } catch (err) {
// //       console.error('Error deleting message:', err);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchMessages();
// //   }, []);

// //   // Filter and sort messages
// //   const filteredMessages = messages
// //     .filter(msg => {
// //       const matchesSearch = 
// //         msg.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //         msg.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //         msg.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //         msg.message?.toLowerCase().includes(searchTerm.toLowerCase());

// //       const matchesFilter = 
// //         filterStatus === 'all' ||
// //         (filterStatus === 'read' && msg.is_read) ||
// //         (filterStatus === 'unread' && !msg.is_read);

// //       return matchesSearch && matchesFilter;
// //     })
// //     .sort((a, b) => {
// //       switch (sortBy) {
// //         case 'oldest':
// //           return new Date(a.created_at || a.timestamp) - new Date(b.created_at || b.timestamp);
// //         case 'subject':
// //           return (a.subject || '').localeCompare(b.subject || '');
// //         default: // newest
// //           return new Date(b.created_at || b.timestamp) - new Date(a.created_at || a.timestamp);
// //       }
// //     });

// //   const formatDate = (dateString) => {
// //     if (!dateString) return 'N/A';
// //     return new Date(dateString).toLocaleString();
// //   };

// //   if (loading && messages.length === 0) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
// //           <p className="text-gray-600">Loading messages...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       {/* Header */}
// //       <div className="bg-white shadow-sm border-b">
// //         <div className="max-w-7xl mx-auto px-4 py-6">
// //           <div className="flex justify-between items-center mb-6">
// //             <div>
// //               <h1 className="text-3xl font-bold text-gray-900">Contact Messages</h1>
// //               <p className="text-gray-600 mt-1">Manage and respond to user inquiries</p>
// //             </div>
// //             <button
// //               onClick={fetchMessages}
// //               disabled={loading}
// //               className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
// //             >
// //               <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
// //               Refresh
// //             </button>
// //           </div>

// //           {/* Search and Filters */}
// //           <div className="flex flex-col sm:flex-row gap-4">
// //             <div className="relative flex-1">
// //               <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
// //               <input
// //                 type="text"
// //                 placeholder="Search messages..."
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
// //               />
// //             </div>
            
// //             <select
// //               value={filterStatus}
// //               onChange={(e) => setFilterStatus(e.target.value)}
// //               className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
// //             >
// //               <option value="all">All Messages</option>
// //               <option value="unread">Unread</option>
// //               <option value="read">Read</option>
// //             </select>

// //             <select
// //               value={sortBy}
// //               onChange={(e) => setSortBy(e.target.value)}
// //               className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
// //             >
// //               <option value="newest">Newest First</option>
// //               <option value="oldest">Oldest First</option>
// //               <option value="subject">By Subject</option>
// //             </select>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="max-w-7xl mx-auto px-4 py-6">
// //         {error ? (
// //           <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
// //             <p className="text-red-700">{error}</p>
// //             <button
// //               onClick={fetchMessages}
// //               className="mt-2 text-red-600 hover:text-red-800 font-medium"
// //             >
// //               Try Again
// //             </button>
// //           </div>
// //         ) : null}

// //         <div className="grid lg:grid-cols-3 gap-6">
// //           {/* Messages List */}
// //           <div className="lg:col-span-1 bg-white rounded-lg shadow">
// //             <div className="p-4 border-b">
// //               <h2 className="font-semibold text-gray-900">
// //                 Messages ({filteredMessages.length})
// //               </h2>
// //             </div>
            
// //             <div className="divide-y max-h-96 overflow-y-auto">
// //               {filteredMessages.length === 0 ? (
// //                 <div className="p-8 text-center">
// //                   <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
// //                   <p className="text-gray-500">No messages found</p>
// //                 </div>
// //               ) : (
// //                 filteredMessages.map((message) => (
// //                   <div
// //                     key={message.id || message.email + message.subject}
// //                     onClick={() => setSelectedMessage(message)}
// //                     className={`p-4 cursor-pointer hover:bg-gray-50 ${
// //                       selectedMessage?.id === message.id ? 'bg-green-50 border-r-2 border-green-500' : ''
// //                     } ${!message.is_read ? 'bg-blue-50' : ''}`}
// //                   >
// //                     <div className="flex justify-between items-start mb-2">
// //                       <h3 className={`font-medium text-sm ${!message.is_read ? 'font-semibold' : ''}`}>
// //                         {message.subject || 'No Subject'}
// //                       </h3>
// //                       {!message.is_read && (
// //                         <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
// //                       )}
// //                     </div>
// //                     <p className="text-sm text-gray-600 mb-1">{message.name}</p>
// //                     <p className="text-xs text-gray-500">
// //                       {formatDate(message.created_at || message.timestamp)}
// //                     </p>
// //                   </div>
// //                 ))
// //               )}
// //             </div>
// //           </div>

// //           {/* Message Details */}
// //           <div className="lg:col-span-2">
// //             {selectedMessage ? (
// //               <div className="bg-white rounded-lg shadow">
// //                 <div className="p-6 border-b">
// //                   <div className="flex justify-between items-start mb-4">
// //                     <div>
// //                       <h2 className="text-xl font-semibold text-gray-900 mb-2">
// //                         {selectedMessage.subject || 'No Subject'}
// //                       </h2>
// //                       <div className="flex items-center gap-4 text-sm text-gray-600">
// //                         <span className="flex items-center gap-1">
// //                           <User className="w-4 h-4" />
// //                           {selectedMessage.name}
// //                         </span>
// //                         <span className="flex items-center gap-1">
// //                           <Mail className="w-4 h-4" />
// //                           {selectedMessage.email}
// //                         </span>
// //                         <span className="flex items-center gap-1">
// //                           <Calendar className="w-4 h-4" />
// //                           {formatDate(selectedMessage.created_at || selectedMessage.timestamp)}
// //                         </span>
// //                       </div>
// //                     </div>
                    
// //                     <div className="flex gap-2">
// //                       <button
// //                         onClick={() => toggleMessageStatus(selectedMessage.id, selectedMessage.is_read)}
// //                         className={`p-2 rounded-lg ${
// //                           selectedMessage.is_read 
// //                             ? 'text-gray-600 hover:bg-gray-100' 
// //                             : 'text-blue-600 hover:bg-blue-50'
// //                         }`}
// //                         title={selectedMessage.is_read ? 'Mark as unread' : 'Mark as read'}
// //                       >
// //                         <Eye className="w-4 h-4" />
// //                       </button>
// //                       <button
// //                         onClick={() => deleteMessage(selectedMessage.id)}
// //                         className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
// //                         title="Delete message"
// //                       >
// //                         <Trash2 className="w-4 h-4" />
// //                       </button>
// //                     </div>
// //                   </div>
// //                 </div>
                
// //                 <div className="p-6">
// //                   <h3 className="font-medium text-gray-900 mb-3">Message:</h3>
// //                   <div className="bg-gray-50 rounded-lg p-4">
// //                     <p className="text-gray-700 whitespace-pre-wrap">
// //                       {selectedMessage.message}
// //                     </p>
// //                   </div>
                  
// //                   <div className="mt-6 flex gap-3">
// //                     <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
// //                       <Reply className="w-4 h-4" />
// //                       Reply via Email
// //                     </button>
// //                     <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
// //                       <Archive className="w-4 h-4" />
// //                       Archive
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             ) : (
// //               <div className="bg-white rounded-lg shadow h-96 flex items-center justify-center">
// //                 <div className="text-center">
// //                   <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
// //                   <p className="text-gray-500">Select a message to view details</p>
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminMessagesPage;










// import React, { useState, useEffect } from 'react';
// import { MessageSquare, RefreshCw, Mail, User, Calendar, Search, Filter, Trash2, Eye, Reply, Archive } from 'lucide-react';

// const AdminMessagesPage = () => {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedMessage, setSelectedMessage] = useState(null);
//   const [filterStatus, setFilterStatus] = useState('all'); // all, read, unread
//   const [sortBy, setSortBy] = useState('newest'); // newest, oldest, subject
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [messageToDelete, setMessageToDelete] = useState(null);

//   // Base URL for API calls
//   const API_BASE_URL = 'http://localhost:8000';

//   // Get auth token (adjust this based on your auth system)
//   const getAuthToken = () => {
//     return localStorage.getItem('authToken') || sessionStorage.getItem('authToken') || '';
//   };

//   const fetchMessages = async () => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/api/contact/messages/`, {
//         headers: {
//           'Authorization': `Bearer ${getAuthToken()}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       if (!response.ok) {
//         if (response.status === 401) {
//           throw new Error('Unauthorized. Please log in as admin.');
//         }
//         if (response.status === 403) {
//           throw new Error('Access forbidden. Admin privileges required.');
//         }
//         throw new Error(`Failed to fetch messages. Status: ${response.status}`);
//       }

//       const data = await response.json();
//       setMessages(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error('Error fetching messages:', err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Mark message as read/unread
//   const toggleMessageStatus = async (messageId, currentStatus) => {
//     try {
//       // This would need to be implemented in your Django backend
//       const response = await fetch(`${API_BASE_URL}/api/v1/contact/messages/${messageId}/status/`, {
//         method: 'PATCH',
//         headers: {
//           'Authorization': `Bearer ${getAuthToken()}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ is_read: !currentStatus })
//       });

//       if (response.ok) {
//         fetchMessages(); // Refresh messages
//       }
//     } catch (err) {
//       console.error('Error updating message status:', err);
//     }
//   };

//   // Delete message
//   const deleteMessage = async (messageId) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/v1/contact/messages/${messageId}/`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${getAuthToken()}`
//         }
//       });

//       if (response.ok) {
//         setMessages(messages.filter(msg => msg.id !== messageId));
//         setSelectedMessage(null);
//         setShowDeleteConfirm(false);
//         setMessageToDelete(null);
//       }
//     } catch (err) {
//       console.error('Error deleting message:', err);
//     }
//   };

//   const handleDeleteClick = (messageId) => {
//     setMessageToDelete(messageId);
//     setShowDeleteConfirm(true);
//   };

//   const confirmDelete = () => {
//     if (messageToDelete) {
//       deleteMessage(messageToDelete);
//     }
//   };

//   const cancelDelete = () => {
//     setShowDeleteConfirm(false);
//     setMessageToDelete(null);
//   };

//   useEffect(() => {
//     fetchMessages();
//   }, []);

//   // Filter and sort messages
//   const filteredMessages = messages
//     .filter(msg => {
//       const matchesSearch = 
//         msg.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         msg.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         msg.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         msg.message?.toLowerCase().includes(searchTerm.toLowerCase());

//       const matchesFilter = 
//         filterStatus === 'all' ||
//         (filterStatus === 'read' && msg.is_read) ||
//         (filterStatus === 'unread' && !msg.is_read);

//       return matchesSearch && matchesFilter;
//     })
//     .sort((a, b) => {
//       switch (sortBy) {
//         case 'oldest':
//           return new Date(a.created_at || a.timestamp) - new Date(b.created_at || b.timestamp);
//         case 'subject':
//           return (a.subject || '').localeCompare(b.subject || '');
//         default: // newest
//           return new Date(b.created_at || b.timestamp) - new Date(a.created_at || a.timestamp);
//       }
//     });

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     return new Date(dateString).toLocaleString();
//   };

//   if (loading && messages.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
//           <p className="text-gray-600">Loading messages...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 py-6">
//           <div className="flex justify-between items-center mb-6">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">Contact Messages</h1>
//               <p className="text-gray-600 mt-1">Manage and respond to user inquiries</p>
//             </div>
//             <button
//               onClick={fetchMessages}
//               disabled={loading}
//               className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
//             >
//               <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
//               Refresh
//             </button>
//           </div>

//           {/* Search and Filters */}
//           <div className="flex flex-col sm:flex-row gap-4">
//             <div className="relative flex-1">
//               <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search messages..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//               />
//             </div>
            
//             <select
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
//             >
//               <option value="all">All Messages</option>
//               <option value="unread">Unread</option>
//               <option value="read">Read</option>
//             </select>

//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
//             >
//               <option value="newest">Newest First</option>
//               <option value="oldest">Oldest First</option>
//               <option value="subject">By Subject</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 py-6">
//         {error ? (
//           <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
//             <p className="text-red-700">{error}</p>
//             <button
//               onClick={fetchMessages}
//               className="mt-2 text-red-600 hover:text-red-800 font-medium"
//             >
//               Try Again
//             </button>
//           </div>
//         ) : null}

//         <div className="grid lg:grid-cols-3 gap-6">
//           {/* Messages List */}
//           <div className="lg:col-span-1 bg-white rounded-lg shadow">
//             <div className="p-4 border-b">
//               <h2 className="font-semibold text-gray-900">
//                 Messages ({filteredMessages.length})
//               </h2>
//             </div>
            
//             <div className="divide-y max-h-96 overflow-y-auto">
//               {filteredMessages.length === 0 ? (
//                 <div className="p-8 text-center">
//                   <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                   <p className="text-gray-500">No messages found</p>
//                 </div>
//               ) : (
//                 filteredMessages.map((message) => (
//                   <div
//                     key={message.id || message.email + message.subject}
//                     onClick={() => setSelectedMessage(message)}
//                     className={`p-4 cursor-pointer hover:bg-gray-50 ${
//                       selectedMessage?.id === message.id ? 'bg-green-50 border-r-2 border-green-500' : ''
//                     } ${!message.is_read ? 'bg-blue-50' : ''}`}
//                   >
//                     <div className="flex justify-between items-start mb-2">
//                       <h3 className={`font-medium text-sm ${!message.is_read ? 'font-semibold' : ''}`}>
//                         {message.subject || 'No Subject'}
//                       </h3>
//                       {!message.is_read && (
//                         <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
//                       )}
//                     </div>
//                     <p className="text-sm text-gray-600 mb-1">{message.name}</p>
//                     <p className="text-xs text-gray-500">
//                       {formatDate(message.created_at || message.timestamp)}
//                     </p>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//           {/* Message Details */}
//           <div className="lg:col-span-2">
//             {selectedMessage ? (
//               <div className="bg-white rounded-lg shadow">
//                 <div className="p-6 border-b">
//                   <div className="flex justify-between items-start mb-4">
//                     <div>
//                       <h2 className="text-xl font-semibold text-gray-900 mb-2">
//                         {selectedMessage.subject || 'No Subject'}
//                       </h2>
//                       <div className="flex items-center gap-4 text-sm text-gray-600">
//                         <span className="flex items-center gap-1">
//                           <User className="w-4 h-4" />
//                           {selectedMessage.name}
//                         </span>
//                         <span className="flex items-center gap-1">
//                           <Mail className="w-4 h-4" />
//                           {selectedMessage.email}
//                         </span>
//                         <span className="flex items-center gap-1">
//                           <Calendar className="w-4 h-4" />
//                           {formatDate(selectedMessage.created_at || selectedMessage.timestamp)}
//                         </span>
//                       </div>
//                     </div>
                    
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => toggleMessageStatus(selectedMessage.id, selectedMessage.is_read)}
//                         className={`p-2 rounded-lg ${
//                           selectedMessage.is_read 
//                             ? 'text-gray-600 hover:bg-gray-100' 
//                             : 'text-blue-600 hover:bg-blue-50'
//                         }`}
//                         title={selectedMessage.is_read ? 'Mark as unread' : 'Mark as read'}
//                       >
//                         <Eye className="w-4 h-4" />
//                       </button>
//                       <button
//                         onClick={() => handleDeleteClick(selectedMessage.id)}
//                         className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
//                         title="Delete message"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="p-6">
//                   <h3 className="font-medium text-gray-900 mb-3">Message:</h3>
//                   <div className="bg-gray-50 rounded-lg p-4">
//                     <p className="text-gray-700 whitespace-pre-wrap">
//                       {selectedMessage.message}
//                     </p>
//                   </div>
                  
//                   <div className="mt-6 flex gap-3">
//                     <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
//                       <Reply className="w-4 h-4" />
//                       Reply via Email
//                     </button>
//                     <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
//                       <Archive className="w-4 h-4" />
//                       Archive
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="bg-white rounded-lg shadow h-96 flex items-center justify-center">
//                 <div className="text-center">
//                   <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                   <p className="text-gray-500">Select a message to view details</p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Delete Confirmation Modal */}
//       {showDeleteConfirm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Message</h3>
//             <p className="text-gray-600 mb-6">
//               Are you sure you want to delete this message? This action cannot be undone.
//             </p>
//             <div className="flex gap-3 justify-end">
//               <button
//                 onClick={cancelDelete}
//                 className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmDelete}
//                 className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminMessagesPage;







import React, { useState, useEffect } from 'react';
import { MessageSquare, RefreshCw, Mail, User, Calendar, Search, Filter, Trash2, Eye, Reply, Archive } from 'lucide-react';

const AdminMessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all'); // all, read, unread
  const [sortBy, setSortBy] = useState('newest'); // newest, oldest, subject
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);

  // Base URL for API calls
  const API_BASE_URL = 'http://localhost:8000';

  // Get auth token (adjust this based on your auth system)
  const getAuthToken = () => {
    // Try multiple storage locations and key names
    return (
      localStorage.getItem('authToken') || 
      localStorage.getItem('access_token') ||
      localStorage.getItem('token') ||
      sessionStorage.getItem('authToken') || 
      sessionStorage.getItem('access_token') ||
      sessionStorage.getItem('token') ||
      ''
    );
  };

  const fetchMessages = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const token = getAuthToken();
      console.log('Fetching messages from:', `${API_BASE_URL}/api/v1/contact/messages/`);
      console.log('Using token:', token ? 'Token present' : 'No token');
      
      const headers = {
        'Content-Type': 'application/json'
      };
      
      // Only add auth header if token exists
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(`${API_BASE_URL}/api/v1/contact/messages/`, {
        headers: headers
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.log('Error response body:', errorText);
        
        if (response.status === 401) {
          throw new Error('Unauthorized. Please log in as admin.');
        }
        if (response.status === 403) {
          throw new Error('Access forbidden. Admin privileges required.');
        }
        if (response.status === 404) {
          throw new Error(`Endpoint not found. Check if /api/v1/contact/messages/ exists. Response: ${errorText}`);
        }
        throw new Error(`Failed to fetch messages. Status: ${response.status}. Response: ${errorText}`);
      }

      const data = await response.json();
      console.log('Received data:', data);
      setMessages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle reply via Gmail
  const handleReply = (message) => {
    if (!message || !message.email) {
      alert('No email address found for this message');
      return;
    }

    // Prepare the email content
    const recipientEmail = encodeURIComponent(message.email);
    const subject = encodeURIComponent(`Re: ${message.subject || 'Your inquiry'}`);
    
    // Create a professional reply template
    const bodyTemplate = `Hello ${message.name || 'there'},

Thank you for contacting us regarding "${message.subject || 'your inquiry'}".

[Your response here]

Best regards,
[Your name]
[Your title]

---
Original message:
From: ${message.name} <${message.email}>
Date: ${formatDate(message.created_at || message.timestamp)}
Subject: ${message.subject || 'No Subject'}

${message.message}`;
    
    const body = encodeURIComponent(bodyTemplate);
    
    // Gmail compose URL
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipientEmail}&su=${subject}&body=${body}`;
    
    // Open in new tab
    window.open(gmailUrl, '_blank');
  };

  // Mark message as read/unread
  const toggleMessageStatus = async (messageId, currentStatus) => {
    try {
      // This would need to be implemented in your Django backend
      const response = await fetch(`${API_BASE_URL}/api/v1/contact/messages/${messageId}/status/`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ is_read: !currentStatus })
      });

      if (response.ok) {
        fetchMessages(); // Refresh messages
      }
    } catch (err) {
      console.error('Error updating message status:', err);
    }
  };

  // Delete message
  const deleteMessage = async (messageId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/contact/messages/${messageId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`
        }
      });

      if (response.ok) {
        setMessages(messages.filter(msg => msg.id !== messageId));
        setSelectedMessage(null);
        setShowDeleteConfirm(false);
        setMessageToDelete(null);
      }
    } catch (err) {
      console.error('Error deleting message:', err);
    }
  };

  const handleDeleteClick = (messageId) => {
    setMessageToDelete(messageId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (messageToDelete) {
      deleteMessage(messageToDelete);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setMessageToDelete(null);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Filter and sort messages
  const filteredMessages = messages
    .filter(msg => {
      const matchesSearch = 
        msg.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.message?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter = 
        filterStatus === 'all' ||
        (filterStatus === 'read' && msg.is_read) ||
        (filterStatus === 'unread' && !msg.is_read);

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.created_at || a.timestamp) - new Date(b.created_at || b.timestamp);
        case 'subject':
          return (a.subject || '').localeCompare(b.subject || '');
        default: // newest
          return new Date(b.created_at || b.timestamp) - new Date(a.created_at || a.timestamp);
      }
    });

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  if (loading && messages.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Contact Messages</h1>
              <p className="text-gray-600 mt-1">Manage and respond to user inquiries</p>
            </div>
            <button
              onClick={fetchMessages}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All Messages</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="subject">By Subject</option>
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700">{error}</p>
            <button
              onClick={fetchMessages}
              className="mt-2 text-red-600 hover:text-red-800 font-medium"
            >
              Try Again
            </button>
          </div>
        ) : null}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="font-semibold text-gray-900">
                Messages ({filteredMessages.length})
              </h2>
            </div>
            
            <div className="divide-y max-h-96 overflow-y-auto">
              {filteredMessages.length === 0 ? (
                <div className="p-8 text-center">
                  <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No messages found</p>
                </div>
              ) : (
                filteredMessages.map((message) => (
                  <div
                    key={message.id || message.email + message.subject}
                    onClick={() => setSelectedMessage(message)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 ${
                      selectedMessage?.id === message.id ? 'bg-green-50 border-r-2 border-green-500' : ''
                    } ${!message.is_read ? 'bg-blue-50' : ''}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className={`font-medium text-sm ${!message.is_read ? 'font-semibold' : ''}`}>
                        {message.subject || 'No Subject'}
                      </h3>
                      {!message.is_read && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{message.name}</p>
                    <p className="text-xs text-gray-500">
                      {formatDate(message.created_at || message.timestamp)}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Message Details */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        {selectedMessage.subject || 'No Subject'}
                      </h2>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {selectedMessage.name}
                        </span>
                        <span className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {selectedMessage.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(selectedMessage.created_at || selectedMessage.timestamp)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleMessageStatus(selectedMessage.id, selectedMessage.is_read)}
                        className={`p-2 rounded-lg ${
                          selectedMessage.is_read 
                            ? 'text-gray-600 hover:bg-gray-100' 
                            : 'text-blue-600 hover:bg-blue-50'
                        }`}
                        title={selectedMessage.is_read ? 'Mark as unread' : 'Mark as read'}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(selectedMessage.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        title="Delete message"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-medium text-gray-900 mb-3">Message:</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {selectedMessage.message}
                    </p>
                  </div>
                  
                  <div className="mt-6 flex gap-3">
                    <button 
                      onClick={() => handleReply(selectedMessage)}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      <Reply className="w-4 h-4" />
                      Reply via Email
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow h-96 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Select a message to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Message</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this message? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMessagesPage;