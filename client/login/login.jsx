import React, {Component} from 'react';
import Panel from './../components/panel.jsx';
import login from './../actions/loginAction.jsx';

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
		console.log(this.state);
		//login(this.state);
	}

	render() {
		const style = {border: '1px solid black'};

		return (
			<div id='login-view'>
				<h1>Not a member?</h1><h1 id='sign-up'>Sign Up.</h1>
				<div id='login-panel'>
					<Panel  
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