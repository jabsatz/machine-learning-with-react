// @flow

import React from 'react';
import Helmet from 'react-helmet';
import NeuralNetwork from '../neural-network/neural-network';

const title = 'Machine Learning';

const MachineLearningPage = () => (
	<div>
		<Helmet
			title={title}
			meta={[
				{ name: 'description', content: 'Setup the neural network' },
				{ property: 'og:title', content: title },
			]}
		/>
		<h1>{title}</h1>
		<NeuralNetwork
			networkShape={[2, 4, 2]}
			activationFunction={a => a}
			bias={1}
			inputValues={[3, 4]}
		/>
	</div>
);

export default MachineLearningPage;
