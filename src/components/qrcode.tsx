'use client';

import { getSocketInstance } from '@/lib/socket';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function QrCode({ qrCode }: { qrCode: string }) {
    const [qrCodeBase64, setQrCodeBase64] = useState<string>(qrCode);
    const router = useRouter();
    const session = useSession() as any;

    useEffect(() => {
        const setupSocketListeners = async () => {
            const socket = await getSocketInstance(session.data?.user?.key);
    
            socket.on('qrCodeSuccess', () => {
                router.refresh();
            });
    
            socket.on('qrCodeChanged', (qrcode: {url: string}) => {
                setQrCodeBase64(qrcode?.url);
            });
        };
    
        if (session.data?.user?.key != undefined) setupSocketListeners();
    }, [session, router]);
    
    return (
        <Image src={qrCodeBase64} alt="QR Code" width={250} height={250} />
    );
}
