import * as React from 'react';
import { DictValues } from '../../@types/api';
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
  values: DictValues[];
  onSave: (editedValues: DictValues[]) => void;
}

type IState = {
  editedValues: DictValues[];
  values?: DictValues[];
  newEntry: DictValues;
};

const defaultNewEntry = { from: '', to: '', id: 'new' };
export class DictEntriesEditor extends React.Component<
  IDictValuesProps,
  IState
> {
  state: IState = {
    editedValues: [],
    values: undefined,
    newEntry: { ...defaultNewEntry }
  };

  static getDerivedStateFromProps(
    nextProps: IDictValuesProps,
    prevState: IState
  ) {
    const newValues = nextProps.values;
    if (newValues !== prevState.values) {
      return {
        values: newValues,
        editedValues: newValues
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
    return (
      <tr key={id}>
        <td>
          <input
            className={cx({
              dirty: isDirty(entry, this.props.values),
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
              dirty: isDirty(entry, this.props.values),
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
    this.props.onSave(this.state.editedValues);
  };

  render() {
    const { editedValues, values } = this.state;
    return (
      <div>
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
        <button
          disabled={!isFormReady(editedValues, values)}
          onClick={this.onSave}
        >
          Save
        </button>
      </div>
    );
  }
}
