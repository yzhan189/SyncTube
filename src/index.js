import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css'; // stylesheet for semantic ui react
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.querySelector('body'));
registerServiceWorker();

// index.js is entry point of our webapp
