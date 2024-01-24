import React, { useState, useEffect } from 'react';
import { sha256 } from 'hash-wasm';
import './Blockchain.css';
import crypto from 'crypto-js';

const Blockchain = () => {
  const [hashData, setHashData] = useState('');
  const [hashResult, setHashResult] = useState('');
  const [nonceResult, setNonceResult] = useState('');
  const [isMined, setIsMined] = useState(true);
  const [nonceOg, setNonceOg] = useState(0);

  const [nextHashData, setNextHashData] = useState('');
  const [prevHashResult, prevSetHashResult] = useState('');
  const [nextHashResult, setNextHashResult] = useState('');
  const [nextNonceResult, setNextNonceResult] = useState('');
  const [isNextMined, setIsNextMined] = useState(true);
  const [nonceOg2, setNonceOg2] = useState(0);

  const [thirdHashData, setThirdHashData] = useState('');
  const [prevSecondHashResult, prevSecondSetHashResult] = useState('');
  const [thirdHashResult, setThirdHashResult] = useState('');
  const [thirdNonceResult, setThirdNonceResult] = useState('');
  const [isThirdMined, setIsThirdMined] = useState(true);
  const [nonceOg3, setNonceOg3] = useState(0);

  const mineBlock = (data) => {
    let nonce = 0;
    const targetPrefix = '0000';

    while (true) {
      const hash = calculateHash(data, nonce);
      if (hash.startsWith(targetPrefix)) {
        setHashResult(hash);
        prevSetHashResult(hash);
        return nonce;
      }
      nonce++;
    }
  };

  const calculateHash = (data, nonce) => {
    const input = data + nonce + nonceOg;
    const result = crypto.SHA256(input).toString();
    setHashResult(result);
    return crypto.SHA256(input).toString();
  };

  const mine = () => {
    const data = hashData;
    const nonce = mineBlock(data);
    setNonceResult(nonce);
    setIsMined(true);
  };

  const calculatePrevHash = (data, nonce) => {
    const input = data + nonce + nonceOg2;
    return crypto.SHA256(input).toString();
  };

  const mineNextBlock = (data) => {
    let nonce = 0;
    const targetPrefix = '0000';

    while (true) {
      const hash = calculatePrevHash(data, nonce);
      if (hash.startsWith(targetPrefix)) {
        setNextHashResult(hash);
        prevSecondSetHashResult(hash);
        return nonce;
      }
      nonce++;
    }
  };

  const mineNext = () => {
    const data = nextHashData;
    const nonce = mineNextBlock(data);
    setNextNonceResult(nonce);
    setIsNextMined(true);
  };

  const calculateThirdHash = (data, nonce) => {
    const input = data + nonce + nonceOg3;
    return crypto.SHA256(input).toString();
  };

  const mineThirdBlock = (data) => {
    let nonce = 0;
    const targetPrefix = '0000';

    while (true) {
      const hash = calculateThirdHash(data, nonce);
      if (hash.startsWith(targetPrefix)) {
        setThirdHashResult(hash);
        return nonce;
      }
      nonce++;
    }
  };

  const mineThird = () => {
    const data = thirdHashData;
    const nonce = mineThirdBlock(data);
    setThirdNonceResult(nonce);
    setIsThirdMined(true);
  };

  useEffect(() => {
    const updatePrevSecondHash = async () => {
      const inputData = thirdHashData + nextHashData + hashData + prevHashResult + prevSecondHashResult + nonceOg + nonceOg2 + nonceOg3;
      const result = await sha256(inputData);
      setThirdHashResult(result);
    };
    updatePrevSecondHash();
  }, [hashData, nonceOg, nextHashData, nonceOg2, thirdHashData, nonceOg3]);

  useEffect(() => {
    const updatePrevHash = async () => {
      const inputData = nextHashData + hashData + prevHashResult + nonceOg + nonceOg2;
      const result = await sha256(inputData);
      setNextHashResult(result);
      prevSecondSetHashResult(result);
    };
    updatePrevHash();
  }, [hashData, nonceOg, nextHashData, nonceOg2]);

  useEffect(() => {
    const updateHash = async () => {
      const inputData = hashData + nonceOg;
      const result = await sha256(inputData);
      setHashResult(result);
      prevSetHashResult(result);
    };
    updateHash();
  }, [hashData, nonceOg]);

  return (
  	<div className = 'tc scrollmenu'>
  		<p>
	    <div className={`pa3 ba ma3 ${isMined ? 'bg-light-green' : 'bg-light-red'}`}>
	      <div className="tc box">
	        <h5>DATA</h5>
	        <input
	          className="pa2 input-reset ba bg-white hover-bg-black hover-white w-50 h-100 mr3"
	          onChange={(event) => {
	            setHashData(event.target.value);
	            setIsMined(false);
	            setIsNextMined(false);
	            setIsThirdMined(false);
	          }}
	        />
          <h5>NONCE</h5>
          <input
            className="pa2 input-reset ba bg-white hover-bg-black hover-white w-50 h-100 mr3"
            onChange={(event) => {
              setNonceOg(event.target.value);
              setIsMined(false);
              setIsNextMined(false);
              setIsThirdMined(false);
            }}
          />
	        <h5>RESULTANT NONCE</h5>
	        <output className="center pa1 w-50 bg-white ba break">{nonceResult}</output>
	        <h5>PREVIOUS HASH</h5>
	        <output className="center pa1 w-50 bg-white ba break">0000000000000000000000000000000000000000000000000000000000000000</output>
	        <h5>Current SHA256 Hash</h5>
	        <output className="center pa1 w-50 bg-white ba break">{hashResult}</output>
	        <button
            className="button-1 mt2"
            role="button"
            onClick={mine}
          >MINE
          </button>
        </div>
	    </div>
	    </p>

	    <p>
	    <div className={`pa3 ba ma3 ${isNextMined ? 'bg-light-green' : 'bg-light-red'}`}>
	      <div className="tc box">
	        <h5>DATA</h5>
	        <input
	          className="pa2 input-reset ba bg-white hover-bg-black hover-white w-50 h-100 mr3"
	          onChange={(event) => {
	            setNextHashData(event.target.value);
	            setIsNextMined(false);
	            setIsThirdMined(false);
	          }}
	        />
          <h5>NONCE</h5>
          <input
            className="pa2 input-reset ba bg-white hover-bg-black hover-white w-50 h-100 mr3"
            onChange={(event) => {
              setNonceOg2(event.target.value);
              setIsNextMined(false);
              setIsThirdMined(false);
            }}
          />
	        <h5>RESULTANT NONCE</h5>
	        <output className="center pa1 w-50 bg-white ba break">{nextNonceResult}</output>
	        <h5>PREVIOUS HASH</h5>
	        <output className="center pa1 w-50 bg-white ba break">{prevHashResult}</output>
	        <h5>Current SHA256 Hash</h5>
	        <output className="center pa1 w-50 bg-white ba break">{nextHashResult}</output>
	        <button
            className="button-1 mt2"
            role="button"
            onClick={mineNext}
          >MINE
          </button>
        </div>
    	</div>
    	</p>

    	<p>
	    <div className={`pa3 ba ma3 ${isThirdMined ? 'bg-light-green' : 'bg-light-red'}`}>
	      <div className="tc box">
	        <h5>DATA</h5>
	        <input
	          className="pa2 input-reset ba bg-white hover-bg-black hover-white w-50 h-100 mr3"
	          onChange={(event) => {
	            setThirdHashData(event.target.value);
	            setIsThirdMined(false);
	          }}
	        />
          <h5>NONCE</h5>
          <input
            className="pa2 input-reset ba bg-white hover-bg-black hover-white w-50 h-100 mr3"
            onChange={(event) => {
              setNonceOg3(event.target.value);
              setIsThirdMined(false);
            }}
          />
	        <h5>RESULTANT NONCE</h5>
	        <output className="center pa1 w-50 bg-white ba break">{thirdNonceResult}</output>
	        <h5>PREVIOUS HASH</h5>
	        <output className="center pa1 w-50 bg-white ba break">{prevSecondHashResult}</output>
	        <h5>Current SHA256 Hash</h5>
	        <output className="center pa1 w-50 bg-white ba break">{thirdHashResult}</output>
	        <button
            className="button-1 mt2"
            role="button"
            onClick={mineThird}
          >MINE
          </button>
        </div>
    	</div>
    	</p>
    </div>
  );
};

export default Blockchain;