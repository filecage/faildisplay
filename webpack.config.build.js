var ExtractTextPlugin = require('extract-text-webpack-plugin');
var config = require('./webpack.config.base');

config.plugins.push(new ExtractTextPlugin('style.css'));
config.module.loaders.push({
    test: /\.less$/,
    loader: ExtractTextPlugin.extract("css!less")
});

module.exports = config;