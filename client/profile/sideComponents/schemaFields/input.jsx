import React, {Component} from 'react';
import Dropdown from './dropdown.jsx';

class Input extends Component {
	constructor() {
		super()
		this.onSelect = this.onSelect.bind(this);
		this.state = {
			fieldValues: []
		}
	}

	onSelect(option) {
		console.log(option)
	}

	render() {

		return (
				<div className='input'>
					<input
						className={'schema-input-' + this.props.index}
						ref={this.props.index}
						type='text'
						value={this.value}
						onChange={this.props.createForm}
						>
					</input>

					<Dropdown
						className={'dropdown-' + this.props.index}
						value={this.state.value}
						onChange={this.props.createForm} />
				</div>
		)
	}
}

export default Input;