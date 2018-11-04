export {
  ReducerState,
  initialState as dictInitialState,
  reducer as dictReducer
} from './dux/dict-reducer';

export { reducerKey as dictReducerKey } from './dux/dict-config';

export { DictionaryDisplay } from './components/dictionary-display';

export { selectedDictionarySelector } from './dux/dict-selectors';

export * from './@types/api';

export { mapValue } from './utils/dict-helper';
