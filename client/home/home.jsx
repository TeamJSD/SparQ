import React, {Component} from 'react';
import Info from './info.jsx';
import Panel from './../components/panel.jsx';
import Footer from './../components/footer.jsx';

class Home extends Component {
	render() {
		return (
			<div>
				<div id='home-container'>
					<span id='info'>
						<Info />
					</span>
					<span id='panel'>
						<Panel />
					</span>
				</div>
					<Footer />
			</div>
			)
	}
}

export default Home;