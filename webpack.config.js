var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: [
		'./src/index'
	],
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	resolveLoader: {
		root: path.resolve(__dirname, 'node_modules')
	},
	output: {
		path: __dirname,
		publicPath: '/',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				exclude: /node_modules/,
				loader: 'babel'
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'eslint-loader'
			}
		]
	},
	eslint: {
		configFile: './.eslintrc'
	},
	devServer: {
		port: 3000,
		historyApiFallback: true,
		contentBase: './'
	}
};
