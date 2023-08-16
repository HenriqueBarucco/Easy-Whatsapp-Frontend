'use client';

import React, { useEffect } from 'react';
import io from 'socket.io-client';

export default function RealTimeComponent() {
    const [message, setMessage] = React.useState('');
    useEffect(() => {
        const socket = io('http://localhost:8080');

        socket.on('connect', () => {
            //console.log('Conectado ao servidor de WebSocket');
        });

        socket.on('message', (data) => {
            //console.log('Resposta do evento personalizado:', data);
            setMessage(data);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div>
            <p>{JSON.stringify(message)}</p>
        </div>
    );
}
