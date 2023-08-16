import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
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
                    const API = process.env.API_URL || 'http://localhost:8080';
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
                },
            };
        },
        jwt: ({ token, user }) => {
            if (user) {
                const u = user as unknown as any;
                return {
                    ...token,
                    access_token: u.access_token,
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
