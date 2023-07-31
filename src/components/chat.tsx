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
                            <div
                                key={index}
                                className={`flex ${message.name === 'me' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`p-2 rounded-md  ${message.name === 'me' ? 'bg-zinc-900 text-white' : 'border border-gray-800'}`}
                                >
                                    <div className="flex items-center">
                                        <Avatar className="mr-4">
                                            <AvatarImage src="https://github.com/henriquebarucco.png" alt="@henriquebarucco" />
                                            <AvatarFallback>HB</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col max-w-3xl">
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
