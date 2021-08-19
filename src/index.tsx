import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './common/i18n';

import './common/reset.scss';

ReactDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.getElementById('root')
);