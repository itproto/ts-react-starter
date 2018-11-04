import { IDict } from '@src/components/dict/@types/api';
import {
  getActionFor,
  IResponseAction
} from '@src/app/dux/middlewares/call-api-middleware';
import {
  GET_DICTIONARY,
  UPDATE_DICTIONARY,
  SELECT_DICTIONARY,
  REMOVE_DICTIONARY,
  ADD_DICTIONARY
} from '@src/components/dict/dux/dict-actions';
import { IAction } from '@src/app/dux';
import { AnyAction } from 'redux';
import { createNewDictionary } from './dict-config';

export interface ReducerState {
  dicts: IDict[];
  ui: {
    selectedDictIndex: number;
  };
}

export const initialState: ReducerState = {
  dicts: [],
  ui: {
    selectedDictIndex: 0
  }
};

type ReducerAction =
  | IResponseAction<IDict[]>
  | IAction<IDict>
  | IAction<number>
  | AnyAction;

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
          if (updatedDict.id === d.id) {
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
    case REMOVE_DICTIONARY:
      const { payload: removedDict } = action;
      return {
        ...state,
        dicts: state.dicts.filter(d => d !== removedDict),
        ui: {
          ...state.ui,
          selectedDictIndex: 0
        }
      };
    case ADD_DICTIONARY:
      const newDict = createNewDictionary();
      const dicts = [newDict, ...state.dicts];
      return {
        ...state,
        dicts,
        ui: {
          ...state.ui,
          selectedDictIndex: 0 // selected new created
        }
      };
  }
  return state;
};
