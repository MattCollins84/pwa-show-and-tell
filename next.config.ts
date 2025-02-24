import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,      // Enable React strict mode for improved error handling
    // swcMinify: true,            // Enable SWC minification for improved performance
    compiler: {
        removeConsole: false,   // Remove console.log statements from the code
    }
};

export default withPWA({
    dest: "public",         // destination directory for the PWA files
    disable: false,         // enable or disable the PWA
    register: true,         // register the PWA service worker
    skipWaiting: true,      // skip waiting for service worker activation
})(nextConfig);