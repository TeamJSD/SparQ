import React, {Component} from 'react';
import NavBar from './navbar.jsx';

class Container extends Component {
	render() {
		return (
			<div id='container'>
					<NavBar />
					{this.props.children}
			</div>
		)
	}
}

export default Container;