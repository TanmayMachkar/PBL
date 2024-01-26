import React from 'react';
import TokensSource from './TokensSource';

const Tokens = () => {
  return(
    <div>
      <h2 className = 'ml2'>PEER 1</h2>
      <TokensSource/>
      <h2 className = 'ml2'>PEER 2</h2>
      <TokensSource/>
      <h2 className = 'ml2'>PEER 3</h2>
      <TokensSource/>
    </div>
  );
}

export default Tokens;