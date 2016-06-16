var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        'js': ['babel-polyfill', './src-client']
    },
    output: {
        path: path.resolve('./assets/build'),
        publicPath: '/build/',
        filename: 'app.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'src-client'),
                loader: 'babel-loader',
                query: {
                    presets: ["react", "es2015"]
                }
            }
        ]
    },
    plugins: []
};