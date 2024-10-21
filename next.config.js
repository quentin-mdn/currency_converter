const withPWA = require('next-pwa')({
    dest: 'public', // This is where your service worker will be stored
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
    runtimeCaching: [
        {
            // Cache static files like JS, CSS, etc.
            urlPattern: /\.(?:js|css|html)$/,
            handler: 'StaleWhileRevalidate',
            options: {
                cacheName: 'static-resources',
                expiration: {
                    maxEntries: 50, // Number of entries to keep in cache
                    maxAgeSeconds: 7 * 24 * 60 * 60, // Cache for one week
                },
            },
        },
        {
            // Cache images
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|ico|woff|woff2|ttf)$/,
            handler: 'CacheFirst',
            options: {
                cacheName: 'images-cache',
                expiration: {
                    maxEntries: 100,
                    maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
                },
            },
        }
    ]
});

// Your Next.js configuration options can go here
const nextConfig = {
    reactStrictMode: true,
    // Add any other configuration options needed
};

// Export the PWA configuration
module.exports = withPWA(nextConfig);