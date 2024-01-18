import React, {Component} from 'react';
import ParticlesBg from 'particles-bg';
import './App.css';
import Main from './components/Main/Main';
import Hash from './components/Hash/Hash';

class App extends Component{
  constructor()
  {
    super();
    this.state = {
      route: '',
      input: '',
      hashData: ''
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onRouteChange = (route) => {
    this.setState({route: route})
  }

  onButtonSubmit = () => {
    this.setState({hashData: this.state.input}, () => {
      console.log(this.state.hashData)
    })
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
            <Hash onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit}/>
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