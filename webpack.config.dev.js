var config = require('./webpack.config.base');
config.module.loaders.push({
    test: /\.less$/,
    loader: 'style!css!less'
});

module.exports = Object.assign(config, {
    devtool: 'source-map',
    debug: true,
    devServer: {
        hot: true,
        contentBase: "./assets"
    }
});