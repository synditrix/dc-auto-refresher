import React, { Component } from 'react';

import 'antd/dist/antd.css';

class Dragon extends Component {

	render() {
	  return (
	    <div className="Dragon">
	    <a href={"https://dragcave.net/view/" + this.props.code}><img src={"https://dragcave.net/image/" + this.props.code} alt="Adopt one today!"/></a>	    
	    </div>
	  );
	}
	}

export default Dragon;
