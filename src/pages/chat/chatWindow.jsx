import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConversationHistory, sendMessage } from '../../Redux/Slices/chat/chatSlice';
import websocketService from '../../services/websocketService';
import { Send, Paperclip, Mic, Smile, MoreVertical, Phone, Video } from 'lucide-react';

const WhatsAppChat = ({ conversationId }) => {
  const dispatch = useDispatch();
//   const currentUser = useSelector((state) => state.auth.user);
  const [currentUser, setCurrentUser] = useState({
    id: localStorage.getItem('user_id') || 1,
    // username: localStorage.getItem('username') || 'User'
    username: 'user',
  });
  const messages = useSelector((state) => state.chat.messages[conversationId] || []);
  const conversationInfo = useSelector((state) => state.chat.conversations.find(c => c.id === conversationId));
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  
  useEffect(() => {
    // Fetch conversation history when component mounts
    dispatch(fetchConversationHistory(conversationId));
    
    // Connect to WebSocket
    websocketService.connect(conversationId);
    
    // Listen for new messages and typing indicators
    websocketService.addCallback('new_message', (data) => {
      dispatch(fetchConversationHistory(conversationId));
    });
    
    websocketService.addCallback('typing_indicator', (data) => {
      setIsTyping(data.isTyping);
    });
    
    return () => {
      websocketService.disconnect(); // Cleanup on unmount
    };
  }, [conversationId, dispatch]);
  
  // Auto scroll to bottom on new messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = () => {
    if (message.trim() !== '') {
      const messageData = {
        conversation_id: conversationId,
        sender_id: currentUser.id,
        content: message,
      };
      dispatch(sendMessage(messageData));
      setMessage('');
      inputRef.current.focus();
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleTyping = (e) => {
    setMessage(e.target.value);
    // Send typing indicator through websocket
    websocketService.sendTypingIndicator(conversationId, currentUser.id, true);
    
    // Clear typing indicator after 2 seconds of inactivity
    const lastTypingTime = Date.now();
    setTimeout(() => {
      const timeNow = Date.now();
      if (timeNow - lastTypingTime >= 2000) {
        websocketService.sendTypingIndicator(conversationId, currentUser.id, false);
      }
    }, 2000);
  };
  
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };
  
  // Group messages by date
  const groupMessagesByDate = () => {
    const groups = {};
    messages.forEach(msg => {
      const date = formatDate(msg.timestamp);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(msg);
    });
    return groups;
  };
  
  const messageGroups = groupMessagesByDate();
  
  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-white">
      {/* Chat Header */}
      <div className="bg-green-600 text-white p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
            {conversationInfo?.avatar ? (
              <img 
                src={conversationInfo.avatar} 
                alt={conversationInfo?.name || 'Contact'} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-400 text-white text-xl font-bold">
                {(conversationInfo?.name || 'C').charAt(0)}
              </div>
            )}
          </div>
          <div>
            <h2 className="font-semibold">{conversationInfo?.name || 'Contact'}</h2>
            <p className="text-xs text-gray-100">
              {isTyping ? 'typing...' : conversationInfo?.status || 'online'}
            </p>
          </div>
        </div>
        <div className="flex space-x-4">
          <Phone className="w-5 h-5 cursor-pointer" />
          <Video className="w-5 h-5 cursor-pointer" />
          <MoreVertical className="w-5 h-5 cursor-pointer" />
        </div>
      </div>
      
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">

        {Object.entries(messageGroups).map(([date, msgs]) => (
          <div key={date}>
            <div className="flex justify-center my-2">
              <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-lg">
                {date}
              </span>
            </div>
            {msgs.map((msg, index) => {
              const isMe = msg.sender_id === currentUser.id;
              return (
                <div 
                  key={msg.id || index} 
                  className={`flex mb-2 ${isMe ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg shadow relative ${
                      isMe ? 'bg-green-100 rounded-tr-none' : 'bg-white rounded-tl-none'
                    }`}
                  >
                    {!isMe && (
                      <span className="font-medium text-green-700 text-sm block mb-1">
                        {msg.sender?.username || 'User'}
                      </span>
                    )}
                    <p className="break-words">{msg.content}</p>
                    <span className="text-gray-500 text-xs absolute bottom-1 right-2">
                      {formatTime(msg.timestamp)}
                      {isMe && (
                        <span className="ml-1 text-blue-500">✓✓</span>
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Chat Input */}
      <div className="bg-gray-100 p-3 border-t">
        <div className="flex items-center bg-white rounded-full p-1">
          <button className="p-2 text-gray-500 hover:text-gray-700">
          <Smile className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <Paperclip className="w-5 h-5" />
          </button>
          <textarea
            ref={inputRef}
            className="flex-1 border-none outline-none px-3 py-2 resize-none max-h-32"
            placeholder="Type a message"
            value={message}
            onChange={handleTyping}
            onKeyDown={handleKeyPress}
            rows={1}
          />
          <button 
            className={`p-2 rounded-full ${message.trim() ? 'bg-green-500 text-white' : 'text-gray-500'}`}
            onClick={handleSendMessage}
            disabled={!message.trim()}
          >
            {message.trim() ? <Send className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppChat;