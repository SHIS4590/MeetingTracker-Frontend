const { merge } = require('webpack-merge')
const path = require('path')
const baseConfig = require('./webpack.config.base')

module.exports = function () {
	return merge(baseConfig(), {
		mode: 'development',
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: 'bundle.[hash].js',
			chunkFilename: '[name].[hash].js',
			publicPath: '/',
		},
		devtool: 'inline-source-map',
		devServer: {
			contentBase: path.resolve(__dirname, 'dist'),
			port: 8001,
			hot: true,
			historyApiFallback: true,
		},
	})
}
