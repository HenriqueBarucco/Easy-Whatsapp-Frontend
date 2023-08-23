import { io } from 'socket.io-client';

let socketInstance: any = null;

const initSocket = async (key: string) => {
    const socket = io(
        process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
        {
            query: { key },
        }
    );

    return socket;
};

export const getSocketInstance = async (key: string) => {
    if (!socketInstance) {
        socketInstance = await initSocket(key);
    }
    return socketInstance;
};
