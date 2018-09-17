import * as React from 'react';

interface WithLoadingProps {
  loading: boolean;
}

export const withLoadingFactory = (Loader: () => JSX.Element) => <
  P extends object
>(
  Component: React.ComponentType<P>
) =>
  class WithLoading extends React.Component<P & WithLoadingProps> {
    render() {
      const { loading, ...props } = this.props as WithLoadingProps;
      return loading ? <Loader /> : <Component {...props} />;
    }
  };
