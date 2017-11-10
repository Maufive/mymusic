import React, { Component } from 'react';

class Jumbotron extends Component {
  render() {
    return (
      <div className="jumbotron">
        <h1>
          welcome to <span>mymusic</span>
        </h1>
        <h3>see what you and your friends are listening to</h3>
        <div className="button-group">
          <a className="secondary">search user</a>
          <a className="primary">log in</a>
        </div>
      </div>
    );
  }
}

export default Jumbotron;
