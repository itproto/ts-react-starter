import * as React from 'react';
import { DictValues, IDict } from '../../@types/api';
import './spreadsheet.module.css';
import * as cx from 'classnames';
import {
  isEmptyString,
  isDuplicateKey,
  isFormReady,
  uid,
  isDirty
} from './validation';

export interface IDictValuesProps {
  dictionary: IDict;
  onSave: (dict: IDict) => void;
}

type IState = {
  editedValues: DictValues[];
  editedName?: string;
  dictionary?: IDict;
  newEntry: DictValues;
};

const defaultNewEntry = { from: '', to: '', id: 'new' };
export class DictEntriesEditor extends React.Component<
  IDictValuesProps,
  IState
> {
  state: IState = {
    editedValues: [],
    dictionary: undefined,
    newEntry: { ...defaultNewEntry },
    editedName: undefined
  };

  static getDerivedStateFromProps(
    nextProps: IDictValuesProps,
    prevState: IState
  ) {
    const newDict = nextProps.dictionary;
    if (newDict !== prevState.dictionary) {
      return {
        dictionary: newDict,
        name: newDict.name,
        editedName: newDict.name,
        editedValues: [...newDict.values]
      };
    }
    return null;
  }

  onChangeValue = (entry: DictValues) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { editedValues } = this.state;
    const to = event.target.value;

    this.setState({
      editedValues: editedValues.map(e => {
        if (e.id === entry.id) {
          return { ...entry, to };
        }
        return e;
      })
    });
  };

  onChangeKey = (entry: DictValues) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { editedValues } = this.state;
    const from = event.target.value;

    this.setState({
      editedValues: editedValues.map(e => {
        if (e.id === entry.id) {
          return { ...entry, from };
        }
        return e;
      })
    });
  };

  removeEntry = (entry: DictValues) => () => {
    const { editedValues } = this.state;
    this.setState({
      editedValues: editedValues.filter(e => e !== entry)
    });
  };

  addNewEntry = (event: React.MouseEvent) => {
    event.preventDefault();
    const { editedValues, newEntry } = this.state;

    const entry = { ...newEntry, id: uid() };
    this.setState({
      editedValues: [...editedValues, entry],
      newEntry: { ...defaultNewEntry }
    });
  };

  renderEntry = (entry: DictValues) => {
    const { from, to, id } = entry;
    const { values } = this.props.dictionary;
    return (
      <tr key={id}>
        <td>
          <input
            className={cx({
              dirty: isDirty(entry, values),
              invalid:
                isEmptyString(from) ||
                isDuplicateKey(from, this.state.editedValues)
            })}
            value={from}
            onChange={this.onChangeKey(entry)}
          />
        </td>
        <td>
          <input
            className={cx({
              dirty: isDirty(entry, values, 'to'),
              invalid: isEmptyString(to)
            })}
            value={to}
            onChange={this.onChangeValue(entry)}
          />
        </td>
        <td>
          <button onClick={this.removeEntry(entry)}>x</button>
        </td>
      </tr>
    );
  };

  onChangeNew = (field: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { newEntry } = this.state;
    const value = event.target.value;

    this.setState({
      newEntry: {
        ...newEntry,
        [field]: value
      }
    });
  };

  renderNewEntry = () => {
    const entry = this.state.newEntry;
    const { from, to, id } = entry;
    return (
      <tr key={id}>
        <td>
          <input
            className={cx({
              invalid: isDuplicateKey(from, this.state.editedValues, true)
            })}
            value={from}
            onChange={this.onChangeNew('from')}
          />
        </td>
        <td>
          <input value={to} onChange={this.onChangeNew('to')} />
        </td>
        <td>
          <button onClick={this.addNewEntry}>+</button>
        </td>
      </tr>
    );
  };

  onSave = (event: any) => {
    event.preventDefault();
    const { dictionary } = this.props;
    const { editedName, editedValues } = this.state;
    this.props.onSave({
      ...dictionary,
      name: editedName!,
      values: editedValues
    });
  };

  nameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      editedName: event.target.value
    });
  };

  renderName = () => {
    const { editedName } = this.state;
    return (
      <div className="form-group">
        <label>Name</label>
        <input
          className={cx('form-control', {
            invalid: editedName !== undefined && isEmptyString(editedName)
          })}
          value={
            editedName === undefined ? this.props.dictionary.name : editedName
          }
          onChange={this.nameChangeHandler}
        />
      </div>
    );
  };

  render() {
    const { editedValues, editedName } = this.state;
    return (
      <div>
        {this.renderName()}
        <table className="spreadsheet">
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {editedValues.map(entry => this.renderEntry(entry))}
            {this.renderNewEntry()}
          </tbody>
        </table>

        <div className="pull-right">
          <button
            type="button"
            className="btn btn-primary"
            disabled={
              !isFormReady(editedName, editedValues, this.props.dictionary)
            }
            onClick={this.onSave}
          >
            Save
          </button>
        </div>
      </div>
    );
  }
}
