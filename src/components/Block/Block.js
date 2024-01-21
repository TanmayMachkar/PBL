import React, { useState } from 'react';
import { sha256 } from 'hash-wasm';
import crypto from 'crypto-js';

const Block = () => {
  const [hashData, setHashData] = useState('');
  const [hashResult, setHashResult] = useState('');
  const [nonceResult, setNonceResult] = useState('');
  const [isMined, setIsMined] = useState(false);

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
        <button
          className="button-1"
          role="button"
          onClick={mine}
        >MINE
        </button>
        <h5>NONCE</h5>
        <output className="center pa1 w-50 bg-white ba break">{nonceResult}</output>
        <h5>SHA256</h5>
        <output className="center pa1 w-50 bg-white ba break">{hashResult}</output>
      </div>
    </div>
  );
};

export default Block;
