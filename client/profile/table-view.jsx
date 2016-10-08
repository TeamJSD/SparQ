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
		let component;
		if(this.props.view === 'GraphiQL') {
			component = <GraphiQL />
		} else if (this.props.view === 'GraphSchema') {
			component = <GraphSchema />
		} else if(this.props.view === 'My Tables') {
			component = <Table />
		}

		return (
			<div id='viewer'>
				{component}
			</div>
		)
	}
}

export default Viewer;