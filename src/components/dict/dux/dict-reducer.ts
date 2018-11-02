import { IDict } from '@src/components/dict/@types/api';
import {
  getActionFor,
  IResponseAction
} from '@src/app/dux/middlewares/call-api-middleware';
import { GET_DICTIONARY } from '@src/components/dict/dux/dict-actions';

export interface IDictState {
  dicts: IDict[];
}

export const initialState: IDictState = {
  dicts: []
};

type ReducerAction = IResponseAction<IDict[]>; // | AnyAction;

export const reducer = (
  state = initialState,
  action: ReducerAction
): IDictState => {
  switch (action.type) {
    case getActionFor(GET_DICTIONARY):
      const { response } = action;
      return {
        ...state,
        dicts: response
      };
  }
  return state;
};
