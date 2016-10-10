import React, {Component} from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import Logo from './Logo.png';

class NavBar extends Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div id='nav-container'>
			<div className="navbar">
				<span id="logo">
					<Link to='/'><img src={Logo} /></Link>
				</span>
				<span id='spacer'></span>
				<span id="nav">
					<Link to='/'>Home</Link>&nbsp;
					<Link to='/profile'>Profile</Link>
					<Link to='/login'>Login</Link>
					<Link to='/signup'>Sign Up</Link>
				</span>
			</div>
			</div>
			)
	}
}

export default NavBar;