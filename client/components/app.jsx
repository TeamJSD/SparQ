import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import NavBar from './navbar.jsx';
import Home from './../home/home.jsx';
import Login from './../login/login.jsx';

class App extends Component {
	render() {
		return (
			<Router history={hashHistory}>
				<div className="container">
					<h1>SparQ!</h1>
					<NavBar />
				</div>
				<Route path='/' component={Home} />
				<Route path='/test' component={Login} />
			</Router>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('app')
)