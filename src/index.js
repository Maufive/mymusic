import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './components/App';

import './scss/index.scss';

class Root extends React.Component {
  render() {
    return (
      <App />
    );
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
