import { receiveMessage } from '../Redux/Slices/chat/chatSlice';

class WebSocketService {
  constructor() {
    this.socket = null;
    this.callbacks = {};
    this.currentRoom = null;
  }

  connect(conversationId, dispatch) {
    if (this.socket && this.currentRoom === conversationId) return; // prevent duplicate connection

    if (this.socket) {
      this.disconnect();
    }

    this.currentRoom = conversationId;
    const wsUrl = `ws://localhost:8000/ws/chat/${conversationId}/`;
    this.socket = new WebSocket(wsUrl);

    this.socket.onopen = () => {
      console.log('WebSocket connected');
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('WebSocket Message Received:', data);

      if (this.callbacks[data.type]) {
        this.callbacks[data.type](data, dispatch);
      }
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    this.socket.onclose = () => {
      console.log('WebSocket Disconnected');
    };

    // Register the chat_message callback
    this.addCallback('chat_message', (data, dispatch) => {
      dispatch(
        receiveMessage({
          conversationId: data.conversation_id,
          message: {
            id: Date.now(), // temporary ID
            sender_id: data.user_id,
            content: data.message,
            timestamp: data.timestamp,
          },
        })
      );
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
      this.currentRoom = null;
    }
  }

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

  addCallback(type, callback) {
    this.callbacks[type] = callback;
  }
}

const websocketService = new WebSocketService();
export default websocketService;
