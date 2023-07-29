'use client';

import { Button } from './ui/button';
import { signOut } from 'next-auth/react';

export function Logout() {
    return (
        <Button onClick={() => signOut()}>Logout</Button>
    );
}
