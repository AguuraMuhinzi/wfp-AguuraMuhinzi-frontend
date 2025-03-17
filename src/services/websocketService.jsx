class WebSocketService {
    constructor() {
      this.socket = null;
      this.callbacks = {};
    }
  
    connect(conversationId) {
      if (this.socket) {
        this.disconnect(); // Close any existing connection
      }
  
      const wsUrl = `ws://localhost:8000/ws/chat/${conversationId}/`; // Update with your backend WebSocket URL
      this.socket = new WebSocket(wsUrl);
  
      this.socket.onopen = () => {
        console.log('WebSocket connected');
      };
  
      this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (this.callbacks[data.type]) {
          this.callbacks[data.type](data);
        }
      };
  
      this.socket.onerror = (error) => {
        console.error('WebSocket Error:', error);
      };
  
      this.socket.onclose = () => {
        console.log('WebSocket Disconnected');
      };
    }
  
    disconnect() {
      if (this.socket) {
        this.socket.close();
        this.socket = null;
      }
    }
  
    sendMessage(messageData) {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify(messageData));
      } else {
        console.error('WebSocket is not connected.');
      }
    }
  
    addCallback(type, callback) {
      this.callbacks[type] = callback;
    }
    sendTypingIndicator(conversationId, userId, isTyping) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
          this.socket.send(JSON.stringify({
            type: 'typing_indicator',
            conversation_id: conversationId,
            user_id: userId,
            is_typing: isTyping
          }));
        }
    }
  }
  
  const websocketService = new WebSocketService();
  export default websocketService;
  