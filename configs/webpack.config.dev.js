const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const rootDir = path.resolve(__dirname, "../");
const sourceDir = path.resolve(__dirname, '../src/');

const config = {
	mode: 'development',
	entry: path.resolve(sourceDir, 'index.js'),
	output: {
		pathinfo: false,
		filename: '[name].bundle.js',
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
			}
		]
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: path.join(rootDir, 'public'),
		publicPath: "/",
		compress: true,
		hot: true,
		port: 5000,
		host: "0.0.0.0",
		clientLogLevel: "silent",
		historyApiFallback: true,
		watchContentBase: true,
		quiet: true,
		overlay: {
			warnings: false,
			errors: true
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			appMountId: 'app',
			template: path.resolve(sourceDir, "index.html"),
		}),
		new BundleAnalyzerPlugin({
			analyzerMode: 'static',
			openAnalyzer: false,
		}),
		new MiniCssExtractPlugin()
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
		}
	}
};

module.exports = config;