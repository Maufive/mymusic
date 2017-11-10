import React, { Component } from 'react';
import { formatDate } from '../helpers';
import RenderArtists from './RenderArtists';
import RenderTracks from './RenderTracks';
import { key } from '../helpers';

class User extends Component {
  constructor() {
    super();
    this.state = {
      range: '1month',
      weeklyFire: null
    };
    this.getTrackChart = this.getTrackChart.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    this.getTrackChart();
  }

  getTrackChart() {
    const URL = `http://ws.audioscrobbler.com/2.0/?method=user.getweeklytrackchart&user=${this
      .props.username}&api_key=${key}&format=json&period=${this.props
      .range}&limit=50`;
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
    if (this.props.info.user.image[1]['#text'] === '') {
      return 'http://cdn.last.fm/flatness/catalogue/noimage/2/default_user_large.png';
    }
    return this.props.info.user.image[2]['#text'];
  }

  handleClick(range) {
    this.setState({ range: range });
    console.log(this.state.range);
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

    if (!this.state.weeklyFire) {
      return <p>loading...</p>;
    }

    return (
      <div className="user">
        <div className="user-info">
          <img
            className="profile-pic"
            src={this.getImage()}
            alt="Profile pic"
          />
          <div className="account-info">
            <h2>{this.props.info.user.name}</h2>
            <p>
              account created:{' '}
              {formatDate(this.props.info.user.registered.unixtime)}
            </p>
            <p>total playcount: {this.props.info.user.playcount}</p>
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

        <div className="filter-buttons">
          <button onClick={() => this.handleClick('7days')}>7 days</button>
          <button onClick={() => this.handleClick('1month')}>1 month</button>
          <button onClick={() => this.handleClick('3month')}>3 months</button>
          <button onClick={() => this.handleClick('6month')}>6 months</button>
          <button onClick={() => this.handleClick('12month')}>12 months</button>
          <button onClick={() => this.handleClick('overall')}>overall</button>
        </div>

        <RenderArtists
          username={this.props.username}
          range={this.state.range}
        />
        <RenderTracks username={this.props.username} range={this.state.range} />
      </div>
    );
  }
}

export default User;
