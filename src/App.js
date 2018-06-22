import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import BucketContainer from './components/BucketContainer';
import CreateTripContainer from './components/CreateTripContainer';
import AddBucket from './components/AddBucket';
import { MuiThemeProvider, createMuiTheme, Typography } from '@material-ui/core';
import teal from '@material-ui/core/colors/teal';
import lightGreen from '@material-ui/core/colors/lightGreen';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import { withRouter } from 'react-router-dom';
import { getTripAction } from './redux/actions';
import { connect } from 'react-redux';

//Material UI Theme https://material-ui.com/style/color/
const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: lightGreen
  },
});

class App extends Component {
  componentDidMount() {
    let { params } = this.props.match;

    if (params && params['tripId']) {
      this.props.getTrip(params['tripId']);
    }
  }

  navigateHome = () => {
    let { history } = this.props;
    history.push('/');
  }

  render() {
    let { trips } = this.props;
    let { params } = this.props.match;

    let hasTrip = params && params['tripId'];
    let appTitle = hasTrip && Object.keys(trips).length ? trips[params['tripId']].name : 'Welcome to Aloe';

    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <header className="App-header">
            {/* <span style={{float: 'right'}}>
              <IconButton aria-label="Home" color="primary" size="large" onClick={this.navigateHome}>
                <HomeIcon/>
              </IconButton>
            </span> */}
            <span>
              <img onClick={this.navigateHome} src={logo} className="App-logo App-logo-left" alt="logo" />
            </span>
            <span>
              <img onClick={this.navigateHome} src={logo} className="App-logo App-logo-right" alt="logo" />
            </span>
            <Typography variant="display1" style={{color: 'white'}}>{appTitle}</Typography>
          </header>
            {hasTrip ? (
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

const mapStateToProps = state => {
  return {
    trips: state.trips
  }
}

const mapDispatchToProps = {
  getTrip: getTripAction
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
