import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-background ">
            <Label className="mb-4">Easy WhatsApp</Label>
            <div className="flex gap-4">
                <Link href={'/login'}>
                    <Button>Login</Button>
                </Link>
                <Link href={'/register'}>
                    <Button>Sign Up</Button>
                </Link>
            </div>
        </div>
    );
}

