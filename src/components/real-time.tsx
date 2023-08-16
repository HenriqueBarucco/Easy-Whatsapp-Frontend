'use client';

import socket from '@/lib/socket';
import React, { useEffect } from 'react';

export default function RealTimeComponent() {
    const [message, setMessage] = React.useState('');
    useEffect(() => {
        socket.on('message', (data) => {
            setMessage(data);
        });
    }, []);

    return (
        <div>
            <p>{JSON.stringify(message)}</p>
        </div>
    );
}
