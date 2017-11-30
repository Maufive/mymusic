import React, { Component } from 'react';
import { key } from '../helpers';
import TopTracksByArtist from './TopTracksByArtist';

class RenderTracksByArtist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: null,
      artistinfo: null
    };
    this.getTracks = this.getTracks.bind(this);
  }

  getTracks(artist) {
    const URL = `//ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${artist}&api_key=${key}&format=json`;
    fetch(URL)
      .then(response => response.json())
      .then(response => console.log(response))
      .then(response => this.setState({ tracks: response }));
  }

  getArtistInfo(username, artist) {
    const URL = `//ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${
      artist
    }&username=${username}&api_key=${key}&format=json`;
    fetch(URL)
      .then(response => response.json())
      .then(response => this.setState({ artistinfo: response }));
  }

  componentWillReceiveProps(nextProps) {
    this.getArtistInfo(nextProps.username, nextProps.artist);
    this.getTracks(nextProps.artist);
  }

  render() {
    if (!this.state.artistinfo) {
      return null;
    }
    if (!this.state.tracks) {
      return null;
    }

    return (
      <div>
        <div className="artist-bio">
          <img
            src={this.state.artistinfo.artist.image[2]['#text']}
            alt=""
            id="artist-bio-image"
          />
          <h2>{this.state.artistinfo.artist.name}</h2>
          <p>{this.state.artistinfo.artist.bio.summary}</p>
          <p>total playcount: {this.state.artistinfo.artist.stats.playcount}</p>
        </div>
        <div className="top-tracks-by-artist-list">
          <TopTracksByArtist tracks={this.state.tracks} />
        </div>
        {console.log(this.state.artistinfo)}
        {console.log(this.state.tracks)}
      </div>
    );
  }
}

export default RenderTracksByArtist;
