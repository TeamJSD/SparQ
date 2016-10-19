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
			data: [],
		}
		this.onClick = this.onClick.bind(this);
		this.createForm = this.createForm.bind(this);
	}
	
	onClick(e) {
		e.preventDefault();
		const inputs = this.state.inputs.concat(Input)
		this.setState({ inputs })
	}

	componentWillMount() {
		//console.log(this.props.inputs)
		let input = [];
		let data = [].concat(this.props.data)
		for(let i = 0; i < this.props.inputs; i++) {
			input = input.concat(Input)
		}
		//console.log('will mount should show before')
		//console.log(data)
		this.setState({ inputs: input, data: data })
	}

	componentDidMount() {
		this.state.inputs.map((item) => this.state.inputs.value = 'hi');
		//console.log(this.state.inputs)

	}

	createForm(e) {
		e.preventDefault();
		let target = e.nativeEvent;
		const inputsNumber = target.target.length - 2
		let values = [];

		for(let i = 0; i < inputsNumber; i++) {
			values.push(target.target[i].value)
		}
		console.log(values)
		return createFixture(values)

	}

	render() {

		const inputs = this.state.inputs.map((Element, index) => {
			return <Element
			 key={ index }
			 index={ this.props.index }
			 textVal={this.state.data[(index * 2) + 1]}
			 dropVal={this.state.data[(index * 2) + 2]}/>
		})

		return (

				<div>
						<form className='schema-form' onSubmit={this.createForm}>
							<h3>Object name:</h3>
							
							<input type='text'
							id='schema-type-input' 
							defaultValue={this.state.data[0]}>
							</input>
							
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