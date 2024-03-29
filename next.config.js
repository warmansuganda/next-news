/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

const nextConfig = withPWA({
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    runtimeCaching,
  },
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['avatars.githubusercontent.com', 'static01.nyt.com'],
  },
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
    API_TOKEN: process.env.API_TOKEN,
    CDN_URL: process.env.CDN_URL,
  },
});

module.exports = nextConfig;
