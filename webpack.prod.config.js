const webpack = require('webpack');
const  path = require('path');

module.exports = {
	entry: [
		'./src/index.js'
	],
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
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	resolveLoader: {
		root: path.join(__dirname, 'node_modules')
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
	]
};
