export * from './@types/api';
export {
  IReducerState as IProductsReducerState,
  initialState as productsInitialState,
  reducer as productsReducer
} from './dux/prod-reducer';

export { reducerKey as productsReducerKey } from './dux/prod-config';
