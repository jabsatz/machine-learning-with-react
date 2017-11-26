// @flow
import React, { Component } from 'react';
import Neuron from './neuron';

type Props = {
	name: string,
	weight: number,
	source: string,
};

export default class Dendrite extends Component<Props> {
	value: number;
	sourceName: string;
	weighedValue: number;

	constructor(props: Props) {
		super(props);
		this.sourceName = props.source;
		this.weighedValue = this.value * props.weight;
	}

	render() {
		return (
			<div>
				{this.props.name}: {this.props.weight}
			</div>
		);
	}
}
