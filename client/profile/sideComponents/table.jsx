import React, {Component} from 'react';
import SchemaField from './schemaFields/schemaField.jsx';
import Input from './schemaFields/input.jsx';
import Saved from './schemaFields/saved.jsx';
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
		this.deleteTable = this.deleteTable.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.relationshipChange = this.relationshipChange.bind(this);
		this.addInput = this.addInput.bind(this);
		this.deleteInput = this.deleteInput.bind(this);
	}

	componentDidMount() {
		//get request for data
		let data;
		let id = this.getCookie('devId')
		
		axios.get(`/devUserSchema/${id}`)
		.then((response) => {
			console.log(response.data, 'data')
			
			data = this.collectData(response.data)
			
			let obj = [];

				if(!data.length) {
					//put one initial form with one initial input field if there is no saved data
					obj = obj.concat(SchemaField);
					data.push(["Table Name", "Field Name", "STRING", "true", "true"])
					this.state.relationships.push(["none", "none"])
					this.state.inputs.push(1)
					this.setState({ schemas: obj, data: data})
				
				} else {
			
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
				}
		})
		.catch((err) => console.log(err))		
	}

	getCookie(name) {
		var value = "; " + document.cookie;
  	var parts = value.split("; " + name + "=");
  	if (parts.length == 2) return parts.pop().split(";").shift();
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
    	    	
    		let slave = 'none',
    		verb = 'none';

    		if(fixture.relationships[i]) {
	    		if(fixture.relationships[i].Master !== fixture.tables[i].tableName) {
	    			fixture.relationships.splice(i, 0, fixture.relationships[i])
	    			fixture.relationships[i] = '';
	    		} else {
	    			slave = fixture.relationships[i].Slave
	    			verb = fixture.relationships[i].Verb
	    		}
	    	}

    		temp.push(verb)
    		temp.push(slave)
    	
    	data.push(temp)
    }
    return data;
	}

	saveSchema(e){
		e.preventDefault();
		let fixtureValues = []

		//get all existing form elements
		let children = (Array.prototype.slice.call(e.nativeEvent.target.children));
		children.splice(-2)

		//loop through form elements to get the inputs
		for(let i = 0; i < children.length; i++) {

			let childForm = children[i].children[0].elements
			let tempValues = []
			
			//loop through inputs to get the individual values
			for(let j = 0; j < childForm.length - 2; j++) {
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
		let data = Object.assign([], this.state.data)
		schemas = schemas.concat(SchemaField);
		data.push(["Table Name", "Field Name", "STRING", "none", "none"])
		this.state.relationships.push(["none", "none"])
		this.state.inputs.push(1)
		this.setState({ schemas: schemas, data: data });
	}

	addInput(e, index) {
		e.preventDefault();
		console.log('inside add input', index)
		let copy = this.state.inputs
		copy[index]++
		this.setState({ inputs: copy })
	}

	deleteInput(schemaIndex, index) {
		console.log('inside delete input', index)
		let copy = this.state
		copy.inputs[schemaIndex]--
		copy.data[schemaIndex].splice(((index * 4) + 1), 4)
		this.setState({ copy })
	}


	deleteTable(e) {
		let newState = Object.assign({}, this.state)
		newState.data.splice(e, 1)
		newState.schemas.splice(e, 1)
		newState.inputs.splice(e, 1)
		newState.relationshipOptions.splice(e, 1)
		newState.relationships.splice(e, 1)
		this.setState(newState);
	}

	handleChange(event, schemaIndex, index) {
		let copy = this.state.data
		copy[schemaIndex][index] = event.target.value
		console.log(copy)
  	this.setState({ data: copy });
  }

  relationshipChange(event, schemaIndex, index) {
  	let copy = this.state.relationships
  	copy[schemaIndex][index] = event.target.value
  	console.log(copy)
  	this.setState({ relationships: copy })
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
			 addInput={this.addInput}
			 deleteInput={this.deleteInput}
			 deleteTable={this.deleteTable}
			 handleChange={this.handleChange}
			 relationshipChange={this.relationshipChange}
			 />
		})

		const id = this.getCookie('devId')


		return (
				<div>
					<h2>Your Database</h2>
					<h3>Your Route: www.sparq.rocks/graphiQL/{id}</h3>
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