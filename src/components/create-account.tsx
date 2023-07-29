'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const formSchema = z.object({
    username: z
        .string()
        .min(2, { message: 'Username must be at least 2 characters.' })
        .refine((val) => !/\s/.test(val), {
            message: 'Username must not contain spaces.',
        }),
    password: z.string().min(6, {
        message: 'Password must be at least 6 characters.',
    }),
    name: z.string().min(2, {message: 'Name must be at least 2 characters.'}),
    email: z.string().email({
        message: 'Please enter a valid email address.',
    }),
});

export function CreateAccount() {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = (data: any) => {
    // Handle form submission logic here
        console.log(data);
    };

    return (
        <Card>
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Create an account</CardTitle>
                <CardDescription>Enter your details below to create your account</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">
                    <div>
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            type="text"
                            placeholder="Your username"
                            {...register('username', { required: 'Username is required' })}
                        />
                        {errors.username && <span className="text-red-500">{errors.username.message?.toString()}</span>}
                    </div>
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Your name"
                            {...register('name', { required: 'Name is required' })}
                        />
                        {errors.name && <span className="text-red-500">{errors.name.message?.toString()}</span>}
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            {...register('email', { required: 'Email is required' })}
                        />
                        {errors.email && <span className="text-red-500">{errors.email.message?.toString()}</span>}
                    </div>
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            {...register('password', { required: 'Password is required' })}
                        />
                        {errors.password && <span className="text-red-500">{errors.password.message?.toString()}</span>}
                    </div>
                    <div>
                        <Button className="w-full" type="submit">
                            Create account
                        </Button>
                    </div>
                </form>
            </CardContent>
            <div className="text-center font-light pb-3">
                <p>Already have an account?</p>
                <a href="/login">Login</a>
            </div>
        </Card>
    );
}
