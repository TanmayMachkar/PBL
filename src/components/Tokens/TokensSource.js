import React, { useState, useEffect } from 'react';
import { sha256 } from 'hash-wasm';
import '../Blockchain/Blockchain.css';
import './Tokens.css';
import crypto from 'crypto-js';

const TokensSource = () => {
  const [hashData, setHashData] = useState('');
  const [hashResult, setHashResult] = useState('');
  const [nonceResult, setNonceResult] = useState('');
  const [isMined, setIsMined] = useState(true);
  const [nonceOg, setNonceOg] = useState(0);
  const [Tx1, setTx1] = useState('');

  const [nextHashData, setNextHashData] = useState('');
  const [prevHashResult, prevSetHashResult] = useState('');
  const [nextHashResult, setNextHashResult] = useState('');
  const [nextNonceResult, setNextNonceResult] = useState('');
  const [isNextMined, setIsNextMined] = useState(true);
  const [nonceOg2, setNonceOg2] = useState(0);
  const [Tx2, setTx2] = useState('');

  const [thirdHashData, setThirdHashData] = useState('');
  const [prevSecondHashResult, prevSecondSetHashResult] = useState('');
  const [thirdHashResult, setThirdHashResult] = useState('');
  const [thirdNonceResult, setThirdNonceResult] = useState('');
  const [isThirdMined, setIsThirdMined] = useState(true);
  const [nonceOg3, setNonceOg3] = useState(0);
  const [Tx3, setTx3] = useState('');

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
    const input = data + nonce + nonceOg + Tx1;
    return crypto.SHA256(input).toString();
  };

  const mine = () => {
    const data = hashData;
    const nonce = mineBlock(data);
    setNonceResult(nonce);
    setIsMined(true);
    setIsNextMined(false);
    setIsThirdMined(false);
  };

  const calculatePrevHash = (data, nonce) => {
    const input = data + hashData + nonce + nonceOg + nonceOg2 + Tx1 + Tx2;
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
    setIsThirdMined(false);
  };

  const calculateThirdHash = (data, nonce) => {
    const input = data + hashData + nextHashData + nonce + nonceOg + nonceOg2 + nonceOg3 + Tx1 + Tx2 + Tx3;
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
      const inputData = thirdHashData + nextHashData + hashData + prevHashResult + prevSecondHashResult + nonceOg + nonceOg2 + nonceOg3 + Tx1 + Tx2 + Tx3;
      const result = await sha256(inputData);
      setThirdHashResult(result);
    };
    updatePrevSecondHash();
  }, [hashData, nonceOg, Tx1, Tx2, Tx3, prevSecondHashResult, prevHashResult, nextHashData, nonceOg2, thirdHashData, nonceOg3]);

  useEffect(() => {
    const updatePrevHash = async () => {
      const inputData = nextHashData + hashData + prevHashResult + nonceOg + nonceOg2 + Tx1 + Tx2;
      const result = await sha256(inputData);
      setNextHashResult(result);
      prevSecondSetHashResult(result);
    };
    updatePrevHash();
  }, [hashData, nonceOg, Tx1, prevHashResult, nextHashData, nonceOg2, Tx2]);

  useEffect(() => {
    const updateHash = async () => {
      const inputData = hashData + nonceOg + Tx1;
      const result = await sha256(inputData);
      setHashResult(result);
      prevSetHashResult(result);
    };
    updateHash();
  }, [hashData, nonceOg, Tx1]);

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
	        <h5>Tx</h5>
          <a className = 'mr1'>₹</a>
          <input
            className="pa2 short input-reset ba bg-white hover-bg-black hover-white h-100 mr3"
            onChange={(event) => {
              setTx1(event.target.value);
              setIsMined(false);
              setIsNextMined(false);
              setIsThirdMined(false);
            }}
          />
          <a className = 'mr1'>From</a>
          <input
            className="pa2 short input-reset ba bg-white hover-bg-black hover-white h-100 mr3"
          />
          <a className = 'mr1'>To</a>
          <input
            className="pa2 short input-reset ba bg-white hover-bg-black hover-white h-100 mr3"
          />
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
	        <h5>Tx</h5>
          <a className = 'mr1'>₹</a>
          <input
            className="pa2 short input-reset ba bg-white hover-bg-black hover-white h-100 mr3"
            onChange={(event) => {
              setTx2(event.target.value);
              setIsNextMined(false);
              setIsThirdMined(false);
            }}
          />
          <a className = 'mr1'>From</a>
          <input
            className="pa2 short input-reset ba bg-white hover-bg-black hover-white h-100 mr3"
          />
          <a className = 'mr1'>To</a>
          <input
            className="pa2 short input-reset ba bg-white hover-bg-black hover-white h-100 mr3"
          />
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
	        <h5>Tx</h5>
          <a className = 'mr1'>₹</a>
          <input
            className="pa2 short input-reset ba bg-white hover-bg-black hover-white h-100 mr3"
            onChange={(event) => {
              setTx3(event.target.value);
              setIsThirdMined(false);
            }}
          />
          <a className = 'mr1'>From</a>
          <input
            className="pa2 short input-reset ba bg-white hover-bg-black hover-white h-100 mr3"
          />
          <a className = 'mr1'>To</a>
          <input
            className="pa2 short input-reset ba bg-white hover-bg-black hover-white h-100 mr3"
          />
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

export default TokensSource;