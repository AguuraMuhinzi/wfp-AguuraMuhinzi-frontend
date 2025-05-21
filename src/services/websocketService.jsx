import { addNotification } from '../Redux/Slices/notifications/notification_slice';

class WebSocketNotificationService {
  constructor() {
    this.socket = null;
    this.callbacks = {};
    this.userId = null;
  }

  connect(userId, dispatch) {
    if (this.socket && this.userId === userId) return;

    if (this.socket) {
      this.disconnect();
    }

    this.userId = userId;
    const wsUrl = `ws://localhost:8000/ws/notifications/${userId}/`;
    this.socket = new WebSocket(wsUrl);

    this.socket.onopen = () => {
      console.log('🔔 Notification WebSocket connected');
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('📩 Notification received:', data);

      if (this.callbacks[data.type]) {
        this.callbacks[data.type](data, dispatch);
      }
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    this.socket.onclose = () => {
      console.log('🔌 Notification WebSocket disconnected');
    };

    // Register default notification callback
    this.addCallback('notification', (data, dispatch) => {
      dispatch(addNotification(data.notification));
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
      this.userId = null;
    }
  }

  sendNotification(notificationData) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(notificationData));
    } else {
      console.error('Notification WebSocket is not connected.');
    }
  }

  addCallback(type, callback) {
    this.callbacks[type] = callback;
  }
}

const websocketNotificationService = new WebSocketNotificationService();
export default websocketNotificationService;
