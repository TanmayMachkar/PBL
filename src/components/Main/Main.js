import React from 'react';
import './Main.css';

const Main = ({onRouteChange}) =>{
	return(
		<div>
			<h3 className = 'tc shadow-2 ml6 mt2 mr6 mb2'>BLOCKCHAIN DEMO</h3>
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