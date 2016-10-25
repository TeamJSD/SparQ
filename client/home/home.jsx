import React, {Component} from 'react';
import Info from './Info.jsx';
import HomeLogin from './homelogin.jsx';
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
						<HomeLogin />
					</span>
				</div>
					<Footer />
			</div>
			)
	}
}

export default Home;