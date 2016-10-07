import React, {Component} from 'react';

class GraphiQL extends Component {
	constructor() {
		super()
	}

	render() {
		return (
				<div>
					<h3 onClick={this.props.onClick}>This is GraphiQL</h3>
				</div>
		)
	}
}

export default GraphiQL;