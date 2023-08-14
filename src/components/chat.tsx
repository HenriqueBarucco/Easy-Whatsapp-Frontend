'use client';

import { Separator } from '@radix-ui/react-dropdown-menu';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { SendMessage } from './send-message';
import { useEffect, useRef, useState } from 'react';
import { ScrollArea } from './ui/scroll-area';

export function Chat({ accessToken, chatMessages, contact }: { accessToken: any, chatMessages: any[], contact: any}) {
    const [messages, setMessages] = useState<any[]>(chatMessages);
    const scrollArea = useRef(null) as any;

    const scrollToBottom = () => {
        if (!scrollArea.current) return; 
        scrollArea.current.scrollToEnd();
    };

    useEffect(() => {
        setMessages(chatMessages);
    }, [chatMessages]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    if (contact === null) {
        return (
            <p className='flex justify-center text-center items-center h-full w-full'>
                Select a contact to start chatting.
            </p>
        );
    }

    return (
        <Card className="flex flex-col w-full">
            <CardHeader>
                <CardTitle>{contact?.name || 'Unknown'}</CardTitle>
                <CardDescription>{contact?.phone}</CardDescription>
                <Separator />
            </CardHeader>
            <CardContent className='flex-grow max-h-[calc(100%-156px)]'>
                <ScrollArea className="h-full pr-4" scrollToEnd={true} ref={scrollArea}>
                    <div className='space-y-4'>
                        {messages?.map((message: any, index: any) => (
                            <div key={index} className={`chat ${message.name === 'me' ? 'chat-end' : 'chat-start'}`}>
                                <div className="chat-image avatar">
                                    <Avatar>
                                        <AvatarImage src={message.name !== 'me' ? contact?.picture : ''} alt="me" />
                                        <AvatarFallback>HB</AvatarFallback>
                                    </Avatar>
                                </div>
                                <div className="chat-header">
                                    {message.name === 'me' ? '' : message.name}
                                    <time className="text-xs opacity-50">{new Date(message.messageTimestamp * 1000).toLocaleTimeString()}</time>
                                </div>
                                <div className="chat-bubble">
                                    {message.message}
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
            <CardFooter>
                <SendMessage accessToken={accessToken} contact={contact} setMessages={setMessages} />
            </CardFooter>
        </Card>
    );
}
