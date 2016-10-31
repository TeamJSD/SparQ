import React, {Component} from 'react';

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
						value={this.props.textVal}
						placeholder='Field Name'
						onChange={event => this.props.handleChange(event, this.props.schemaIndex, (this.props.index * 4) + 1)}
						>
					</input>

	        <select className= "dropdown" value={this.props.dropVal} onChange={event => this.props.handleChange(event, this.props.schemaIndex, (this.props.index * 4) + 2)}>
	          <option value="STRING">String</option>
	          <option value="UUID">ID</option>
	          <option value="INTEGER">Number</option>
	          <option value="FLOAT">Float</option>
	          <option value="BOOLEAN">Boolean</option>
	          <option value="DATE">Date</option>
	        </select>

					<select value={this.props.reqVal} onChange={event => this.props.handleChange(event, this.props.schemaIndex, (this.props.index * 4) + 3)}>
            <option value="true">Required</option>
            <option value="false">Not required</option>
          </select>
          
          <select value={this.props.mutVal} onChange={event => this.props.handleChange(event, this.props.schemaIndex, (this.props.index * 4) + 4)}>
            <option value="true">Mutable</option>
            <option value="false">Immutable</option>
          </select>
          <p className='delete-input' onClick={event => this.props.deleteInput(event, this.props.schemaIndex, this.props.index)}>x</p>


				</div>
		)
	}
}

export default Input;