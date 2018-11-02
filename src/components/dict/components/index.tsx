import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '@src/app/dux/root-reducer';
import { dictsSelector } from '../dux/dict-selectors';
import { IDict } from '../@types/api';
import { fetchDictionary } from '../dux/dict-actions';

type IState = {
  count: number;
};

class DictionaryDisplayComponent extends React.Component<IProps, IState> {
  state: IState = {
    count: 0
  };

  componentDidMount() {
    this.props.fetchDictionary();
  }

  render() {
    const { dicts } = this.props;
    if (!dicts || !dicts.length) {
      return <div>Loading</div>;
    }
    return <div>{dicts[0].name}</div>;
  }
}

// #region @connect
interface IStateToProps {
  dicts: IDict[];
}
interface IDispatchToProps {
  fetchDictionary: () => void;
}
type IProps = IStateToProps & IDispatchToProps;

const mapStateToProps = (state: RootState) => ({
  dicts: dictsSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ fetchDictionary }, dispatch);

export const DictionaryDisplay = connect(
  mapStateToProps,
  mapDispatchToProps
)(DictionaryDisplayComponent);
// #endregion
