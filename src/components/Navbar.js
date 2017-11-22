import React, { Component } from 'react';
import MdSearch from 'react-icons/lib/md/search';
import MdNote from 'react-icons/lib/md/music-note';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      username: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const username = this.state.username;
    this.props.searchUser(username);
    this.setState({
      username: ''
    });
  }

  render() {
    return (
      <div className="header">
        <div className="navbar">
          <div className="brand">
            <h3>mymusic <MdNote /></h3>
          </div>
          <div className="navigation">
            <ul>
              <li>
                <form onSubmit={this.handleSubmit}>
                <MdSearch />
                  <input
                    type="text"
                    id="search-user"
                    placeholder="search user..."
                    onChange={this.handleChange}
                    value={this.state.username}
                  />
                </form>
              </li>
              <li>sign up</li>
              <li>login</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
