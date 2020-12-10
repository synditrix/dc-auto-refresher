import React, { Component } from 'react';

import 'antd/dist/antd.css';

class Dragon extends Component {

	render() {
    // console.log(this.props.codes);
    // const stringCast = String(this.props.codes).replace(/\s/g,'');
		// const codeArray = String(stringCast).split(',');
    console.log(this.props.code);
    // console.log(isMulti)
    console.log(this.props.codes);
    const codeArray = this.props.codes.split(',');
		const isMulti = this.props.multi;
    console.log(codeArray);
	 	const codesList = codeArray != [] && codeArray.map(i => {
		  	return (
		  		<div className="Dragons">
			    <a href={"https://dragcave.net/view/" + i}><img src={"https://dragcave.net/image/" + i} alt="Adopt one today!"/></a>	    
			    </div>
		  	)
	    });

	  return (
	    <div className="Dragon">
	    {!isMulti && <a href={"https://dragcave.net/view/" + this.props.code}><img src={"https://dragcave.net/image/" + this.props.code} alt="Adopt one today!"/></a>}   
	  	{isMulti && codesList}
	    </div>
	  );
	}
	}

export default Dragon;
