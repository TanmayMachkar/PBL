import React from 'react';
import { Tilt } from 'react-tilt';
import './Hash.css';

const Hash = () =>{
	return(
		<div className = 'tc f4 mt5'>
				<Tilt style={{ height: 50, width: 150}} className = 'br2 shadow-2'>
					<p className = 'ma3'>BLOCKCHAIN DEMO</p>
				</Tilt>
				<h5 className = 'tc ma2 mt4 pointer'>HASH</h5>
				<h5 className = 'tc ma2 mt4 pointer'>BLOCK</h5>
				<h5 className = 'tc ma2 mt4 pointer'>BLOCKCHAIN</h5>
				<h5 className = 'tc ma2 mt4 pointer'>DISTRIBUTED</h5>
				<h5 className = 'tc ma2 mt4 pointer'>TOKENS</h5>
				<h5 className = 'tc ma2 mt4 pointer'>COINBASE</h5>
		</div>	
	);
}

export default Hash;