import React, {Component} from 'react';
import NavBar from './navbar.jsx';

class Container extends Component {
	render() {
		return (
			<div id='container'>
				<div className='content'>
					<NavBar />
					{this.props.children}
				</div>
			</div>
		)
	}
}

export default Container;