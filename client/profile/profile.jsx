import React, {Component} from 'react';
import SideBar from './sidebar.jsx';
import Viewer from './table-view.jsx';

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
	}

	render() {
		
		return (
				<div id='profile'>
					<SideBar onClick={this.onClick}/>
					<Viewer view={this.state.choice} />
				</div>
			)
	}
}

export default Profile;