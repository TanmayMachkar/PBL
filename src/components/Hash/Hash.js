import React, { useState } from 'react';
import { sha256 } from 'hash-wasm';
import './Hash.css';

const Hash = ({ onInputChange, onButtonSubmit }) => {
  const [hashData, setHashData] = useState('');
  const [hashResult, setHashResult] = useState('');

  const handleHash = async () => {
    const inputData = hashData;
    const result = await sha256(inputData);
    setHashResult(result);
  };

  return (
    <div className="mt3 ml3 mr3 tc ba pa3 bg-light-green">
      <h5>DATA</h5>
      <input
        className="pa2 input-reset ba bg-white hover-bg-black hover-white w-50 h-100 mr3"
        onChange={(event) => setHashData(event.target.value)}
      />
      <button 
      	className="button-1" 
      	role="button" 
      	onClick={handleHash}
      >Enter Data</button>
      <h5>SHA256</h5>
      <output className="center pa1 w-50 bg-white ba break">{hashResult}</output>
    </div>
  );
};

export default Hash;
