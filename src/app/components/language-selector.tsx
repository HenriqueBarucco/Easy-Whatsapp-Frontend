'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function LanguageSelector() {
    const pathname = usePathname() || '/';

    const base = pathname.replace(/^\/(pt-br|en)/, '') || '/';

    return (
        <div className="flex items-center gap-2">
            <Link href={`/pt-br${base}`} className="px-2 py-1 rounded hover:bg-slate-100">
        PT-BR
            </Link>
            <Link href={`/en${base}`} className="px-2 py-1 rounded hover:bg-slate-100">
        EN
            </Link>
        </div>
    );
}
