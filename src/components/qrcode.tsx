'use client';

import Image from 'next/image';

export function QrCode({ qrCode }: { qrCode: string }) {
    return (
        <Image src={qrCode} alt="QR Code" width={250} height={250} />
    );
}
