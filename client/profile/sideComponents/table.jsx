import React, {Component} from 'react';
import SchemaField from './schemaFields/schemaField.jsx';
import Input from './schemaFields/input.jsx';
import Dropdown from './schemaFields/dropdown.jsx';

class Table extends Component {
	constructor() {
		super()
		this.state = {
			data: [["Derrick", "Name", "INTEGER", "Ethnicity", "STRING"], ["Derrick", "Name", "UUID"], ["Derrick", "Name", "STRING", "Ethnicity", "STRING", "Color", "STRING"]],
			schemas: [],
			inputs:[],
		}
	}

	componentWillMount() {
		//get request here for data
		//update state
		//render data with inputs
		let obj = [];
		for(let i = 0; i < this.state.data.length; i++) {
			obj = obj.concat(SchemaField)
			let num = 0
			for(let j = 1; j < this.state.data[i].length; j += 2) {
				num++;
			}
			this.state.inputs.push(num)
		}
		this.setState({ schemas: obj })
	}

	componentDidMount() {
		// for(let i = 0; i < this.state.data.length; i++) {
		// 	for(let j = 0; j < this.state.data[i].length; j++) {
		// 		this.state.schemas.map((item) => {
		// 			console.log(item)
		// 		})
		// 	}
		// }
	}

	render() {
		const schemas = this.state.schemas.map((Element, index) => {
			return <Element key={ index }
			 index={ index }
			 onClick={this.onClick}
			 saveSchema={this.saveSchema}
			 inputs={this.state.inputs[index]}
			 data={this.state.data[index]}/>
		})

		return (
				<div>
					<h1>My Schemas</h1>
					{ schemas }
				</div>
		)
	}
}

export default Table;