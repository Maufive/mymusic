import React, { Component } from 'react';

class App extends Component {
  //key
  // http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=rj&api_key=YOUR_API_KEY&format=json
  //

  getAlbums() {
    const API_KEY = '3bd2bb523f1e2d97d92147aa51b6a9fb';
    const USER = 'tjenalaeget';
    const URL = `http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${USER}&api_key=${API_KEY}&format=json&period=7day&limit=10`;
    fetch(URL)
      .then(response => response.json())
      .then(response => console.log(response));
  }

  getTracks() {
    const API_KEY = '3bd2bb523f1e2d97d92147aa51b6a9fb';
    const USER = 'tjenalaeget';
    const URL = `http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${USER}&api_key=${API_KEY}&format=json&period=7day&limit=10`;
    fetch(URL)
      .then(response => response.json())
      .then(response => console.log(response));
  }

  render() {
    return (
      <div className="App">
        <h2>hello this is app component</h2>
        <button onClick={this.getAlbums}>Get albums</button>
        <button onClick={this.getTracks}>Get tracks</button>
      </div>
    );
  }
}

export default App;
