import * as React from 'react';

import {
  PrefetchOptions,
  toTypedOptions,
  areValuesReady,
  optionsReadyToPrefetch,
  prefetchOption
} from './option-utils';

export const connectReduxRefetch = (srcOptions: PrefetchOptions[]) => (
  Component: React.ComponentType | any
) => {
  const options = toTypedOptions(srcOptions);
  return class WithRefetch<R extends object = any> extends React.Component<R> {
    requested = new Map();
    componentDidMount() {
      // init prefetch for not ready options with ready params
      this.prefetchReadyOptions();
    }
    componentDidUpdate() {
      const { props, requested } = this;

      //1. remove fetched
      Array.from(requested.keys()).forEach(propName => {
        if ((props as any)[propName] !== undefined) {
          requested.delete(propName);
        }
      });

      //2. prefetch if situation has changed
      this.prefetchReadyOptions();

      // ! we might need to check edge cases forparam change when
      // 1. request is in progress
      // 2. targetPropert != undefined
    }

    prefetchReadyOptions() {
      const { props, requested } = this;
      const skipOptions = Array.from(requested.keys());
      optionsReadyToPrefetch(props, options, skipOptions).map(option => {
        prefetchOption(props, option);
        requested.set(option.propertyName, option);
      });
    }

    render() {
      const { props } = this;
      if (!areValuesReady(props, options)) {
        return <div>Loading</div>;
      }
      return <Component />;
    }
  };
};
