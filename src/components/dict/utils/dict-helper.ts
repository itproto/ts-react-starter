import { IDict, TValue } from '../@types/api';

export const mapValue = (dict: IDict, from: TValue) => {
  const found = dict.values.find(entry => entry.from === from);
  return found && found.to;
};
