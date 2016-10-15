import React, {Component} from 'react';
import Dropdown from 'react-dropdown';
import Input from './input.jsx';
import Saved from './saved.jsx';
import createFixture from './../../../actions/schemaAction.jsx';

class SchemaField extends Component {
	constructor() {
		super()
		this.state = {
			inputs: [],
			collections: {},
		}
		this.onClick = this.onClick.bind(this);
		this.createForm = this.createForm.bind(this);
	}
	
	onClick(e) {
		e.preventDefault();
		const inputs = this.state.inputs.concat(Input)
		this.setState({ inputs })
	}

	createForm(e) {
		e.preventDefault();
		let target = e.nativeEvent;
		const inputsNumber = target.target.length - 2
		let values = [];

		for(let i = 0; i < inputsNumber; i++) {
			values.push(target.target[i].value)
		}

		return createFixture(values)

		//return this.props.saveSchema(this, e);
	}

	render() {

		const inputs = this.state.inputs.map((Element, index) => {
			return <Element key={ index } index={ this.props.index } />
		})

		return (

				<div>
					<h3>This is schema field #{this.props.index + 1}</h3>
						<form className='schema-form' onSubmit={this.createForm}>
							<h3>Object name:</h3>
							<input type='text' id='schema-type-input'></input>
								{ inputs }

							<button 
								className='add-input'
								onClick={this.onClick}>
							 Add Field
							</button>

							<button	
								type='submit'		
								className='submit-schema'>
							 	Save
							</button>

						</form>
				</div>
		)
	}
}

export default SchemaField;