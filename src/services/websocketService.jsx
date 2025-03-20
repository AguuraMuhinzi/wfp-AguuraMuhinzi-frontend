import { receiveMessage } from '../Redux/Slices/chat/chatSlice';

class WebSocketService {
  constructor() {
    this.socket = null;
    this.callbacks = {}; // Store the callbacks
  }

  connect(conversationId, dispatch) {
    if (this.socket) {
      this.disconnect();
    }

    const wsUrl = `ws://localhost:8000/ws/chat/${conversationId}/`;
    this.socket = new WebSocket(wsUrl);

    this.socket.onopen = () => {
      console.log('WebSocket connected');
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('WebSocket Message Received:', data);

      // Call the appropriate callback if registered
      if (this.callbacks[data.type]) {
        this.callbacks[data.type](data, dispatch); // pass data and dispatch
      }
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    this.socket.onclose = () => {
      console.log('WebSocket Disconnected');
    };
  }

  // Disconnect the WebSocket connection
  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  // Send a message via WebSocket
  sendMessage(messageData) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(messageData));
    } else {
      console.error('WebSocket is not connected.');
    }
  }
  sendTypingIndicator(conversationId, userId, isTyping) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(
        JSON.stringify({
          type: 'typing_indicator',
          conversation_id: conversationId,
          user_id: userId,
          is_typing: isTyping,
        })
      );
    } else {
      console.error('WebSocket is not connected.');
    }
  }



  // Register a callback for a specific type of message
  addCallback(type, callback) {
    this.callbacks[type] = callback;
  }
}

const websocketService = new WebSocketService();
export default websocketService;
