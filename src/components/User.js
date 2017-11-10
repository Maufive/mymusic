import React, { Component } from 'react';
import RenderArtists from './RenderArtists';
import RenderTracks from './RenderTracks';

class User extends Component {
  constructor() {
    super();
    this.state = {
      range: 'overall'
    };
    this.handleRange = this.handleRange.bind(this);
  }

  handleRange(e) {
    this.setState({ range: e.target.value });
    console.log(e.target.value)
  }

  render() {
    if (!this.state) {
      return <p>loading USER...</p>;
    }

    return (
      <div className="user">
        <div className="filter-buttons">
          <select
            name="period-limit"
            id="period-limit"
            value={this.state.range}
            onChange={this.handleRange}
          >
            <option value="7days">7 days</option>
            <option value="1month">1 month</option>
            <option value="3month">3 months</option>
            <option value="6month">6 months</option>
            <option value="12month">12 months</option>
            <option value="overall">overall</option>
          </select>
        </div>

        <RenderArtists
          username={this.props.user.name}
          range={this.state.range}
        />
        <RenderTracks
          username={this.props.user.name}
          range={this.state.range}
        />
      </div>
    );
  }
}

export default User;
