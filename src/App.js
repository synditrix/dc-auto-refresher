import React, { Component } from 'react';

import 'antd/dist/antd.css';
import { Input, Row, Col } from 'antd';

import Dragon from './Dragon';

const { Search } = Input;

class App extends Component {

	constructor(props) {
		super(props);
		this.setRefreshState = this.setRefreshState.bind(this);
		this.state = {
			code: sessionStorage.getItem('code') || '',
			isRefreshing: sessionStorage.getItem('isRefreshing') || false
		}
	};

	componentDidMount() {
		const truthy = this.state.isRefreshing == "true";
	 	if (truthy) {
 	 		setInterval(() => window.location.reload(), 500);
 		}
	}

	setRefreshState(option, code) {
	    sessionStorage.setItem('isRefreshing', option);
	    sessionStorage.setItem('code', code);
	    this.setState({isRefreshing: option });
	   	this.setState({code: code });
	}

	render() {
	  return (
	    <div className="App">
	    	{!this.state.isRefreshing && 
	    	<div>
	    	<h3>put your dragon here</h3>
	    	<Row>
	    	<Col xs>
			<Search
			  placeholder="Input dragon code"
			  enterButton="Submit"
			  size="large"
			  onSearch={
			  	value => {
			  		this.setRefreshState(true, value);
			  		window.location.reload();
			  	}
			  }
			/>
			</Col>
			</Row>
			</div>}
			{this.state.isRefreshing && <Dragon code={this.state.code} />}
	    </div>
	  );
	}
	}

export default App;
