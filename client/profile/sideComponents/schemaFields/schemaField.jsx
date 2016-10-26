import React, {Component} from 'react';
import Input from './input.jsx';
import Saved from './saved.jsx';
import Relationships from './relationships.jsx'
import createFixture from './../../../actions/schemaAction.jsx';

class SchemaField extends Component {
	constructor() {
		super()
		this.state = {
			inputs: [],
		}
		this.addInput = this.addInput.bind(this);
		this.deleteInput = this.deleteInput.bind(this);
		this.onSubmit = this.onSubmit.bind(this)
	}
	
	addInput(e, index) {
		e.preventDefault();
		const inputs = this.state.inputs.concat(Input)
		this.setState({ inputs: inputs })
		return this.props.addInput(index)
	}

	componentDidMount() {
		let input = [];
		for(let i = 0; i < this.props.inputs; i++) {
			input = input.concat(Input)
		}
		this.setState({ inputs: input })
	}

	onSubmit(e) {
		e.preventDefault();
	}

	deleteInput(e, schemaIndex, index) {
		//console.log(e)
		e.preventDefault();
		let copy = Object.assign([], this.state.inputs);
		copy.splice(index, 1);
		//this.props.data.splice(index, 4)
		this.setState({ inputs: copy })
		return this.props.deleteInput(schemaIndex, index)
	}

	render() {

		const inputs = this.state.inputs.map((Element, index) => {
			return <Element
			 key={ index }
			 index={ index }
			 schemaIndex={this.props.index}
			 textVal={this.props.data[(index * 4) + 1]}
			 dropVal={this.props.data[(index * 4) + 2]}
			 reqVal={this.props.data[(index * 4) + 3]}
			 mutVal={this.props.data[(index * 4) + 4]}
			 deleteInput={this.deleteInput}
			 handleChange={this.props.handleChange}
			 />
		})

		return (

				<div className='schema-form'>
					<form onSubmit={this.onSubmit}>
							<h3>Table name:</h3>
							
							<input type='text'
							id='schema-type-input' 
							value={this.props.data[0]}
							onChange={event => this.props.handleChange(event, this.props.index, 0)}>
							</input> <br /> <br />

							Fields: <br /> 
							
								{ inputs }

							Has Relationships: <br /><br />
							<Relationships 
							relationshipOptions={this.props.relationshipOptions} 
							relationships={this.props.relationships}
							schemaIndex={this.props.index}
							relationshipChange={this.props.relationshipChange}
							/>

							<button 
								className='add-input'
								onClick={event => this.addInput(event, this.props.index)}>
							 Add Field
							</button>
							
							<button
								className='delete-table'
								onClick={this.props.deleteTable.bind(null, this.props.index)}
								type='button'>
								Delete Table
							</button>
						
						</form>
				</div>
		)
	}
}

export default SchemaField;