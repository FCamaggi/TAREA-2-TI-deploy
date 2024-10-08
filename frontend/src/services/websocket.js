const websocketUrl = import.meta.env.VITE_WEBSOCKET_URL;

export const connectWebSocket = () => {
    const socket = new WebSocket(websocketUrl);
    return socket;
};

export const sendMessage = (socket, message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
    } else {
        console.error('WebSocket no está conectado.');
    }
};

export const disconnectWebSocket = (socket) => {
    if (socket) {
        socket.close();
    }
};