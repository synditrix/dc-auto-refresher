import React, { Component } from 'react';

import 'antd/dist/antd.css';
import { DownOutlined } from '@ant-design/icons';
import { Input, Row, Col, Menu, Select, Switch, Button, Layout, Typography } from 'antd';

import Dragon from './Dragon';

const { Search } = Input;
const { Option } = Select;
const { Header, Footer, Sider, Content } = Layout;
const { Text } = Typography;

class App extends Component {

	constructor(props) {
		super(props);
		this.setRefreshState = this.setRefreshState.bind(this);
		this.onClickSpeed = this.onClickSpeed.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.switchMulti = this.switchMulti.bind(this);
		this.state = {
			code: sessionStorage.getItem('code') || '',
			isRefreshing: sessionStorage.getItem('isRefreshing') || false,
			speed: sessionStorage.getItem('speed') || 250, 
			codes: JSON.parse(sessionStorage.getItem('codes')) || [],
			multi: sessionStorage.getItem('multi') || false
		}
	};

	componentDidMount() {
		const truthy = this.state.isRefreshing == "true";
	 	if (truthy) {
 	 		setInterval(() => window.location.reload(), this.state.speed);
 		}
	}

	setRefreshState(option, code, speed, codes, multi) {
	    sessionStorage.setItem('isRefreshing', option);
	    sessionStorage.setItem('code', code);
	    sessionStorage.setItem('speed', speed);
	    sessionStorage.setItem('codes', JSON.stringify(codes));
	    sessionStorage.setItem('multi', multi);
	    this.setState({isRefreshing: option });
	   	this.setState({code: code });
	   	this.setState({speed: speed});
	   	this.setState({codes: codes });
	   	this.setState({multi: multi });
	};

	onClickSpeed = (key) => {
  		this.setState({speed: key});
	};

	handleChange(value) {
		const stringvalue = value.toString();
		this.setState({codes: stringvalue});
	};

	switchMulti(checked) {
  		this.setState({multi: checked});
	}

	render() {
	  const numDragons = this.state.multi ? "dragons" : "dragon";
	  return (
	    <div className="App">
	    	{!this.state.isRefreshing && 
	    	<div>
	    	<Layout>
	    	<Header>
	    	<Text style={{fontSize: 'x-large', color:'white'}}>
	    	dragcave.net auto refresher
	    	</Text>
	    	</Header>
	    	<Content style={{ margin: '0 50px' }}>
	    	<Row style={{marginTop: '1rem'}}>
	    		<h3>toggle multi-entry mode</h3>
	    	</Row>
	    	<Row>
	    		<Switch onChange={this.switchMulti} />
	    	</Row>
	    	<Row style={{marginTop: '1rem'}}>
	    		<Col xs>
	    		<h3>{"put your " + numDragons + " here"}</h3>
	    		</Col>
	    	</Row>
	    	{!this.state.multi && <Row>
		    	<Col xs>
					<Search
					  placeholder="input dragon code"
					  enterButton="submit"
					  size="large"
					  onSearch={
					  	value => {
					  		this.setRefreshState(true, value, this.state.speed, this.state.codes, false);
					  		window.location.reload();
					  	}
					  }
					/>
				</Col>
			</Row>}
			{this.state.multi && <Row> 
	    	 <Select size="large" mode="tags" style={{ width: '30%' }} placeholder="input multiple codes" onChange={this.handleChange}>
			 </Select>
			 <Button 
			 	type="primary" 
			 	size="large" 
			 	onClick={
			 		() => {
			 			this.setRefreshState(true, "", this.state.speed, this.state.codes, true);
			 			window.location.reload();
			 		}
			 	}>submit</Button>
	    	</Row>}
			<Row style={{marginTop: '1rem'}}> 
	    		<h3>select refresh speed</h3>
	    	</Row>
	    	<Row style={{marginBottom: '10rem'}}> 
	    		<Col sm>
					<Select size="large" defaultValue={this.state.speed + "ms"} onChange={this.onClickSpeed}>
						<Option key="10">10ms</Option>
					    <Option key="20">20ms</Option>
					    <Option key="30">30ms</Option>
					    <Option key="50">50ms</Option>
					    <Option key="100">100ms</Option>
					    <Option key="250">250ms</Option>
					    <Option key="500">500ms</Option>
					    <Option key="1000">1000ms</Option>
					</Select>
				</Col>
	    	</Row>
	    	</Content>
	    	<Footer>
				<Text style={{fontSize: 'xx-small'}}>created by synditrix 2020</Text>
			</Footer>
	    	</Layout>
			</div>}
			{this.state.isRefreshing && <Dragon code={this.state.code} codes={this.state.codes.toString()} multi={this.state.multi}/>}
	    </div>
	  );
	}
	}

export default App;
