import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SUPPORTED_LOCALES = ['pt-br', 'en'];

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    const { pathname } = request.nextUrl;

    if (pathname === '/') {
        url.pathname = '/pt-br';
        return NextResponse.redirect(url);
    }

    for (const locale of SUPPORTED_LOCALES) {
        const prefix = `/${locale}`;
        if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
            const newPath = pathname.replace(prefix, '') || '/';
            const dest = request.nextUrl.clone();
            dest.pathname = newPath;

            const res = NextResponse.rewrite(dest);
            res.cookies.set('NEXT_LOCALE', locale, { path: '/' });
            return res;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/:path*'],
};
