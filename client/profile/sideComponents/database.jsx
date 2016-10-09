import React, {Component} from 'react';
import DatabaseForm from './forms/databaseForm.jsx';

class Database extends Component {
	constructor() {
		super()
		this.state = {
			content: []
		}
		this.onClick = this.onClick.bind(this)
		this.saveDB = this.saveDB.bind(this)
	}

	onClick(e) {
		const forms = this.state.content.concat(DatabaseForm)
		this.setState({ content: forms })
		console.log(this.state)
	}

	saveDB(e, indx) {
		let obj = this.state;
		obj.content[indx] = <h2>Database saved!</h2>;
		this.setState(obj);
	}

	render() {
		const forms = this.state.content.map((Element, index) => {
			return <Element key={ index } index={ index } saveDB={this.saveDB}/>
		})


		return (
				<div id='database-view'>
						<h2>Create a Database?</h2>
						{ forms }
						<button onClick={this.onClick}>Create DB</button>
				</div>
		)
	}
}

export default Database;