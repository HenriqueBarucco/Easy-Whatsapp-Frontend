import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { Logout } from '@/components/logout';
import { QrCode } from '@/components/qrcode';
import { AccountInformation } from '@/components/info-account';
import { SendMessage } from '@/components/send-message';

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
  
    const [data, profile] = await Promise.all([ 
        fetchData('http://localhost:8080/instance/qrbase64', session?.user?.access_token),
        fetchData('http://localhost:8080/auth/profile', session?.user?.access_token),
    ]);
  
    const hasQrCode = data && data?.qrcode;
  
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-background space-y-4">
            {hasQrCode ? <QrCode qrCode={data.qrcode} /> : 
                <>
                    <AccountInformation profile={profile} />
                    <SendMessage accessToken={session?.user?.access_token} />
                </>}
            <Logout />
        </div>
    );
}