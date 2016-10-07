import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import SchemaField from './schemaFields/schemaField.jsx';

class GraphSchema extends Component {
	constructor() {
		super()
		this.state = {
			schemas: [],
		}
		this.onClick = this.onClick.bind(this);
		this.createSchema = this.createSchema.bind(this);
	}

	onClick(e) {
		let update = Object.assign({}, this.props)
		update['num']++
		this.setState(update)
		axios.post('http://localhost:3000/data', update).then((response) => console.log(response)).catch((err) => console.log(err))
	}

	createSchema() {
		const schemas = this.state.schemas.concat(SchemaField);
		this.setState({ schemas });
	}

	render() {
		const schemas = this.state.schemas.map((Element, index) => {
			return <Element key={ index } index={ index + 1 } onClick={this.onClick}/>
		})

		return (
				<div id='view-display'>
					<h1>This is GraphSchema</h1>
					{ schemas }
					<button id='create-schema' onClick={this.createSchema}>Create Schema</button>
				</div>
		)
	}
}

export default GraphSchema;