import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import GraphiQL from './sideComponents/graphiQL.jsx';
import GraphSchema from './sideComponents/graphSchema.jsx';
import Table from './sideComponents/table.jsx';


class Viewer extends Component {
	constructor() {
		super()
	}

	render() {

		return (
			<div id='viewer'>
				<GraphiQL />
				<GraphSchema />
				<Table />
			</div>
		)
	}
}

export default Viewer;