import { Store, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { RootState, rootReducer } from './root-reducer';
import { callAPIMiddleware } from '@src/app/dux/middlewares/call-api-middleware';

export function configureStore(initialState: RootState): Store<RootState> {
  let middleware = applyMiddleware(callAPIMiddleware());

  if (process.env.NODE_ENV !== 'production') {
    middleware = composeWithDevTools(middleware);
  }

  const store = createStore(rootReducer, initialState, middleware) as Store<
    RootState
  >;

  if (module.hot) {
    module.hot.accept('./root-reducer', () => {
      const nextReducer = require('./root-reducer');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
