import React, {Component} from 'react';
import GraphiQL from './sideComponents/graphiQL.jsx';
import GraphSchema from './sideComponents/graphSchema.jsx';
import Table from './sideComponents/table.jsx';
import Database from './sideComponents/database.jsx';


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
		} else if (this.props.view === 'My Database') {
			component = <Database />
		}

		return (
			<div id='viewer'>
				{component}
			</div>
		)
	}
}

export default Viewer;