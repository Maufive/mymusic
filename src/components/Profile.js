import React, { Component } from 'react';
import { key, formatDate } from '../helpers';
import RecentTrackList from './RecentTrackList';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      weeklyFire: null,
      recentTracks: null,
      userInfo: null,
      nowPlaying: null
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
    const URL = `//ws.audioscrobbler.com/2.0/?method=user.getweeklytrackchart&user=${username}&api_key=${key}&format=json`;
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
    const URL = `//ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${key}&format=json&limit=8&extended`;
    const nowPlaying = {
      song: '',
      artist: ''
    };

    fetch(URL)
      .then(response => response.json())
      .then(response => response.recenttracks.track)
      // Om Index[0] har en @attr (nowplaying) så ta bort den från arrayen för att göra en lista av recenttracks.
      // Använd det objektet till att visa en "Now playing" i profilen.
      .then(response => {
        if (response[0]['@attr']) {
          const songName = response[0].name.substring(0, 30);
          const artistName = response[0].artist['#text'].substring(0, 30);
          nowPlaying.song = songName;
          nowPlaying.artist = artistName;
          response.splice(0, 1);
          this.setState({
            recentTracks: response,
            nowPlaying: nowPlaying
          });
        } else {
          response.splice(8, 1);
          this.setState({
            recentTracks: response,
            nowPlaying: null
          });
        }
      });
  }

  getUserInfo(username) {
    const URL = `//ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${username}&api_key=${key}&format=json`;
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
      return '//cdn.last.fm/flatness/catalogue/noimage/2/default_user_large.png';
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
      return <h2>Loading RecentTracks</h2>;
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
              <div id="info">
                <div className="fragor">
                  <p>currently playing:</p>
                  <p>account created:</p>
                  <p>total playcount:</p>
                </div>
                <div className="svar">
                  {this.state.nowPlaying ? (
                    <span id="now-playing">
                      {this.state.nowPlaying.artist} -{' '}
                      {this.state.nowPlaying.song}
                    </span>
                  ) : <span>not listening at the moment</span>}
                  <span>
                    {formatDate(this.state.userInfo.user.registered.unixtime)}
                  </span>
                  <span>
                    {this.state.userInfo.user.playcount}
                  </span>
                </div>
              </div>
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
