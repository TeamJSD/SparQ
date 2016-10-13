import React, {Component} from 'react';
import Info from './info.jsx';
import LoginPanel from './../login/loginPanel.jsx';
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
						<LoginPanel />
					</span>
				</div>
					<Footer />
			</div>
			)
	}
}

export default Home;