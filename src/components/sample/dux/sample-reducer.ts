import { AnyAction } from 'redux';
import { IAction } from '@src/app/dux';

export interface ISampleState {
  counter: number;
  message?: string;
}

export const initialState: ISampleState = {
  counter: 0
};

type ReducerAction = IAction<number> | AnyAction;

export const reducer = (
  state = initialState,
  action: ReducerAction
): ISampleState => {
  const { type, payload: val = 1 } = action;
  switch (type) {
    case 'INC':
      return {
        ...state,
        counter: state.counter + val
      };
    case 'DEC':
      return {
        ...state,
        counter: state.counter - val
      };
    case 'HI':
      return {
        ...state,
        message: `Hi ${state.counter}`
      };
  }
  return state;
};
