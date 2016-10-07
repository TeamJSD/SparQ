import React, {Component} from 'react';
import Dropdown from 'react-dropdown';

class SchemaField extends Component {
	constructor() {
		super()
	}

	render() {
		const options = [
			{ value: 'string', label: 'String'},
			{ value: 'number', label: 'Number'}
		]

		return (
				<div>
					<h3>This is schema field #{this.props.index}</h3>
						<input className='schema-input' type='text'></input>
						<input className='schema-input' type='text'></input>
						<input className='schema-input' type='text'></input>
						<Dropdown options={options} value={options[0]} onChange={this._onSelect}/>
						<Dropdown options={options} value={options[0]} onChange={this._onSelect}/>
						<Dropdown options={options} value={options[0]} onChange={this._onSelect}/>

					<button className='add-input'>Add Field</button>
					<button className='submit-schema' onClick={this.props.onClick}>Save Schema</button>
				</div>
		)
	}
}

export default SchemaField;