import React from 'react';
import Blockchain from '../Blockchain/Blockchain';
import './Distributed.css';

const Distributed = () => {
	return(
		<div>
			<h2 className = 'ml2'>PEER 1</h2>
			<Blockchain/>
			<h2 className = 'ml2'>PEER 2</h2>
			<Blockchain/>
			<h2 className = 'ml2'>PEER 3</h2>
			<Blockchain/>
		</div>
	);
}

export default Distributed;