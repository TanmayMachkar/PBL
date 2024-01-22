import React, { useState, useEffect } from 'react';
import { sha256 } from 'hash-wasm';
import './Blockchain.css';
import crypto from 'crypto-js';

const Blockchain = () => {
  const [hashData, setHashData] = useState('');
  const [hashResult, setHashResult] = useState('');
  const [nonceResult, setNonceResult] = useState('');
  const [isMined, setIsMined] = useState(true);
  const [nextHashData, setNextHashData] = useState('');
  const [prevHashResult, prevSetHashResult] = useState('');
  const [nextHashResult, setNextHashResult] = useState('');
  const [nextNonceResult, setNextNonceResult] = useState('');

  const mineBlock = (data) => {
    let nonce = 0;
    const targetPrefix = '0000';

    while (true) {
      const hash = calculateHash(data, nonce);
      if (hash.startsWith(targetPrefix)) {
        return nonce;
      }
      nonce++;
    }
  };

  const handleHash = async () => {
    const inputData = hashData;
    const result = await sha256(inputData);
    setHashResult(result);
    prevSetHashResult(result);
  };

  const calculateHash = (data, nonce) => {
    const input = data + nonce;
    return crypto.SHA256(input).toString();
  };

  const mine = () => {
    const data = hashData;
    const nonce = mineBlock(data);
    setNonceResult(nonce);
    handleHash();
    setIsMined(true);
  };

  const calculatePrevHash = (data, nonce) => {
    const input = data + nonce + prevHashResult;
    return crypto.SHA256(input).toString();
  };

  const handlePrevHash = async () => {
    const inputData = nextHashData;
    const result = await sha256(inputData);
    setNextHashResult(result);
  };

  const mineNextBlock = (data) => {
    let nonce = 0;
    const targetPrefix = '0000';

    while (true) {
      const hash = calculatePrevHash(data, nonce);
      if (hash.startsWith(targetPrefix)) {
        return nonce;
      }
      nonce++;
    }
  };

  const mineNext = () => {
    const data = nextHashData;
    const nonce = mineNextBlock(data);
    setNextNonceResult(nonce);
    handlePrevHash();
    setIsMined(true);
  };

  useEffect(() => {
    handlePrevHash(); 
  }, [nextHashData]);

  useEffect(() => {
    handleHash(); 
  }, [hashData]);

  return (
  	<div className = 'tc'>
	    <div className={`pa3 ba ma3 ${isMined ? 'bg-light-green' : 'bg-light-red'}`}>
	      <div className="tc box">
	        <h5>DATA</h5>
	        <input
	          className="pa2 input-reset ba bg-white hover-bg-black hover-white w-50 h-100 mr3"
	          onChange={(event) => {
	            setHashData(event.target.value);
	            setIsMined(false);
	          }}
	        />
	        <button
	          className="button-1"
	          role="button"
	          onClick={mine}
	        >MINE
	        </button>
	        <h5>NONCE</h5>
	        <output className="center pa1 w-50 bg-white ba break">{nonceResult}</output>
	        <h5>PREVIOUS HASH</h5>
	        <output className="center pa1 w-50 bg-white ba break">0000000000000000000000000000000000000000000000000000000000000000</output>
	        <h5>Current SHA256 Hash</h5>
	        <output className="center pa1 w-50 bg-white ba break">{hashResult}</output>
	      </div>
	    </div>

	    <div className={`pa3 ba ma3 ${isMined ? 'bg-light-green' : 'bg-light-red'}`}>
	      <div className="tc box">
	        <h5>DATA</h5>
	        <input
	          className="pa2 input-reset ba bg-white hover-bg-black hover-white w-50 h-100 mr3"
	          onChange={(event) => {
	            setNextHashData(event.target.value);
	            setIsMined(false);
	          }}
	        />
	        <button
	          className="button-1"
	          role="button"
	          onClick={mineNext}
	        >MINE
	        </button>
	        <h5>NONCE</h5>
	        <output className="center pa1 w-50 bg-white ba break">{nextNonceResult}</output>
	        <h5>PREVIOUS HASH</h5>
	        <output className="center pa1 w-50 bg-white ba break">{prevHashResult}</output>
	        <h5>Current SHA256 Hash</h5>
	        <output className="center pa1 w-50 bg-white ba break">{nextHashResult}</output>
	      </div>
    	</div>
    </div>
  );
};

export default Blockchain;