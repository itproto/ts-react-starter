import { IDict } from '@src/components/dict/@types/api';
import {
  getActionFor,
  IResponseAction
} from '@src/app/dux/middlewares/call-api-middleware';
import {
  GET_DICTIONARY,
  UPDATE_DICTIONARY
} from '@src/components/dict/dux/dict-actions';
import { IAction } from '@src/app/dux';

export interface IDictState {
  dicts: IDict[];
}

export const initialState: IDictState = {
  dicts: []
};

type ReducerAction = IResponseAction<IDict[]> | IAction<IDict>;

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
    case UPDATE_DICTIONARY:
      const { payload: updatedDict } = action;
      return {
        ...state,
        dicts: state.dicts.map(d => {
          if (updatedDict.name === d.name) {
            return { ...updatedDict };
          }
          return d;
        })
      };
  }
  return state;
};
