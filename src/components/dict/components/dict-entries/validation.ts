import { DictValues, TKey } from '../..';
import * as shortid from 'shortid';
import { IDict } from '../../@types/api';

export const uid = () => shortid.generate();

export const isEmptyString = (s: string) => s.trim() === '';

type PropType = 'from' | 'to';
export const isDirty = (
  entry: DictValues,
  values: DictValues[],
  prop: PropType = 'from'
) => {
  const originalEntry = values.find(e => e.id === entry.id);
  return originalEntry === undefined || originalEntry[prop] !== entry[prop];
};

export const isDuplicateKey = (
  from: TKey,
  values?: DictValues[],
  newEntry?: boolean
) => {
  const maxLen = newEntry ? 0 : 1;
  return values && values.filter(e => e.from === from).length > maxLen;
};

export const isFormDirty = (
  editedName: string,
  editedValues: DictValues[],
  dict: IDict
) => {
  if (editedName !== dict.name || editedValues.length !== dict.values.length) {
    return true;
  }

  return dict.values.some(e => {
    const match = editedValues.find(edited => e.id === edited.id);
    return match === undefined || e.from !== match.from || e.to !== match.to;
  });
};

export const isFormValid = (editedName: string, editedValues: DictValues[]) =>
  !isEmptyString(editedName) &&
  editedValues.every(
    e =>
      !isEmptyString(e.from) &&
      !isEmptyString(e.to) &&
      !isDuplicateKey(e.from, editedValues)
  );

export const isFormReady = (
  editedName: string | undefined,
  editedValues: DictValues[],
  dict: IDict
) => {
  return (
    editedName &&
    dict &&
    isFormDirty(editedName, editedValues, dict) &&
    isFormValid(editedName, editedValues)
  );
};
