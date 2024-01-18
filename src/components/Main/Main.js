import React from 'react';
import { Tilt } from 'react-tilt';
import './Main.css';

const Main = ({onRouteChange}) =>{
	return(
		<div>
				
				<Tilt className = 'br2 shadow-2 mb3 ml3' style={{ height: 20, width: 177 }}>
					<p className = 'ma3'>BLOCKCHAIN DEMO</p>
				</Tilt>
				<div class="topnav">
					<a href="#news"><h5>COINBASE</h5></a>
					<a href="#news"><h5>TOKENS</h5></a>
					<a href="#news"><h5>DISTRIBUTED</h5></a>
					<a href="#news"><h5>BLOCKCHAIN</h5></a>
					<a href="#news" onClick = {() => onRouteChange('block')}><h5>BLOCK</h5></a>
					<a href="#news" onClick = {() => onRouteChange('hash')}><h5>HASH</h5></a>					
				</div>
		</div>	
	);
}

export default Main;