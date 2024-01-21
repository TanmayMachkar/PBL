import React, {Component} from 'react';
import ParticlesBg from 'particles-bg';
import './App.css';
import Main from './components/Main/Main';
import Hash from './components/Hash/Hash';
import Block from './components/Block/Block';

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
            ?
            <Block/>
            : (
              route === 'blockchain'
            )
          )
      }
    </div>
  );
  }
}

export default App;