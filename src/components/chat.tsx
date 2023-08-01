'use client';

import { Separator } from '@radix-ui/react-dropdown-menu';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
//import useTranslation from 'next-translate/useTranslation';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { SendMessage } from './send-message';
import { useRef, useState } from 'react';
import { ScrollArea } from './ui/scroll-area';

export function Chat({ accessToken, chatMessages }: { accessToken: any, chatMessages: any}) {
    const [messages, setMessages] = useState(chatMessages);
    const scrollAreaRef = useRef(null);

    const scrollToBottom = () => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollToEnd();
        }
    };

    console.log(messages);
      
    return (
        <Card className="flex flex-col w-full">
            <CardHeader>
                <CardTitle>Henrique Barucco</CardTitle>
                <CardDescription>+5516900000000</CardDescription>
                <Separator />
            </CardHeader>
            <CardContent className='flex-grow max-h-[calc(100%-156px)]'>
                <ScrollArea className="h-full pr-4" ref={scrollAreaRef} >
                    <div className='space-y-4'>
                        {messages?.map((message: any, index: any) => (
                            <div key={index} className={`chat ${message.name === 'me' ? 'chat-end' : 'chat-start'}`}>
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                        <img src="https://github.com/henriquebarucco.png" alt={`@${message.name}`} />
                                    </div>
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
                <SendMessage accessToken={accessToken} messages={messages} setMessages={setMessages} scrollToBottom={scrollToBottom}/>
            </CardFooter>
        </Card>
    );
}
