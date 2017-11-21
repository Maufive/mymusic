import React, { Component } from 'react';
import MdSearch from 'react-icons/lib/md/search';

class Jumbotron extends Component {
  constructor() {
    super();
    this.highlight = this.highlight.bind(this);
  }

  highlight() {
    document.querySelector('#search-user').focus();
  }

  render() {
    return (
      <div className="jumbotron">
        <h1>
          welcome to <span>mymusic</span>
        </h1>
        <h3>see what you and your friends are listening to</h3>
        <div className="button-group">
          <a className="secondary" disabled>log in</a>
          <a className="primary" onClick={this.highlight}>search user <MdSearch /></a>
        </div>
      </div>
    );
  }
}

export default Jumbotron;
