module.exports = {
    // vue-cli3之后需要配置这个来控制图标
    pwa: {
        iconPaths: {
            favicon32: 'favicon.ico',
            favicon16: 'favicon.ico',
            appleTouchIcon: 'favicon.ico',
            maskIcon: 'favicon.ico',
            msTileImage: 'favicon.ico'
        }
    },
    // 不配置这个路径会有dist文件的html打开是空白的问题
    runtimeCompiler: true,
    publicPath: './'
};
