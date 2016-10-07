import React, {Component} from 'react';

class Table extends Component {
	constructor() {
		super()
	}

	render() {
		return (
				<div>
					<h3 onClick={this.props.onClick}>This is Table</h3>
				</div>
		)
	}
}

export default Table;