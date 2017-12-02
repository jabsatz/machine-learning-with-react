// @flow

import React from 'react';
import Helmet from 'react-helmet';

const title = 'Server Error';

const ServerErrorPage = () => (
	<div>
		<Helmet title={title} />
		<h1>{title}</h1>
		<p>A server error ocurred, check the console for details</p>
	</div>
);

export default ServerErrorPage;
