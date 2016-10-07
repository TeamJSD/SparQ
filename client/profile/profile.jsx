import React, {Component} from 'react';
import SideBar from './sidebar.jsx';
import Viewer from './table-view.jsx';
import ReactD from 'react-dom';
import GraphiQL from './sideComponents/graphiQL.jsx';
import ReactDOM from 'react-dom';

class Profile extends Component {
	constructor() {
		super();
		this.state = {
			choice: '',
		}

		this.onClick = this.onClick.bind(this);
	}

	onClick(e) {
		this.setState({choice: e.target.innerHTML})
		console.log(this.state)
	}

	render() {
		return (
				<div id='profile'>
					<SideBar onClick={this.onClick}/>
					<Viewer view={this.state.choice} showComponent={this.state.showComponent} />
				</div>
			)
	}
}

export default Profile;