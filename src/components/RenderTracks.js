import React, { Component } from 'react';
import Chart from './Chart';
import { key, Colors } from '../helpers';

class RenderTracks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: null,
      trackLabels: null,
      trackPlaycount: null
    };
    this.getTracks = this.getTracks.bind(this);
  }

  componentDidMount() {
    this.getTracks(this.props.range, this.props.username, this.props.itemsToShow);
  }

  componentWillReceiveProps(nextProps) {
    this.getTracks(nextProps.range, nextProps.username, this.props.itemsToShow);
  }

  randomColor() {
    return Colors[Math.floor(Math.random() * Colors.length)];
  }

  getTracks(range, username, limit) {
    const URL = `//ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${username}&api_key=${key}&format=json&period=${range}&limit=${limit}`;
    const playcount = [];
    const labels = [];
    let tracks = null;
    fetch(URL)
      .then(response => response.json())
      .then(response => response.toptracks.track)
      .then(response => (tracks = response))
      .then(response => {
        response.forEach(track => {
          const plays = parseInt(track.playcount, 10); // 10 = Radix paramter
          playcount.push(plays);
        });
      })
      .then(response => {
        tracks.forEach(track => {
          const name = track.name;
          labels.push(name);
        })
      })
      .then(response => this.setState({
        tracks: response,
        trackLabels: labels,
        trackPlaycount: playcount
      }));
  }

  render() {
    if(!this.state.trackLabels) {
      return <h2>Loading tracks</h2>;
    }

    return (
      <div>
        <Chart 
          labels={this.state.trackLabels}
          playcount={this.state.trackPlaycount}
          color={this.randomColor()}
          title={'most played tracks'}
        />
      </div>
    );
  }
}

export default RenderTracks;
