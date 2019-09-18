import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import App from 'containers/App';
import configureStore from 'store';
import './style/style.css';
import '/style/dropdown.css';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('container'),
);
