'use client';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';

export function ContactList({contacts, selectContact}: {contacts: any, selectContact: any}) {
    return (
        <Card className="flex flex-col w-[350px]">
            <CardHeader>
                <CardTitle>Chats</CardTitle>
                <CardDescription>Send a message to one of your chats.</CardDescription>
                <Separator />
            </CardHeader>
            <CardContent className='flex-grow max-h-[calc(100%-120px)]'>
                <ScrollArea className="h-full pr-2" scrollToEnd={false}>
                    <div className='space-y-3'>
                        {contacts?.map((contact: any, index: any) => (
                            <Card key={index} onClick={() => selectContact(contact)} className='hover:cursor-pointer'>
                                <CardHeader className='p-1'>
                                    <CardTitle className='flex flex-row items-center'>
                                        <Avatar className="flex mr-2 h-10 w-10">
                                            <AvatarImage src={contact?.picture} alt={contact?.name} />
                                            <AvatarFallback>HB</AvatarFallback>
                                        </Avatar>
                                        <span className="justify-center text-center">{contact.name ? contact.name : contact.phone}</span>
                                    </CardTitle>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}