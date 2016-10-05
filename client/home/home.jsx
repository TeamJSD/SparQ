import React, {Component} from 'react';
import Info from './../home/info.jsx';
import Panel from './../home/rightPanel.jsx'

class Home extends Component {
	render() {
		return (
			<div>
				<h3>We are at home.</h3>
				<div id='home-container'>
					<span id='info'>
						<Info />
					</span>
					<span id='panel'>
						<Panel />
					</span>
				</div>
			</div>
			)
	}
}

export default Home;