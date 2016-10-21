import React, {Component} from 'react';
import SchemaField from './schemaFields/schemaField.jsx';
import Input from './schemaFields/input.jsx';
import createFixture from './../../actions/schemaAction.jsx'

class Table extends Component {
	constructor() {
		super()
		this.state = {
			data: [["Derrick", "Name", "INTEGER", true, false, "Ethnicity", "STRING", false, true, "Jayce", "belongsTo"], ["Steve", "Name", "UUID", true, false, "Derrick", "hasOne"], ["Jayce", "Name", "STRING", true, false, "Ethnicity", "STRING", true, false, "Color", "STRING", false, true, "none", "none"]],
			schemas: [],
			inputs:[],
			relationshipOptions: [],
			relationships: [],
		}
		this.createSchema = this.createSchema.bind(this);
		this.saveSchema = this.saveSchema.bind(this)
	}

	componentWillMount() {
		//get request here for data
		//update state
		//render data with inputs

		//create amount of necessary forms for loading the user's tables
		let obj = [];
		for(let i = 0; i < this.state.data.length; i++) {
			obj = obj.concat(SchemaField)
			let num = 0
			
			for(let j = 0; j < this.state.data[i].length - 2; j += 4) {
				if(j === 0) {
					this.state.relationshipOptions.push(this.state.data[i][j]);
					j++
				}
				num++;
			}
			this.state.relationships.push(Object.assign([], this.state.data[i].splice(-2)))
			this.state.inputs.push(num)
		}
		this.setState({ schemas: obj })
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
			for(let j = 0; j < childForm.length - 2; j++) {
				//collect input values of each form
				tempValues.push(childForm[j].value)
			}
			
			//push individual form values into whole collection (fixture values)
			fixtureValues.push(tempValues)
		}
		return createFixture(fixtureValues)
	}

	createSchema() {
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
					<h1>My Tables</h1>
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