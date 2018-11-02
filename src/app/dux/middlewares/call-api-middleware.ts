import { Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { isFunction, isString } from 'util';
import { IAction } from '@src/app/dux/@types';

export interface ICallApiAction {
  baseFetchActionType: string;
  callAPI: () => Promise<any>;
  shouldCallAPI?: () => Boolean;
  payload?: any;
}

export const enum FetchPhase {
  Request = 'REQ',
  Success = 'SUCC',
  Failure = 'FAIL'
}

export interface IResponseAction<R = any> extends IAction {
  response: R;
}
export interface IResponseErrorAction<E = any> extends IAction {
  error: E;
}

export const getActionFor = (
  baseType: string,
  phase: FetchPhase = FetchPhase.Success
) => `FETCH/${baseType}/${phase}`;

export function callAPIMiddleware() {
  const middleware: Middleware = ({ dispatch, getState }: MiddlewareAPI) => (
    next: Dispatch
  ) => action => {
    const {
      baseFetchActionType,
      callAPI,
      shouldCallAPI = () => true,
      payload = {}
    } = action;
    if (!baseFetchActionType) {
      return next(action);
    }
    if (!isString(baseFetchActionType)) {
      throw new Error('Expected baseType for fetch action.');
    }
    if (!isFunction(callAPI)) {
      throw new Error('Expected callAPI to be a function.');
    }
    if (!shouldCallAPI(getState())) {
      return;
    }
    const [requestType, successType, failureType] = [
      getActionFor(baseFetchActionType, FetchPhase.Request),
      getActionFor(baseFetchActionType, FetchPhase.Success),
      getActionFor(baseFetchActionType, FetchPhase.Failure)
    ];
    dispatch({
      payload,
      type: requestType
    });
    return callAPI().then(
      (response: any) =>
        dispatch({
          payload,
          response: response.data,
          type: successType
        } as IResponseAction),
      (error: any) =>
        dispatch({
          payload,
          error,
          type: failureType
        } as IResponseErrorAction)
    );
  };

  return middleware;
}
