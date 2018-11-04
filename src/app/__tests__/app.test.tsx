import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from '../app';
import { Provider } from 'react-redux';
import { configureStore, initialRootState } from '../dux';
const store = configureStore(initialRootState);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
