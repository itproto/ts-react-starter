export interface IDict {
  name: string;
  createdAt: Date;
  values: { (key: string): string };
}
