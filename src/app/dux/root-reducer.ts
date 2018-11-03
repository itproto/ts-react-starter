import { combineReducers } from 'redux';
import {
  dictInitialState,
  dictReducerKey,
  dictReducer
} from '@src/components/dict';
import {
  productsReducerKey,
  productsInitialState,
  productsReducer
} from '@src/components/products';

export type RootState = typeof initialRootState;

export const initialRootState = {
  [dictReducerKey]: dictInitialState,
  [productsReducerKey]: productsInitialState
};

export const rootReducer = combineReducers<RootState>({
  [dictReducerKey]: dictReducer,
  [productsReducerKey]: productsReducer
});
