import { LoginAccount } from '@/components/login-account';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Login() {
    const session = await getServerSession(authOptions) as any;

    if (session) {
        redirect('/panel');
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-base-300">
            <LoginAccount/>
        </div>
    );
}