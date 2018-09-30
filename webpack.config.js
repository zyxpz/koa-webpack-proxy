const webpack = require('webpack');

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const MapJsonWebpackPlugin = require('map-json-webpack-plugin');

const NpmInstallPlugin = require('npm-install-webpack-plugin');

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
					name: 'commons',
					chunks: 'initial',
					minChunks: 2
				}
			}
		}
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css'
		}),
		new webpack.EvalSourceMapDevToolPlugin({
			filename: '[name].js.map',
		}),
		// new OptimizeCSSAssetsPlugin({}),
		// new UglifyJsPlugin({
		// 	parallel: true,
		// 	uglifyOptions: {
		// 		output: {
		// 			ascii_only: true,
		// 			beautify: false,
		// 			comments: false
		// 		},
		// 		compress: {
		// 			warnings: false,
		// 			evaluate: false,
		// 			collapse_vars: false,
		// 			reduce_vars: true
		// 		},
		// 		minify: {
		// 			removeComments: true,               // 去注释
		// 			collapseWhitespace: true,           // 压缩空格
		// 			removeAttributeQuotes: true         // 去除属性引用
		// 		}
		// 	}
		// })
	]
};

module.exports = config;