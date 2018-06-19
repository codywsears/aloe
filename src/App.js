import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import BucketContainer from './components/BucketContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Aloe</h1>
        </header>
        <BucketContainer/>
      </div>
    );
  }
}

export default App;
