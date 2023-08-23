import { io } from 'socket.io-client';

let socketInstance: any = null;

const initSocket = async (key: string) => {
    const socket = io('https://easy-whatsapp-api.henriquebarucco.com.br', {
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
