import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import SchemaField from './schemaFields/schemaField.jsx';
import Saved from './schemaFields/saved.jsx';
import Input from './schemaFields/input.jsx';

class GraphSchema extends Component {
	constructor() {
		super()
		this.state = {
			schemas: [],
			savedSchemas: [["Derrick", "Name", "STRING", "Ethnicity", "STRING"]],
		}
		this.onClick = this.onClick.bind(this);
		this.createSchema = this.createSchema.bind(this);
		this.saveSchema = this.saveSchema.bind(this);
		this.deleteSchema = this.deleteSchema.bind(this);
	}

	onClick(e) {

	}

	componentWillMount() {
		let obj = [];
		for(let i = 0; i < this.state.savedSchemas.length; i++) {
			obj = obj.concat(SchemaField)
		}
		this.setState({ schemas: obj })
	}

	saveSchema(e) {
		// console.log(e)
		// let obj = this.state;
		// obj.schemas[e] = Saved;
		// this.setState(obj)
	}

	deleteSchema(e) {
		e.preventDefault();
		console.log(e)
		let copy = Object.assign([], this.state.schemas);
		copy.splice(e, 1);
		this.setState({ schemas: copy })
	}

	createSchema() {
		const schemas = this.state.schemas.concat(SchemaField);
		this.setState({ schemas });
	}

	render() {
		const schemas = this.state.schemas.map((Element, index) => {
			return <Element key={ index }
				ref={'element'+ index} 
				index={ index } 
				onClick={this.onClick} 
				saveSchema={this.saveSchema}
				deleteSchema={this.deleteSchema}/>
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