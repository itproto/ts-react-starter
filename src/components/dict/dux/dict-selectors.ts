import { RootState } from '@src/app/dux/root-reducer';
import { reducerKey } from './dict-config';
const getDictsState = (state: RootState) => state[reducerKey];
export const dictsSelector = (state: RootState) => getDictsState(state).dicts;
