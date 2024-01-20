import React, {Component} from 'react';
import ParticlesBg from 'particles-bg';
import {sha256} from 'hash-wasm';
import './App.css';
import Main from './components/Main/Main';
import Hash from './components/Hash/Hash';

class App extends Component{
  constructor()
  {
    super();
    this.state = {
      route: ''
    }
  }

  onRouteChange = (route) => {
    this.setState({route: route})
  }

  render()
  {
    const {route} = this.state;
    return (
    <div>
      <ParticlesBg type="circle" bg={true}/>
      <Main onRouteChange = {this.onRouteChange}/>
      {
        route === 'hash'
          ? 
          <div>
            <Hash/>
          </div>
          : (
            route === 'block'
          )
      }
    </div>
  );
  }
}

export default App;