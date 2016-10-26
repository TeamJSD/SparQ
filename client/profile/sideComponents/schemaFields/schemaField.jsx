import React, {Component} from 'react';
import Input from './input.jsx';
import Saved from './saved.jsx';
import Relationships from './relationships.jsx'
import createFixture from './../../../actions/schemaAction.jsx';

class SchemaField extends Component {
	constructor() {
		super()
		this.state = {
			inputs: [],
			data: [],
		}
		this.onClick = this.onClick.bind(this);
		this.deleteInput = this.deleteInput.bind(this);
		this.onSubmit = this.onSubmit.bind(this)
	}
	
	onClick(e) {
		e.preventDefault();
		const inputs = this.state.inputs.concat(Input)
		this.setState({ inputs })
	}

	componentWillMount() {
		let input = [];
		let data = [].concat(this.props.data)
		for(let i = 0; i < this.props.inputs; i++) {
			input = input.concat(Input)
		}
		this.setState({ inputs: input, data: data })
	}

	componentDidMount() {

	}

	onSubmit(e) {
		e.preventDefault();
	}

	deleteInput(e) {
		let copy = Object.assign([], this.state.inputs);
		let data = Object.assign([], this.state.data);
		copy.splice(e, 1);
		data.splice(e, 1);
		this.setState({ inputs: copy, data: data })
	}

	render() {

		const inputs = this.state.inputs.map((Element, index) => {
			return <Element
			 key={ index }
			 index={ index }
			 textVal={this.state.data[(index * 4) + 1]}
			 dropVal={this.state.data[(index * 4) + 2]}
			 reqVal={this.state.data[(index * 4) + 3]}
			 mutVal={this.state.data[(index * 4) + 4]}
			 deleteInput={this.deleteInput}
			 />
		})

		return (

				<div className='schema-form'>
					<form onSubmit={this.onSubmit}>
							<h3>Table name:</h3>
							
							<input type='text'
							id='schema-type-input' 
							defaultValue={this.state.data[0]}>
							</input> <br /> <br />

							Fields: <br /> <br />
							
								{ inputs }

							Has Relationships: <br />
							<Relationships 
							relationshipOptions={this.props.relationshipOptions} 
							relationships={this.props.relationships}
							/>

							<button 
								className='add-input'
								onClick={this.onClick}>
							 Add Field
							</button>
							
							<button
								onClick={this.props.deleteTable.bind(null, this.props.index)}
								type='button'>
								Delete Table
							</button>
						
						</form>
				</div>
		)
	}
}

export default SchemaField;