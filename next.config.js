/** @type {import('next').NextConfig} */
const nextTranslate = require("next-translate-plugin");

module.exports = nextTranslate({
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "github.com",
            },
        ],
    },
});
