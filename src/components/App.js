import React, { Component } from 'react';
import Chart from './Chart';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        topArtists: []
      }
    }
    this.getAlbums = this.getAlbums.bind(this);
    this.getLabels = this.getLabels.bind(this);
    this.renderChart = this.renderChart.bind(this);
  }

  componentWillMount() {
    this.getAlbums();
  }

  getAlbums() {
    const API_KEY = '3bd2bb523f1e2d97d92147aa51b6a9fb';
    const USER = 'tjenalaeget';
    const URL = `http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${USER}&api_key=${API_KEY}&format=json&period=7day&limit=6`;
    fetch(URL)
      .then(response => response.json())
      .then (response => response.topartists.artist)
      .then(response => this.setState({
        user: { ...this.state.user, topArtists: response }
      }));

      // Ta namnen (STRING) från varje OBJ i ARR och passa som props till Chart />
      console.log(this.state);
  }

  getLabels() {
    const artists = this.state.user.topArtists;
    const artistNames = [];
    artists.forEach((name) => {
      const artistName = name.name
      artistNames.push(artistName);
    });
    return artistNames;
  }

  renderChart() {
    return (
      <Chart getLabels={this.getLabels()} />
    );
  }

  render() {
    return (
      <div className="App">
        <h2>hello this is app component</h2>
        <button onClick={this.getAlbums}>Get artists</button>
        <button onClick={this.renderChart}>Render Chart</button>
        <div>
          {this.renderChart()}
        </div>
      </div>
    );
  }
}

export default App;
