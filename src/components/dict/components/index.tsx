import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '@src/app/dux/root-reducer';
import { dictsSelector } from '../dux/dict-selectors';
import { IDict } from '../@types/api';
import { fetchDictionary } from '../dux/dict-actions';
import './style.css';
import { DictValuesEditor } from './dict-values-editor';

type IState = {
  selectedDictIndex: number;
};
const Wrapper = ({ title, children }: any) => (
  <div>
    <h1>{title}</h1>
    {children}
  </div>
);

class DictionaryDisplayComponent extends React.Component<IProps, IState> {
  state: IState = {
    selectedDictIndex: 0
  };

  componentDidMount() {
    this.props.fetchDictionary();
  }

  selectDictionary = (event: any) => {
    this.setState({ selectedDictIndex: event.target.selectedIndex });
  };

  renderDictOption = (dict: IDict) => (
    <option key={dict.name} label={dict.name} value={dict.name} />
  );

  render() {
    const { dicts, title = 'Foo' } = this.props;
    if (!dicts || !dicts.length) {
      return <Wrapper title={title}>Loading</Wrapper>;
    }

    const { selectedDictIndex } = this.state;
    const selectedDict = dicts[selectedDictIndex];
    return (
      <Wrapper title={title}>
        <form>
          <label>
            Select dictionary:
            <select value={selectedDict.name} onChange={this.selectDictionary}>
              {dicts.map(this.renderDictOption)}
            </select>
            <DictValuesEditor values={selectedDict.values} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </Wrapper>
    );
  }
}

// #region @connect
interface IStateToProps {
  dicts: IDict[];
}
interface IDispatchToProps {
  fetchDictionary: () => void;
}
interface IOwnProps {
  title?: string;
}
type IProps = IStateToProps & IDispatchToProps & IOwnProps;

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
