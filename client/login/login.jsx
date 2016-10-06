import React, {Component} from 'react';
import Panel from './../components/panel.jsx';

class Login extends Component {

	render() {
		const style = {border: '1px solid black'};

		return (
			<div id='login-view'>
				<h1>Log in with your GitHub.</h1>
				<div id='login-panel'>
					<Panel style={style}/>
				</div>
			</div>
			)
	}
}

export default Login;