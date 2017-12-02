// @flow

import path from 'path';
import webpack from 'webpack';

import { WDS_PORT } from 'app/constants/config';
import { isProd } from 'app/constants/util';

export default {
	entry: ['react-hot-loader/patch', './src/client'],
	output: {
		filename: 'js/bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: isProd ? '/static/' : `http://localhost:${WDS_PORT}/dist/`,
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: 'babel-loader',
				exclude: /node_modules/,
			},
		],
	},
	devtool: isProd ? false : 'source-map',
	resolve: {
		extensions: ['.js', '.jsx'],
		root: [path.join(__dirname, '/')],
		fallback: [path.join(__dirname, '/node_modules')],
		alias: {
			server: path.join(__dirname, '/src/server'),
			client: path.join(__dirname, '/src/client'),
			app: path.join(__dirname, '/src/app'),
		},
	},
	resolveLoader: {
		root: [path.join(__dirname, '/node_modules')],
		fallback: [path.join(__dirname, '/node_modules')],
	},
	devServer: {
		port: WDS_PORT,
		hot: true,
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
	},
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
	],
};
