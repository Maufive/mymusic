import React, { Component } from 'react';
import MdSearch from 'react-icons/lib/md/search';
import ArtistRenderContainer from './ArtistRenderContainer';
import TrackRenderContainer from './TrackRenderContainer';
import AlbumRenderContainer from './AlbumRenderContainer';

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
          <h2>Search for User's Top track by Artist</h2>
          <form onSubmit={this.handleSearch}>
            <MdSearch />
            <input
              type="text"
              id="search-user"
              placeholder="search artist..."
              onChange={this.handleChange}
              // value={this.state.username}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default User;
