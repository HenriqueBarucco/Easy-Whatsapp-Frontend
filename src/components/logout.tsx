'use client';

import useTranslation from 'next-translate/useTranslation';
import { Button } from './ui/button';
import { signOut } from 'next-auth/react';

export function Logout() {
    const { t } = useTranslation('common');

    return (
        <Button onClick={() => signOut()}>{t('default-buttons.logout')}</Button>
    );
}
