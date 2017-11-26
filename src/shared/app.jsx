// @flow

import React from 'react';
import Helmet from 'react-helmet';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import { APP_NAME } from './config';
import Nav from './component/nav';
import HomePage from './component/page/home';
import MachineLearningPage from './component/page/machine-learning';
import NotFoundPage from './component/page/not-found';
import ServerErrorPage from './component/page/server-error';
import {
	HOME_PAGE_ROUTE,
	MACHINE_LEARNING_ROUTE,
	SERVER_ERROR_ROUTE,
} from './routes';

const App = () => (
	<div>
		<Helmet titleTemplate={`%s | ${APP_NAME}`} defaultTitle={APP_NAME} />
		<Nav />
		<Switch>
			<Route exact path={HOME_PAGE_ROUTE} render={() => <HomePage />} />
			<Route
				exact
				path={MACHINE_LEARNING_ROUTE}
				render={() => <MachineLearningPage />}
			/>
			<Route path={SERVER_ERROR_ROUTE} component={ServerErrorPage} />
			<Route component={NotFoundPage} />
		</Switch>
	</div>
);

export default App;
