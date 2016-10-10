import React, {Component} from 'react';

class LoginField extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				<form id="login-field" onSubmit={this.props.onSubmit}>
					<input onChange={this.props.onChange} type="text" id="username" name="username" placeholder='Username'></input><br />
					<input onChange={this.props.onChange} type="password" id="password" name="password" placeholder='Password'></input><br />
				</form>
				<a href='http://localhost:3000/#/profile'><button id='log-in-spoof'>Log in</button></a>
			</div>
		)
	}
}

export default LoginField;