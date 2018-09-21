import * as React from 'react';
import './app.css';
import { loadComponent } from '@src/components/async-load/load-component';
import { ControRoom } from '@src/components/sample/components/control-room';
import { FrameTest } from '@src/components/frame-test/frame-test';
import { FeedbackDrawer } from '@src/components/feedback-drawer/feedback-drawer';
// import { FrameTest } from '@src/components/frame-test/frame-test';
// import { FrameTest } from '@src/components/frame-test/frame-test';
// import { Posts } from @src/components/blog/posts';

interface IState {
  component?: React.Component;
  componentPath?: string;

  selectedElement?: any;
}

interface ILayoutItem {
  path: string;
}

export class App extends React.Component<{}, IState> {
  state = {
    component: undefined,
    componentPath: undefined,
    selectedElement: undefined
  };
  loadPosts = async () => {
    const { componentPath } = this.state;
    const component = await loadComponent(componentPath);
    this.setState({
      component
    });
  };
  async foo() {
    const jsonLayout = (await fetch('http://localhost:9000/layout').then(r =>
      r.json()
    )) as ILayoutItem[];
    const componentPath = jsonLayout[0].path;
    this.setState({
      componentPath
    });
  }

  elementSelectHandler = (selectedElement: any) => {
    this.setState({
      selectedElement
    });
  };
  render() {
    const { component, selectedElement } = this.state;
    if (component) {
      return React.createElement(component);
    }

    return (
      <div className="App">
        {component ? React.createElement(component) : null}
        <button onClick={this.loadPosts}>Load</button>
        <FeedbackDrawer selectedElement={selectedElement} />
        <ControRoom />
        <FrameTest onElementSelect={this.elementSelectHandler} />
      </div>
    );
  }
}
