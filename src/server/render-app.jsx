// @flow

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';
import { StaticRouter } from 'react-router';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

import App from 'app/app';
import { APP_CONTAINER_CLASS, STATIC_PATH } from 'app/constants/config';
import { isProd } from 'app/constants/util';

const renderApp = (
	location: string,
	plainPartialState: ?Object,
	routerContext: ?Object = {}
) => {
	const sheet = new ServerStyleSheet();
	const appHtml = ReactDOMServer.renderToString(
		<StaticRouter location={location} context={routerContext}>
			<StyleSheetManager sheet={sheet.instance}>
				<App />
			</StyleSheetManager>
		</StaticRouter>
	);
	const head = Helmet.rewind();
	const styleTags = sheet.getStyleTags();

	return `<!doctype html>
    <html>
      <head>
        ${head.title}
        ${head.meta}
        ${styleTags}
      </head>
      <body>
        <div class="${APP_CONTAINER_CLASS}">${appHtml}</div>
        <script src="${isProd ? STATIC_PATH : '/dist'}/js/bundle.js"></script>
      </body>
    </html>`;
};

export default renderApp;
