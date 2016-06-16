var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var config = require('./webpack.config.base');

config.plugins.push(new ExtractTextPlugin('style.css'));
config.plugins.push(new webpack.optimize.UglifyJsPlugin());
config.plugins.push(new webpack.optimize.DedupePlugin());
config.module.loaders.push({
    test: /\.less$/,
    loader: ExtractTextPlugin.extract("css!less")
});

module.exports = config;