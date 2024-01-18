import React from 'react';
import './Hash.css';

const Hash = ({onInputChange, onButtonSubmit}) => {
	return(
		<div className = 'tc box'>
			<h5>DATA</h5>
			<input className = 'pa2 input-reset ba bg-white hover-bg-black hover-white w-50' onChange = {onInputChange}/>
			<button className="ml3 button-1" role="button" onClick = {onButtonSubmit}>Enter Data</button>
		</div>
	);
}

export default Hash;