// import { TodoActions } from 'app/actions/todos';
// import { TodoModel } from 'app/models';
import { combineReducers } from 'redux';
import {
  sampleReducer,
  sampleInitialState,
  sampleReducerKey
} from '@src/components/sample';

export type RootState = typeof initialRootState;

export const initialRootState = {
  [sampleReducerKey]: sampleInitialState
};

export const rootReducer = combineReducers<RootState>({
  [sampleReducerKey]: sampleReducer
});
