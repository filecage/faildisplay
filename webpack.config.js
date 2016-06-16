var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        'app': ['babel-polyfill', './src-client'],
        'style': './src-client/style.less'
    },
    output: {
        path: path.resolve('./assets/build'),
        publicPath: '/build/',
        filename: 'app.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'src-client'),
                loader: 'babel-loader',
                query: {
                    presets: ["react", "es2015"]
                }
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("css!less")
            }
        ]
    },
    debug: true,
    devServer: {
        contentBase: "./assets"
    },
    plugins: [
        new ExtractTextPlugin('style.css')
    ]
};