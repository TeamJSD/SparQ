import React, {Component} from 'react';

class Dropdown extends Component {

	constructor() {
      super();
      this.state = {
      	value: 'String'
      }
    }

  handleChange(e){
    this.setState({value:e.target.value});
  }
  
	render() {

		return (
			<div>
					<select id = "dropdown">
                <option value="string">String</option>
                <option value="id">ID</option>
                <option value="number">Number</option>
                <option value="float">Float</option>
                <option value="boolean">Boolean</option>
                <option value="datetime">DateTime</option>
                <option value="email">Email</option>
                <option value="location">Location</option>
                <option value="file">File</option>
            </select>
			</div>
			)
	}
}

export default Dropdown;
