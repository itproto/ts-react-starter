import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ConnectedApp } from '../app';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ConnectedApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
