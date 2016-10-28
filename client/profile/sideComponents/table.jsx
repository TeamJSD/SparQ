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
		this.createTable = this.createTable.bind(this);
		this.saveSchema = this.saveSchema.bind(this);
		this.deleteTable = this.deleteTable.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.relationshipChange = this.relationshipChange.bind(this);
		this.addInput = this.addInput.bind(this);
		this.deleteInput = this.deleteInput.bind(this);
	}

	componentDidMount() {
		//get request for data
		let data = [];
		let obj = [];		
		let id = this.getCookie('devId')
		
		axios.get(`/devUserSchema/${id}`)
		.then((response) => {

				if(!response.data) {
					//put one initial form with one initial input field if there is no saved data
					obj.push(SchemaField);
					data.push(["Table Name", "Field Name", "STRING", "true", "true"])
					this.state.relationships.push(["none", "none"])
					this.state.inputs.push(1)
					this.setState({ schemas: obj, data: data})
				
				} else {
			
					data = this.collectData(response.data)
					
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

	createTable(e) {
		e.preventDefault();
		let newState = Object.assign({}, this.state)
		newState.schemas.push(SchemaField);
		newState.data.push(["Table Name", "Field Name", "STRING", "none", "none"])
		newState.relationships.push(["none", "none"])
		newState.inputs.push(1)
		this.setState(newState);
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

	addInput(e, index) {
		e.preventDefault();
		let copy = Object.assign([], this.state.inputs)
		let data = Object.assign([], this.state.data)
		copy[index]++
		data[index].push('', 'STRING', 'true', 'true')
		this.setState({ data: data, inputs: copy })
	}

	deleteInput(e, schemaIndex, index) {
		let copy = this.state
		copy.inputs[schemaIndex]--
		copy.data[schemaIndex].splice(((index * 4) + 1), 4)
		this.setState({ copy })
	}

	handleChange(event, schemaIndex, index) {
		let copy = this.state.data
		copy[schemaIndex][index] = event.target.value
  	this.setState({ data: copy });
  }

  relationshipChange(event, schemaIndex, index) {
  	let copy = this.state.relationships
  	copy[schemaIndex][index] = event.target.value
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
					<div id='database-information'>
						<h3>Your Route: www.sparq.rocks/graphQL/{id}</h3>
					</div>
					<br />
					<h2>My Tables</h2>
					<form onSubmit={this.saveSchema}>
						{ schemas }
						<button id='create-table' onClick={this.createTable}>New Table</button>
						<button id='save-schema' type='submit'>Save Schema</button>
					</form>
				</div>
		)
	}
}

export default Table;