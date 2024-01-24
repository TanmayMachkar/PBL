import React, { useState, useEffect } from 'react';
import { sha256 } from 'hash-wasm';
import crypto from 'crypto-js';

const Block = () => {
  const [hashData, setHashData] = useState('');
  const [hashResult, setHashResult] = useState('');
  const [nonceResult, setNonceResult] = useState('');
  const [nonceOg, setNonceOg] = useState(0);
  const [isMined, setIsMined] = useState(true);

  const mineBlock = (data) => {
    let nonce = 0;
    const targetPrefix = '0000';

    while (true) {
      const hash = calculateHash(data, nonce);
      if (hash.startsWith(targetPrefix)) {
        setHashResult(hash);
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

  useEffect(() => {
    const updateHash = async () => {
      const inputData = hashData + nonceOg;
      const result = await sha256(inputData);
      setHashResult(result);
    };
    updateHash();
  }, [hashData, nonceOg]); 

  return (
    <div className={`pa3 ba ma3 ${isMined ? 'bg-light-green' : 'bg-light-red'}`}>
      <div className="tc">
        <h5>DATA</h5>
        <input
          className="pa2 input-reset ba bg-white hover-bg-black hover-white w-50 h-100 mr3"
          onChange={(event) => {
            setHashData(event.target.value);
            setIsMined(false);
          }}
        />
        <h5>NONCE</h5>
        <input
          className="pa2 input-reset ba bg-white hover-bg-black hover-white w-50 h-100 mr3"
          onChange={(event) => {
            setNonceOg(event.target.value);
            setIsMined(false);
          }}
        />
        <h5>RESULTANT NONCE</h5>
        <output className="center pa1 w-50 bg-white ba break">{nonceResult}</output>
        <h5>SHA256</h5>
        <output className="center pa1 w-50 bg-white ba break">{hashResult}</output>
        <br></br>
        <button
          className="button-1"
          role="button"
          onClick={mine}
        >MINE
        </button>
      </div>
    </div>
  );
};

export default Block;
