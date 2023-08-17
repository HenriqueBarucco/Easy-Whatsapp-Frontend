import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextAuthProvider } from './provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Easy WhatsApp',
    description: 'Easy WhatsApp is a web application that allows you to use WhatsApp on your computer without having to install the WhatsApp application on your computer.',
};

export default function RootLayout({
    children,
}: {
  children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <NextAuthProvider>{children}</NextAuthProvider>
            </body>
        </html>
    );
}
