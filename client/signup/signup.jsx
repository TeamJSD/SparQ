import React, {Component} from 'react';

class Signup extends Component {
	render() {
		return (
			<div id='sign-up-page'>
				<h1>Sign Up</h1>
				<form id="login-field" onSubmit={this.props.onSubmit}>
					<input onChange={this.props.onChange} type="text" id="username" name="username" placeholder='Username'></input><br />
					<input onChange={this.props.onChange} type="password" id="password" name="password" placeholder='Password'></input><br />
				</form>
					<a href='http://localhost:3000/#/profile'><button value="Sign Up" id='sign-up-page-button'>Sign Up</button></a>
			</div>
			)
	}
}

export default Signup;
