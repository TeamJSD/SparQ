import React, {Component} from 'react';
import axios from 'axios';

class Signup extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: ''
		}
		this.onSubmit = this.onSubmit.bind(this)
		this.onChange = this.onChange.bind(this)
	}

	onSubmit(e) {
		e.preventDefault();
		console.log(this.state); //check console to see what object is being passed over
		axios.post('/signup', this.state).then((response) => console.log(response)).catch((err) => console.log(err))
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value })
	}

	render() {
		return (
			<div id='sign-up-page'>
				<h1>Sign Up</h1>
				<form id="signup-field" onSubmit={this.onSubmit}>
					
					<input
					 onChange={this.onChange}
					 type="text" 
					 id="username"
					 name="username"
					 placeholder='Username'>
					</input><br />
					
					<input
					 onChange={this.onChange}
					 type="password" 
					 id="password" 
					 name="password" 
					 placeholder='Password'>
					</input><br />
					
					<button
					 type='submit'
					 value="Sign Up" 
					 id='sign-up-page-button'>
					 Sign Up
					</button>
					
				</form>
			</div>
			)
	}
}

export default Signup;
