'use client';

import socket from '@/lib/socket';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function QrCode({ qrCode }: { qrCode: string }) {
    const router = useRouter();

    useEffect(() => {
        socket.on('qrCodeSuccess', () => {
            router.refresh();
        });
    }, [router]);

    return (
        <Image src={qrCode} alt="QR Code" width={250} height={250} />
    );
}
