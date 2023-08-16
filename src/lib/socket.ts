import { io } from 'socket.io-client';

const socket = io(process.env.API_URL || 'http://localhost:8080');

socket.on('connect', () => {
    //console.log('Conectado ao servidor de WebSocket');
});

/* return () => {
    socket.disconnect();
}; */

export default socket;
