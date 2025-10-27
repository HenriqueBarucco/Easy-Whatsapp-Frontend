/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate-plugin');

module.exports = nextTranslate({
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'github.com',
            },
        ],
    },
    i18n: {
        locales: ['pt-br', 'en'],
        defaultLocale: 'pt-br',
        localeDetection: false,
    },
    experimental: {
        instrumentationHook: true,
    },
});
