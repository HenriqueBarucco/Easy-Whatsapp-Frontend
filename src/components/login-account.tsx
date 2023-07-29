'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useTranslation from 'next-translate/useTranslation';

export function LoginAccount() {
    const { t } = useTranslation('login');
    
    const formSchema = z.object({
        login: z.string(),
        password: z.string().min(6, {
            message: t('form.password-min'),
        }),
    });

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = (data: any) => {
        signIn('credentials', {
            login: data.login,
            password: data.password,
            callbackUrl: '/panel',
        });
    };

    return (
        <Card>
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">{t('title')}</CardTitle>
                <CardDescription>
                    {t('description')}
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
                        <Label htmlFor="login">{t('form.username')}</Label>
                        <Input
                            id="login"
                            type="text"
                            {...register('login', { required: 'Login is required' })}
                        />
                    </div>
                    <div>
                        <Label htmlFor="password">{t('form.password')}</Label>
                        <Input
                            id="password"
                            type="password"
                            {...register('password', { required: 'Password is required' })}
                        />
                        {errors.password && <span className="text-red-500">{errors.password.message?.toString()}</span>}
                    </div>
                    <div>
                        <Button className="w-full" type="submit">
                            {t('form.login')}
                        </Button>
                    </div>
                </form>
                <div className="text-center font-light ">
                    <p>{t('no-account')}</p>
                    <a href="/register">{t('create-account')}</a>
                </div>
            </CardContent>
        </Card>
    );
}
