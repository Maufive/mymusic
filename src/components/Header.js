import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="navbar">
          <div className="brand">
            <h3>mymusic</h3>
          </div>
          <div className="navigation">
            <ul>
              <li>search user</li>
              <li>sign up</li>
              <li>login</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
