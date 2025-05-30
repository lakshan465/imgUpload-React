import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const stompClient = new Client({
  webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
  reconnectDelay: 5000,
  onConnect: () => console.log("Connected to WebSocket"),
  onDisconnect: () => console.log("Disconnected from WebSocket"),
});

export const connectWebSocket = (touristId, onMessageReceived) => {
  stompClient.activate();
  stompClient.onConnect = () => {
    console.log("Connected to WebSocket");
    stompClient.subscribe(`/topic/notifications/${touristId}`, (message) => {
      onMessageReceived(JSON.parse(message.body));
    });
  };
};

export const disconnectWebSocket = () => {
  if (stompClient.connected) stompClient.deactivate();
};
