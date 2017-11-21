import React, { Component } from 'react';
import Chart from './Chart';
import { key, Colors } from '../helpers';

class RenderArtists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artists: null,
      artistLabels: null,
      artistPlaycount: null
    };
    this.getArtists = this.getArtists.bind(this);
  }

  componentDidMount() {
    this.getArtists(this.props.range, this.props.username);
  }

  componentWillReceiveProps(nextProps) {
    this.getArtists(nextProps.range, nextProps.username);
  }

  randomColor() {
    return Colors[Math.floor(Math.random() * Colors.length)];
  }

  getArtists(range, username) {
    // Hämtar data från LAST FM med användarnamn, API nyckel samt Range (Tidsram)
    const URL = `//ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${username}&api_key=${key}&format=json&period=${range}&limit=50`;
    const playcount = [];
    const labels = [];
    let artists = null;
    fetch(URL)
      .then(response => response.json())
      .then(response => response.topartists.artist)
      .then(response => (artists = response))
      // För varje artist så plockar jag ut hur många 'plays' varje artist har och trycker in dom i en array.
      .then(response => {
        response.forEach(artist => {
          const plays = parseInt(artist.playcount);
          playcount.push(plays);
        });
      })
      // Samma sak med med namn för varje artist. Används som label för varje graf.
      .then(response => {
        artists.forEach(artist => {
          const name = artist.name;
          labels.push(name);
        });
      })
      .then(response => console.log(response))
      .then(response =>
        this.setState({
          artists: response,
          artistLabels: labels,
          artistPlaycount: playcount
        })
      );
  }

  render() {
    if (!this.state.artistLabels) {
      return <p>Loading Artists...</p>;
    }

    return (
      <div>
        <Chart
          labels={this.state.artistLabels}
          playcount={this.state.artistPlaycount}
          color={this.randomColor()}
          title={'most played artists'}
        />
      </div>
    );
  }
}

export default RenderArtists;
