import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import BucketContainer from './components/BucketContainer';
import CreateTripContainer from './components/CreateTripContainer';
import AddBucket from './components/AddBucket';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import teal from '@material-ui/core/colors/teal';
import lightGreen from '@material-ui/core/colors/lightGreen';

//Material UI Theme https://material-ui.com/style/color/
const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: lightGreen
  },
});

class App extends Component {
  render() {
    let { params } = this.props.match;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Aloe</h1>
        </header>
        <MuiThemeProvider theme={theme}>
          {params && params['tripId'] ? (
            <div>
              <AddBucket tripId={params['tripId']}/>
              <BucketContainer tripId={params['tripId']}/> 
            </div>
          ) : 
            <CreateTripContainer/>}
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
