import React, { Component } from 'react';
import MdSearch from 'react-icons/lib/md/search';

class SearchTracksByArtist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ artist: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const artist = this.state.artist;
    this.props.searchArtist(artist);
  }

  render() {
    return (
      <div>
        <h2>Search for User's Top track by Artist</h2>
        <form onSubmit={this.handleSubmit}>
          <MdSearch />
          <input
            type="text"
            id="search-user"
            placeholder="search artist..."
            onChange={this.handleChange}
            value={this.state.artist}
          />
        </form>
      </div>
    );
  }
}

export default SearchTracksByArtist;
