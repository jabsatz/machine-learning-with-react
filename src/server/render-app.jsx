// @flow

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';
import { StaticRouter } from 'react-router';

import App from './../shared/app';
import { APP_CONTAINER_CLASS, STATIC_PATH, WDS_PORT } from '../shared/config';
import { isProd } from '../shared/util';

const renderApp = (
	location: string,
	plainPartialState: ?Object,
	routerContext: ?Object = {}
) => {
	const appHtml = ReactDOMServer.renderToString(
		<StaticRouter location={location} context={routerContext}>
			<App />
		</StaticRouter>
	);
	const head = Helmet.rewind();

	return `<!doctype html>
    <html>
      <head>
        ${head.title}
        ${head.meta}
        <link rel="stylesheet" href="${STATIC_PATH}/css/style.css">
      </head>
      <body>
        <div class="${APP_CONTAINER_CLASS}">${appHtml}</div>
        <script src="${
			isProd ? STATIC_PATH : '/dist'
		}/js/bundle.js"></script>
      </body>
    </html>`;
};

export default renderApp;
