// @flow
import React, { Component, type Element } from 'react';
import styled from 'styled-components';
import Dendrite from './dendrite';
import Neuron from './neuron';

type Props = {
	networkShape: Array<number>,
	activationFunction: (number: number) => number,
	bias: number,
	inputValues: Array<number>,
};

type State = {
	network: Array<{
		neurons: Array<{
			key: string,
			activation: (number: number) => number,
			bias: number,
			input: Array<string> | number,
			output: number,
		}>,
		dendrites: Array<{
			key: string,
			weight: number,
			source: string,
			destination: string,
		}>,
	}>,
};

const Network = styled.div`
	margin: 10px;
	background: lightgrey;
	padding: 10px;
	display: flex;
`;
const Layer = styled.div`
	display: flex;
	margin-right: auto;
	margin-left: auto;
`;
const Neurons = styled.div`
	background: darkseagreen;
`;
const Dendrites = styled.div`
	margin-right: auto;
	background: cadetblue;
	margin-left: auto;
`;

Network.displayName = 'Network';
Layer.displayName = 'Layer';
Neurons.displayName = 'Neurons';
Dendrites.displayName = 'Dendrites';

export default class NeuralNetwork extends Component<Props, State> {
	constructor(props: Props) {
		super(props);

		const network: Array<{
			neurons: Array<{
				key: string,
				activation: (number: number) => number,
				bias: number,
				input: Array<string> | number,
				output: number,
			}>,
			dendrites: Array<{
				key: string,
				weight: number,
				source: string,
				destination: string,
			}>,
		}> = [];

		props.networkShape.forEach((layerLength, layerIndex) => {
			let layer = {
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
						const previousNeuron =
							network[layerIndex - 1].neurons[j];
						const dendrite = {
							key: `dendrite-${layerIndex}-${j}-${i}`,
							weight: 0,
							source: `neuron-${layerIndex - 1}-${j}`,
							destination: `neuron-${layerIndex}-${i}`,
						};
						layer.dendrites.push(dendrite);
					}
				}
				const input =
					layer.dendrites.length > 0
						? layer.dendrites.map(d => d.key)
						: props.inputValues[i] || 0;
				const neuron = {
					key: `neuron-${layerIndex}-${i}`,
					activation: props.activationFunction,
					bias: props.bias,
					input,
					output: 0,
				};
				layer.neurons.push(neuron);
			}
			network.push(layer);
		});
		this.state = {
			network,
		};
	}

	render() {
		return (
			<Network>
				{this.state.network.map((layer, i) => (
					<Layer key={i}>
						<Dendrites>
							{layer.dendrites.map(dendrite => (
								<Dendrite
									key={dendrite.key}
									name={dendrite.key}
									weight={dendrite.weight}
									source={dendrite.source}
								/>
							))}
						</Dendrites>
						<Neurons>
							{layer.neurons.map(neuron => (
								<Neuron
									key={neuron.key}
									name={neuron.key}
									input={neuron.input}
									output={neuron.output}
									activation={neuron.activation}
									bias={neuron.bias}
								/>
							))}
						</Neurons>
					</Layer>
				))}
			</Network>
		);
	}
}
