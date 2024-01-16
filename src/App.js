import React, {Component} from 'react';
import ParticlesBg from 'particles-bg';
import './App.css';
import Hash from './components/Hash';

class App extends Component{
  render()
  {
    return (
    <div>
      <ParticlesBg type="cobweb" bg={true}/>
      <Hash/>
    </div>
  );
  }
}

export default App;