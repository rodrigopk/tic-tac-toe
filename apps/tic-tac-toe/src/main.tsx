import React from 'react';
import ReactDOM from 'react-dom';
import { UIProvider } from '@tic-tac-toe/ui';

import App from './app/app';

ReactDOM.render(
  <UIProvider>
    <App />
  </UIProvider>,
  document.getElementById('root')
);
