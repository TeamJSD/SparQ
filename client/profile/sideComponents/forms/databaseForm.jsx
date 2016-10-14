import React, {Component} from 'react';

class DatabaseForm extends Component {
	constructor(){
		super()
		this.onSubmit = this.onSubmit.bind(this)
	}

	onSubmit(e) {
		e.preventDefault();
		let target = e.nativeEvent,
		numInputs = target.target.length - 1,
		values = [];

		for(let i = 0; i < numInputs; i++) {
			values.push(target.target[i].value)
		}

		console.log(values)

	}

	render() {
		return (
				<div>
					<form className={'database-form-' + this.props.index} onSubmit={this.onSubmit}>
						<input type='text' placeholder='Database Name'></input>
						<input type='text' placeholder='Username'></input>
						<input type='text' placeholder='Password'></input>
						<button type='submit' onClick={this.props.saveDB.bind(this, this.props.index)}>Save DB</button>
					</form>
				</div>
		)
	}
}

export default DatabaseForm;


					