import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';

export function ContactList() {
    return (
        <Card className="flex flex-col w-[350px] max-h-full">
            <CardHeader>
                <CardTitle>Chats</CardTitle>
                <CardDescription>Send a message to one of your chats.</CardDescription>
                <Separator />
            </CardHeader>
            <CardContent>
                <ScrollArea className='h-[700px] pr-4'>
                    <div className='space-y-4'>
                        <Card>
                            <CardHeader className='flex-1'>
                                <CardTitle className='flex items-center'>
                                    <Avatar className="mr-4">
                                        <AvatarImage src="https://github.com/henriquebarucco.png" alt="@henriquebarucco" />
                                        <AvatarFallback>HB</AvatarFallback>
                                    </Avatar>
                                    <span className="text-center">NAME ACCOUNT</span>
                                </CardTitle>
                            </CardHeader>
                        </Card>
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
