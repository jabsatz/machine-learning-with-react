// @flow

import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';

import App from '../shared/app';
import { APP_CONTAINER_SELECTOR } from '../shared/config';
/*eslint-disable*/
//setting window variables
import { isProd } from '../shared/util';

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
	module.hot.accept('../shared/app', () => {
		const NextApp = require('../shared/app').default;
		ReactDOM.render(wrapApp(NextApp), rootEl);
	});
}
/*eslint-enable*/
