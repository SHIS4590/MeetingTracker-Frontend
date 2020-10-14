const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = function () {
	const config = {
		entry: './src/index.js',
		mode: 'development',
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /(node_modules|bower_components)/,
					loader: 'babel-loader',
					options: { presets: ['@babel/preset-env', '@babel/preset-react'] },
				},
				{
					test: /\.css/,
					use: ['style-loader', 'css-loader', 'postcss-loader'],
				},
				{
					test: /\.(png|jpg|jpeg|gif|svg|pdf)/,
					exclude: /(node_modules|bower_components)/,
					loader: 'url-loader?limit=8192&name=images/[name].[ext]',
				},
			],
		},
		resolve: { extensions: ['*', '.js', '.jsx'] },
		plugins: [
			// new webpack.HotModuleReplacementPlugin(),
			new CleanWebpackPlugin(),
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, 'public/index.html'),
			}),
		],
  }
  return config
}
