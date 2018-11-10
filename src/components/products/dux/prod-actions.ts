import { ICallApiAction } from '@src/app/dux/middlewares/call-api-middleware';
import { api } from '@src/app/dux/service/api';
import { reducerKey } from './prod-config';

// #region ACTIONS
export const GET_PRODUCTS = reducerKey; // reuse for simplicity
const endpoint = 'products.json';
// #endregion

// #region action-creators
export const fetchProducts = (): ICallApiAction => ({
  baseFetchActionType: GET_PRODUCTS,
  callAPI: () => api.get(endpoint)
});
// #endregion
