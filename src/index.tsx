import * as React from 'react';
import { render } from 'react-dom';
import { App } from './app/app';
import './index.css';
import { registerServiceWorker } from './sw/registerServiceWorker';
import { configureStore, initialRootState } from '@src/app/dux';
import { Provider } from 'react-redux';

const store = configureStore(initialRootState);
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
