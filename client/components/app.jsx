import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import Home from './../home/home.jsx';
import Login from './../login/login.jsx';
import Profile from './../profile/profile.jsx';
import NotFound from './../404/404.jsx';
import Container from './container.jsx';
import Signup from './../signup/signup.jsx';

class App extends Component {
	render() {
		return (
			<Router history={hashHistory}>
				<Route path='/' component={Container}>
						<IndexRoute component={Home} />
						<Route path='/signup' component={Signup} />
						<Route path='/login' component={Login} />
						<Route path='/profile' component={Profile} />	
						<Route path='*' component={NotFound} />
				</Route>
			</Router>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('app')
)