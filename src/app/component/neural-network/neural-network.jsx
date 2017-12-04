// @flow
import React, { Component } from 'react';
import type {
	dendriteObject,
	neuronObject,
	layerObject,
	networkObject,
	positionObject,
	networkPositionsObject,
	propagationErrorObject,
	activationFunction,
} from 'app/component/neural-network/types';
import Dendrite from 'app/component/neural-network/dendrite';
import Neuron from 'app/component/neural-network/neuron';

type Props = {
	networkShape: Array<number>,
	activationFunction: activationFunction,
	bias: number,
	inputValues: Array<number>,
};

type State = {
	network: networkObject,
	valuesForPropagation: Array<number>,
};

export default class NeuralNetwork extends Component<Props, State> {
	constructor(props: Props) {
		super(props);

		const network: networkObject = [];

		const networkPositions: networkPositionsObject = this.calculateSVGSizeAndPositions(
			props.networkShape
		);

		const valuesForPropagation: Array<number> = [];

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
						const weight = Math.random() * 3;
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
				const output = this.calculateNeuronOutput(
					input,
					props.bias,
					props.activationFunction
				);
				const neuron: neuronObject = {
					id: `neuron-${layerIndex}-${i}`,
					activation: props.activationFunction,
					bias: props.bias,
					input,
					output,
					position: networkPositions[layerIndex][i],
				};
				layer.neurons.push(neuron);
				if (layerIndex === props.networkShape.length - 1) {
					valuesForPropagation.push(output);
				}
			}
			network.push(layer);
		});
		this.state = {
			network,
			valuesForPropagation,
		};
	}

	calculateSVGSizeAndPositions(
		network: Array<number>
	): networkPositionsObject {
		const neuronSize = 120;
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
		activation: activationFunction
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
		return activation.function(weighedSum + bias);
	}

	backPropagataion = (e: Event): void => {
		const network = this.state.network.reverse();
		const propagationError: propagationErrorObject = [];

		network.map((layer, layerIndex) => {
			const layerError: Array<number> = [];
			let expectedValues: Array<number>;

			if (layerIndex === 0) {
				expectedValues = this.state.valuesForPropagation;
			} else {
				expectedValues = propagationError[layerIndex - 1];
			}

			layer.neurons.forEach((neuron, neuronIndex) => {
				const neuronError =
					neuron.activation.derivative(neuron.output) *
					(expectedValues[neuronIndex] - neuron.output);
				layerError.push(neuronError);
			});
			propagationError.push(layerError);
		});
	};

	onChangePropagation = (e: Event): void => {
		if (e.target instanceof HTMLInputElement) {
			const valuesForPropagation = this.state.valuesForPropagation;
			valuesForPropagation[parseInt(e.target.id)] = parseInt(
				e.target.value
			);
			this.setState({ valuesForPropagation });
		}
	};

	render() {
		const { network, valuesForPropagation } = this.state;
		return (
			<div>
				{network[network.length - 1].neurons.map((n, i) => (
					<input
						key={`${i}-backprop`}
						id={`${i}`}
						type="text"
						value={valuesForPropagation[i]}
						placeholder={`${n.id} expected value`}
						onChange={this.onChangePropagation}
					/>
				))}
				<button onClick={this.backPropagataion}>
					Back Propagation
				</button>
				<svg id="Network" height="700" width="1000">
					{network.map((layer, i) => (
						<g
							id={`dendrite-layer-${i}`}
							key={`dendrite-layer-${i}`}
						>
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
					{network.map((layer, i) => (
						<g id={`neuron-layer-${i}`} key={`neuron-layer-${i}`}>
							{layer.neurons.map((neuron, j) => (
								<Neuron
									key={neuron.id}
									name={neuron.id}
									position={neuron.position}
									input={neuron.input}
									output={neuron.output}
									bias={neuron.bias}
								/>
							))}
						</g>
					))}
				</svg>
			</div>
		);
	}
}
