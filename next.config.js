const withReactSvg = require('next-react-svg');

module.exports = withReactSvg({
    include: `${__dirname}/assets/svg`,
    target: 'serverless',
    webpack(config) {
        return config;
    },
});
