const path = require('path');
const webpack = require('webpack');

module.exports = {
    publicPath: '/',
    devServer: {
        overlay: {
            warnings: false,
            errors: true
        }
    },
    // lintOnSave: process.env.NODE_ENV !== 'production',
    lintOnSave: false,
    configureWebpack: config => {
        config.output.filename = 'js/[name].[hash].js';
        config.plugins.push(new webpack.DefinePlugin({
            'VUE_ENV': JSON.stringify({
                // url: 'http://121.4.224.236:9000',
                url: 'http://ops.aiops724.com',
                goUrl: 'http://go-ops.aiops724.com',
            })
        }))
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('@app', path.join(__dirname, './src'))
            .set('@assets', path.join(__dirname, './src/assets'))
            .set('@mixins', path.join(__dirname, './src/mixins'))
            .set('@components', path.join(__dirname, './src/components'))
            .set('@utils', path.join(__dirname, './src/utils'))
            .set('@views', path.join(__dirname, './src/views'))
            .set('@store', path.join(__dirname, './src/store'))
            .set('@services', path.join(__dirname, './src/services'));
        config.plugin('html').tap(args => {
            args[0].title = 'Lightning';
            return args;
        })
    }
}
