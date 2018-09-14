import * as React from 'react';
import './app.css';
import { Posts } from '@src/components/blog/posts';

export class App extends React.Component {
  // tslint:disable-next-line:no-empty
  componentDidMount() {}
  public render() {
    return (
      <div className="App">
        <Posts label="Foo" />
      </div>
    );
  }
}
