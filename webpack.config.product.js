const { merge } = require('webpack-merge')
const path = require('path')
const baseConfig = require('./webpack.config.base')

module.exports = function () {
	return merge(baseConfig(), {
		mode: 'production',
		output: {
			path: path.resolve(__dirname, 'product'),
			filename: 'bundle.[hash].js',
			chunkFilename: '[name].[hash].js',
			publicPath: '/',
		},
		devtool: false,
	})
}
