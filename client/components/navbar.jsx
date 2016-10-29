import React, {Component} from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import Logo from './Logo.png';

class NavBar extends Component {
	constructor() {
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
		let notLoggedIn;
		if(indicator) {
			link = <Link to='/signout'>Sign Out</Link>
			notLoggedIn = '/profile'
		} else {
			link = <Link to='/login'>Login</Link>
			notLoggedIn = '/login'
		}
		
		return (
			<div id='nav-container'>
			<div className="navbar">
				<span id="logo">
					<Link to='/'><img src={Logo} /></Link>
				</span>
				<span id='spacer'></span>
				<span id="nav">
					<Link to='/'>Home</Link>&nbsp;
					<Link to={ notLoggedIn }>Profile</Link>
					{ link }
				</span>
			</div>
			</div>
			)
	}
}

export default NavBar;