import { combineReducers } from 'redux';
import {
  dictInitialState,
  dictReducerKey,
  dictReducer
} from '@src/components/dict';

export type RootState = typeof initialRootState;

export const initialRootState = {
  [dictReducerKey]: dictInitialState
};

export const rootReducer = combineReducers<RootState>({
  [dictReducerKey]: dictReducer
});
