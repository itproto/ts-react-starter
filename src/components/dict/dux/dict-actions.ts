import { ICallApiAction } from '@src/app/dux/middlewares/call-api-middleware';
import { api } from '@src/app/dux/service/api';
import { reducerKey } from './dict-config';
import { IAction } from '@src/app/dux';
import { IDict } from '../@types/api';

// #region ACTIONS
export const GET_DICTIONARY = reducerKey; // reuse for simplicity
export const UPDATE_DICTIONARY = 'UPDATE'; // reuse for simplicity
const endpoint = 'dictionaries';
// #endregion

// #region action-creators
export const updateDictionary = (payload: IDict): IAction<IDict> => ({
  type: UPDATE_DICTIONARY,
  payload
});

export const fetchDictionary = (): ICallApiAction => ({
  baseFetchActionType: GET_DICTIONARY,
  callAPI: () => api.get(endpoint)
});
// #endregion
