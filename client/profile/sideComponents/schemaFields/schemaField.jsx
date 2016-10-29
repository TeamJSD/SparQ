import React, {Component} from 'react';
import Input from './input.jsx';
import Saved from './saved.jsx';
import Relationships from './relationships.jsx'
import createFixture from './../../../actions/schemaAction.jsx';

class SchemaField extends Component {
	constructor() {
		super()
		this.onSubmit = this.onSubmit.bind(this)
	}

	onSubmit(e) {
		//when you click on add field, it won't submit the form
		e.preventDefault();
	}

	render() {

		const test = [];

		(() => {
			for(let i = 0; i < this.props.inputs; i++) {
				test.push(Input)
			}
		})()

		const inputs = test.map((Element, index) => {
			return <Element
			 key={ index }
			 index={ index }
			 schemaIndex={this.props.index}
			 textVal={this.props.data[(index * 4) + 1]}
			 dropVal={this.props.data[(index * 4) + 2]}
			 reqVal={this.props.data[(index * 4) + 3]}
			 mutVal={this.props.data[(index * 4) + 4]}
			 deleteInput={this.props.deleteInput}
			 handleChange={this.props.handleChange}
			 />
		})

		return (

				<div className='schema-form'>
					<form onSubmit={this.onSubmit}>
						<div className='form-header'>
							Table name:
							
							<input type='text'
							id='schema-type-input' 
							value={this.props.data[0]}
							placeholder='Table Name'
							onChange={event => this.props.handleChange(event, this.props.index, 0)}>
							</input> <br /> <br />
						</div>

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
								onClick={event => this.props.addInput(event, this.props.index)}>
							 +
							</button>
							
							<button
								className='delete-table'
								onClick={this.props.deleteTable.bind(null, this.props.index)}
								type='button'>
								x
							</button>
						
						</form>
				</div>
		)
	}
}

export default SchemaField;