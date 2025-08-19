// import React, { useState, useEffect } from 'react';
// import { Send, MessageSquare, User, Mail, Phone, MapPin, CheckCircle, AlertCircle, Eye, Calendar } from 'lucide-react';

// const ContactUsPage = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     subject: '',
//     message: ''
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState(null);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [contactMessages, setContactMessages] = useState([]);
//   const [showAdminPanel, setShowAdminPanel] = useState(false);
//   const [loadingMessages, setLoadingMessages] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async () => {
//     if (!formData.name || !formData.email || !formData.subject || !formData.message) {
//       setSubmitStatus({ type: 'error', message: 'Please fill in all required fields.' });
//       return;
//     }

//     setIsSubmitting(true);
//     setSubmitStatus(null);

//     try {
//       // Simulate API call to POST /v1/contact/
//       const response = await fetch('/v1/contact/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData)
//       });

//       if (response.ok) {
//         setSubmitStatus({ type: 'success', message: 'Message sent successfully! We\'ll get back to you soon.' });
//         setFormData({
//           name: '',
//           email: '',
//           subject: '',
//           message: ''
//         });
//       } else {
//         throw new Error('Failed to send message');
//       }
//     } catch (error) {
//       setSubmitStatus({ type: 'error', message: 'Failed to send message. Please try again later.' });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const fetchContactMessages = async () => {
//     setLoadingMessages(true);
//     try {
//       // Simulate API call to GET /api/contact/messages/
//       const response = await fetch('/api/contact/messages/', {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Assuming token-based auth
//         }
//       });

//       if (response.ok) {
//         const messages = await response.json();
//         setContactMessages(messages);
//       } else {
//         console.error('Failed to fetch contact messages');
//       }
//     } catch (error) {
//       console.error('Error fetching contact messages:', error);
//     } finally {
//       setLoadingMessages(false);
//     }
//   };

//   useEffect(() => {
//     // Check if user is admin (this would typically be determined by your auth system)
//     const userRole = localStorage.getItem('userRole');
//     if (userRole === 'admin') {
//       setIsAdmin(true);
//     }
//   }, []);

//   const toggleAdminPanel = () => {
//     setShowAdminPanel(!showAdminPanel);
//     if (!showAdminPanel && contactMessages.length === 0) {
//       fetchContactMessages();
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm border-b">
//         <div className="max-w-6xl mx-auto px-4 py-6">
//           <div className="flex justify-between items-center">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
//               <p className="text-gray-600 mt-2">We'd love to hear from you. Send us a message!</p>
//             </div>
//             {isAdmin && (
//               <button
//                 onClick={toggleAdminPanel}
//                 className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
//               >
//                 <Eye className="w-4 h-4" />
//                 {showAdminPanel ? 'Hide Admin Panel' : 'View Messages'}
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="max-w-6xl mx-auto px-4 py-8">
//         {!showAdminPanel ? (
//           <div className="grid md:grid-cols-2 gap-8">
//             {/* Contact Form */}
//             <div className="bg-white rounded-2xl shadow-lg p-8">
//               <div className="flex items-center gap-3 mb-6">
//                 <MessageSquare className="w-6 h-6 text-green-600" />
//                 <h2 className="text-2xl font-semibold text-gray-900">Send us a Message</h2>
//               </div>

//               {submitStatus && (
//                 <div className={`flex items-center gap-2 p-4 rounded-lg mb-6 ${
//                   submitStatus.type === 'success' 
//                     ? 'bg-green-50 text-green-700 border border-green-200' 
//                     : 'bg-red-50 text-red-700 border border-red-200'
//                 }`}>
//                   {submitStatus.type === 'success' ? (
//                     <CheckCircle className="w-5 h-5" />
//                   ) : (
//                     <AlertCircle className="w-5 h-5" />
//                   )}
//                   <span>{submitStatus.message}</span>
//                 </div>
//               )}

//               <div className="space-y-6">
//                 <div className="grid md:grid-cols-2 gap-4">
//                   <div>
//                     <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
//                       Full Name *
//                     </label>
//                     <div className="relative">
//                       <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
//                       <input
//                         type="text"
//                         id="name"
//                         name="name"
//                         required
//                         value={formData.name}
//                         onChange={handleInputChange}
//                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
//                         placeholder="Your full name"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                       Email Address *
//                     </label>
//                     <div className="relative">
//                       <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
//                       <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         required
//                         value={formData.email}
//                         onChange={handleInputChange}
//                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
//                         placeholder="your.email@example.com"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
//                     Subject *
//                   </label>
//                   <input
//                     type="text"
//                     id="subject"
//                     name="subject"
//                     required
//                     value={formData.subject}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
//                     placeholder="What's this about?"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
//                     Message *
//                   </label>
//                   <textarea
//                     id="message"
//                     name="message"
//                     required
//                     rows={6}
//                     value={formData.message}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
//                     placeholder="Tell us what's on your mind..."
//                   />
//                 </div>

//                 <button
//                   onClick={handleSubmit}
//                   disabled={isSubmitting}
//                   className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                       Sending...
//                     </>
//                   ) : (
//                     <>
//                       <Send className="w-4 h-4" />
//                       Send Message
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Contact Information */}
//             <div className="space-y-6">
//               <div className="bg-white rounded-2xl shadow-lg p-8">
//                 <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
//                 <div className="space-y-4">
//                   <div className="flex items-start gap-4">
//                     <Mail className="w-6 h-6 text-green-600 mt-1" />
//                     <div>
//                       <h3 className="font-medium text-gray-900">Email</h3>
//                       <p className="text-gray-600">aguuramuhinzi@gmail.com</p>
//                     </div>
//                   </div>
                  
//                   <div className="flex items-start gap-4">
//                     <Phone className="w-6 h-6 text-green-600 mt-1" />
//                     <div>
//                       <h3 className="font-medium text-gray-900">Phone</h3>
//                       <p className="text-gray-600">0787 982 092</p>
//                     </div>
//                   </div>
                  
//                   <div className="flex items-start gap-4">
//                     <MapPin className="w-6 h-6 text-green-600 mt-1" />
//                     <div>
//                       <h3 className="font-medium text-gray-900">Address</h3>
//                       <p className="text-gray-600">Kigali, Rwanda<br />Kimironko<br />KG 30</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-lg p-8 text-white">
//                 <h3 className="text-xl font-semibold mb-4">Quick Response</h3>
//                 <p className="mb-4">We typically respond to all messages within 24 hours during business days.</p>
//                 <div className="flex items-center gap-2 text-green-100">
//                   <CheckCircle className="w-4 h-4" />
//                   <span className="text-sm">Average response time: 2 hours</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ) : (
//           /* Admin Panel */
//           <div className="bg-white rounded-2xl shadow-lg">
//             <div className="p-6 border-b border-gray-200">
//               <h2 className="text-2xl font-semibold text-gray-900">Contact Messages Admin Panel</h2>
//               <p className="text-gray-600 mt-1">View and manage all contact form submissions</p>
//             </div>

//             <div className="p-6">
//               {loadingMessages ? (
//                 <div className="flex items-center justify-center py-12">
//                   <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
//                   <span className="ml-2 text-gray-600">Loading messages...</span>
//                 </div>
//               ) : contactMessages.length === 0 ? (
//                 <div className="text-center py-12">
//                   <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                   <p className="text-gray-600">No contact messages found.</p>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   {contactMessages.map((message, index) => (
//                     <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
//                       <div className="flex justify-between items-start mb-2">
//                         <h3 className="font-medium text-gray-900">{message.subject}</h3>
//                         <span className="text-sm text-gray-500">{new Date(message.timestamp).toLocaleDateString()}</span>
//                       </div>
//                       <p className="text-sm text-gray-600 mb-2">From: {message.name} ({message.email})</p>
//                       <p className="text-gray-700">{message.message}</p>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ContactUsPage;

import React, { useState, useEffect } from 'react';
import { Send, MessageSquare, User, Mail, Phone, MapPin, CheckCircle, AlertCircle, Eye, Calendar, RefreshCw } from 'lucide-react';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [contactMessages, setContactMessages] = useState([]);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // Base URL for API calls - adjust this to match your Django backend
  const API_BASE_URL = 'http://localhost:8000';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setSubmitStatus({ type: 'error', message: 'Please fill in all required fields.' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/contact/`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          // Add CSRF token if needed
          // 'X-CSRFToken': getCookie('csrftoken'),
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to send message');
      }

      setSubmitStatus({ type: 'success', message: 'Message sent successfully! We\'ll get back to you soon.' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: error.message || 'Failed to send message. Please try again later.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchContactMessages = async () => {
    setLoadingMessages(true);
    try {
      // Get auth token from memory instead of localStorage
      const authToken = sessionStorage.getItem('authToken') || '';
      
      const response = await fetch(`${API_BASE_URL}/v1/contact/messages/`, {
        headers: { 
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized access. Please log in as admin.');
        }
        throw new Error('Failed to fetch contact messages');
      }

      const messages = await response.json();
      setContactMessages(messages);
    } catch (error) {
      console.error('Error fetching contact messages:', error);
      setSubmitStatus({ 
        type: 'error', 
        message: error.message || 'Failed to fetch messages.' 
      });
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    // Check admin status from memory instead of localStorage
    const userRole = sessionStorage.getItem('userRole');
    if (userRole === 'admin') {
      setIsAdmin(true);
    }
  }, []);

  const toggleAdminPanel = () => {
    setShowAdminPanel(!showAdminPanel);
    if (!showAdminPanel && contactMessages.length === 0) {
      fetchContactMessages();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
            <p className="text-gray-600 mt-2">We'd love to hear from you. Send us a message!</p>
          </div>
          {isAdmin && (
            <button
              onClick={toggleAdminPanel}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Eye className="w-4 h-4" />
              {showAdminPanel ? 'Hide Admin Panel' : 'View Messages'}
            </button>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {!showAdminPanel ? (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-semibold text-gray-900">Send us a Message</h2>
              </div>

              {submitStatus && (
                <div className={`flex items-center gap-2 p-4 rounded-lg ${
                  submitStatus.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {submitStatus.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                  <span>{submitStatus.message}</span>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <div className="relative">
                    <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text" 
                      id="name" 
                      name="name" 
                      required 
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <div className="relative">
                    <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email" 
                      id="email" 
                      name="email" 
                      required 
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                <input
                  type="text" 
                  id="subject" 
                  name="subject" 
                  required 
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                <textarea
                  id="message" 
                  name="message" 
                  required 
                  rows={6} 
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  placeholder="Tell us what's on your mind..."
                />
              </div>

              <button
                type="submit" 
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-medium text-gray-900">Email</h3>
                      <p className="text-gray-600">aguuramuhinzi@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-medium text-gray-900">Phone</h3>
                      <p className="text-gray-600">0787 982 092</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-medium text-gray-900">Address</h3>
                      <p className="text-gray-600">Kigali, Rwanda<br />Kimironko<br />KG 30</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-lg p-8 text-white">
                <h3 className="text-xl font-semibold mb-4">Quick Response</h3>
                <p className="mb-4">We typically respond within 24 hours during business days.</p>
                <div className="flex items-center gap-2 text-green-100">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">Average response time: 2 hours</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Admin Panel */
          <div className="bg-white rounded-2xl shadow-lg">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Contact Messages</h2>
                <p className="text-gray-600 text-sm">View and manage all contact form submissions</p>
              </div>
              <button
                onClick={fetchContactMessages}
                className="flex items-center gap-1 text-green-600 hover:text-green-800 transition-colors"
                disabled={loadingMessages}
              >
                <RefreshCw className={`w-4 h-4 ${loadingMessages ? 'animate-spin' : ''}`} /> 
                Refresh
              </button>
            </div>

            <div className="p-6">
              {loadingMessages ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
                  <span className="ml-2 text-gray-600">Loading messages...</span>
                </div>
              ) : contactMessages.length === 0 ? (
                <div className="text-center py-12">
                  <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No contact messages found.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {contactMessages.map((msg, index) => (
                    <div key={msg.id || index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-gray-900">{msg.subject}</h3>
                        <span className="text-sm text-gray-500">
                          {msg.timestamp ? new Date(msg.timestamp).toLocaleDateString() : 
                           msg.created_at ? new Date(msg.created_at).toLocaleDateString() : ''}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">From: {msg.name} ({msg.email})</p>
                      <p className="text-gray-700">{msg.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactUsPage;



// // // import React, { useState, useEffect } from 'react';
// // // import { Send, MessageSquare, User, Mail, Phone, MapPin, CheckCircle, AlertCircle, Eye, RefreshCw } from 'lucide-react';

// // // const ContactUsPage = () => {
// // //   const [formData, setFormData] = useState({
// // //     name: '',
// // //     email: '',
// // //     subject: '',
// // //     message: ''
// // //   });
// // //   const [isSubmitting, setIsSubmitting] = useState(false);
// // //   const [submitStatus, setSubmitStatus] = useState(null);
// // //   const [isAdmin, setIsAdmin] = useState(false);
// // //   const [contactMessages, setContactMessages] = useState([]);
// // //   const [showAdminPanel, setShowAdminPanel] = useState(false);
// // //   const [loadingMessages, setLoadingMessages] = useState(false);

// // //   // Get API base URL - adjust this to match your Django backend
// // //   const API_BASE_URL = (typeof process !== 'undefined' && process.env && process.env.REACT_APP_API_URL) || 'http://localhost:8000';

// // //   const handleInputChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setFormData(prev => ({
// // //       ...prev,
// // //       [name]: value
// // //     }));
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();

// // //     if (!formData.name || !formData.email || !formData.subject || !formData.message) {
// // //       setSubmitStatus({ type: 'error', message: 'Please fill in all required fields.' });
// // //       return;
// // //     }

// // //     setIsSubmitting(true);
// // //     setSubmitStatus(null);

// // //     try {
// // //       const response = await fetch(`${API_BASE_URL}/v1/contact/`, {
// // //         method: 'POST',
// // //         headers: { 
// // //           'Content-Type': 'application/json',
// // //           // Add CSRF token if required by Django
// // //           'X-CSRFToken': getCsrfToken(),
// // //         },
// // //         credentials: 'include', // Include cookies for CSRF
// // //         body: JSON.stringify(formData)
// // //       });

// // //       const responseData = await response.json();

// // //       if (!response.ok) {
// // //         console.error('Server response:', responseData);
// // //         throw new Error(responseData.message || 'Failed to send message');
// // //       }

// // //       setSubmitStatus({ 
// // //         type: 'success', 
// // //         message: responseData.message || 'Message sent successfully! We\'ll get back to you soon.' 
// // //       });
// // //       setFormData({ name: '', email: '', subject: '', message: '' });
// // //     } catch (error) {
// // //       console.error('Error sending message:', error);
// // //       setSubmitStatus({ 
// // //         type: 'error', 
// // //         message: error.message || 'Failed to send message. Please try again later.' 
// // //       });
// // //     } finally {
// // //       setIsSubmitting(false);
// // //     }
// // //   };

// // //   // Function to get CSRF token from Django
// // //   const getCsrfToken = () => {
// // //     const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]')?.value;
// // //     if (csrfToken) return csrfToken;
    
// // //     // Try to get from cookie
// // //     const cookies = document.cookie.split(';');
// // //     for (let cookie of cookies) {
// // //       const [name, value] = cookie.trim().split('=');
// // //       if (name === 'csrftoken') {
// // //         return decodeURIComponent(value);
// // //       }
// // //     }
// // //     return '';
// // //   };

// // //   const fetchContactMessages = async () => {
// // //     setLoadingMessages(true);
// // //     try {
// // //       const token = getAuthToken();
// // //       const response = await fetch(`${API_BASE_URL}/api/contact/messages/`, {
// // //         headers: { 
// // //           'Authorization': token ? `Bearer ${token}` : '',
// // //           'Content-Type': 'application/json',
// // //         },
// // //         credentials: 'include',
// // //       });

// // //       if (!response.ok) {
// // //         throw new Error(`HTTP ${response.status}: Failed to fetch contact messages`);
// // //       }

// // //       const messages = await response.json();
// // //       setContactMessages(Array.isArray(messages) ? messages : []);
// // //     } catch (error) {
// // //       console.error('Error fetching contact messages:', error);
// // //       setContactMessages([]);
// // //     } finally {
// // //       setLoadingMessages(false);
// // //     }
// // //   };

// // //   // Safe way to get auth token without localStorage
// // //   const getAuthToken = () => {
// // //     try {
// // //       return typeof window !== 'undefined' && window.localStorage ? window.localStorage.getItem('authToken') : '';
// // //     } catch (error) {
// // //       console.error('Error accessing localStorage:', error);
// // //       return '';
// // //     }
// // //   };

// // //   // Safe way to check user role
// // //   const checkUserRole = () => {
// // //     try {
// // //       return typeof window !== 'undefined' && window.localStorage ? window.localStorage.getItem('userRole') === 'admin' : false;
// // //     } catch (error) {
// // //       console.error('Error accessing localStorage:', error);
// // //       return false;
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     setIsAdmin(checkUserRole());
// // //   }, []);

// // //   const toggleAdminPanel = () => {
// // //     setShowAdminPanel(!showAdminPanel);
// // //     if (!showAdminPanel && contactMessages.length === 0) {
// // //       fetchContactMessages();
// // //     }
// // //   };

// // //   // Clear status after 5 seconds
// // //   useEffect(() => {
// // //     if (submitStatus) {
// // //       const timer = setTimeout(() => {
// // //         setSubmitStatus(null);
// // //       }, 5000);
// // //       return () => clearTimeout(timer);
// // //     }
// // //   }, [submitStatus]);

// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
// // //       {/* Header */}
// // //       <div className="bg-white shadow-sm border-b">
// // //         <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
// // //           <div>
// // //             <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
// // //             <p className="text-gray-600 mt-2">We'd love to hear from you. Send us a message!</p>
// // //           </div>
// // //           {isAdmin && (
// // //             <button
// // //               onClick={toggleAdminPanel}
// // //               className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
// // //             >
// // //               <Eye className="w-4 h-4" />
// // //               {showAdminPanel ? 'Hide Admin Panel' : 'View Messages'}
// // //             </button>
// // //           )}
// // //         </div>
// // //       </div>

// // //       <div className="max-w-6xl mx-auto px-4 py-8">
// // //         {!showAdminPanel ? (
// // //           <div className="grid md:grid-cols-2 gap-8">
// // //             {/* Contact Form */}
// // //             <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
// // //               <div className="flex items-center gap-3 mb-6">
// // //                 <MessageSquare className="w-6 h-6 text-green-600" />
// // //                 <h2 className="text-2xl font-semibold text-gray-900">Send us a Message</h2>
// // //               </div>

// // //               {submitStatus && (
// // //                 <div className={`flex items-center gap-2 p-4 rounded-lg transition-all ${
// // //                   submitStatus.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200'
// // //                   : 'bg-red-50 text-red-700 border border-red-200'
// // //                 }`}>
// // //                   {submitStatus.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
// // //                   <span>{submitStatus.message}</span>
// // //                 </div>
// // //               )}

// // //               <div className="grid md:grid-cols-2 gap-4">
// // //                 <div>
// // //                   <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
// // //                   <div className="relative">
// // //                     <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
// // //                     <input
// // //                       type="text" 
// // //                       id="name" 
// // //                       name="name" 
// // //                       required 
// // //                       value={formData.name}
// // //                       onChange={handleInputChange}
// // //                       className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
// // //                       placeholder="Your full name"
// // //                       disabled={isSubmitting}
// // //                     />
// // //                   </div>
// // //                 </div>
// // //                 <div>
// // //                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
// // //                   <div className="relative">
// // //                     <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
// // //                     <input
// // //                       type="email" 
// // //                       id="email" 
// // //                       name="email" 
// // //                       required 
// // //                       value={formData.email}
// // //                       onChange={handleInputChange}
// // //                       className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
// // //                       placeholder="your.email@example.com"
// // //                       disabled={isSubmitting}
// // //                     />
// // //                   </div>
// // //                 </div>
// // //               </div>

// // //               <div>
// // //                 <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
// // //                 <input
// // //                   type="text" 
// // //                   id="subject" 
// // //                   name="subject" 
// // //                   required 
// // //                   value={formData.subject}
// // //                   onChange={handleInputChange}
// // //                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
// // //                   placeholder="What's this about?"
// // //                   disabled={isSubmitting}
// // //                 />
// // //               </div>

// // //               <div>
// // //                 <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
// // //                 <textarea
// // //                   id="message" 
// // //                   name="message" 
// // //                   required 
// // //                   rows={6} 
// // //                   value={formData.message}
// // //                   onChange={handleInputChange}
// // //                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
// // //                   placeholder="Tell us what's on your mind..."
// // //                   disabled={isSubmitting}
// // //                 />
// // //               </div>

// // //               <button
// // //                 type="button"
// // //                 onClick={handleSubmit}
// // //                 disabled={isSubmitting}
// // //                 className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
// // //               >
// // //                 {isSubmitting ? (
// // //                   <>
// // //                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
// // //                     Sending...
// // //                   </>
// // //                 ) : (
// // //                   <>
// // //                     <Send className="w-4 h-4" />
// // //                     Send Message
// // //                   </>
// // //                 )}
// // //               </button>
// // //             </div>

// // //             {/* Contact Info */}
// // //             <div className="space-y-6">
// // //               <div className="bg-white rounded-2xl shadow-lg p-8">
// // //                 <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
// // //                 <div className="space-y-4">
// // //                   <div className="flex items-start gap-4">
// // //                     <Mail className="w-6 h-6 text-green-600 mt-1" />
// // //                     <div>
// // //                       <h3 className="font-medium text-gray-900">Email</h3>
// // //                       <a href="mailto:aguuramuhinzi@gmail.com" className="text-gray-600 hover:text-green-600 transition-colors">
// // //                         aguuramuhinzi@gmail.com
// // //                       </a>
// // //                     </div>
// // //                   </div>
// // //                   <div className="flex items-start gap-4">
// // //                     <Phone className="w-6 h-6 text-green-600 mt-1" />
// // //                     <div>
// // //                       <h3 className="font-medium text-gray-900">Phone</h3>
// // //                       <a href="tel:0787982092" className="text-gray-600 hover:text-green-600 transition-colors">
// // //                         0787 982 092
// // //                       </a>
// // //                     </div>
// // //                   </div>
// // //                   <div className="flex items-start gap-4">
// // //                     <MapPin className="w-6 h-6 text-green-600 mt-1" />
// // //                     <div>
// // //                       <h3 className="font-medium text-gray-900">Address</h3>
// // //                       <p className="text-gray-600">Kigali, Rwanda<br />Kimironko<br />KG 30</p>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               </div>

// // //               <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-lg p-8 text-white">
// // //                 <h3 className="text-xl font-semibold mb-4">Quick Response</h3>
// // //                 <p className="mb-4">We typically respond within 24 hours during business days.</p>
// // //                 <div className="flex items-center gap-2 text-green-100">
// // //                   <CheckCircle className="w-4 h-4" />
// // //                   <span className="text-sm">Average response time: 2 hours</span>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         ) : (
// // //           /* Admin Panel */
// // //           <div className="bg-white rounded-2xl shadow-lg">
// // //             <div className="p-6 border-b border-gray-200 flex justify-between items-center">
// // //               <div>
// // //                 <h2 className="text-2xl font-semibold text-gray-900">Contact Messages</h2>
// // //                 <p className="text-gray-600 text-sm">View and manage all contact form submissions</p>
// // //               </div>
// // //               <button
// // //                 onClick={fetchContactMessages}
// // //                 disabled={loadingMessages}
// // //                 className="flex items-center gap-1 text-green-600 hover:text-green-800 disabled:opacity-50 transition-colors"
// // //               >
// // //                 <RefreshCw className={`w-4 h-4 ${loadingMessages ? 'animate-spin' : ''}`} /> 
// // //                 Refresh
// // //               </button>
// // //             </div>

// // //             <div className="p-6">
// // //               {loadingMessages ? (
// // //                 <div className="flex items-center justify-center py-12">
// // //                   <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
// // //                   <span className="ml-2 text-gray-600">Loading messages...</span>
// // //                 </div>
// // //               ) : contactMessages.length === 0 ? (
// // //                 <div className="text-center py-12">
// // //                   <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
// // //                   <p className="text-gray-600">No contact messages found.</p>
// // //                 </div>
// // //               ) : (
// // //                 <div className="space-y-4">
// // //                   {contactMessages.map((msg, index) => (
// // //                     <div key={msg.id || index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
// // //                       <div className="flex justify-between items-start mb-2">
// // //                         <h3 className="font-medium text-gray-900">{msg.subject}</h3>
// // //                         <span className="text-sm text-gray-500">
// // //                           {msg.created_at ? new Date(msg.created_at).toLocaleDateString() : 
// // //                            msg.timestamp ? new Date(msg.timestamp).toLocaleDateString() : ''}
// // //                         </span>
// // //                       </div>
// // //                       <p className="text-sm text-gray-600 mb-2">From: {msg.name} ({msg.email})</p>
// // //                       <p className="text-gray-700">{msg.message}</p>
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default ContactUsPage;










// // import React, { useState, useEffect } from 'react';
// // import { Send, MessageSquare, User, Mail, Phone, MapPin, CheckCircle, AlertCircle, Eye, RefreshCw } from 'lucide-react';

// // const ContactUsPage = () => {
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     email: '',
// //     subject: '',
// //     message: ''
// //   });
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [submitStatus, setSubmitStatus] = useState(null);
// //   const [isAdmin, setIsAdmin] = useState(false);
// //   const [contactMessages, setContactMessages] = useState([]);
// //   const [showAdminPanel, setShowAdminPanel] = useState(false);
// //   const [loadingMessages, setLoadingMessages] = useState(false);
// //   const [connectionTest, setConnectionTest] = useState(null);

// //   // Get API base URL - adjust this to match your Django backend
// //   const API_BASE_URL = (typeof process !== 'undefined' && process.env && process.env.REACT_APP_API_URL) || 'http://localhost:8000';

// //   // Test connection to backend
// //   const testConnection = async () => {
// //     setConnectionTest('testing');
// //     try {
// //       const response = await fetch(`${API_BASE_URL}/v1/contact/`, {
// //         method: 'OPTIONS', // Pre-flight request
// //       });
// //       console.log('Connection test response:', response.status);
// //       setConnectionTest(response.ok ? 'success' : 'failed');
// //     } catch (error) {
// //       console.error('Connection test failed:', error);
// //       setConnectionTest('failed');
// //     }
// //   };

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({
// //       ...prev,
// //       [name]: value
// //     }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!formData.name || !formData.email || !formData.subject || !formData.message) {
// //       setSubmitStatus({ type: 'error', message: 'Please fill in all required fields.' });
// //       return;
// //     }

// //     setIsSubmitting(true);
// //     setSubmitStatus(null);

// //     try {
// //       console.log('Attempting to send to:', `${API_BASE_URL}/v1/contact/`);
// //       console.log('Form data:', formData);

// //       const response = await fetch(`${API_BASE_URL}/v1/contact/`, {
// //         method: 'POST',
// //         headers: { 
// //           'Content-Type': 'application/json',
// //         },
// //         // Remove credentials and CSRF for initial testing
// //         body: JSON.stringify(formData)
// //       });

// //       console.log('Response status:', response.status);
// //       console.log('Response headers:', response.headers);

// //       if (!response.ok) {
// //         const errorText = await response.text();
// //         console.error('Server error response:', errorText);
// //         throw new Error(`HTTP ${response.status}: ${errorText || 'Failed to send message'}`);
// //       }

// //       const responseData = await response.json();
// //       console.log('Success response:', responseData);

// //       setSubmitStatus({ 
// //         type: 'success', 
// //         message: responseData.message || 'Message sent successfully! We\'ll get back to you soon.' 
// //       });
// //       setFormData({ name: '', email: '', subject: '', message: '' });
// //     } catch (error) {
// //       console.error('Full error details:', error);
      
// //       if (error.name === 'TypeError' && error.message.includes('fetch')) {
// //         setSubmitStatus({ 
// //           type: 'error', 
// //           message: `Cannot connect to server at ${API_BASE_URL}. Please check if your Django server is running.` 
// //         });
// //       } else {
// //         setSubmitStatus({ 
// //           type: 'error', 
// //           message: error.message || 'Failed to send message. Please try again later.' 
// //         });
// //       }
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   // Function to get CSRF token from Django
// //   const getCsrfToken = () => {
// //     const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]')?.value;
// //     if (csrfToken) return csrfToken;
    
// //     // Try to get from cookie
// //     const cookies = document.cookie.split(';');
// //     for (let cookie of cookies) {
// //       const [name, value] = cookie.trim().split('=');
// //       if (name === 'csrftoken') {
// //         return decodeURIComponent(value);
// //       }
// //     }
// //     return '';
// //   };

// //   const fetchContactMessages = async () => {
// //     setLoadingMessages(true);
// //     try {
// //       const token = getAuthToken();
// //       const response = await fetch(`${API_BASE_URL}/api/contact/messages/`, {
// //         headers: { 
// //           'Authorization': token ? `Bearer ${token}` : '',
// //           'Content-Type': 'application/json',
// //         },
// //         credentials: 'include',
// //       });

// //       if (!response.ok) {
// //         throw new Error(`HTTP ${response.status}: Failed to fetch contact messages`);
// //       }

// //       const messages = await response.json();
// //       setContactMessages(Array.isArray(messages) ? messages : []);
// //     } catch (error) {
// //       console.error('Error fetching contact messages:', error);
// //       setContactMessages([]);
// //     } finally {
// //       setLoadingMessages(false);
// //     }
// //   };

// //   // Safe way to get auth token without localStorage
// //   const getAuthToken = () => {
// //     try {
// //       return typeof window !== 'undefined' && window.localStorage ? window.localStorage.getItem('authToken') : '';
// //     } catch (error) {
// //       console.error('Error accessing localStorage:', error);
// //       return '';
// //     }
// //   };

// //   // Safe way to check user role
// //   const checkUserRole = () => {
// //     try {
// //       return typeof window !== 'undefined' && window.localStorage ? window.localStorage.getItem('userRole') === 'admin' : false;
// //     } catch (error) {
// //       console.error('Error accessing localStorage:', error);
// //       return false;
// //     }
// //   };

// //   useEffect(() => {
// //     setIsAdmin(checkUserRole());
// //   }, []);

// //   const toggleAdminPanel = () => {
// //     setShowAdminPanel(!showAdminPanel);
// //     if (!showAdminPanel && contactMessages.length === 0) {
// //       fetchContactMessages();
// //     }
// //   };

// //   // Clear status after 5 seconds
// //   useEffect(() => {
// //     if (submitStatus) {
// //       const timer = setTimeout(() => {
// //         setSubmitStatus(null);
// //       }, 5000);
// //       return () => clearTimeout(timer);
// //     }
// //   }, [submitStatus]);

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
// //       {/* Header */}
// //       <div className="bg-white shadow-sm border-b">
// //         <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
// //           <div>
// //             <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
// //             <p className="text-gray-600 mt-2">We'd love to hear from you. Send us a message!</p>
// //             <div className="mt-2 flex items-center gap-4">
// //               <span className="text-sm text-gray-500">Backend: {API_BASE_URL}</span>
// //               <button
// //                 onClick={testConnection}
// //                 className="text-sm px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
// //               >
// //                 {connectionTest === 'testing' ? 'Testing...' : 
// //                  connectionTest === 'success' ? '✓ Connected' : 
// //                  connectionTest === 'failed' ? '✗ Failed' : 'Test Connection'}
// //               </button>
// //             </div>
// //           </div>
// //           {isAdmin && (
// //             <button
// //               onClick={toggleAdminPanel}
// //               className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
// //             >
// //               <Eye className="w-4 h-4" />
// //               {showAdminPanel ? 'Hide Admin Panel' : 'View Messages'}
// //             </button>
// //           )}
// //         </div>
// //       </div>

// //       <div className="max-w-6xl mx-auto px-4 py-8">
// //         {!showAdminPanel ? (
// //           <div className="grid md:grid-cols-2 gap-8">
// //             {/* Contact Form */}
// //             <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
// //               <div className="flex items-center gap-3 mb-6">
// //                 <MessageSquare className="w-6 h-6 text-green-600" />
// //                 <h2 className="text-2xl font-semibold text-gray-900">Send us a Message</h2>
// //               </div>

// //               {submitStatus && (
// //                 <div className={`flex items-center gap-2 p-4 rounded-lg transition-all ${
// //                   submitStatus.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200'
// //                   : 'bg-red-50 text-red-700 border border-red-200'
// //                 }`}>
// //                   {submitStatus.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
// //                   <span>{submitStatus.message}</span>
// //                 </div>
// //               )}

// //               <div className="grid md:grid-cols-2 gap-4">
// //                 <div>
// //                   <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
// //                   <div className="relative">
// //                     <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
// //                     <input
// //                       type="text" 
// //                       id="name" 
// //                       name="name" 
// //                       required 
// //                       value={formData.name}
// //                       onChange={handleInputChange}
// //                       className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
// //                       placeholder="Your full name"
// //                       disabled={isSubmitting}
// //                     />
// //                   </div>
// //                 </div>
// //                 <div>
// //                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
// //                   <div className="relative">
// //                     <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
// //                     <input
// //                       type="email" 
// //                       id="email" 
// //                       name="email" 
// //                       required 
// //                       value={formData.email}
// //                       onChange={handleInputChange}
// //                       className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
// //                       placeholder="your.email@example.com"
// //                       disabled={isSubmitting}
// //                     />
// //                   </div>
// //                 </div>
// //               </div>

// //               <div>
// //                 <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
// //                 <input
// //                   type="text" 
// //                   id="subject" 
// //                   name="subject" 
// //                   required 
// //                   value={formData.subject}
// //                   onChange={handleInputChange}
// //                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
// //                   placeholder="What's this about?"
// //                   disabled={isSubmitting}
// //                 />
// //               </div>

// //               <div>
// //                 <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
// //                 <textarea
// //                   id="message" 
// //                   name="message" 
// //                   required 
// //                   rows={6} 
// //                   value={formData.message}
// //                   onChange={handleInputChange}
// //                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
// //                   placeholder="Tell us what's on your mind..."
// //                   disabled={isSubmitting}
// //                 />
// //               </div>

// //               <button
// //                 type="button"
// //                 onClick={handleSubmit}
// //                 disabled={isSubmitting}
// //                 className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
// //               >
// //                 {isSubmitting ? (
// //                   <>
// //                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
// //                     Sending...
// //                   </>
// //                 ) : (
// //                   <>
// //                     <Send className="w-4 h-4" />
// //                     Send Message
// //                   </>
// //                 )}
// //               </button>
// //             </div>

// //             {/* Contact Info */}
// //             <div className="space-y-6">
// //               <div className="bg-white rounded-2xl shadow-lg p-8">
// //                 <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
// //                 <div className="space-y-4">
// //                   <div className="flex items-start gap-4">
// //                     <Mail className="w-6 h-6 text-green-600 mt-1" />
// //                     <div>
// //                       <h3 className="font-medium text-gray-900">Email</h3>
// //                       <a href="mailto:aguuramuhinzi@gmail.com" className="text-gray-600 hover:text-green-600 transition-colors">
// //                         aguuramuhinzi@gmail.com
// //                       </a>
// //                     </div>
// //                   </div>
// //                   <div className="flex items-start gap-4">
// //                     <Phone className="w-6 h-6 text-green-600 mt-1" />
// //                     <div>
// //                       <h3 className="font-medium text-gray-900">Phone</h3>
// //                       <a href="tel:0787982092" className="text-gray-600 hover:text-green-600 transition-colors">
// //                         0787 982 092
// //                       </a>
// //                     </div>
// //                   </div>
// //                   <div className="flex items-start gap-4">
// //                     <MapPin className="w-6 h-6 text-green-600 mt-1" />
// //                     <div>
// //                       <h3 className="font-medium text-gray-900">Address</h3>
// //                       <p className="text-gray-600">Kigali, Rwanda<br />Kimironko<br />KG 30</p>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-lg p-8 text-white">
// //                 <h3 className="text-xl font-semibold mb-4">Quick Response</h3>
// //                 <p className="mb-4">We typically respond within 24 hours during business days.</p>
// //                 <div className="flex items-center gap-2 text-green-100">
// //                   <CheckCircle className="w-4 h-4" />
// //                   <span className="text-sm">Average response time: 2 hours</span>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         ) : (
// //           /* Admin Panel */
// //           <div className="bg-white rounded-2xl shadow-lg">
// //             <div className="p-6 border-b border-gray-200 flex justify-between items-center">
// //               <div>
// //                 <h2 className="text-2xl font-semibold text-gray-900">Contact Messages</h2>
// //                 <p className="text-gray-600 text-sm">View and manage all contact form submissions</p>
// //               </div>
// //               <button
// //                 onClick={fetchContactMessages}
// //                 disabled={loadingMessages}
// //                 className="flex items-center gap-1 text-green-600 hover:text-green-800 disabled:opacity-50 transition-colors"
// //               >
// //                 <RefreshCw className={`w-4 h-4 ${loadingMessages ? 'animate-spin' : ''}`} /> 
// //                 Refresh
// //               </button>
// //             </div>

// //             <div className="p-6">
// //               {loadingMessages ? (
// //                 <div className="flex items-center justify-center py-12">
// //                   <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
// //                   <span className="ml-2 text-gray-600">Loading messages...</span>
// //                 </div>
// //               ) : contactMessages.length === 0 ? (
// //                 <div className="text-center py-12">
// //                   <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
// //                   <p className="text-gray-600">No contact messages found.</p>
// //                 </div>
// //               ) : (
// //                 <div className="space-y-4">
// //                   {contactMessages.map((msg, index) => (
// //                     <div key={msg.id || index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
// //                       <div className="flex justify-between items-start mb-2">
// //                         <h3 className="font-medium text-gray-900">{msg.subject}</h3>
// //                         <span className="text-sm text-gray-500">
// //                           {msg.created_at ? new Date(msg.created_at).toLocaleDateString() : 
// //                            msg.timestamp ? new Date(msg.timestamp).toLocaleDateString() : ''}
// //                         </span>
// //                       </div>
// //                       <p className="text-sm text-gray-600 mb-2">From: {msg.name} ({msg.email})</p>
// //                       <p className="text-gray-700">{msg.message}</p>
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default ContactUsPage;


// import React, { useState, useEffect } from 'react';
// import { Send, MessageSquare, User, Mail, Phone, MapPin, CheckCircle, AlertCircle, Eye, RefreshCw } from 'lucide-react';

// const ContactUsPage = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     subject: '',
//     message: ''
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState(null);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [contactMessages, setContactMessages] = useState([]);
//   const [showAdminPanel, setShowAdminPanel] = useState(false);
//   const [loadingMessages, setLoadingMessages] = useState(false);
//   const [connectionTest, setConnectionTest] = useState(null);

//   // Get API base URL - adjust this to match your Django backend
//   const API_BASE_URL = (typeof process !== 'undefined' && process.env && process.env.REACT_APP_API_URL) || 'http://localhost:8000';

//   // Test connection to backend
//   const testConnection = async () => {
//     setConnectionTest('testing');
//     try {
//       const response = await fetch(`${API_BASE_URL}/v1/contact/`, {
//         method: 'OPTIONS', // Pre-flight request
//       });
//       console.log('Connection test response:', response.status);
//       setConnectionTest(response.ok ? 'success' : 'failed');
//     } catch (error) {
//       console.error('Connection test failed:', error);
//       setConnectionTest('failed');
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.name || !formData.email || !formData.subject || !formData.message) {
//       setSubmitStatus({ type: 'error', message: 'Please fill in all required fields.' });
//       return;
//     }

//     setIsSubmitting(true);
//     setSubmitStatus(null);

//     try {
//       console.log('Attempting to send to:', `${API_BASE_URL}/v1/contact/`);
//       console.log('Form data:', formData);

//       const response = await fetch(`${API_BASE_URL}/v1/contact/`, {
//         method: 'POST',
//         headers: { 
//           'Content-Type': 'application/json',
//         },
//         // Remove credentials and CSRF for initial testing
//         body: JSON.stringify(formData)
//       });

//       console.log('Response status:', response.status);
//       console.log('Response headers:', response.headers);

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error('Server error response:', errorText);
//         throw new Error(`HTTP ${response.status}: ${errorText || 'Failed to send message'}`);
//       }

//       const responseData = await response.json();
//       console.log('Success response:', responseData);

//       setSubmitStatus({ 
//         type: 'success', 
//         message: responseData.message || 'Message sent successfully! We\'ll get back to you soon.' 
//       });
//       setFormData({ name: '', email: '', subject: '', message: '' });
//     } catch (error) {
//       console.error('Full error details:', error);
      
//       if (error.name === 'TypeError' && error.message.includes('fetch')) {
//         setSubmitStatus({ 
//           type: 'error', 
//           message: `Cannot connect to server at ${API_BASE_URL}. Please check if your Django server is running.` 
//         });
//       } else {
//         setSubmitStatus({ 
//           type: 'error', 
//           message: error.message || 'Failed to send message. Please try again later.' 
//         });
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Function to get CSRF token from Django
//   const getCsrfToken = () => {
//     const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]')?.value;
//     if (csrfToken) return csrfToken;
    
//     // Try to get from cookie
//     const cookies = document.cookie.split(';');
//     for (let cookie of cookies) {
//       const [name, value] = cookie.trim().split('=');
//       if (name === 'csrftoken') {
//         return decodeURIComponent(value);
//       }
//     }
//     return '';
//   };

//   const fetchContactMessages = async () => {
//     setLoadingMessages(true);
//     try {
//       const token = getAuthToken();
//       const response = await fetch(`${API_BASE_URL}/api/contact/messages/`, {
//         headers: { 
//           'Authorization': token ? `Bearer ${token}` : '',
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP ${response.status}: Failed to fetch contact messages`);
//       }

//       const messages = await response.json();
//       setContactMessages(Array.isArray(messages) ? messages : []);
//     } catch (error) {
//       console.error('Error fetching contact messages:', error);
//       setContactMessages([]);
//     } finally {
//       setLoadingMessages(false);
//     }
//   };

//   // Safe way to get auth token without localStorage
//   const getAuthToken = () => {
//     try {
//       return typeof window !== 'undefined' && window.localStorage ? window.localStorage.getItem('authToken') : '';
//     } catch (error) {
//       console.error('Error accessing localStorage:', error);
//       return '';
//     }
//   };

//   // Safe way to check user role
//   const checkUserRole = () => {
//     try {
//       return typeof window !== 'undefined' && window.localStorage ? window.localStorage.getItem('userRole') === 'admin' : false;
//     } catch (error) {
//       console.error('Error accessing localStorage:', error);
//       return false;
//     }
//   };

//   useEffect(() => {
//     setIsAdmin(checkUserRole());
//   }, []);

//   const toggleAdminPanel = () => {
//     setShowAdminPanel(!showAdminPanel);
//     if (!showAdminPanel && contactMessages.length === 0) {
//       fetchContactMessages();
//     }
//   };

//   // Clear status after 5 seconds
//   useEffect(() => {
//     if (submitStatus) {
//       const timer = setTimeout(() => {
//         setSubmitStatus(null);
//       }, 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [submitStatus]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm border-b">
//         <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
//             <p className="text-gray-600 mt-2">We'd love to hear from you. Send us a message!</p>
//             <div className="mt-2 flex items-center gap-4">
//               <span className="text-sm text-gray-500">Backend: {API_BASE_URL}</span>
//               <button
//                 onClick={testConnection}
//                 className="text-sm px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
//               >
//                 {connectionTest === 'testing' ? 'Testing...' : 
//                  connectionTest === 'success' ? '✓ Connected' : 
//                  connectionTest === 'failed' ? '✗ Failed' : 'Test Connection'}
//               </button>
//             </div>
//           </div>
//           {isAdmin && (
//             <button
//               onClick={toggleAdminPanel}
//               className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
//             >
//               <Eye className="w-4 h-4" />
//               {showAdminPanel ? 'Hide Admin Panel' : 'View Messages'}
//             </button>
//           )}
//         </div>
//       </div>

//       <div className="max-w-6xl mx-auto px-4 py-8">
//         {!showAdminPanel ? (
//           <div className="grid md:grid-cols-2 gap-8">
//             {/* Contact Form */}
//             <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
//               <div className="flex items-center gap-3 mb-6">
//                 <MessageSquare className="w-6 h-6 text-green-600" />
//                 <h2 className="text-2xl font-semibold text-gray-900">Send us a Message</h2>
//               </div>

//               {submitStatus && (
//                 <div className={`flex items-center gap-2 p-4 rounded-lg transition-all ${
//                   submitStatus.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200'
//                   : 'bg-red-50 text-red-700 border border-red-200'
//                 }`}>
//                   {submitStatus.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
//                   <span>{submitStatus.message}</span>
//                 </div>
//               )}

//               <div className="grid md:grid-cols-2 gap-4">
//                 <div>
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
//                   <div className="relative">
//                     <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
//                     <input
//                       type="text" 
//                       id="name" 
//                       name="name" 
//                       required 
//                       value={formData.name}
//                       onChange={handleInputChange}
//                       className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
//                       placeholder="Your full name"
//                       disabled={isSubmitting}
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
//                   <div className="relative">
//                     <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
//                     <input
//                       type="email" 
//                       id="email" 
//                       name="email" 
//                       required 
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
//                       placeholder="your.email@example.com"
//                       disabled={isSubmitting}
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
//                 <input
//                   type="text" 
//                   id="subject" 
//                   name="subject" 
//                   required 
//                   value={formData.subject}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
//                   placeholder="What's this about?"
//                   disabled={isSubmitting}
//                 />
//               </div>

//               <div>
//                 <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
//                 <textarea
//                   id="message" 
//                   name="message" 
//                   required 
//                   rows={6} 
//                   value={formData.message}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
//                   placeholder="Tell us what's on your mind..."
//                   disabled={isSubmitting}
//                 />
//               </div>

//               <button
//                 type="button"
//                 onClick={handleSubmit}
//                 disabled={isSubmitting}
//                 className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
//               >
//                 {isSubmitting ? (
//                   <>
//                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                     Sending...
//                   </>
//                 ) : (
//                   <>
//                     <Send className="w-4 h-4" />
//                     Send Message
//                   </>
//                 )}
//               </button>
//             </div>

//             {/* Contact Info */}
//             <div className="space-y-6">
//               <div className="bg-white rounded-2xl shadow-lg p-8">
//                 <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
//                 <div className="space-y-4">
//                   <div className="flex items-start gap-4">
//                     <Mail className="w-6 h-6 text-green-600 mt-1" />
//                     <div>
//                       <h3 className="font-medium text-gray-900">Email</h3>
//                       <a href="mailto:aguuramuhinzi@gmail.com" className="text-gray-600 hover:text-green-600 transition-colors">
//                         aguuramuhinzi@gmail.com
//                       </a>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-4">
//                     <Phone className="w-6 h-6 text-green-600 mt-1" />
//                     <div>
//                       <h3 className="font-medium text-gray-900">Phone</h3>
//                       <a href="tel:0787982092" className="text-gray-600 hover:text-green-600 transition-colors">
//                         0787 982 092
//                       </a>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-4">
//                     <MapPin className="w-6 h-6 text-green-600 mt-1" />
//                     <div>
//                       <h3 className="font-medium text-gray-900">Address</h3>
//                       <p className="text-gray-600">Kigali, Rwanda<br />Kimironko<br />KG 30</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-lg p-8 text-white">
//                 <h3 className="text-xl font-semibold mb-4">Quick Response</h3>
//                 <p className="mb-4">We typically respond within 24 hours during business days.</p>
//                 <div className="flex items-center gap-2 text-green-100">
//                   <CheckCircle className="w-4 h-4" />
//                   <span className="text-sm">Average response time: 2 hours</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ) : (
//           /* Admin Panel */
//           <div className="bg-white rounded-2xl shadow-lg">
//             <div className="p-6 border-b border-gray-200 flex justify-between items-center">
//               <div>
//                 <h2 className="text-2xl font-semibold text-gray-900">Contact Messages</h2>
//                 <p className="text-gray-600 text-sm">View and manage all contact form submissions</p>
//               </div>
//               <button
//                 onClick={fetchContactMessages}
//                 disabled={loadingMessages}
//                 className="flex items-center gap-1 text-green-600 hover:text-green-800 disabled:opacity-50 transition-colors"
//               >
//                 <RefreshCw className={`w-4 h-4 ${loadingMessages ? 'animate-spin' : ''}`} /> 
//                 Refresh
//               </button>
//             </div>

//             <div className="p-6">
//               {loadingMessages ? (
//                 <div className="flex items-center justify-center py-12">
//                   <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
//                   <span className="ml-2 text-gray-600">Loading messages...</span>
//                 </div>
//               ) : contactMessages.length === 0 ? (
//                 <div className="text-center py-12">
//                   <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                   <p className="text-gray-600">No contact messages found.</p>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   {contactMessages.map((msg, index) => (
//                     <div key={msg.id || index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
//                       <div className="flex justify-between items-start mb-2">
//                         <h3 className="font-medium text-gray-900">{msg.subject}</h3>
//                         <span className="text-sm text-gray-500">
//                           {msg.created_at ? new Date(msg.created_at).toLocaleDateString() : 
//                            msg.timestamp ? new Date(msg.timestamp).toLocaleDateString() : ''}
//                         </span>
//                       </div>
//                       <p className="text-sm text-gray-600 mb-2">From: {msg.name} ({msg.email})</p>
//                       <p className="text-gray-700">{msg.message}</p>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ContactUsPage;









