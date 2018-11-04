export interface IDict {
  id: string;
  name: string;
  values: DictValues[];
}
export type TKey = string;
export type TValue = string;

export interface DictValues {
  from: TKey;
  to: TValue;
  id: string;
}
