import { IDict } from '../@types/api';
import { uid } from '../components/dict-entries/validation';

export const reducerKey = 'dictionary';

export const createNewDictionary = (): IDict => ({
  name: 'New Dictionary',
  values: [],
  id: uid()
});
