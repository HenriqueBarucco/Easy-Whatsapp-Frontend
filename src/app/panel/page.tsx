import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { Logout } from '@/components/logout';
import { QrCode } from '@/components/qrcode';
import { MainNav } from '@/components/main-nav';
import { UserNav } from '@/components/user-nav';
import ChatPanel from '@/components/chat-panel';
import RealTimeComponent from '@/components/real-time';

async function fetchData(url: string, accessToken: string) {
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return await response.json();
}
  
export default async function Panel() {
    const session = await getServerSession(authOptions) as any;
  
    if (!session) {
        redirect('/api/auth/signin');
    }

    const API = process.env.API_URL || 'http://localhost:8080';
  
    const [data] = await Promise.all([ 
        fetchData(`${API}/instance/qrbase64`, session?.user?.access_token),
    ]);
  
    const hasQrCode = data && data?.qrcode;

    if (hasQrCode) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-background space-y-4">
                <QrCode qrCode={data.qrcode} />
                <Logout />
            </div>
        );
    }

    const [profile, chat, contacts] = await Promise.all([ 
        fetchData(`${API}/auth/profile`, session?.user?.access_token),
        fetchData(`${API}/chat`, session?.user?.access_token),
        fetchData(`${API}/chat/contacts`, session?.user?.access_token)
    ]);

    return (
        <>
            <div className="flex flex-col max-h-screen h-screen">
                <div className="border-b bg-zinc-900">
                    <div className="flex h-16 items-center px-4">
                        <MainNav className="mx-6 text-white" />
                        <div className="ml-auto flex items-center space-x-4">
                            <UserNav profile={profile}/>
                        </div>
                    </div>
                </div>
                <div className="flex-auto p-8 pt-6 h-5/6">
                    <RealTimeComponent/>
                    <ChatPanel token={session?.user?.access_token} contacts={contacts} chats={chat} />
                </div>
            </div>
        </>
    );
}
