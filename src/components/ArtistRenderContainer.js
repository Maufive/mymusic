import React, { Component } from 'react';
import RenderArtists from './RenderArtists';
import MdSettings from 'react-icons/lib/md/settings';

class ArtistRenderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerange: 'overall',
      itemsToShow: 10
    };
    this.handleTimeRange = this.handleTimeRange.bind(this);
    this.itemsToShow = this.itemsToShow.bind(this);
  }

  handleTimeRange(e) {
    this.setState({ timerange: e.target.value });
  }

  itemsToShow(e) {
    this.setState({ itemsToShow: e.target.value });
  }

  showSettings() {
    const div = document.querySelector('.artist-settings');
    const button = document.querySelector('.artist-button');
    
    div.classList.add('toggle-enter');
    setTimeout(() => div.classList.contains('toggle-enter') && div.classList.add('toggle-active'), 150);
    button.classList.add('active')
  }

  render() {
    return (
      <div className="render-container">
        <div className="settings">
          <div className="render-settings artist-settings">
            <select
              name="period-limit"
              id="period-limit"
              value={this.state.timerange}
              onChange={this.handleTimeRange}
            >
              <option value="7day">7 days</option>
              <option value="1month">1 month</option>
              <option value="3month">3 months</option>
              <option value="6month">6 months</option>
              <option value="12month">12 months</option>
              <option value="overall">total</option>
            </select>
            <select
              id="period-limit"
              value={this.state.itemsToShow}
              onChange={this.itemsToShow}
            >
              <option value={5}>5 artists</option>
              <option value={10}>10 artists</option>
              <option value={15}>15 artists</option>
              <option value={25}>25 artists</option>
              <option value={50}>50 artists</option>
              <option value={75}>75 artists</option>
              <option value={100}>100 artists</option>
            </select>
          </div>
          <button className="render-settings-button artist-button" onClick={this.showSettings}>
            <MdSettings />
          </button>
        </div>
        <RenderArtists
          username={this.props.username}
          range={this.state.timerange}
          itemsToShow={this.state.itemsToShow}
        />
      </div>
    );
  }
}

export default ArtistRenderContainer;
