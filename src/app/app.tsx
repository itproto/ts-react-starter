import * as React from 'react';
import './app.css';
import { DictionaryDisplay } from '@src/components/dict/components';

export class App extends React.Component<{}, {}> {
  render() {
    return (
      <div className="app">
        <DictionaryDisplay title="Dictionary" />
      </div>
    );
  }
}
