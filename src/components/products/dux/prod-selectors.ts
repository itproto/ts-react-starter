import { RootState } from '@src/app/dux/root-reducer';
import { reducerKey } from './prod-config';
const getReducerState = (state: RootState) => state[reducerKey];
export const productsSelector = (state: RootState) =>
  getReducerState(state).items;
