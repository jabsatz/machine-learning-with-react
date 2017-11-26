// @flow

import { homePage, machineLearningPage, serverErrorPage } from './controller';

import {
	HOME_PAGE_ROUTE,
	MACHINE_LEARNING_ROUTE,
	SERVER_ERROR_ROUTE,
} from '../shared/routes';

import renderApp from './render-app';

export default (app: Object) => {
	app.get(HOME_PAGE_ROUTE, (req, res) => {
		res.send(renderApp(req.url, homePage()));
	});

	app.get(MACHINE_LEARNING_ROUTE, (req, res) => {
		res.send(renderApp(req.url, machineLearningPage()));
	});

	app.get('*', (req, res) => {
		res.status(404).send(renderApp(req.url));
	});

	app.use((err, req, res, next) => {
		const errorLog = '`' + err.stack + '`';
		const errorPage = renderApp(SERVER_ERROR_ROUTE, serverErrorPage);
		res.status(500).send(errorPage);
		next();
	});
};
