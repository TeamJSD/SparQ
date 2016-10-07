import React, {Component} from 'react';
import axios from 'axios';

class GraphSchema extends Component {
	constructor() {
		super()
		this.state = {
			test: 'testing',
			num: 0
		}
		this.onClick = this.onClick.bind(this);
	}

	onClick(e) {
		let update = Object.assign({}, this.state)
		update['num']++
		this.setState(update)
		axios.post('http://localhost:3000/data', update).then((response) => console.log(response)).catch((err) => console.log(err))
	}

	render() {
		return (
				<div>
					<h1>This is GraphSchema</h1>
					<button onClick={this.onClick}>Send HTTP</button>
				</div>
		)
	}
}

export default GraphSchema;