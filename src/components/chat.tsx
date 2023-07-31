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
      
    return (
        <Card className="flex flex-col w-full max-h-full">
            <CardHeader>
                <CardTitle>NAME</CardTitle>
                <CardDescription>PHONE NUMBER</CardDescription>
                <Separator />
            </CardHeader>
            <CardContent>
                <ScrollArea className='h-[650px] pr-4' ref={scrollAreaRef} >
                    <div className='space-y-4'>
                        {messages?.map((message: any, index: any) => (
                            <div
                                key={index}
                                className={`flex ${message.name === 'me' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`p-2 rounded ${message.name === 'me' ? 'bg-black text-white' : 'bg-blue'}`}
                                >
                                    <div className="flex items-center">
                                        <Avatar className="mr-4">
                                            <AvatarImage src="https://github.com/henriquebarucco.png" alt="@henriquebarucco" />
                                            <AvatarFallback>HB</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col max-w-6xl">
                                            <p className="font-semibold">{message.name}</p>
                                            <span className="whitespace-pre-wrap">{message.message}</span>
                                        </div>
                                    </div>
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
