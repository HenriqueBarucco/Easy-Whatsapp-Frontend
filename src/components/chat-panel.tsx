'use client';

import { useEffect, useState } from 'react';
import { Chat } from './chat';
import { ContactList } from './contact-list';
import socket from '@/lib/socket';
import { useRouter } from 'next/navigation';

export default function ChatPanel({token, chats, contacts}: any) {
    const router = useRouter();
    const [contact, setContact] = useState<any>(null);

    useEffect(() => {
        socket.on('instanceDisconnected', () => {
            router.refresh();
        });
    }, [router]);

    const selectContact = (contact: any) => {
        setContact(contact);
    };

    return (
        <div className='flex flex-row h-full space-x-4'>
            <ContactList contacts={contacts || []} selectContact={selectContact} />
            <Chat accessToken={token} chatMessages={chats[contact?.phone]?.messages || []} contact={contact}/>
        </div>
    );
}