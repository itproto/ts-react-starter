import * as React from 'react';
import { render } from 'react-dom';
import { ConnectedApp } from './app/app';
import './index.css';
import { registerServiceWorker } from './sw/registerServiceWorker';

render(<ConnectedApp />, document.getElementById('root') as HTMLElement);
registerServiceWorker();
