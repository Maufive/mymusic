import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './components/App';
import Login from './components/Login';

import './scss/index.scss';
import './scss/asdf.css';

class Root extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" component={App} />
          <Route exact path="/" component={Login} />
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
