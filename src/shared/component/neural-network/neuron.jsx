// @flow
import React, { Component } from 'react';
import Dendrite from './dendrite';

type Props = {
	name: string,
	input: Array<string> | number,
	output: number,
	bias: number,
	activation: (number: number) => number,
	onOutputCalculated: (number: number) => any,
};

type State = {
	output: number,
};

export default class Neuron extends Component<Props, State> {
	static defaultProps = {
		activation: (n: number): number => n,
		onOutputCalculated: (n: number): void => {},
	};

	constructor(props: Props) {
		super(props);

		this.state = {
			output: this.calculateNeuronOutput(props),
		};
	}

	componentWillReceiveProps(props: Props) {
		this.setState({
			output: this.calculateNeuronOutput(props),
		});
	}

	calculateWeightedSum(props: Props): number {
		if (!props.input) {
			return 0;
		}
		if (typeof props.input === 'number') {
			return props.input;
		}
		return props.input
			.map((dendrite): number => {
				if (dendrite.weighedValue) {
					return dendrite.weighedValue;
				}
				return 0;
			})
			.reduce((prev, curr) => prev + curr, 0);
	}

	calculateNeuronOutput(props: Props): number {
		if (typeof props.input === 'number') {
			return props.input;
		}
		const output = props.activation(
			this.calculateWeightedSum(props) + props.bias
		);
		props.onOutputCalculated(output);
		return output;
	}

	render() {
		return (
			<div>
				{this.props.name}: {this.state.output}
			</div>
		);
	}
}
