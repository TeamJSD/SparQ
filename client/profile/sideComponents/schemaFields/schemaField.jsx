import React, {Component} from 'react';

class SchemaField extends Component {
	constructor() {
		super()
	}

	render() {
		return (
				<div>
					<h3>This is schema field #{this.props.index}</h3>
						<input className='schema-input' type='text'></input><br />
						<input className='schema-input' type='text'></input><br />
						<input className='schema-input' type='text'></input><br />
					<button className='add-input'>Add Field</button>
					<button className='submit-schema' onClick={this.props.onClick}>Save Schema</button>
				</div>
		)
	}
}

export default SchemaField;