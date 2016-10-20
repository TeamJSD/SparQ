import React, {Component} from 'react';
import Dropdown from './dropdown.jsx';

class Input extends Component {
	constructor() {
		super()
	}

	render() {

		return (
				<div className='input'>
					<input
						className='schema-input'
						type='text'
						defaultValue={this.props.textVal}
						value={this.value}
						onChange={this.props.createForm}
						>
					</input>

					<Dropdown
						className='dropdown'
						onChange={this.props.createForm}
						defaultValue={this.props.dropVal}
						/>

						<select>
              <option value="true">Required</option>
              <option value="false">Not required</option>
            </select>
            <select>
              <option value="true">Mutable</option>
              <option value="false">Immutable</option>
            </select>

					<button onClick={this.props.deleteInput.bind(null, this)}>Delete</button>

				</div>
		)
	}
}

export default Input;