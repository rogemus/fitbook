var webpack = require('webpack');

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
	eslint: {
		configFile: './.eslintrc'
	},
	devServer: {
		port: 3000,
		historyApiFallback: true,
		contentBase: './'
	}
};
