import React, {Component} from 'react';

class LoginButton extends Component {
	constructor() {
		super()
	}

	render() {
		return (
			<div>
				<a href='https://github.com/login/oauth/authorize?client_id=ae9980b87ac026416d88'><button id='signin' onClick={this.gitHubAuth}>Sign in with GitHub</button></a>
			</div>
			)
	}
}

export default LoginButton;