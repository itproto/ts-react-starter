import * as React from 'react';
import './app.css';
import { DictionaryDisplay } from '@src/components/dict';
import { ProductsList } from '@src/components/products/components/products-list';
import { configureStore, initialRootState } from './dux';
import { Provider } from 'react-redux';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <div className="app">
        <DictionaryDisplay title="Dictionary" />
        <ProductsList />
      </div>
    );
  }
}

// #region @connect
const store = configureStore(initialRootState);
export const ConnectedApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);
// #endregion
