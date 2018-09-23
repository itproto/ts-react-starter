import * as React from 'react';
import './app.css';
import { ControRoom } from '@src/components/sample/components/control-room';
import { AsyncLoadComponentExample } from '@src/components/async-load/async-load-example';
import { SiteFeedback } from '@src/components/site-feedback/site-feedback';

export class App extends React.Component<{}, any> {
  render() {
    return (
      <div className="App">
        <ControRoom />
        <AsyncLoadComponentExample />
        <SiteFeedback />
      </div>
    );
  }
}
