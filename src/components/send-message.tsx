'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useTranslation from 'next-translate/useTranslation';

export function SendMessage({ accessToken, messages, setMessages, scrollToBottom }: { accessToken: string, messages: any, setMessages: any, scrollToBottom: any}) {
    const { t } = useTranslation('send-message');
    
    const formSchema = z.object({
        message: z.string()
    });

    const {
        handleSubmit,
        register,
        reset
    } = useForm({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = (data: any) => {
        fetch('http://localhost:8080/message/text', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            },
            body: JSON.stringify({
                phone: 'phone',
                message: data.message
            })
        });
        setMessages([
            ...messages,
            {
                name: 'me',
                message: data.message,
                messageTimestamp: new Date().toISOString()
            }
        ]);

        setTimeout(() => {
            scrollToBottom();
            
        }, 100);

        
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex w-full space-x-2'>
            <div className='w-full'>
                <Input
                    id="message"
                    type="text"
                    placeholder='Type your message here.'
                    {...register('message', { required: t('form.phone-required') })}
                />
            </div>
            <div>
                <Button className="w-full" type="submit">
                    {t('form.submit-button')}
                </Button>
            </div>
        </form>
    );
}