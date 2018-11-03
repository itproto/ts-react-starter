export interface IDict {
  name: string;
  createdAt: Date;
  values: DictValues[];
}
export type TKey = string;
export type TValue = string;

export interface DictValues {
  from: TKey;
  to: TValue;
  id: string;
}
