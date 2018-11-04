import { DictValues, TKey } from '../..';
import * as shortid from 'shortid';

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
  editedValues: DictValues[],
  values: DictValues[]
) => {
  if (editedValues.length !== values.length) {
    return true;
  }
  return values.some(e => {
    const match = editedValues.find(edited => e.id === edited.id);
    return match === undefined || e.from !== match.from || e.to !== match.to;
  });
};

export const isFormValid = (editedValues: DictValues[]) =>
  editedValues.every(
    e =>
      !isEmptyString(e.from) &&
      !isEmptyString(e.to) &&
      !isDuplicateKey(e.from, editedValues)
  );

export const isFormReady = (
  editedValues: DictValues[],
  values?: DictValues[]
) => {
  return (
    values && isFormDirty(editedValues, values) && isFormValid(editedValues)
  );
};
