import React, {Component} from 'react';
import GraphiQL from './sideComponents/graphiQL.jsx';
import Table from './sideComponents/table.jsx';
//import GraphiQL from 'graphiQL'


class Viewer extends Component {
	constructor() {
		super()
	}


	render() {
		let component;
		if(this.props.view === 'GraphiQL') {
			component = <GraphiQL />
		} else {
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