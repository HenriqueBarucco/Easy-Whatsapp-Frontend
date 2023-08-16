import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';

export default function Home() {
    const { t } = useTranslation('home');

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-base-100 ">
            <Label className="mb-4 text-inherit">Easy WhatsApp</Label>
            <div className="flex gap-4">
                <Link href={'/login'}>
                    <Button>{t('login-button')}</Button>
                </Link>
                <Link href={'/register'}>
                    <Button>{t('register-button')}</Button>
                </Link>
            </div>
        </div>
    );
}

