import React, {Component} from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import Logo from './Logo.png';

class NavBar extends Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div className="navbar">
				<span id="logo">
					<img src={Logo} />
				</span>
				<span id="nav">
					<Link to='/'>Home</Link>&nbsp;
					<Link to='/login'>Login</Link>
					<p>Profile</p>
				</span>
			</div>
			)
	}
}

export default NavBar;