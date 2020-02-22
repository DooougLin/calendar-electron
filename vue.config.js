const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    pwa: {
        iconPaths: {
            favicon32: 'favicon.ico',
            favicon16: 'favicon.ico',
            appleTouchIcon: 'favicon.ico',
            maskIcon: 'favicon.ico',
            msTileImage: 'favicon.ico'
        }
    },
    runtimeCompiler: true,
    publicPath: './',
    transpileDependencies: ['vuetify'],
    configureWebpack: {
        plugins: [
            new CopyWebpackPlugin([
                { from: './public/static', to: 'static', ignore: ['.*'] }
            ])
        ]
    }
};
