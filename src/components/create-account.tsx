'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useTranslation from 'next-translate/useTranslation';

export function CreateAccount() {
    const { t } = useTranslation('register');

    const formSchema = z.object({
        username: z
            .string()
            .min(2, { message: t('error.username-min') })
            .refine((val) => !/\s/.test(val), {
                message: t('error.username-space'),
            }),
        password: z.string().min(6, {
            message: t('error.password-min'),
        }),
        name: z.string().min(2, {message: t('error.name-min')}),
        email: z.string().email({
            message: t('error.email-invalid'),
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
        data.preventDefault();
    };

    return (
        <Card>
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">{t('title')}</CardTitle>
                <CardDescription>{t('description')}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">
                    <div>
                        <Label htmlFor="username">{t('form.username')}</Label>
                        <Input
                            id="username"
                            type="text"
                            placeholder={t('form.username-placeholder')}
                            {...register('username', { required: 'Username is required' })}
                        />
                        {errors.username && <span className="text-red-500">{errors.username.message?.toString()}</span>}
                    </div>
                    <div>
                        <Label htmlFor="name">{t('form.name')}</Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder={t('form.name-placeholder')}
                            {...register('name', { required: 'Name is required' })}
                        />
                        {errors.name && <span className="text-red-500">{errors.name.message?.toString()}</span>}
                    </div>
                    <div>
                        <Label htmlFor="email">{t('form.email')}</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder={t('form.email-placeholder')}
                            {...register('email', { required: 'Email is required' })}
                        />
                        {errors.email && <span className="text-red-500">{errors.email.message?.toString()}</span>}
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
                            {t('form.submit')}
                        </Button>
                    </div>
                </form>
            </CardContent>
            <div className="text-center font-light pb-3">
                <p>{t('have-account')}</p>
                <a href="/login">{t('login-account')}</a>
            </div>
        </Card>
    );
}
