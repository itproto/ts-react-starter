import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  incrementCounter,
  decrementCounter
} from '@src/components/sample/dux/sample-actions';

export const ControlRoomComponent: React.SFC<IDispatchToProps> = ({
  incrementCounter,
  decrementCounter
}) => {
  return (
    <div>
      <button onClick={() => incrementCounter()}>INC</button>
      <button onClick={() => decrementCounter()}>DEC</button>
    </div>
  );
};

// #region @connect
interface IDispatchToProps {
  incrementCounter: (value?: number) => void;
  decrementCounter: (value?: number) => void;
}
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    ...bindActionCreators({ incrementCounter, decrementCounter }, dispatch)
  };
};

export const ControRoom = connect<undefined, IDispatchToProps>(
  undefined,
  mapDispatchToProps
)(ControlRoomComponent);
// #endregion
