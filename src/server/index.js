// @flow

import compression from 'compression';
import express from 'express';
import { Server } from 'http';

import routing from './routing';
import { WEB_PORT, STATIC_PATH } from '../shared/config';
import { isProd } from '../shared/util';
import devConfig from '../../webpack.config.babel';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const app = express();
const compiler = webpack(devConfig);
// flow-disable-next-line
const http = Server(app);

app.use(
	webpackDevMiddleware(compiler, {
		quiet: false,
		lazy: false,
		watchOptions: {
			aggregateTimeout: 300,
			poll: 1000,
		},
		publicPath: devConfig.output.publicPath,
		stats: { colors: true },
	})
);
app.use(webpackHotMiddleware(compiler));
app.use(compression());
app.use(STATIC_PATH, express.static('dist'));
app.use(STATIC_PATH, express.static('public'));

routing(app);

http.listen(WEB_PORT, () => {
	console.log(
		`Server running on port ${WEB_PORT} ${
			isProd ? '(production)' : '(development)'
		}.`
	);
});
