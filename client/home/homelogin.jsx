import React, {Component} from 'react';
import pic from './../components/githublogo.png';
import { Link } from 'react-router';

class HomeLogin extends Component {
	constructor(){
		super();
	}

	getCookie(name) {
		var value = "; " + document.cookie;
  	var parts = value.split("; " + name + "=");
  	if (parts.length == 2) return parts.pop().split(";").shift();
	}

	render() {
		let indicator = this.getCookie('devId')
		let link;
		if(indicator) {
			link = <Link to='/profile'><button>My Profile</button></Link>
		} else {
			link = <Link to='/login'><button>Login</button></Link>
		}

		return (
			<div>
				<h1>Log into SparQ</h1>
				<img src={pic} id='githubimg'/><br />
				{ link }
			</div>
			)
	}
}

export default HomeLogin;