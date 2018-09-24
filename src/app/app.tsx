import * as React from 'react';
import './app.css';
import { connectReduxRefetch } from '@src/components/redux-refetch/connect-redux-refetch';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { incrementCounter } from '@src/components/sample/dux/sample-actions';

interface IFooProps {
  foo?: number;
}
function Foo(props: IFooProps) {
  return <div>Ready {props.foo}</div>;
}

// #region @connect
interface IStateToProps {
  foo: any;
  bar: any;
}
interface IDispatchToProps {
  incrementCounter: (value?: number) => void;
}
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    ...bindActionCreators({ incrementCounter }, dispatch)
  };
};
const mapStateToProps = (ownProps: any): IStateToProps => {
  return {
    ...ownProps
  };
};
const ConnectedCompot = compose(
  connect<IStateToProps, IDispatchToProps>(
    mapStateToProps,
    mapDispatchToProps
  ),
  connectReduxRefetch([
    {
      propertyName: 'foo', // coming from wrapped
      prefetchMethodName: 'incrementCounter',
      paramNames: ['bar']
    }
  ])
)(Foo) as any;
// #endregion

export class App extends React.Component<{}, any> {
  state: any = {};
  render() {
    const { foo, bar } = this.state;
    return (
      <div className="App">
        <button onClick={() => this.setState({ bar: Math.random() })}>
          Change bar
        </button>
        <button onClick={() => this.setState({ bar: undefined })}>
          Reset bar
        </button>
        <button onClick={() => this.setState({ foo: [2, 3, 8] })}>
          Change foo
        </button>
        <button onClick={() => this.setState({ foo: undefined })}>
          Reset foo
        </button>
        <ConnectedCompot bar={bar} foo={foo} />
      </div>
    );
  }
}
