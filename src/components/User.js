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
  }

  render() {
    if (!this.props) {
      return <h2>Loading User</h2>;
    }

    return (
      <div className="user">
        <div className="divider"></div>
        <div className="period-container">
          <span>change timerange:</span>
          <select
            name="period-limit"
            id="period-limit"
            value={this.state.range}
            onChange={this.handleRange}
          >
            <option value="7day">7 days</option>
            <option value="1month">1 month</option>
            <option value="3month">3 months</option>
            <option value="6month">6 months</option>
            <option value="12month">12 months</option>
            <option value="overall">total</option>
          </select>
        </div>
        <RenderArtists
          username={this.props.username}
          range={this.state.range}
        />
        {/* <RenderTracks
          username={this.props.user.name}
          range={this.state.range}
        /> */}
      </div>
    );
  }
}

export default User;
