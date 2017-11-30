import React, { Component } from 'react';
import ArtistRenderContainer from './ArtistRenderContainer';
import TrackRenderContainer from './TrackRenderContainer';
import AlbumRenderContainer from './AlbumRenderContainer';
import TracksByArtist from './TracksByArtist';

class User extends Component {
  render() {
    if (!this.props) {
      return <h2>Loading User</h2>;
    }

    return (
      <div className="user">
        <div className="divider" />
        <div>
          <ArtistRenderContainer username={this.props.username} />
        </div>
        <div className="divider" />
        <div>
          <TrackRenderContainer username={this.props.username} />
        </div>
        <div className="divider" />
        <div>
          <AlbumRenderContainer username={this.props.username} />
        </div>
        <div>
          <TracksByArtist username={this.props.username} />
        </div>
      </div>
    );
  }
}

export default User;
