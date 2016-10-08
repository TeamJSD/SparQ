import React, {Component} from 'react';
import Dropdown from 'react-dropdown';
import Input from './input.jsx';

class SchemaField extends Component {
	constructor() {
		super()
		this.state = {
			inputs: [],
		}
		this.onClick = this.onClick.bind(this);
	}

	onClick() {
		const inputs = this.state.inputs.concat(Input)
		this.setState({ inputs })
	}


	render() {

		const inputs = this.state.inputs.map((Element, index) => {
			return <Element key={ index } index={ index } />
		})

		return (

				<div>
					<h3>This is schema field #{this.props.index + 1}</h3>
						<div className='schema-form'>
								{ inputs }
							<button className='add-input' onClick={this.onClick}>Add Field</button>
							<button className='submit-schema' onClick={this.props.onClick}>Save Schema</button>
						</div>
				</div>
		)
	}
}

export default SchemaField;