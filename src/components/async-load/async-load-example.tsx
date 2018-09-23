import * as React from 'react';
import { loadComponent } from './load-component';
interface IState {
  component?: React.Component;
  componentPath?: string;
}

interface ILayoutItem {
  path: string;
}

export class AsyncLoadComponentExample extends React.Component<{}, IState> {
  state = {
    component: undefined,
    componentPath: undefined
  };
  loadPosts = async () => {
    const { componentPath } = this.state;
    const component = await loadComponent(componentPath);
    this.setState({
      component
    });
  };
  async componentDidMount() {
    const jsonLayout = (await fetch('http://localhost:9000/layout').then(r =>
      r.json()
    )) as ILayoutItem[];
    const componentPath = jsonLayout[0].path;
    this.setState({
      componentPath
    });
  }

  render() {
    const { component } = this.state;
    if (component) {
      return React.createElement(component);
    }

    return (
      <>
        {component ? React.createElement(component) : null}
        <button onClick={this.loadPosts}>Load</button>
      </>
    );
  }
}
