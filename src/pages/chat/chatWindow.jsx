// import React, { useState, useEffect, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchConversationHistory, sendMessage } from '../../Redux/Slices/chat/chatSlice';
// import websocketService from '../../services/websocketService';
// import { Send, Paperclip, Mic, Smile, MoreVertical, Phone, Video } from 'lucide-react';

// const WhatsAppChat = ({ conversationId }) => {
//   const dispatch = useDispatch();
// //   const currentUser = useSelector((state) => state.auth.user);
//   const [currentUser, setCurrentUser] = useState({
//     id: localStorage.getItem('user_id') || 1,
//     // username: localStorage.getItem('username') || 'User'
//     username: 'user',
//   });
//   const messages = useSelector((state) => state.chat.messages[conversationId] || []);
//   const conversationInfo = useSelector((state) => state.chat.conversations.find(c => c.id === conversationId));
//   const [message, setMessage] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const messagesEndRef = useRef(null);
//   const inputRef = useRef(null);
  
//   useEffect(() => {
//     // Fetch conversation history when component mounts
//     dispatch(fetchConversationHistory(conversationId));
    
//     // Connect to WebSocket
//     websocketService.connect(conversationId);
    
//     // Listen for new messages and typing indicators
//     websocketService.addCallback('new_message', (data) => {
//       dispatch(fetchConversationHistory(conversationId));
//     });
    
//     websocketService.addCallback('typing_indicator', (data) => {
//       setIsTyping(data.isTyping);
//     });
    
//     return () => {
//       websocketService.disconnect(); // Cleanup on unmount
//     };
//   }, [conversationId, dispatch]);
  
//   // Auto scroll to bottom on new messages
//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);
  
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };
  
//   const handleSendMessage = () => {
//     if (message.trim() !== '') {
//       const messageData = {
//         conversation_id: conversationId,
//         sender_id: currentUser.id,
//         content: message,
//       };
//       dispatch(sendMessage(messageData));
//       setMessage('');
//       inputRef.current.focus();
//     }
//   };
  
//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };
  
//   const handleTyping = (e) => {
//     setMessage(e.target.value);
//     // Send typing indicator through websocket
//     websocketService.sendTypingIndicator(conversationId, currentUser.id, true);
    
//     // Clear typing indicator after 2 seconds of inactivity
//     const lastTypingTime = Date.now();
//     setTimeout(() => {
//       const timeNow = Date.now();
//       if (timeNow - lastTypingTime >= 2000) {
//         websocketService.sendTypingIndicator(conversationId, currentUser.id, false);
//       }
//     }, 2000);
//   };
  
//   const formatTime = (timestamp) => {
//     const date = new Date(timestamp);
//     return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };
  
//   const formatDate = (timestamp) => {
//     const date = new Date(timestamp);
//     return date.toLocaleDateString();
//   };
  
//   // Group messages by date
//   const groupMessagesByDate = () => {
//     const groups = {};
//     messages.forEach(msg => {
//       const date = formatDate(msg.timestamp);
//       if (!groups[date]) {
//         groups[date] = [];
//       }
//       groups[date].push(msg);
//     });
//     return groups;
//   };
  
//   const messageGroups = groupMessagesByDate();
  
//   return (
//     <div className="flex flex-col h-screen bg-gray-100">
//       {/* Chat Header */}
//       <div className="bg-green-600 text-white p-4 flex justify-between items-center shadow-md">
//         <div className="flex items-center space-x-3">
//           <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
//             {conversationInfo?.avatar ? (
//               <img 
//                 src={conversationInfo.avatar} 
//                 alt={conversationInfo?.name || 'Contact'} 
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <div className="w-full h-full flex items-center justify-center bg-gray-400 text-white text-xl font-bold">
//                 {(conversationInfo?.name || 'C').charAt(0)}
//               </div>
//             )}
//           </div>
//           <div>
//             <h2 className="font-semibold">{conversationInfo?.name || 'Contact'}</h2>
//             <p className="text-xs text-gray-100">
//               {isTyping ? 'typing...' : conversationInfo?.status || 'online'}
//             </p>
//           </div>
//         </div>
//         <div className="flex space-x-4">
//           <Phone className="w-5 h-5 cursor-pointer" />
//           <Video className="w-5 h-5 cursor-pointer" />
//           <MoreVertical className="w-5 h-5 cursor-pointer" />
//         </div>
//       </div>
      
//       {/* Chat Messages */}
//       <div className="flex-1 overflow-y-auto p-4 bg-gray-50">

//         {Object.entries(messageGroups).map(([date, msgs]) => (
//           <div key={date}>
//             <div className="flex justify-center my-2">
//               <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-lg">
//                 {date}
//               </span>
//             </div>
//             {msgs.map((msg, index) => {
//               const isMe = msg.sender_id === currentUser.id;
//               return (
//                 <div 
//                   key={msg.id || index} 
//                   className={`flex mb-2 ${isMe ? 'justify-end' : 'justify-start'}`}
//                 >
//                   <div 
//                     className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg shadow relative ${
//                       isMe ? 'bg-green-100 rounded-tr-none' : 'bg-white rounded-tl-none'
//                     }`}
//                   >
//                     {!isMe && (
//                       <span className="font-medium text-green-700 text-sm block mb-1">
//                         {msg.sender?.username || 'User'}
//                       </span>
//                     )}
//                     <p className="break-words">{msg.content}</p>
//                     <span className="text-gray-500 text-xs absolute bottom-1 right-2">
//                       {formatTime(msg.timestamp)}
//                       {isMe && (
//                         <span className="ml-1 text-blue-500">✓✓</span>
//                       )}
//                     </span>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>
      
//       {/* Chat Input */}
//       <div className="bg-gray-100 p-3 border-t">
//         <div className="flex items-center bg-white rounded-full p-1">
//           <button className="p-2 text-gray-500 hover:text-gray-700">
//           <Smile className="w-5 h-5" />
//           </button>
//           <button className="p-2 text-gray-500 hover:text-gray-700">
//             <Paperclip className="w-5 h-5" />
//           </button>
//           <textarea
//             ref={inputRef}
//             className="flex-1 border-none outline-none px-3 py-2 resize-none max-h-32"
//             placeholder="Type a message"
//             value={message}
//             onChange={handleTyping}
//             onKeyDown={handleKeyPress}
//             rows={1}
//           />
//           <button 
//             className={`p-2 rounded-full ${message.trim() ? 'bg-green-500 text-white' : 'text-gray-500'}`}
//             onClick={handleSendMessage}
//             disabled={!message.trim()}
//           >
//             {message.trim() ? <Send className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WhatsAppChat;

// In ChatPage.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserConversations, fetchConversationHistory, sendMessage } from '../../Redux/Slices/chat/chatSlice';
import { Send, Paperclip, Smile, Mic } from 'lucide-react';

const ChatPage = () => {
  const dispatch = useDispatch();
  const conversations = useSelector((state) => state.chat.conversations);
  const messages = useSelector((state) => state.chat.messages);
  const isLoading = useSelector((state) => state.chat.isLoading);
  const error = useSelector((state) => state.chat.error);
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [message, setMessage] = useState('');
  
  const userId = localStorage.getItem('user_id');  // Assuming user ID is stored in local storage
  console.log('Fetched user_id from localStorage:', userId)
  useEffect(() => {
    if (userId) {
      // Fetch user's conversations from backend when the page loads
      dispatch(fetchUserConversations(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (selectedConversationId) {
      // Fetch the history of messages for the selected conversation
      dispatch(fetchConversationHistory(selectedConversationId));
    }
  }, [selectedConversationId, dispatch]);

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      const messageData = {
        conversation_id: selectedConversationId,
        sender_id: userId,  // Use userId from local storage
        content: message,
      };
      dispatch(sendMessage(messageData));
      setMessage('');
    }
  };

  const handleConversationClick = (id) => {
    setSelectedConversationId(id);
  };

  return (
    <div className="flex">
      {/* Left Sidebar: List of Conversations */}
      <div className="w-1/3 bg-gray-100 p-4">
        <h2 className="text-xl font-semibold">Conversations</h2>
        <div className="mt-4">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : conversations && conversations.length > 0 ? (
            <ul>
              {conversations.map((conversation) => (
                <li key={conversation.id} className="my-2">
                  <button
                    onClick={() => handleConversationClick(conversation.id)}
                    className="w-full text-left p-2 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center"
                  >
                    <img
                      src={conversation.avatar || 'default-avatar.jpg'}
                      alt={conversation.name}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <span>{conversation.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No conversations available</p>
          )}
        </div>
      </div>

      {/* Right Side: Chat Window */}
      <div className="flex-1 bg-white p-4">
        {selectedConversationId ? (
          <>
            {/* Chat Header */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
                <img
                  src={conversations.find((conv) => conv.id === selectedConversationId)?.avatar || 'default-avatar.jpg'}
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-semibold">
                {conversations.find((conv) => conv.id === selectedConversationId)?.name || 'Conversation'}
              </span>
            </div>

            {/* Messages */}
            <div className="h-64 overflow-y-auto p-4 border-b mb-4">
              {messages[selectedConversationId]?.map((msg) => (
                <div key={msg.id} className={`mb-2 ${msg.sender_id === userId ? 'text-right' : 'text-left'}`}>
                  <div
                    className={`inline-block max-w-xs bg-gray-200 p-2 rounded-lg ${
                      msg.sender_id === userId ? 'bg-green-200' : 'bg-gray-200'
                    }`}
                  >
                    <p>{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="flex items-center space-x-3">
              <Smile className="w-6 h-6 text-gray-500" />
              <Paperclip className="w-6 h-6 text-gray-500" />
              <textarea
                className="flex-1 border p-2 rounded-lg"
                placeholder="Type a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className={`p-2 rounded-full ${
                  message.trim() ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-500'
                }`}
              >
                {message.trim() ? <Send className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </button>
            </div>
          </>
        ) : (
          <p>Select a conversation to start chatting!</p>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
