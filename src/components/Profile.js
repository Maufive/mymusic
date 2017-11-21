import React, { Component } from 'react';
import { key, formatDate } from '../helpers';
import RecentTrackList from './RecentTrackList';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      weeklyFire: null,
      recentTracks: null,
      userInfo: null
    };
    this.getTrackChart = this.getTrackChart.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.getRecentTracks = this.getRecentTracks.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.getTrackChart(nextProps.username);
    this.getUserInfo(nextProps.username);
    this.getRecentTracks(nextProps.username);
  }

  componentDidMount() {
    this.getUserInfo(this.props.username);
    this.getTrackChart(this.props.username);
    this.getRecentTracks(this.props.username);
  }

  getTrackChart(username) {
    const URL = `http://ws.audioscrobbler.com/2.0/?method=user.getweeklytrackchart&user=${username}&api_key=${key}&format=json`;
    fetch(URL)
      .then(response => response.json())
      .then(response => response.weeklytrackchart.track[0])
      .then(response =>
        this.setState({
          weeklyFire: response
        })
      );
  }

  getRecentTracks(username) {
    const URL = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${key}&format=json&limit=7&extended`;
    fetch(URL)
      .then(response => response.json())
      .then(response => response.recenttracks.track)
      .then(response =>
        this.setState({
          recentTracks: response
        })
      );
  }

  getUserInfo(username) {
    const URL = `http://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${username}&api_key=${key}&format=json`;
    fetch(URL)
      .then(response => response.json())
      .then(response =>
        this.setState({
          userInfo: response
        })
      );
  }

  getImage() {
    if (this.state.userInfo.user.image[1]['#text'] === '') {
      return 'http://cdn.last.fm/flatness/catalogue/noimage/2/default_user_large.png';
    }
    return this.state.userInfo.user.image[2]['#text'];
  }

  render() {
    if (!this.state.userInfo) {
      return <h2>Loading Profile</h2>;
    }
    if (!this.state.weeklyFire) {
      return <h2>Loading weeklyfire</h2>;
    }
    if (!this.state.recentTracks) {
      return <h2>Loading</h2>;
    }

    return (
      <div>
        <div className="user-info">
          <div className="account-info">
            <img
              className="profile-pic"
              src={this.getImage()}
              alt="Profile pic"
            />
            <div>
              <h3>user:</h3>
              <h2>{this.state.userInfo.user.name}</h2>
              <p>
                account created:{' '}
                {formatDate(this.state.userInfo.user.registered.unixtime)}
              </p>
              <p>total playcount: {this.state.userInfo.user.playcount}</p>
            </div>
          </div>

          <div className="weekly-fire">
            <img
              src={this.state.weeklyFire.image[2]['#text']}
              alt="Most played song this week"
            />
            <div>
              <h3>
                this weeks{' '}
                <span role="img" aria-label="fire">
                  🔥
                </span>
              </h3>
              <p>{this.state.weeklyFire.artist['#text']}</p>
              <p>{this.state.weeklyFire.name}</p>
              <p>{this.state.weeklyFire.playcount} plays</p>
            </div>
          </div>
        </div>
        <div className="recent-tracklist-container">
          <h2>recently played:</h2>
          <RecentTrackList recentTracks={this.state.recentTracks} />
        </div>
      </div>
    );
  }
}

export default Profile;
