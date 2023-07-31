import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { Logout } from '@/components/logout';
import { QrCode } from '@/components/qrcode';
import { MainNav } from '@/components/main-nav';
import { UserNav } from '@/components/user-nav';
import { Chat } from '@/components/chat';
import { ContactList } from '@/components/contact-list';

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
  
    const [data, profile, chat] = await Promise.all([ 
        fetchData('http://localhost:8080/instance/qrbase64', session?.user?.access_token),
        fetchData('http://localhost:8080/auth/profile', session?.user?.access_token),
        fetchData('http://localhost:8080/chat', session?.user?.access_token),
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

    return (
        <>
            <div className="flex flex-col h-screen">
                <div className="border-b">
                    <div className="flex h-16 items-center px-4">
                        {/* <TeamSwitcher /> */}
                        <MainNav className="mx-6" />
                        <div className="ml-auto flex items-center space-x-4">
                            {/* <Search /> */}
                            <UserNav profile={profile}/>
                        </div>
                    </div>
                </div>
                <div className="flex-1 p-8 pt-6 flex space-x-4">
                    <ContactList />
                    <Chat accessToken={session?.user?.access_token} chatMessages={chat['phone']?.messages}/>
                </div>
            </div>
        </>
    );
}
