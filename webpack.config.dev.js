var config = require('./webpack.config.base');
config.module.loaders.push({
    test: /\.less$/,
    loader: 'style!css?sourceMap!less?sourceMap'
});

module.exports = Object.assign(config, {
    devtool: 'source-map',
    debug: true,
    devServer: {
        hot: true,
        contentBase: "./assets"
    }
});