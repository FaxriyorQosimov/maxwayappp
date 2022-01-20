import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux'
import store from './store';
// import 'bootstrap/dist/css/bootstrap.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

ReactDOM.render(
  <Provider  store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
,
  document.getElementById('root')
);

