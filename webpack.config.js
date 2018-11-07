const webpack = require('webpack');

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const MapJsonWebpackPlugin = require('map-json-webpack-plugin');

const NpmInstallPlugin = require('npm-install-webpack-plugin');

const CleanWebpackPlugin = require('clean-webpack-plugin');

const milieu = process.env.NODE_ENV || 'development';

const APP_PATH = process.cwd();

const {
	entry,
	name
} = require('./package.json');

const config = {
	mode: milieu,
	entry,
	output: {
		path: `${APP_PATH}/dist`,
		filename: '[name].js',
		publicPath: '/'
	},
	module: {
		rules: [{
			test: /\.js?$/,
			loader: 'babel-loader',
		},
		{
			test: /\.(css|scss)$/,
			use: [
				MiniCssExtractPlugin.loader,
				'css-loader',
				'sass-loader'
			]
		},
		{
			test: /\.less$/,
			use: [
				MiniCssExtractPlugin.loader,
				'css-loader',
				'less-loader',
			],
		},
		{
			test: /\.(png|jpg|gif|eot|ttf|woff|woff2|svg)$/,
			loader: 'url-loader',
			options: {
				limit: 10000
			}
		},
		{
			test: /\.html?$/,
			loader: 'file-loader',
			options: {
				name: '[name].[ext]',
			},
		}
		]
	},

	optimization: {
		namedModules: true,
		noEmitOnErrors: true,
		/**
		 * CommonsChunkPlugin
		 */
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'commons',
					chunks: 'all'
				}
			}
		},
		minimizer: [
			// js 压缩
			new UglifyJsPlugin({
				parallel: true,
				sourceMap: true,
				extractComments: true,
				uglifyOptions: {
					warnings: false,
					parse: {},
					compress: {},
					mangle: true,
					output: null,
					toplevel: false,
					nameCache: null,
					ie8: false,
					keep_fnames: false,
				}
			})
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css'
		}), // 分离css
		new webpack.NoEmitOnErrorsPlugin(),
		new OptimizeCSSAssetsPlugin({}), // css压缩
		new CleanWebpackPlugin(['dist']), // 清除dist
		new NpmInstallPlugin({
			dev: false,
			peerDependencies: true,
			quiet: false,
			npm: 'npm --registry=https://registry.npm.taobao.org'
		})
	]
};

module.exports = config;