import React, {Component} from 'react';
import { Link } from 'react-router';

class Signout extends Component {
	constructor() {
		super()
    this.clearCookie = this.clearCookie.bind(this)
	}

  clearCookie() {
    document.cookie = 'devId=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

	render() {

		return (
			<div>
			 <h2>Sign Out?</h2>
       <Link to='/'><button onClick={this.clearCookie}>Yes</button></Link>
      </div>
		)
	}
}

export default Signout;