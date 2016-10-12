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
			{ value: 'id', label: 'ID'},
			{ value: 'string', label: 'String'},
			{ value: 'number', label: 'Number'},
			{ value: 'float', label: 'Float'},
			{ value: 'boolean', label: 'Boolean'},
			{ value: 'dateTime', label: 'DateTime'},
			{ value: 'email', label: 'Email'},
			{ value: 'location', label: 'Location'},
			{ value: 'file', label: 'File'},
		]

		return (
				<div className='input'>
					<input
						className='schema-input'
						ref={this.props.index}
						type='text'
						value={this.value}
						>
					</input>
					<Dropdown
						className='dropdown'
						options={options}
						value={options[0]}
						onChange={this.onSelect} />
				</div>
		)
	}
}

export default Input;