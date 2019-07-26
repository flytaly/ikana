const withOffline = require('next-offline');
const withReactSvg = require('next-react-svg');


const withReactSvgConfig = {
    include: `${__dirname}/assets/svg`,
    webpack(config) {
        return config;
    },
};

const withOfflineConfig = {
    transformManifest: manifest => ['/'].concat(manifest), // add the homepage to the cache
    workboxOpts: {
        swDest: 'static/service-worker.js',
        runtimeCaching: [
            {
                urlPattern: /^https?.*/,
                handler: 'NetworkFirst',
                options: {
                    cacheName: 'https-calls',
                    networkTimeoutSeconds: 15,
                    expiration: {
                        maxEntries: 150,
                        maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
                    },
                    cacheableResponse: {
                        statuses: [0, 200],
                    },
                },
            },
        ],
    },
};


module.exports = withOffline(withReactSvg({
    ...withOfflineConfig,
    ...withReactSvgConfig,
    target: 'serverless',
}));
