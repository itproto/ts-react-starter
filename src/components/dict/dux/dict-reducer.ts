import { IDict } from '@src/components/dict/@types/api';
import {
  getActionFor,
  IResponseAction
} from '@src/app/dux/middlewares/call-api-middleware';
import {
  GET_DICTIONARY,
  UPDATE_DICTIONARY,
  SELECT_DICTIONARY
} from '@src/components/dict/dux/dict-actions';
import { IAction } from '@src/app/dux';

export interface ReducerState {
  dicts: IDict[];
  ui: {
    selectedDictIndex?: number;
  };
}

export const initialState: ReducerState = {
  dicts: [],
  ui: {
    selectedDictIndex: undefined
  }
};

type ReducerAction =
  | IResponseAction<IDict[]>
  | IAction<IDict>
  | IAction<number>;

export const reducer = (
  state = initialState,
  action: ReducerAction
): ReducerState => {
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
    case SELECT_DICTIONARY:
      const { payload: selectedDictIndex } = action;
      return {
        ...state,
        ui: {
          ...state.ui,
          selectedDictIndex
        }
      };
  }
  return state;
};
