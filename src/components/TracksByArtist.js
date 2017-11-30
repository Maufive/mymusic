import React, { Component } from 'react';
import SearchTracksByArtist from './SearchTracksByArtist';
import RenderTracksByArtist from './RenderTracksByArtist';

class TracksByArtist extends Component {
  constructor(props) {
    super(props);
    this.state = { artist: '' };
    this.searchArtist = this.searchArtist.bind(this);
  }

  searchArtist(artist) {
    this.setState({ artist: artist });
  }

  render() {
    return (
      <div>
        <SearchTracksByArtist username={this.props.username} searchArtist={this.searchArtist} />
        <div>
          <RenderTracksByArtist username={this.props.username} artist={this.state.artist} />
        </div>
      </div>
    );
  }
}

export default TracksByArtist;
