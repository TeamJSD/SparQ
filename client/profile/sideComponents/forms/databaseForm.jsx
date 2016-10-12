import React, {Component} from 'react';

class DatabaseForm extends Component {
	constructor(){
		super()
	}

	render() {
		return (
				<div id='database-form'>
						<input type='text' placeholder='Database Name'></input>
						<input type='text' placeholder='Username'></input>
						<input type='text' placeholder='Password'></input>
						<button onClick={this.props.saveDB.bind(this, this.props.index)}>Save DB</button>
				</div>
		)
	}
}

export default DatabaseForm;


					