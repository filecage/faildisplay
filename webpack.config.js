var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        'babel-polyfill',
        './src-client'
    ],
    output: {
        path: path.resolve('./assets'),
        publicPath: '/',
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