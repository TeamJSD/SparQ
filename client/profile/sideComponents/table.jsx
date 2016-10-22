import React, {Component} from 'react';
import SchemaField from './schemaFields/schemaField.jsx';
import Input from './schemaFields/input.jsx';
import createFixture from './../../actions/schemaAction.jsx';
import axios from 'axios';

class Table extends Component {
	constructor() {
		super()
		this.state = {
			data: [],
			schemas: [],
			inputs:[],
			relationshipOptions: [],
			relationships: [],
		}
		this.createSchema = this.createSchema.bind(this);
		this.saveSchema = this.saveSchema.bind(this);
	}

	componentWillMount() {
		//get request for data
		let data;
		
		axios.get(`/devUserSchema/${document.cookie.replace('devId=', '')}`)
		.then((response) => {
			console.log(response.data)
			data = this.collectData(response.data)
			console.log(data, 'this is the data that loads')
			let obj = [];
			
			for(let i = 0; i < data.length; i++) {
				obj = obj.concat(SchemaField)
				let num = 0
				
				for(let j = 0; j < data[i].length - 2; j += 4) {
					if(j === 0) {
						this.state.relationshipOptions.push(data[i][j]);
						j++
					}
					num++;
				}
				this.state.relationships.push(Object.assign([], data[i].splice(-2)))
				this.state.inputs.push(num)
			}
			this.setState({ schemas: obj, data: data })

		})
		.catch((err) => console.log(err))
		//create amount of necessary forms for loading the user's tables
		
	}

	collectData(obj) {
    let data = [];
    let fixture = obj;
    for(let i = 0; i < fixture.tables.length; i++) {
    	let temp = [];
    	temp.push(fixture.tables[i].tableName);
    	let fields = fixture.tables[i].fields
    	for(let j = 0; j < fields.length; j++) {
    		temp.push(fields[j].fieldName);
    		temp.push(fields[j].type);
    		temp.push(fields[j].required);
    		temp.push(fields[j].mutable);
    	}
    	if(fixture.hasRelationships) {
    		temp.push(fixture.relationships[i].Slave)
    		temp.push(fixture.relationships[i].Verb)
    	}
    	data.push(temp)
    }
    return data;
	}

	componentDidMount() {

	}

	saveSchema(e){
		e.preventDefault()
		let fixtureValues = []

		//get all existing form elements
		let children = (Array.prototype.slice.call(e.nativeEvent.target.children));
		children.splice(-2)

		//loop through form elements to get the inputs
		for(let i = 0; i < children.length; i++) {
			let childForm = children[i].children[0].elements
			let tempValues = []
			
			//loop through inputs to get the individual values
			for(let j = 0; j < childForm.length - 1; j++) {
				//collect input values of each form
				tempValues.push(childForm[j].value)
			}
			
			//push individual form values into whole collection (fixture values)
			fixtureValues.push(tempValues)
		}
		return createFixture(fixtureValues)
	}

	createSchema(e) {
		e.preventDefault();
		let schemas = Object.assign([], this.state.schemas)
		schemas = schemas.concat(SchemaField);
		this.state.relationships.push(["none", "none"])
		this.setState({ schemas: schemas,  });
	}

	render() {
		const schemas = this.state.schemas.map((Element, index) => {
			return <Element key={ index }
			 index={ index }
			 onClick={this.onClick}
			 saveSchema={this.saveSchema}
			 inputs={this.state.inputs[index]}
			 data={this.state.data[index]}
			 relationshipOptions={this.state.relationshipOptions}
			 relationships={this.state.relationships[index]}
			  />
		})

		return (
				<div>
					<h2>Your Database</h2>
					<h3>Database: MyTestDB</h3>
					<h3>Route: /graphQL/a1b2c3</h3>
					<br />
					<h2>My Tables</h2>
					<form onSubmit={this.saveSchema}>
						{ schemas }
						<button id='create-schema' onClick={this.createSchema}>New Table</button>
						<button id='save-schema' type='submit'>Save Schema</button>
					</form>
				</div>
		)
	}
}

export default Table;