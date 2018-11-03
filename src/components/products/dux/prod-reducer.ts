import {
  getActionFor,
  IResponseAction
} from '@src/app/dux/middlewares/call-api-middleware';
import { IProduct } from '../@types/api';
import { GET_PRODUCTS } from './prod-actions';

export interface IReducerState {
  items: IProduct[];
}

export const initialState: IReducerState = {
  items: []
};

type ReducerAction = IResponseAction<IProduct[]>;

export const reducer = (
  state = initialState,
  action: ReducerAction
): IReducerState => {
  switch (action.type) {
    case getActionFor(GET_PRODUCTS):
      const { response } = action;
      return {
        ...state,
        items: response
      };
  }
  return state;
};
