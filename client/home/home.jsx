import React, {Component} from 'react';
import Info from './Info.jsx';
import HomeLogin from './homelogin.jsx';
import Footer from './../components/footer.jsx';

class Home extends Component {
	render() {
		return (
			<div>
				<div id='home-container'>
					<div id='home-welcome'>
						<h1>SparQ</h1>
					</div>
					<div id='info'>
						<Info />
					</div>
					<div id='panel'>
						<HomeLogin />
					</div>
				</div>
					<Footer />
			</div>
			)
	}
}

export default Home;