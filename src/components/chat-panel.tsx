'use client';

import { useEffect, useState } from 'react';
import { Chat } from './chat';
import { ContactList } from './contact-list';
import { getSocketInstance } from '@/lib/socket';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function ChatPanel({token, chats, contacts}: any) {
    const [contact, setContact] = useState<any>(null);
    const [messages, setMessages] = useState<any[]>(chats);
    const router = useRouter();
    const session = useSession() as any;

    useEffect(() => {
        const setupSocketListeners = async () => {
            const socket = await getSocketInstance(session.data?.user?.key);
    
            socket.on('instanceDisconnected', () => {
                router.refresh();
            });

            socket.on('message', (message: any) => {
                setMessages((prevMessages: any) => {
                    const phoneNumber = message.phone;
                    const updatedMessages = {
                        ...prevMessages,
                        [phoneNumber]: {
                            messages: [...(prevMessages[phoneNumber]?.messages || []), message],
                        },
                    };
                    return updatedMessages;
                });
            });
        };
    
        if (session.data?.user?.key != undefined) setupSocketListeners();
    }, [session, router]);

    const selectContact = (contact: any) => {
        setContact(contact);
    };

    return (
        <div className='flex flex-row h-full space-x-4'>
            <ContactList contacts={contacts || []} selectContact={selectContact} />
            <Chat accessToken={token} chatMessages={messages[contact?.phone]?.messages || []} contact={contact} setMessages={setMessages}/>
        </div>
    );
}