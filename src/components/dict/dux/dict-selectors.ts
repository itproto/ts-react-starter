import { RootState } from '@src/app/dux/root-reducer';
import { reducerKey } from './dict-config';
import { createSelector } from 'reselect';
const stateSelector = (state: RootState) => state[reducerKey];
export const dictsSelector = (state: RootState) => stateSelector(state).dicts;

export const selectedDictIndexSelector = (state: RootState) =>
  stateSelector(state).ui.selectedDictIndex;

export const selectedDictionarySelector = createSelector(
  dictsSelector,
  selectedDictIndexSelector,
  (dicts, selectedDictIndex) =>
    selectedDictIndex !== undefined ? dicts[selectedDictIndex] : undefined
);
