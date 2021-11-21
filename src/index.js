import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Model from './models'
import {
  BrowserRouter as Router
} from 'react-router-dom'

ReactDOM.render(
  
    <Router>
    <App />
    </Router>,
  
  document.getElementById('root')
);


reportWebVitals();
