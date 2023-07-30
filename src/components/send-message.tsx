'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useTranslation from 'next-translate/useTranslation';

export function SendMessage({ accessToken }: { accessToken: string}) {
    const { t } = useTranslation('send-message');
    
    const formSchema = z.object({
        phone: z.string().min(10, {
            message: t('form.phone-min'),
        }),
        message: z.string()
    });

    const {
        handleSubmit,
        register,
        formState: { errors },
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
            body: JSON.stringify(data)
        });
    };

    return (
        <Card>
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">{t('form.title')}</CardTitle>
                <CardDescription>
                    {t('form.description')}
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">
                    <div>
                        <Label htmlFor="phone">{t('form.phone-label')}</Label>
                        <Input
                            id="phone"
                            type="text"
                            {...register('phone', { required: t('form.phone-required') })}
                        />
                        {errors.phone && <span className="text-red-500">{errors.phone.message?.toString()}</span>}
                    </div>
                    <div>
                        <Label htmlFor="message">{t('form.message-label')}</Label>
                        <Input
                            id="message"
                            type="text"
                            {...register('message', { required: t('form.message-required') })}
                        />
                    </div>
                    <div>
                        <Button className="w-full" type="submit">
                            {t('form.submit-button')}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
