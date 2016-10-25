import React, {Component} from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import Logo from './Logo.png';

class NavBar extends Component {
	constructor() {
		super();
	}

	render() {
		let indicator = (document.cookie.match(/^(?:.*;)?devId=([^;]+)(?:.*)?$/)||[,null])[1];
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