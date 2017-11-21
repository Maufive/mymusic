import React, { Component } from 'react';
import Chart from './Chart';
import { key, Colors } from '../helpers';

class RenderTracks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: null
    };
    this.getTracks = this.getTracks.bind(this);
  }

  componentWillMount() {
    this.getTracks();
  }

  getTracks() {
    const URL = `http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${this
      .props.username}&api_key=${key}&format=json&period=${this.props
      .range}&limit=50`;
    fetch(URL)
      .then(response => response.json())
      .then(response => response.toptracks.track)
      .then(response =>
        this.setState({
          tracks: response
        })
      );
  }

  render() {
    const getLabels = () => {
      if (this.state.tracks) {
        const tracks = this.state.tracks;
        const trackNames = [];
        tracks.forEach(name => {
          const trackName = name.name;
          trackNames.push(trackName);
        });
        return trackNames;
      }
    };

    const getPlaycount = () => {
      if (this.state.tracks) {
        const tracks = this.state.tracks;
        const playcount = [];
        tracks.forEach(name => {
          const plays = parseInt(name.playcount);
          playcount.push(plays);
        });
        return playcount;
      }
    };
    return (
      <div>
        {this.state.tracks ? (
          <Chart
            labels={getLabels()}
            playcount={getPlaycount()}
            color={'rgb(255,99,71)'}
            title={'most played tracks'}
          />
        ) : null}
      </div>
    );
  }
}

export default RenderTracks;
