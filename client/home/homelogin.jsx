import React, {Component} from 'react';
import pic from './../components/githublogo.png';
import { Link } from 'react-router';

class HomeLogin extends Component {
	constructor(){
		super();
	}

	render() {
		return (
			<div>
				<h1>Log into SparQ</h1>
				<img src={pic} id='githubimg'/><br />
				<Link to='/login'><button>Login</button></Link>
			</div>
			)
	}
}

export default HomeLogin;