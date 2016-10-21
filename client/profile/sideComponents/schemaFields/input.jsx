import React, {Component} from 'react';

class Input extends Component {
	constructor() {
		super()
	}

	render() {
		//delete button 	<button onClick={this.props.deleteInput.bind(null, this)}>Delete</button>

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

	        <select className= "dropdown" defaultValue={this.props.dropVal}>
	          <option value="STRING">String</option>
	          <option value="UUID">ID</option>
	          <option value="INTEGER">Number</option>
	          <option value="FLOAT">Float</option>
	          <option value="BOOLEAN">Boolean</option>
	          <option value="DATE">Date</option>
	        </select>

					<select defaultValue={this.props.reqVal}>
            <option value="true">Required</option>
            <option value="false">Not required</option>
          </select>
          
          <select defaultValue={this.props.mutVal}>
            <option value="true">Mutable</option>
            <option value="false">Immutable</option>
          </select>

				</div>
		)
	}
}

export default Input;