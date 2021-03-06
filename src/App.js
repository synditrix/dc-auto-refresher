	import React, { Component } from 'react';

	import 'antd/dist/antd.css';
	import { Input, Row, Col, Select, Switch, Button, Layout, Typography } from 'antd';

	import Dragon from './Dragon';

	const { Option } = Select;
	const { Header, Footer, Content } = Layout;
	const { Text } = Typography;
	const { Paragraph } = Typography;
	const { TextArea } = Input;

	class App extends Component {

		constructor(props) {
			super(props);
			this.setRefreshState = this.setRefreshState.bind(this);
			this.clearRefreshState = this.clearRefreshState.bind(this);
			this.onClickSpeed = this.onClickSpeed.bind(this);
			this.handleChange = this.handleChange.bind(this);
			this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
			this.handleSingleCodeChange = this.handleSingleCodeChange.bind(this);
			this.switchMulti = this.switchMulti.bind(this);
			this.changeFavicon = this.changeFavicon.bind(this);

			var isRefreshing = sessionStorage.getItem('isRefreshing') == "true";
			var multi = sessionStorage.getItem('multi') == "true";
			var codes = JSON.parse(sessionStorage.getItem('codes'));
			console.log(codes);
			this.state = {
				code: sessionStorage.getItem('code') || '',
				isRefreshing: isRefreshing || false,
				speed: parseInt(sessionStorage.getItem('speed')) || 500, 
				codes: JSON.parse(sessionStorage.getItem('codes')) || '',
				multi: multi || false,
				favicon: sessionStorage.getItem('favicon') || '',
			}
			console.log(this.state.codes);
			console.log(this.state.codes.toString());
			if (!this.state.isRefreshing) {
				var currentUrl = window.location.href;
			  	var currentCode = currentUrl.split("codes/")[1]; 
			  	console.log(currentCode);
			  	if (currentCode) {
				  	if(currentCode.length > 5) {
				  		this.state.multi = true;
				  		this.state.codes = currentCode;
				  	}
				  	else {
				  		this.state.code = currentCode;
				  	}
			  }
			  if (currentUrl.includes("refresh")) {
					
			  }
			}
		};

		componentDidMount() {
			const truthy = this.state.isRefreshing == "true";
			if (this.state.isRefreshing) {
		 	// if (truthy) {
	 	 		setInterval(() => window.location.reload(), this.state.speed);
	 	 		this.changeFavicon(this.state.favicon);
	 		}
	 		// const falsey = this.state.isRefreshing == "false";
	 		// if (falsey) {
	 		// 	this.setState({isRefreshing: false});

	 		// }
	 		//back button stops refresh WIP
	 		window.addEventListener('popstate', (event) => {
	 			alert("Test");
	 			this.clearRefreshState();
	 			window.location.reload();
	 		});
	 		console.log("ok");
		}

		setRefreshState(option, code, speed, codes, multi, favicon, url) {
		    sessionStorage.setItem('isRefreshing', option);
		    sessionStorage.setItem('code', code);
		    sessionStorage.setItem('speed', speed);
		    sessionStorage.setItem('codes', JSON.stringify(codes));
		    sessionStorage.setItem('multi', multi);
		    sessionStorage.setItem('favicon', favicon);
		    this.setState({isRefreshing: option });
		   	this.setState({code: code });
		   	this.setState({speed: speed});
		   	this.setState({codes: codes });
		   	this.setState({multi: multi });
		   	this.setState({favicon: favicon});
		   	window.history.pushState(null, 'refresh', url);
		};

		clearRefreshState() {
			this.setRefreshState(false, '', 500, '', false, '');
		};

		onClickSpeed = (key) => {
	  		this.setState({speed: key});
		};

		handleChange(value) {
			const stringvalue = value.toString();
			this.setState({codes: stringvalue});
		};

		handleTextAreaChange(e) {
			this.setState({codes: e.target.value});
		};

		handleSingleCodeChange(e) {
			this.setState({code: e.target.value})
		}

		switchMulti(checked) {
	  		if (this.state.multi == false) {
	  			this.setState({code: ''});
	  		}
	  		else {
	  			this.setState({codes: ''});
	  		}
	  		this.setState({multi: checked});
		}

		changeFavicon(src) {
			var link = document.createElement('link'),
			    oldLink = document.getElementById('default-icon');
			link.id = 'dynamic-favicon';
			link.rel = 'icon';
			link.href = src;
			if (oldLink) {
				document.head.removeChild(oldLink);
			}
			document.head.appendChild(link);
		}

		render() {
		  const numDragons = this.state.multi ? "dragons" : "dragon";
		  var codeString = this.state.code == "" ? this.state.codes : this.state.code;
		  codeString = String(codeString).replace(/\s/g,'');
		  if (this.state.code !== "" || typeof this.state.codes == 'string') {
		  	codeString = 'codes/' + codeString;
		  }

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
		    		<Switch defaultChecked={this.state.multi} onChange={this.switchMulti} />
		    	</Row>
		    	<Row style={{marginTop: '1rem'}}>
		    		<Col xs>
		    		<h3>{"put your " + numDragons + " here"}</h3>
		    		</Col>
		    	</Row>
		    	{!this.state.multi && <Row>
			    	<Col xs>
						<Input
						  placeholder="input dragon code"
						  size="large"
						  defaultValue={this.state.code}
						  maxLength={5}
						  onChange={
				    		value => {
		    					this.handleSingleCodeChange(value)
		    				}
						  }
						/>
					</Col>
				</Row>}
				{this.state.multi && <Row> 
		    	 <Select size="large" mode="tags" style={{ width: '30%' }} placeholder="input multiple codes" onChange={this.handleChange}>
				 </Select>
		    	</Row>}
		    	{this.state.multi && <Row style={{marginTop: '1rem'}}>
		    		<Col xs>
		    		<h3>{"or here, separated by commas"}</h3>
		    		</Col>
		    	</Row>}
		    	{this.state.multi && <Row>
		    		<TextArea 
		    			rows={4} 
		    			style={{fontSize:16}} 
		    			defaultValue={this.state.codes}
		    			placeholder="by the way, you can input repeats of the same code here if you so wish"
		    			onChange={
		    				value => {
		    					this.handleTextAreaChange(value)
		    				}
		    			}
		    		/>
		    	</Row>}
				<Row style={{marginTop: '1rem'}}> 
		    		<h3>select refresh speed</h3>
		    	</Row>
		    	<Row> 
		    		<Col sm>
						<Select size="large" style={{ width: 120 }} defaultValue={this.state.speed + "ms"} onChange={this.onClickSpeed}>
							<Option key="10">10ms</Option>
						    <Option key="20">20ms</Option>
						    <Option key="30">30ms</Option>
						    <Option key="50">50ms</Option>
						    <Option key="100">100ms</Option>
						    <Option key="250">250ms</Option>
						    <Option key="500">500ms</Option>
						    <Option key="1000">1000ms</Option>
						   	<Option key="2000">2000ms</Option>
						   	<Option key="3000">3000ms</Option>
						</Select>
					</Col>
		    	</Row>
		    	<Row style={{marginTop: '1rem'}}> 
		    		<Button 
				 	type="primary" 
				 	size="large" 
				 	onClick={
				 		() => {
				 			const isMulti = this.state.multi ? true : false;
				 			const firstCode = isMulti ? this.state.codes.split(',')[0] : this.state.code;
				 			const faviconUrl = "http://dragcave.net/image/" + firstCode + ".gif";
				 			var url = window.location.href.split("codes/")[0] + codeString;
				 			this.setRefreshState(true, this.state.code, this.state.speed, this.state.codes, isMulti, faviconUrl, url);
				 			window.location.reload();
						}
				}>submit</Button>
		    	</Row>
		    	<Row style={{marginTop: '2rem'}}>
		    	<Text>tap the blue icon beside the url to share the link below</Text>
		    	</Row>
		    	<Row>
		    	<Paragraph copyable style={{fontSize: 'large', color:'dodgerblue', marginBottom: '10rem'}}>
		    		{'http://dc-auto-refresher.herokuapp.com/' + String(codeString).replace(/\s/g,'')}
		    	</Paragraph>
		    	</Row>
		    	</Content>
		    	<Footer>
					<Text style={{fontSize: 'xx-small'}}>created by synditrix 2020</Text>
				</Footer>
		    	</Layout>
				</div>}
				{this.state.isRefreshing && <Dragon code={this.state.code} codes={this.state.codes} multi={this.state.multi}/>}
		    </div>
		  );
		}
		}

	export default App;
