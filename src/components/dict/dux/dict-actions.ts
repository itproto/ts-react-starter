import { ICallApiAction } from '@src/app/dux/middlewares/call-api-middleware';
import { api } from '@src/app/dux/service/api';
import { reducerKey } from './dict-config';

// #region ACTIONS
export const GET_DICTIONARY = reducerKey; // reuse for simplicity
const endpoint = 'dictionaries';
// #endregion

// #region action-creators
export const fetchDictionary = (): ICallApiAction => ({
  baseFetchActionType: GET_DICTIONARY,
  callAPI: () => api.get(endpoint)
});
// #endregion
