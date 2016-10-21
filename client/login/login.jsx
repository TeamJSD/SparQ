import React, {Component} from 'react';
import LoginPanel from './loginPanel.jsx';
import Signup from './../actions/signupAction.jsx';
import axios from 'axios';
import { Link } from 'react-router';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit(e) {
		e.preventDefault();
		console.log(this.state); //check console to see what object is being passed over
		axios.post('/login', this.state).then((response) => {
			console.log(response)
			 window.location = response.data.redirectUrl
			}).catch((err) => console.log(err))
	}

	render() {
		const style = {border: '1px solid black'};

		return (
			<div id='login-view'>
				<h1>Not a member?</h1>
				<Link to='/signup'><h1 id='sign-up'>Sign Up.</h1></Link>
				<div id='login-panel'>
					<LoginPanel  
					onSubmit={this.onSubmit} 
					onChange={this.onChange}
					username={this.state.username}
					password={this.state.password}
					/>
				</div>
			</div>
			)
	}
}

export default Login;