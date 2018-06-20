import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import BucketContainer from './components/BucketContainer';
import CreateTripContainer from './components/CreateTripContainer';
import AddBucket from './components/AddBucket';

class App extends Component {
  // componentDidMount() {
  //   window.firebase.database().ref('/data/buckets/trip1Id').once('value').then((snapshot) => {
  //     console.log(snapshot.val());
  // })
  // }
  render() {
    let { params } = this.props.match;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Aloe</h1>
        </header>
        {params && params['tripId'] ? (
          <div>
            <AddBucket tripId={params['tripId']}/>
            <BucketContainer tripId={params['tripId']}/> 
          </div>
        ) : 
          <CreateTripContainer/>}
      </div>
    );
  }
}

export default App;
