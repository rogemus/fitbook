const webpack = require('webpack');

module.exports = {
	entry: [
		'./src/index'
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

	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
	]
};
