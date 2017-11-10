import React, { Component } from 'react';
import { key, formatDate } from '../helpers';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      weeklyFire: null
    };
    this.getTrackChart = this.getTrackChart.bind(this);
  }

  componentWillMount() {
    this.getTrackChart();
  }

  getTrackChart() {
    const URL = `http://ws.audioscrobbler.com/2.0/?method=user.getweeklytrackchart&user=${this
      .props.user.name}&api_key=${key}&format=json`;
    fetch(URL)
      .then(response => response.json())
      .then(response => response.weeklytrackchart.track[0])
      .then(response =>
        this.setState({
          weeklyFire: response
        })
      );
  }

  getImage() {
    if (this.props.user.userInfo.user.image[1]['#text'] === '') {
      return 'http://cdn.last.fm/flatness/catalogue/noimage/2/default_user_large.png';
    }
    return this.props.user.userInfo.user.image[2]['#text'];
  }

  render() {
    const recentTracks = this.props.recentTracks.map(track => (
      <li key={track.name}>
        <div className="image-bg">
          <img src={track.image[2]['#text']} alt="album cover" />
          <div className="track-info">
            <p>{track.name}</p>
            <p>{track.artist['#text']}</p>
          </div>
        </div>
      </li>
    ));

    if (!this.state.weeklyFire && this.props.recentTracks) {
      return <p>loading...</p>;
    }

    return (
      <div>
        <div className="user-info">
          <img
            className="profile-pic"
            src={this.getImage()}
            alt="Profile pic"
          />
          <div className="account-info">
            <h2>{this.props.user.userInfo.user.name}</h2>
            <p>
              account created:{' '}
              {formatDate(this.props.user.userInfo.user.registered.unixtime)}
            </p>
            <p>total playcount: {this.props.user.userInfo.user.playcount}</p>
          </div>

          <div className="weekly-fire">
            <img
              src={this.state.weeklyFire.image[2]['#text']}
              alt="Most played song this week"
            />
            <div>
              <h3>
                This weeks{' '}
                <span role="img" aria-label="fire">
                  🔥
                </span>:
              </h3>
              <p>{this.state.weeklyFire.artist['#text']}</p>
              <p>{this.state.weeklyFire.name}</p>
            </div>
          </div>
        </div>
        <h2>recent tracks</h2>
        <ul className="recent-tracklist">{recentTracks}</ul>
      </div>
    );
  }
}

export default Profile;
