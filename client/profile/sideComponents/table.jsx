import React, {Component} from 'react';

class Table extends Component {
	constructor() {
		super()
		this.state = {
			schemas: [{
					person: {
					firstName: 'Derrick',
					email: 'derrick@derrick.derrick',
				}
			}],
		}
	}

	componentWillMount() {

	}

	render() {
		let schemas = this.state.schemas.map((item) => {
			for(let key in item) {
				for(let prop in item[key]) {
					return item[key][prop]
				}
			}
		})

		return (
				<div>
					<h1>My Tables</h1>
					{schemas}
				</div>
		)
	}
}

export default Table;