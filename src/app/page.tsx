import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
    const { t } = useTranslation('home');

    return (
        <div className='flex flex-row h-screen'>
            <div className="flex-none">
                <Image src={'/easy.svg'} width="0" height="0" className="h-screen w-full" alt='logo'/>
            </div>
            <div className='flex-grow w-full flex flex-col justify-center items-center'>
                <div className="flex-auto flex-col items-center justify-center h-screen">
                    <div className="flex flex-col items-center justify-center h-screen">
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
                </div>
            </div>
        </div>
    );
}
