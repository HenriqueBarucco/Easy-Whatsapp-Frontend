'use client';

import socket from '@/lib/socket';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function QrCode({ qrCode }: { qrCode: string }) {
    const router = useRouter();
    const [qrCodeBase64, setQrCodeBase64] = useState<string>(qrCode);

    useEffect(() => {
        socket.on('qrCodeSuccess', () => {
            router.refresh();
        });
        socket.on('qrCodeChanged', (qrcode) => {
            setQrCodeBase64(qrcode?.url);
        });
    }, [router]);

    return (
        <Image src={qrCodeBase64} alt="QR Code" width={250} height={250} />
    );
}
