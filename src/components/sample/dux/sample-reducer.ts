import { AnyAction } from 'redux';
import { IAction } from '@src/app/dux';
import { incrementCounter } from '@src/components/sample/dux/sample-actions';

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
  const a = incrementCounter;
  console.info(a.name);
  switch (type) {
    case incrementCounter.name:
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
