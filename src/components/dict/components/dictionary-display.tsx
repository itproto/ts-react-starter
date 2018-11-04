import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '@src/app/dux/root-reducer';
import {
  dictsSelector,
  selectedDictIndexSelector
} from '../dux/dict-selectors';
import { IDict, DictValues } from '../@types/api';
import {
  fetchDictionary,
  updateDictionary,
  selectDictionaryIndex,
  addDictionary,
  removeDictionary
} from '../dux/dict-actions';
import './style.css';
import { DictEntriesEditor } from './dict-entries/dict-entries-editor';
import { Wrapper } from '@src/common/components/wrapper/wrapper';

type IState = {
  editedName?: string;
};

class DictionaryDisplayComponent extends React.Component<IProps, IState> {
  state: IState = {
    editedName: undefined
  };

  componentDidMount() {
    this.props.fetchDictionary();
  }

  onSaveValues = (editedValues: DictValues[]) => {
    this.props.updateDictionary({
      ...this.selectedDict,
      values: editedValues
    });
  };

  selectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDictIndex = event.target.selectedIndex;
    this.selectDictionary(selectedDictIndex);
  };

  addDictionaryHandler = () => {
    this.props.addDictionary();
  };

  removeDictionaryHandler = () => {
    this.props.removeDictionary(this.selectedDict);
  };

  selectDictionary = (selectedDictIndex: number) => {
    this.props.selectDictionaryIndex(selectedDictIndex);
    this.setState({ editedName: undefined }); // can be retrieved from redux state also
  };

  get selectedDict() {
    const { dicts } = this.props;
    const { selectedDictIndex } = this.props;
    return dicts[selectedDictIndex];
  }

  renderDictOption = (dict: IDict) => (
    <option key={dict.id} label={dict.name} value={dict.name} />
  );

  render() {
    const { dicts, title = 'Dictionary' } = this.props;
    if (!dicts || !dicts.length) {
      return <Wrapper title={title}>Loading</Wrapper>;
    }

    return (
      <Wrapper title={title}>
        <form>
          <div className="form-group">
            <label>Select dictionary</label>
            <div className="input-group">
              <select
                value={this.selectedDict && this.selectedDict.name}
                onChange={this.selectHandler}
                className="form-control"
              >
                {dicts.map(this.renderDictOption)}
              </select>
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={this.addDictionaryHandler}
                >
                  +
                </button>
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={this.removeDictionaryHandler}
                  disabled={dicts.length < 2}
                >
                  -
                </button>
              </div>
            </div>
          </div>

          {this.selectedDict && (
            <DictEntriesEditor
              onSave={this.onSaveValues}
              dictionary={this.selectedDict}
            />
          )}
          <input type="submit" value="Upload" />
        </form>
      </Wrapper>
    );
  }
}

// #region @connect
interface IStateToProps {
  dicts: IDict[];
  selectedDictIndex: number;
}
interface IDispatchToProps {
  fetchDictionary: () => void;
  updateDictionary: (dict: IDict) => void;
  removeDictionary: (dict: IDict) => void;
  addDictionary: () => void;
  selectDictionaryIndex: (selectedDictIndex: number) => void;
}
interface IOwnProps {
  title?: string;
}
type IProps = IStateToProps & IDispatchToProps & IOwnProps;

const mapStateToProps = (state: RootState) => ({
  dicts: dictsSelector(state),
  selectedDictIndex: selectedDictIndexSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchDictionary,
      updateDictionary,
      selectDictionaryIndex,
      removeDictionary,
      addDictionary
    },
    dispatch
  );

export const DictionaryDisplay = connect(
  mapStateToProps,
  mapDispatchToProps
)(DictionaryDisplayComponent);
// #endregion
