'use client';

import { useState } from 'react';
import { Chat } from './chat';
import { ContactList } from './contact-list';

export default function ChatPanel({token, chats, contacts}: any) {
    const [contact, setContact] = useState<any>(null);

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