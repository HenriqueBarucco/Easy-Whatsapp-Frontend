import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { Logout } from '@/components/logout';

export default async function Panel() {
    const session = await getServerSession(authOptions) as any;

    if (!session) {
        redirect('/api/auth/signin');
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-background">
            <p>{JSON.stringify(session?.user?.access_token)}</p>
            <Logout/>
        </div>
    );
}
