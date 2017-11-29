import React, { Component } from 'react';
import Chart from './Chart';
import { key, Colors } from '../helpers';

class RenderAlbums extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: null,
      albumLabels: null,
      albumPlaycount: null
    };
    this.getAlbums = this.getAlbums.bind(this);
  }

  componentDidMount() {
    this.getAlbums(
      this.props.range,
      this.props.username,
      this.props.itemsToShow
    );
  }

  componentWillReceiveProps(nextProps) {
    this.getAlbums(nextProps.range, nextProps.username, nextProps.itemsToShow);
  }

  randomColor() {
    return Colors[Math.floor(Math.random() * Colors.length)];
  }

  getAlbums(range, username, limit) {
    // Hämtar data från LAST FM med användarnamn, API nyckel samt Range (Tidsram)
    const URL = `//ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${
      username
    }&api_key=${key}&format=json&period=${range}&limit=${limit}`;
    const playcount = [];
    const labels = [];
    let albums = null;
    fetch(URL)
      // Ta response och gör om det till JSON, sen förkortar jag bara response för att förbättra läsbarheten.
      .then(response => response.json())
      .then(response => response.topalbums.album)
      .then(response => (albums = response))
      // För varje artist så plockar jag ut hur många 'plays' varje artist har och trycker in dom i en array.
      .then(response => {
        response.forEach(album => {
          const plays = parseInt(album.playcount, 10); // 10 = Radix paramter
          playcount.push(plays);
        });
      })
      // Samma sak med med namn för varje artist. Används som label för varje graf.
      .then(response => {
        albums.forEach(album => {
          const name = album.name;
          const trimmed = name.substring(0, 25);
          labels.push(trimmed);
        });
      })
      .then(response =>
        this.setState({
          albums: response,
          albumLabels: labels,
          albumPlaycount: playcount
        })
      );
  }

  render() {
    if (!this.state.albumLabels) {
      return <p>Loading Artists...</p>;
    }

    return (
      <div>
        <Chart
          labels={this.state.albumLabels}
          playcount={this.state.albumPlaycount}
          color={this.randomColor()}
          title={'most played albums'}
        />
      </div>
    );
  }
}

export default RenderAlbums;
