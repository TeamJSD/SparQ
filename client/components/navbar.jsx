import React, {Component} from 'react';

class NavBar extends Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div className="navbar">
				<p>Home</p>
				<p>Profile</p>
				<p>Login</p>
			</div>
			)
	}
}

export default NavBar;