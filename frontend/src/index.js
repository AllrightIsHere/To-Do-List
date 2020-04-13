import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';

import './index.css';

import App from './components/App';
import store from './store';

const GlobalStyle = createGlobalStyle`
    html {
      background-color: #f0f0f5;
      box-sizing: border-box;
    }
`;

ReactDOM.render(
    <Provider store={store}>
      <GlobalStyle/>
      <App />
    </Provider>,
  document.getElementById('root')
);
