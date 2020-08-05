const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const rootDir = path.resolve(__dirname, "../");
const sourceDir = path.resolve(__dirname, '../src/');

const config = {
	mode: 'production',
	entry: path.resolve(sourceDir, 'index.js'),
	output: {
		pathinfo: false,
		filename: '[name].[contenthash].js',
		path: path.resolve(rootDir, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader'
				]
			},
			{
				test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
				loader: 'file-loader',
				options: {
					name(fileName) {
						if (fileName.match(/\.(png|svg|jpg|jpeg|gif)$/)) {
							return "images/[name].[hash].[ext]";
						}
						else if (fileName.match(/\.(woff|woff2|eot|ttf|otf)$/)) {
							return "fonts/[name].[hash].[ext]";
						}
						return '[path][name].[ext]';
					},
				},
			}
		]
	},
	devtool: false,
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: path.resolve(sourceDir, "index.html"),
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[hash].css',
			chunkFilename: '[id].[hash].css',
			ignoreOrder: true,
		})
	],
	optimization: {
		runtimeChunk: 'single',
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all'
				}
			}
		},
		minimizer: [
			new TerserPlugin({
				sourceMap: true,
				cache: true,
				parallel: true,
				terserOptions: {
					output: {
						comments: false,
					},
				},
			}),
			new OptimizeCSSAssetsPlugin({})
		]
	},
};

module.exports = config;