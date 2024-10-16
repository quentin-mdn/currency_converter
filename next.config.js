const withPWA = require('next-pwa')({
    dest: 'public', // This is where your service worker will be stored
    register: true,
    skipWaiting: true,
});

// Your Next.js configuration options can go here
const nextConfig = {
    reactStrictMode: true,
    // Add any other configuration options needed
};

// Export the PWA configuration
module.exports = withPWA(nextConfig);