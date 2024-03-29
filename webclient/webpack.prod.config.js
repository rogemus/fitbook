const webpack = require('webpack');
const path = require('path');

module.exports = {
	entry: path.resolve(__dirname, './src/index.js'),
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
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
	]
};
