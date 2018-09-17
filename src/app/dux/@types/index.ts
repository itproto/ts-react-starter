import { AnyAction } from 'redux';

export interface IAction<T = any> extends AnyAction {
  payload: T;
}
