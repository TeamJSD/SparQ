import React, {Component} from 'react';
import GraphiQL from './sideComponents/graphiQL.jsx';
import GraphSchema from './sideComponents/graphSchema.jsx';
import Table from './sideComponents/table.jsx';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';


class SideBar extends Component {
	constructor(){
		super()
	}

	render() {
		return (
				<div id='sidebar'>
					<h3 onClick={this.props.onClick}>GraphiQL</h3>
					<h3 onClick={this.props.onClick}>GraphSchema</h3>
					<h3 onClick={this.props.onClick}>Table</h3>
				</div>
		)
	}
}

export default SideBar;


					