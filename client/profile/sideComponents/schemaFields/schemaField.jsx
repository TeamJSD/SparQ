import React, {Component} from 'react';
import Dropdown from 'react-dropdown';
import Input from './input.jsx';
import Saved from './saved.jsx';

class SchemaField extends Component {
	constructor() {
		super()
		this.state = {
			inputs: [],
			collections: {},
		}
		this.onClick = this.onClick.bind(this);
		this.createForm = this.createForm.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	
	onClick(e) {
		e.preventDefault();
		const inputs = this.state.inputs.concat(Input)
		this.setState({ inputs })
	}

	createForm(e) {
		let target = e.nativeEvent;

		const inputsNumber = target.target.length - 2

		for(let i = 0; i < inputsNumber; i++) {
			console.log(target.target[i].value)
		}

		//return this.props.saveSchema(this, e);
	}

	handleChange(e) {
		//console.log(e, e.target)
		this.setState()
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
								className={'submit-schema-' + this.props.index}>
							 	Save
							</button>

						</form>
				</div>
		)
	}
}

export default SchemaField;