import React, {Component} from 'react';
import LoginButton from './loginbutton.jsx';
import pic from './githublogo.png';

class Panel extends Component {

	render() {
		return (
			<div>
				<h1>Welcome to SparQ</h1>
				<img src={pic} id='githubimg'/>
				<LoginButton />
			</div>
			)
	}
}

export default Panel;