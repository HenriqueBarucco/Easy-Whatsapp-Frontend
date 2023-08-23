import { io } from 'socket.io-client';
import { API } from './api';

let socketInstance: any = null;

const initSocket = async (key: string) => {
    const socket = io(API, {
        query: { key },
    });

    return socket;
};

export const getSocketInstance = async (key: string) => {
    if (!socketInstance) {
        socketInstance = await initSocket(key);
    }
    return socketInstance;
};
