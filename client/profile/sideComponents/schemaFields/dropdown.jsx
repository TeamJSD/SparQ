import React, {Component} from 'react';

class Dropdown extends Component {

	constructor() {
    super();
  }
  
	render() {

		return (
			<div>
        <select id = "dropdown" defaultValue={this.props.defaultValue}>
          <option value="STRING">String</option>
          <option value="UUID">ID</option>
          <option value="INTEGER">Number</option>
          <option value="FLOAT">Float</option>
          <option value="BOOLEAN">Boolean</option>
          <option value="DATE">Date</option>
        </select>
			</div>
			)
	}
}

export default Dropdown;
