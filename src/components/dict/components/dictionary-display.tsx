import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '@src/app/dux/root-reducer';
import { dictsSelector } from '../dux/dict-selectors';
import { IDict, DictValues } from '../@types/api';
import {
  fetchDictionary,
  updateDictionary,
  selectDictionaryIndex
} from '../dux/dict-actions';
import './style.css';
import { DictEntriesEditor } from './dict-entries/dict-entries-editor';
import { Wrapper } from '@src/common/components/wrapper/wrapper';

type IState = {
  selectedDictIndex: number;
  editedName?: string;
};

class DictionaryDisplayComponent extends React.Component<IProps, IState> {
  state: IState = {
    selectedDictIndex: -1,
    editedName: undefined
  };

  componentDidMount() {
    this.props.fetchDictionary();
  }

  onSaveValues = (editedValues: DictValues[]) => {
    const { dicts } = this.props;

    const { selectedDictIndex } = this.state;
    const selectedDict = dicts[selectedDictIndex];

    this.props.updateDictionary({
      ...selectedDict,
      values: editedValues
    });
  };

  selectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDictIndex = event.target.selectedIndex;
    this.selectDictionary(selectedDictIndex);
  };

  nameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      editedName: event.target.value
    });
  };

  selectDictionary = (selectedDictIndex: number) => {
    this.props.selectDictionaryIndex(selectedDictIndex);
    this.setState({ selectedDictIndex, editedName: undefined }); // can be retrieved from redux state also
  };

  renderDictOption = (dict: IDict) => (
    <option key={dict.name} label={dict.name} value={dict.name} />
  );

  componentDidUpdate() {
    const { selectedDictIndex } = this.state;
    const { dicts } = this.props;

    if (selectedDictIndex === -1 && dicts && dicts.length) {
      this.selectDictionary(0);
    }
  }

  render() {
    const { dicts, title = 'Dictionary' } = this.props;
    if (!dicts || !dicts.length) {
      return <Wrapper title={title}>Loading</Wrapper>;
    }

    const { selectedDictIndex, editedName } = this.state;

    const selectedDict = dicts[selectedDictIndex];
    return (
      <Wrapper title={title}>
        <form>
          <div className="form-group">
            <label>Select dictionary</label>
            <div className="input-group">
              <select
                value={selectedDict && selectedDict.name}
                onChange={this.selectHandler}
                className="form-control"
              >
                {dicts.map(this.renderDictOption)}
              </select>
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button">
                  +
                </button>
                <button className="btn btn-outline-secondary" type="button">
                  -
                </button>
              </div>
            </div>
          </div>

          {selectedDict && (
            <>
              <div className="form-group">
                <label>Name</label>
                <input
                  className="form-control"
                  value={
                    editedName === undefined ? selectedDict.name : editedName
                  }
                  onChange={this.nameChangeHandler}
                />
              </div>
              <DictEntriesEditor
                onSave={this.onSaveValues}
                values={selectedDict.values}
              />
            </>
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
}
interface IDispatchToProps {
  fetchDictionary: () => void;
  updateDictionary: (dict: IDict) => void;
  selectDictionaryIndex: (selectedDictIndex: number) => void;
}
interface IOwnProps {
  title?: string;
}
type IProps = IStateToProps & IDispatchToProps & IOwnProps;

const mapStateToProps = (state: RootState) => ({
  dicts: dictsSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    { fetchDictionary, updateDictionary, selectDictionaryIndex },
    dispatch
  );

export const DictionaryDisplay = connect(
  mapStateToProps,
  mapDispatchToProps
)(DictionaryDisplayComponent);
// #endregion
