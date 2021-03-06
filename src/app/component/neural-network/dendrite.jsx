// @flow
import React, { Component } from 'react';
import type { positionObject } from 'app/component/neural-network/types';

type Props = {
	name: string,
	weight: number,
	input: number,
	output: number,
	source: positionObject,
	destination: positionObject,
};

export default class Dendrite extends Component<Props> {
	value: number;
	sourceName: string;
	weighedValue: number;

	constructor(props: Props) {
		super(props);
		this.weighedValue = this.value * props.weight;
	}

	render() {
		const sx = this.props.source.x;
		const sy = this.props.source.y;
		const dx = this.props.destination.x;
		const dy = this.props.destination.y;
		return (
			<g id={this.props.name}>
				<path
					d={`M${sx} ${sy} L ${dx} ${dy}`}
					fill="transparent"
					stroke="black"
					strokeWidth={this.props.weight}
				/>
			</g>
		);
	}
}
