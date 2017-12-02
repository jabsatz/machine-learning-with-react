// @flow

import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';

import App from 'app/app';
import { APP_CONTAINER_SELECTOR } from 'app/constants/config';
/*eslint-disable*/
//setting window variables
import { isProd } from 'app/constants/util';

const preloadedState = window.__PRELOADED_STATE__;
/*eslint-enable*/

const rootEl = document.querySelector(APP_CONTAINER_SELECTOR);

if (!(rootEl instanceof Element)) {
	throw new Error('invalid type');
}

const wrapApp = AppComponent => (
	<BrowserRouter>
		<AppContainer>
			<AppComponent />
		</AppContainer>
	</BrowserRouter>
);

ReactDOM.render(wrapApp(App), rootEl);

/*eslint-disable*/
if (module.hot) {
	// flow-disable-next-line
	module.hot.accept('app/app', () => {
		const NextApp = require('app/app').default;
		ReactDOM.render(wrapApp(NextApp), rootEl);
	});
}
/*eslint-enable*/
