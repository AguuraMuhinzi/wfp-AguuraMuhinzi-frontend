// // import React, { useState, useEffect, useRef } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import {
// //   fetchUserConversations,
// //   fetchConversationHistory,
// //   sendMessage,
// //   receiveMessage,
// // } from '../../Redux/Slices/chat/chatSlice';
// // import websocketService from '../../services/websocketService';
// // import { Send, Paperclip, Smile, Mic } from 'lucide-react';

// // const ChatPage = () => {
// //   const dispatch = useDispatch();
// //   const conversations = useSelector((state) => state.chat.conversations);
// //   const messages = useSelector((state) => state.chat.messages);
// //   const isLoading = useSelector((state) => state.chat.isLoading);
// //   const error = useSelector((state) => state.chat.error);
// //   const [selectedConversationId, setSelectedConversationId] = useState(null);
// //   const [message, setMessage] = useState('');
// //   const messageEndRef = useRef(null);

// //   const userId = parseInt(localStorage.getItem('user_id'));

// //   // Fetch conversations on load
// //   useEffect(() => {
// //     if (userId) {
// //       dispatch(fetchUserConversations(userId));
// //     }
// //   }, [dispatch, userId]);

// //   // Fetch messages when a conversation is selected
// //   useEffect(() => {
// //     if (selectedConversationId) {
// //       dispatch(fetchConversationHistory(selectedConversationId));
// //     }
// //   }, [selectedConversationId, dispatch]);

// //   // Connect WebSocket and register callback
// //   useEffect(() => {
// //     if (selectedConversationId) {
// //       websocketService.connect(selectedConversationId, dispatch);
// //       websocketService.addCallback('chat_message', (data) => {
// //         dispatch(
// //           receiveMessage({
// //             conversationId: selectedConversationId,
// //             message: {
// //               id: Date.now(), // Just temporary ID
// //               sender_id: data.user_id,
// //               content: data.message,
// //               timestamp: data.timestamp,
// //             },
// //           })
// //         );
// //       });
// //     }
// //   }, [selectedConversationId, dispatch]);

// //   // Scroll to bottom on new messages
// //   useEffect(() => {
// //     messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// //   }, [messages[selectedConversationId]]);

// //   const handleSendMessage = () => {
// //     if (message.trim() !== '') {
// //       const messageData = {
// //         conversation_id: selectedConversationId,
// //         sender_id: userId,
// //         content: message,
// //       };
// //       dispatch(sendMessage(messageData));
// //       setMessage('');
// //     }
// //   };

// //   const handleConversationClick = (id) => {
// //     setSelectedConversationId(id);
// //   };

// //   const getOtherParticipant = (conversation) =>
// //     conversation.participants?.find((p) => p.id !== userId);

// //   return (
// //     <div className="flex h-screen">
// //       {/* Conversations Sidebar */}
// //       <div className="w-1/3 bg-gray-100 p-4 border-r">
// //         <h2 className="text-xl font-semibold mb-4">Chats</h2>
// //         {isLoading ? (
// //           <p>Loading...</p>
// //         ) : error ? (
// //           <p>{error}</p>
// //         ) : conversations.length > 0 ? (
// //           <ul className="space-y-2">
// //             {conversations.map((conversation) => {
// //               const otherUser = getOtherParticipant(conversation);
// //               return (
// //                 <li key={conversation.id}>
// //                   <button
// //                     onClick={() => handleConversationClick(conversation.id)}
// //                     className={`w-full text-left flex items-center p-2 rounded-lg ${
// //                       conversation.id === selectedConversationId
// //                         ? 'bg-green-200'
// //                         : 'hover:bg-gray-200'
// //                     }`}
// //                   >
// //                     <img
// //                       src={'/default-avatar.jpg'}
// //                       alt={otherUser?.username}
// //                       className="w-10 h-10 rounded-full mr-3"
// //                     />
// //                     <span className="font-medium">{otherUser?.username}</span>
// //                   </button>
// //                 </li>
// //               );
// //             })}
// //           </ul>
// //         ) : (
// //           <p>No conversations found.</p>
// //         )}
// //       </div>

// //       {/* Chat Window */}
// //       <div className="flex-1 flex flex-col bg-white">
// //         {selectedConversationId ? (
// //           <>
// //             {/* Chat Header */}
// //             <div className="flex items-center px-4 py-3 border-b">
// //               {(() => {
// //                 const selectedConv = conversations.find((conv) => conv.id === selectedConversationId);
// //                 const otherUser = getOtherParticipant(selectedConv);
// //                 return (
// //                   <>
// //                     <img
// //                       src={'/default-avatar.jpg'}
// //                       alt={otherUser?.username}
// //                       className="w-10 h-10 rounded-full mr-3"
// //                     />
// //                     <span className="font-semibold">{otherUser?.username}</span>
// //                   </>
// //                 );
// //               })()}
// //             </div>

// //             {/* Messages Area */}
// //             <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
// //             {messages[selectedConversationId]?.map((msg) => {
// //   const isMine = parseInt(userId) === msg.sender_id;
// //   return (
// //     <div
// //       key={msg.id}
// //       className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
// //     >
// //       <div
// //         className={`px-4 py-2 rounded-lg text-sm max-w-xs ${
// //           isMine ? 'bg-green-200 text-right' : 'bg-gray-200 text-left'
// //         }`}
// //       >
// //         <p>{msg.content}</p>
// //         <span className="block text-xs text-gray-500 mt-1">{msg.timestamp}</span>
// //       </div>
// //     </div>
// //   );
// // })}

// //               <div ref={messageEndRef} />
// //             </div>

// //             {/* Message Input */}
// //             <div className="flex items-center border-t p-3 space-x-3">
// //               <Smile className="w-6 h-6 text-gray-500" />
// //               <Paperclip className="w-6 h-6 text-gray-500" />
// //               <textarea
// //                 className="flex-1 border p-2 rounded-lg resize-none"
// //                 placeholder="Type a message"
// //                 rows={1}
// //                 value={message}
// //                 onChange={(e) => setMessage(e.target.value)}
// //               />
// //               <button
// //                 onClick={handleSendMessage}
// //                 disabled={!message.trim()}
// //                 className={`p-2 rounded-full ${
// //                   message.trim() ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-500'
// //                 }`}
// //               >
// //                 {message.trim() ? <Send className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
// //               </button>
// //             </div>
// //           </>
// //         ) : (
// //           <div className="flex-1 flex items-center justify-center text-gray-400">
// //             <p>Select a conversation to start chatting</p>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default ChatPage;


// import React, { useState, useEffect, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   fetchUserConversations,
//   fetchConversationHistory,
//   sendMessage,
//   receiveMessage,
// } from '../../Redux/Slices/chat/chatSlice';
// import websocketService from '../../services/websocketService';
// import { Send, Paperclip, Smile, Mic } from 'lucide-react';

// const ChatPage = () => {
//   const dispatch = useDispatch();
//   const conversations = useSelector((state) => state.chat.conversations);
//   const messages = useSelector((state) => state.chat.messages);
//   const isLoading = useSelector((state) => state.chat.isLoading);
//   const error = useSelector((state) => state.chat.error);
//   const [selectedConversationId, setSelectedConversationId] = useState(null);
//   const [message, setMessage] = useState('');
//   const messageEndRef = useRef(null);
//   const userId = parseInt(localStorage.getItem('user_id'));

//   useEffect(() => {
//     if (userId) dispatch(fetchUserConversations(userId));
//   }, [dispatch, userId]);

//   useEffect(() => {
//     if (selectedConversationId) dispatch(fetchConversationHistory(selectedConversationId));
//   }, [selectedConversationId, dispatch]);

//   useEffect(() => {
//     if (selectedConversationId) {
//       websocketService.connect(selectedConversationId, dispatch);
//       websocketService.addCallback('chat_message', (data) => {
//         dispatch(
//           receiveMessage({
//             conversationId: selectedConversationId,
//             message: {
//               id: Date.now(),
//               sender_id: data.user_id,
//               content: data.message,
//               timestamp: data.timestamp,
//             },
//           })
//         );
//       });
//     }
//   }, [selectedConversationId, dispatch]);

//   useEffect(() => {
//     messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages[selectedConversationId]]);

//   const handleSendMessage = () => {
//     if (message.trim() !== '') {
//       dispatch(
//         sendMessage({
//           conversation_id: selectedConversationId,
//           sender_id: userId,
//           content: message,
//         })
//       );
//       setMessage('');
//     }
//   };

//   const handleConversationClick = (id) => {
//     setSelectedConversationId(id);
//   };

//   const getOtherParticipant = (conversation) =>
//     conversation.participants?.find((p) => p.id !== userId);

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Left Sidebar */}
//       <div className="w-1/3 bg-white border-r overflow-y-auto">
//         <div className="p-4 border-b">
//           <h2 className="text-2xl font-bold text-green-700">Chats</h2>
//         </div>
//         {isLoading ? (
//           <p className="p-4">Loading...</p>
//         ) : error ? (
//           <p className="p-4 text-red-500">{error}</p>
//         ) : (
//           <ul className="divide-y">
//             {conversations.map((conversation) => {
//               const otherUser = getOtherParticipant(conversation);
//               return (
//                 <li key={conversation.id}>
//                   <button
//                     onClick={() => handleConversationClick(conversation.id)}
//                     className={`w-full text-left flex items-center px-4 py-3 transition-all ${
//                       conversation.id === selectedConversationId
//                         ? 'bg-green-100'
//                         : 'hover:bg-gray-100'
//                     }`}
//                   >
//                     <img
//                       src="/default-avatar.jpg"
//                       alt={otherUser?.username}
//                       className="w-10 h-10 rounded-full mr-3"
//                     />
//                     <div>
//                       <p className="font-medium">{otherUser?.username}</p>
//                     </div>
//                   </button>
//                 </li>
//               );
//             })}
//           </ul>
//         )}
//       </div>

//       {/* Chat Area */}
//       <div className="flex-1 flex flex-col">
//         {selectedConversationId ? (
//           <>
//             {/* Header */}
//             <div className="flex items-center border-b bg-white px-6 py-4 shadow-sm">
//               {(() => {
//                 const selectedConv = conversations.find((conv) => conv.id === selectedConversationId);
//                 const otherUser = getOtherParticipant(selectedConv);
//                 return (
//                   <>
//                     <img
//                       src="/default-avatar.jpg"
//                       alt={otherUser?.username}
//                       className="w-10 h-10 rounded-full mr-3"
//                     />
//                     <span className="font-semibold text-lg">{otherUser?.username}</span>
//                   </>
//                 );
//               })()}
//             </div>

//             {/* Messages */}
//             <div className="flex-1 bg-gray-50 px-6 py-4 overflow-y-auto space-y-2">
//               {messages[selectedConversationId]?.map((msg) => {
//                 const isMine = parseInt(userId) === msg.sender_id;
//                 return (
//                   <div key={msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
//                     <div
//                       className={`rounded-xl px-4 py-2 text-sm max-w-sm ${
//                         isMine ? 'bg-green-500 text-white' : 'bg-white text-gray-800 shadow'
//                       }`}
//                     >
//                       <p>{msg.content}</p>
//                       <span className="text-xs text-gray-300 block mt-1 text-right">
//                         {msg.timestamp}
//                       </span>
//                     </div>
//                   </div>
//                 );
//               })}
//               <div ref={messageEndRef} />
//             </div>

//             {/* Input */}
//             <div className="border-t bg-white px-4 py-3 flex items-center space-x-3">
//               <Smile className="w-6 h-6 text-gray-500 cursor-pointer" />
//               <Paperclip className="w-6 h-6 text-gray-500 cursor-pointer" />
//               <textarea
//                 className="flex-1 border rounded-full px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
//                 placeholder="Type your message..."
//                 rows={1}
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//               />
//               <button
//                 onClick={handleSendMessage}
//                 disabled={!message.trim()}
//                 className={`p-2 rounded-full ${
//                   message.trim() ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-500'
//                 }`}
//               >
//                 {message.trim() ? <Send className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
//               </button>
//             </div>
//           </>
//         ) : (
//           <div className="flex-1 flex items-center justify-center text-gray-500">
//             <p>Select a conversation to start chatting</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChatPage;
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUserConversations,
  fetchConversationHistory,
  sendMessage,
  receiveMessage,
  createConversation
} from '../../Redux/Slices/chat/chatSlice';
import websocketService from '../../services/websocketService';
import { Send, Paperclip, Smile, Mic, Plus, User } from 'lucide-react';

const ChatPage = () => {
  const dispatch = useDispatch();
  const conversations = useSelector((state) => state.chat.conversations);
  const messages = useSelector((state) => state.chat.messages);
  const isLoading = useSelector((state) => state.chat.isLoading);
  const error = useSelector((state) => state.chat.error);
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [message, setMessage] = useState('');
  const messageEndRef = useRef(null);
  const userId = parseInt(localStorage.getItem('user_id'));

  useEffect(() => {
    if (userId) dispatch(fetchUserConversations(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (selectedConversationId) dispatch(fetchConversationHistory(selectedConversationId));
  }, [selectedConversationId, dispatch]);

  useEffect(() => {
    if (selectedConversationId) {
      websocketService.connect(selectedConversationId, dispatch);
      websocketService.addCallback('chat_message', (data) => {
        dispatch(
          receiveMessage({
            conversationId: selectedConversationId,
            message: {
              id: Date.now(),
              sender_id: data.user_id,
              content: data.message,
              timestamp: data.timestamp,
            },
          })
        );
      });
    }
  }, [selectedConversationId, dispatch]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages[selectedConversationId]]);

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      dispatch(
        sendMessage({
          conversation_id: selectedConversationId,
          sender_id: userId,
          content: message,
        })
      );
      setMessage('');
    }
  };

  const handleConversationClick = (id) => {
    setSelectedConversationId(id);
  };

  const handleStartNewConversation = () => {
    const receiverId = prompt('Enter the user ID to start a new conversation with:');
    if (receiverId && !isNaN(receiverId)) {
      dispatch(createConversation([userId, parseInt(receiverId)]));
    }
  };

  const getOtherParticipant = (conversation) =>
    conversation.participants?.find((p) => p.id !== userId);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-1/3 bg-white border-r overflow-y-auto flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-2xl font-bold text-green-700">Chats</h2>
          <button
            onClick={handleStartNewConversation}
            className="text-green-600 hover:text-green-800"
            title="Start new conversation"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
        {isLoading ? (
          <p className="p-4">Loading...</p>
        ) : error ? (
          <p className="p-4 text-red-500">{error}</p>
        ) : (
          <ul className="divide-y">
            {conversations.map((conversation) => {
              const otherUser = getOtherParticipant(conversation);
              return (
                <li key={conversation.id}>
                  <button
                    onClick={() => handleConversationClick(conversation.id)}
                    className={`w-full text-left flex items-center px-4 py-3 transition-all ${
                      conversation.id === selectedConversationId ? 'bg-green-100' : 'hover:bg-gray-100'
                    }`}
                  >
                    {otherUser?.avatar ? (
                      <img
                        src={otherUser.avatar}
                        alt={otherUser?.username}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                        <User className="w-5 h-5 text-white" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium">{otherUser?.username}</p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversationId ? (
          <>
            {/* Header */}
            <div className="flex items-center border-b bg-white px-6 py-4 shadow-sm">
              {(() => {
                const selectedConv = conversations.find((conv) => conv.id === selectedConversationId);
                const otherUser = getOtherParticipant(selectedConv);
                return (
                  <>
                    {otherUser?.avatar ? (
                      <img
                        src={otherUser.avatar}
                        alt={otherUser?.username}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                        <User className="w-5 h-5 text-white" />
                      </div>
                    )}
                    <span className="font-semibold text-lg">{otherUser?.username}</span>
                  </>
                );
              })()}
            </div>

            {/* Messages */}
            <div className="flex-1 bg-gray-50 px-6 py-4 overflow-y-auto space-y-2">
              {messages[selectedConversationId]?.map((msg) => {
                const isMine = parseInt(userId) === msg.sender_id;
                return (
                  <div key={msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`rounded-xl px-4 py-2 text-sm max-w-sm ${
                        isMine ? 'bg-green-500 text-white' : 'bg-white text-gray-800 shadow'
                      }`}
                    >
                      <p>{msg.content}</p>
                      <span className="text-xs text-gray-300 block mt-1 text-right">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                );
              })}
              <div ref={messageEndRef} />
            </div>

            {/* Input */}
            <div className="border-t bg-white px-4 py-3 flex items-center space-x-3">
              <Smile className="w-6 h-6 text-gray-500 cursor-pointer" />
              <Paperclip className="w-6 h-6 text-gray-500 cursor-pointer" />
              <textarea
                className="flex-1 border rounded-full px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Type your message..."
                rows={1}
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
                {message.trim() ? <Send className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <p>Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;