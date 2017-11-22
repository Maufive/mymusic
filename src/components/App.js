import React, { Component } from 'react';
import Navbar from './Navbar';
import Jumbotron from './Jumbotron';
import User from './User';
import Profile from './Profile';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'tjenalaeget'
    };
    this.searchUser = this.searchUser.bind(this);
  }

  componentDidUpdate() {
    console.log(this.state.username)
  }

  searchUser(username) {
    this.setState({
      username: username
    });
  }

  render() {
    return (
      <div className="App">
        <Navbar searchUser={this.searchUser} />
        {this.state.username ? <Profile username={this.state.username} /> : <Jumbotron />}
        {this.state.username ? <User username={this.state.username} /> : null}
      </div>
    );
  }
}

export default App;
