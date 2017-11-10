import React, { Component } from 'react';
import { key } from '../helpers';
import Header from './Header';
import Jumbotron from './Jumbotron';
import User from './User';
import Profile from './Profile';

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
    const URL = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${this
      .state.user.name}&api_key=${key}&format=json&limit=5&extended`;
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
    const URL = `http://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${this
      .state.user.name}&api_key=${key}&format=json`;
    fetch(URL)
      .then(response => response.json())
      .then(response =>
        this.setState({
          user: { ...this.state.user, userInfo: response }
        })
      );
  }

  render() {
    if (!this.state.user.recentTracks) {
      return <p>loading!!!!!!!</p>;
    }

    return (
      <div className="App">
        <Header />
        <Profile
          user={this.state.user}
          recentTracks={this.state.user.recentTracks}
        />
        {this.state.user.isLoggedIn ? null : <Jumbotron />}
        <User user={this.state.user} />
      </div>
    );
  }
}

export default App;
