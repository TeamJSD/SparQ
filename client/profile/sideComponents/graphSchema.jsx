import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import SchemaField from './schemaFields/schemaField.jsx';
import Saved from './schemaFields/saved.jsx';

class GraphSchema extends Component {
	constructor() {
		super()
		this.state = {
			schemas: [],
		}
		this.onClick = this.onClick.bind(this);
		this.createSchema = this.createSchema.bind(this);
		this.saveSchema = this.saveSchema.bind(this);
	}

	onClick(e) {

		//axios.post('http://localhost:3000/data', update).then((response) => console.log(response)).catch((err) => console.log(err))
	}

	saveSchema(e) {
		console.log(e)
		let obj = this.state;
		obj.schemas[e] = Saved;
		this.setState(obj)
	}

	createSchema() {
		const schemas = this.state.schemas.concat(SchemaField);
		this.setState({ schemas });
	}

	render() {
		const schemas = this.state.schemas.map((Element, index) => {
			return <Element key={ index } index={ index } onClick={this.onClick} saveSchema={this.saveSchema}/>
		})

		return (
				<div id='view-display'>
					{ schemas }
					<button id='create-schema' onClick={this.createSchema}>New Schema</button>
				</div>
		)
	}
}

export default GraphSchema;