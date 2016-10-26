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
		this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
	}

	componentWillMount() {
		//get request for data
		let data;
		let id = (document.cookie.match(/^(?:.*;)?devId=([^;]+)(?:.*)?$/)||[,null])[1];
		console.log(id)
		
		axios.get(`/devUserSchema/${id}`)
		.then((response) => {
			console.log(response.data, 'data')
			
			data = this.collectData(response.data)
			
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
				let relations = data[i]
				this.state.relationships.push(Object.assign([], data[i].splice(-2)))
				this.state.inputs.push(num)
			}

			if(!obj.length) {
				obj = obj.concat(SchemaField)
			}
			this.setState({ schemas: obj, data: data })

		})
		.catch((err) => console.log(err))		
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

    		temp.push(slave)
    		temp.push(verb)
    	
    	data.push(temp)
    }
    return data;
	}

	componentDidMount() {

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
		schemas = schemas.concat(SchemaField);
		this.state.relationships.push(["none", "none"])
		this.setState({ schemas: schemas,  });
	}

	componentWillReceiveProps(e) {
		console.log(e)
		// let schemas = Object.assign([], this.state.schemas)
		// schemas.splice(e, 1)
		// let data = Object.assign([], this.state.data)
		// this.state.data.splice(e, 1)
		// console.log(schemas)
		// this.state.relationships.splice(e, 1)
		// this.setState({ schemas: schemas });	
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
			 deleteTable={this.componentWillReceiveProps}
			 />
		})

		return (
				<div>
					<h2>Your Database</h2>
					<h3>Your Route: www.sparq.rocks/graphQL/{document.cookie.replace('devId=', '')}</h3>
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