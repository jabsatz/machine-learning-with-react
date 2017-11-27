// @flow
import React, { Component } from 'react';
import type {
	dendriteObject,
	neuronObject,
	layerObject,
	networkObject,
	positionObject,
	networkPositionsObject,
} from './types';
import Dendrite from './dendrite';
import Neuron from './neuron';

type Props = {
	networkShape: Array<number>,
	activationFunction: (number: number) => number,
	bias: number,
	inputValues: Array<number>,
};

type State = {
	network: networkObject,
};

export default class NeuralNetwork extends Component<Props, State> {
	constructor(props: Props) {
		super(props);

		const network: networkObject = [];

		const networkPositions: networkPositionsObject = this.calculateSVGSizeAndPositions(
			props.networkShape
		);

		props.networkShape.forEach((layerLength, layerIndex) => {
			const layer: layerObject = {
				neurons: [],
				dendrites: [],
			};
			for (let i = 0; i < layerLength; i++) {
				if (layerIndex > 0) {
					for (
						let j = 0;
						j < network[layerIndex - 1].neurons.length;
						j++
					) {
						const previousNeuron: neuronObject =
							network[layerIndex - 1].neurons[j];
						const weight = 1;
						const dendrite: dendriteObject = {
							id: `dendrite-${layerIndex}-${j}-${i}`,
							weight: weight,
							input: previousNeuron.output,
							output: weight * previousNeuron.output,
							source: networkPositions[layerIndex - 1][j],
							destination: networkPositions[layerIndex][i],
						};
						layer.dendrites.push(dendrite);
					}
				}
				const input =
					layer.dendrites.length > 0
						? layer.dendrites
						: props.inputValues[i] || 0;
				const neuron: neuronObject = {
					id: `neuron-${layerIndex}-${i}`,
					activation: props.activationFunction,
					bias: props.bias,
					input,
					output: this.calculateNeuronOutput(
						input,
						props.bias,
						props.activationFunction
					),
					position: networkPositions[layerIndex][i],
				};
				layer.neurons.push(neuron);
			}
			network.push(layer);
		});
		this.state = {
			network,
		};
	}

	calculateSVGSizeAndPositions(
		network: Array<number>
	): networkPositionsObject {
		const neuronSize = 100;
		const layerMargin = 200;
		const networkPositions: networkPositionsObject = network.map(
			(layerLength, layerIndex) => {
				const layerPositions: Array<positionObject> = [];
				for (let i = 0; i < layerLength; i++) {
					layerPositions.push({
						x:
							layerIndex * neuronSize +
							neuronSize / 2 +
							layerMargin * layerIndex,
						y: i * neuronSize + neuronSize / 2,
					});
				}
				return layerPositions;
			}
		);
		return networkPositions;
	}

	calculateNeuronOutput(
		input: Array<dendriteObject> | number,
		bias: number,
		activation: (n: number) => number
	): number {
		let weighedSum: number;
		if (typeof input === 'number') {
			weighedSum = input;
		} else {
			weighedSum = input.reduce(
				(prev, curr): number => curr.output + prev,
				0
			);
		}
		return activation(weighedSum + bias);
	}

	render() {
		return (
			<svg id="Network" height="700" width="700">
				{this.state.network.map((layer, i) => (
					<g id={`dendrite-layer-${i}`} key={`dendrite-layer-${i}`}>
						{layer.dendrites.length > 0 &&
							layer.dendrites.map(dendrite => (
								<Dendrite
									key={dendrite.id}
									name={dendrite.id}
									weight={dendrite.weight}
									source={dendrite.source}
									destination={dendrite.destination}
									input={dendrite.input}
									output={dendrite.output}
								/>
							))}
					</g>
				))}
				{this.state.network.map((layer, i) => (
					<g id={`neuron-layer-${i}`} key={`neuron-layer-${i}`}>
						{layer.neurons.map((neuron, j) => (
							<Neuron
								key={neuron.id}
								name={neuron.id}
								position={neuron.position}
								input={neuron.input}
								output={neuron.output}
								activation={neuron.activation}
								bias={neuron.bias}
							/>
						))}
					</g>
				))}
			</svg>
		);
	}
}
