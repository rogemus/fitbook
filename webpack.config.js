var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './app/client/main.js',
    output: {
        path: path.resolve(__dirname, "public"),
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
};