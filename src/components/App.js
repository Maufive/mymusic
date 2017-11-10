import React, { Component } from 'react';
import { key } from '../helpers';
import Header from './Header';
import Jumbotron from './Jumbotron';
import User from './User';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: 'tjenalaeget',
        userInfo: null,
        recentTracks: null,
        isLoggedIn: true
      }
    };
    this.getUserInfo = this.getUserInfo.bind(this);
    this.getRecentTracks = this.getRecentTracks.bind(this);
  }

  componentWillMount() {
    this.getUserInfo();
    this.getRecentTracks();
  }

  getRecentTracks() {
    const URL = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${this.state.user.name}&api_key=${key}&format=json&limit=5&extended`;
    fetch(URL)
      .then(response => response.json())
      .then(response => response.recenttracks.track)
      .then(response =>
        this.setState({
          user: { ...this.state.user, recentTracks: response }
        })
      );
  }

  getUserInfo() {
    const URL = `http://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${this.state.user.name}&api_key=${key}&format=json`;
    fetch(URL)
      .then(response => response.json())
      .then(response =>
        this.setState({
          user: { ...this.state.user, userInfo: response }
        })
      );
  }

  render() {
    return (
      <div className="App">
        <Header />
        {this.state.user.isLoggedIn ? null : <Jumbotron />}
        {this.state.user.userInfo && this.state.user.recentTracks ? (
          <User
            username={this.state.user.name}
            info={this.state.user.userInfo}
            recentTracks={this.state.user.recentTracks}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
