import React from 'react';
import './Main.css';

const Main = ({onRouteChange}) =>{
	return(
		<div>
			<h3 className="tc shadow-2 pa3 ma2 bg-light-blue br3">BLOCKCHAIN DEMO</h3>
			<div class="topnav">
				<a href="#news" onClick = {() => onRouteChange('tokens')}><h5>TOKENS</h5></a>
				<a href="#news" onClick = {() => onRouteChange('distributed')}><h5>DISTRIBUTED</h5></a>
				<a href="#news" onClick = {() => onRouteChange('blockchain')}><h5>BLOCKCHAIN</h5></a>
				<a href="#news" onClick = {() => onRouteChange('block')}><h5>BLOCK</h5></a>
				<a href="#news" onClick = {() => onRouteChange('hash')}><h5>HASH</h5></a>					
			</div>
		</div>	
	);
}

export default Main;