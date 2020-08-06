import React from 'react';
import ReactDOM from 'react-dom';
//import './assets/css/index.css';
import './assets/css/app.css';
import {BrowserRouter} from 'react-router-dom'

import App from './components/App';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('wrapper')
);