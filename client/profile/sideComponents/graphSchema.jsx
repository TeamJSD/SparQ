import React, {Component} from 'react';

class GraphSchema extends Component {
	constructor() {
		super()
	}

	render() {
		return (
				<div>
					<h3 onClick={this.props.onClick}>This is GraphSchema</h3>
				</div>
		)
	}
}

export default GraphSchema;