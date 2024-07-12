class WebSocketService {
    static instance = null;
    callbacks = {};
  
    static getInstance() {
      if (!WebSocketService.instance) {
        WebSocketService.instance = new WebSocketService();
      }
      return WebSocketService.instance;
    }
  
    constructor() {
      this.socketRef = null;
    }
  
    connect(user_id) {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiZjg2MDY4YzctMDhlZC00ZGZjLWI5NmQtZTBlMWMwYWUwOWRmIiwicm9sZSI6MSwiZXhwIjoyNDk4MjkwNDI5LCJpYXQiOjE3MjA2OTA0Mjl9.YjilJMCxBH26XceT4Rhor2mUBC7y4b9yHZ1s4ZgttHE";
      const wsUrl = `ws://172.31.4.253/socket/websocket?token=${token}`;
      this.socketRef = new WebSocket(wsUrl);
  
      this.socketRef.onopen = () => {
        console.log("WebSocket open");
        this.sendMessage({
          topic: "message:f86068c7-08ed-4dfc-b96d-e0e1c0ae09df",
          event: "phx_join",
          payload: { hi: "joined" },
          ref: ""
        });
      };
  
      this.socketRef.onmessage = e => {
        this.socketNewMessage(e.data);
      };
  
      this.socketRef.onerror = e => {
        console.error("WebSocket error", e);
      };
  
      this.socketRef.onclose = () => {
        console.log("WebSocket closed");
        this.connect();
      };
    }
  
    socketNewMessage(data) {
      const parsedData = JSON.parse(data);
      const event = parsedData.event;
      if (Object.keys(this.callbacks).includes(event)) {
        this.callbacks[event](parsedData.payload);
      }
    }
  
    sendMessage(data) {
      try {
        this.socketRef.send(JSON.stringify(data));
      } catch (err) {
        console.error("Error sending message", err.message);
      }
    }
  
    addCallbacks(event, callback) {
      this.callbacks[event] = callback;
    }
  
    state() {
      return this.socketRef.readyState;
    }
  
    waitForSocketConnection(callback) {
      const socket = this.socketRef;
      const recursion = this.waitForSocketConnection;
      setTimeout(() => {
        if (socket.readyState === 1) {
          console.log("Connection is made");
          if (callback != null) {
            callback();
          }
        } else {
          console.log("Wait for connection...");
          recursion(callback);
        }
      }, 1);
    }
  }
  
  const WebSocketInstance = WebSocketService.getInstance();
  
  export default WebSocketInstance;
  