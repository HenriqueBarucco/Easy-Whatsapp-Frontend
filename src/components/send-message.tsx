'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import useTranslation from 'next-translate/useTranslation';

export function SendMessage({ accessToken, contact, setMessages }: { accessToken: string, contact: any, setMessages: any}) {
    const { t } = useTranslation('common');
    
    const formSchema = z.object({
        message: z.string().min(1)
    });

    const {
        handleSubmit,
        register,
        reset
    } = useForm({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = (data: any) => {
        const API = process.env.API_URL || 'http://localhost:8080';
        fetch(`${API}/message/text`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            },
            body: JSON.stringify({
                phone: contact.phone,
                message: data.message
            })
        });

        setMessages((prevMessages: any) => [...prevMessages, 
            {
                name: 'me',
                message: data.message,
                messageTimestamp: new Date().getTime() / 1000
            }
        ]);
    
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex w-full'>
            <div className="w-full join">
                <input className="input input-bordered join-item w-full" placeholder={t('components.send-message.placeholder')} type='text' {...register('message')}/>
                <button className="btn btn-neutral join-item rounded-r-full" type="submit">{t('components.send-message.send')}</button>
            </div>
        </form>
    );
}