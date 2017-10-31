import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './components/App';
import User from './components/User';
import Login from './components/Login';

import './index.css';

class Root extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" component={App} />
          <Route exact path="/" component={Login} />
          <Route path="/user/:accessToken/:refreshToken" component={User} />
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
