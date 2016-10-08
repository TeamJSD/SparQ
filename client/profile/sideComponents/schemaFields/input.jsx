import React, {Component} from 'react';
import Dropdown from 'react-dropdown';

class Input extends Component {
	constructor() {
		super()
		this.onSelect = this.onSelect.bind(this);
	}

	onSelect(option) {
		console.log(option.value)
	}

	render() {
		const options = [
			{ value: 'string', label: 'String'},
			{ value: 'number', label: 'Number'}
		]

		return (
				<div className='input'>
					<input className='schema-input' type='text'></input>
					<Dropdown options={options} value={options[0]} onChange={this.onSelect}/>
				</div>
		)
	}
}

export default Input;