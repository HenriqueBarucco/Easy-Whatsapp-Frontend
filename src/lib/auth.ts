import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import { API } from './api';

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60, // 1 hour
    },
    providers: [
        CredentialsProvider({
            name: 'Sign in',
            credentials: {
                login: {
                    label: 'Login',
                    type: 'text',
                },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                try {
                    const response = await axios.post(
                        `${API}/auth/login`,
                        credentials
                    );
                    return response.data;
                } catch (error) {
                    throw new Error('Invalid credentials');
                }
            },
        }),
    ],
    callbacks: {
        session: ({ session, token }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    access_token: token.access_token,
                    key: token.key,
                },
            };
        },
        jwt: ({ token, user }) => {
            if (user) {
                const u = user as unknown as any;
                return {
                    ...token,
                    access_token: u.access_token,
                    key: u.key,
                };
            }
            return token;
        },
    },
    pages: {
        signIn: '/login',
        error: '/login',
    },
};
