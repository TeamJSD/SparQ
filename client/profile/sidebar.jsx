import React, {Component} from 'react';

class SideBar extends Component {
	constructor(){
		super()
	}

	render() {
		return (
				<div id='sidebar'>
					<h3 onClick={this.props.onClick}>My Database</h3>
					<h3 onClick={this.props.onClick}>My Schemas</h3>
					<h3 onClick={this.props.onClick}>Create Schema</h3>
					<h3 onClick={this.props.onClick}>GraphiQL</h3>
				</div>
		)
	}
}

export default SideBar;


					