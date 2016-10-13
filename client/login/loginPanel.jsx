import React, {Component} from 'react';
import LoginButton from './loginbutton.jsx';
import LoginField from './loginfield.jsx';
import pic from './../components/githublogo.png';

class LoginPanel extends Component {
	constructor(){
		super();
	}

	render() {
		return (
			<div>
				<h1>Log into SparQ</h1>
				<img src={pic} id='githubimg'/>
				<LoginButton />
				<LoginField 
					onSubmit={this.props.onSubmit} 
					onChange={this.props.onChange}
					username={this.props.username}
					password={this.props.password}
				/>
			</div>
			)
	}
}

export default LoginPanel;