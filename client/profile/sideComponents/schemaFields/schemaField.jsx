import React, {Component} from 'react';
import Dropdown from 'react-dropdown';
import Input from './input.jsx';
import Saved from './saved.jsx';

class SchemaField extends Component {
	constructor() {
		super()
		this.state = {
			inputs: [],
			savedSchema: {},
			value: [],
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
		let inputs = document.getElementsByClassName('schema-input');
		let selections = document.getElementsByClassName('Dropdown-placeholder');
		let obj = {};
		for(let i = 0; i < inputs.length; i++) {
			obj[inputs[i].value] = selections[i].innerHTML
		}
		console.log(obj)

		return this.props.saveSchema(this, e);
	}

	render() {

		const inputs = this.state.inputs.map((Element, index) => {
			return <Element key={ index } index={ index } value={ this.state.value[index] } />
		})

		return (

				<div>
					<h3>This is schema field #{this.props.index + 1}</h3>
						<form className='schema-form'>
							<span id='schema-type'><h3>Object name:</h3><input type='text' id='schema-type-input'></input></span>
								{ inputs }

							<button 
								className='add-input'
								onClick={this.onClick}>
							 Add Field
							</button>

							<button
								className='submit-schema'
								onClick={this.createForm.bind(this, this.props.index)}>
							 	Save Schema
							</button>

						</form>
				</div>
		)
	}
}

export default SchemaField;