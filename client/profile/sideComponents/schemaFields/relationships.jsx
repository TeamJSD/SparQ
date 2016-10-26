import React, {Component} from 'react';

class Relationships extends Component {
	constructor() {
		super()
	}

	render() {

		return (
			<div>

        <select className='type-of-relationship' value={this.props.relationships[0]} onChange={event => this.props.relationshipChange(event, this.props.schemaIndex, 0)}>
        	<option value='none'>None</option>
        	<option value='belongsTo'>Belongs To</option>
        	<option value='hasOne'>Has One</option>
        	<option value='belongsToMany'>Belongs To Many</option>
        	<option value='hasMany'>Has Many</option>
       	</select>
        
        <select className='select-relationship' value={this.props.relationships[1]} onChange={event => this.props.relationshipChange(event, this.props.schemaIndex, 1)}>
            <option value='none'>None</option>
                {this.props.relationshipOptions.map((item, index) => {
                    return <option key={index} value={item}>{item}</option>;
                 })
            }
        </select>
			
      </div>
		)
	}
}

export default Relationships;