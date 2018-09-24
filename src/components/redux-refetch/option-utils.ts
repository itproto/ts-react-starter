import { isArray, isFunction } from 'lodash';

export interface IReduxPrefetchOption<P extends object = any, K = keyof P> {
  propertyName: K;
  prefetchMethodName: K;
  paramNames?: K[];
  comparator?: (oldVal: P, newVal: P) => boolean;
}

export type PrefetchOptions<P extends object = any, K = keyof P> =
  | K[]
  | IReduxPrefetchOption<P, K>;

const converArrayToOption = <P extends object = any, K = keyof P>(
  option: K[]
) => {
  const [propertyName, prefetchMethodName, ...paramNames] = option;
  return {
    propertyName: propertyName,
    prefetchMethodName: prefetchMethodName,
    paramNames: paramNames
  };
};

export const toTypedOptions = <P extends object = any, K = keyof P>(
  options: PrefetchOptions<P, K>[]
): IReduxPrefetchOption<P, K>[] => {
  if (!isArray(options[0])) {
    return options as IReduxPrefetchOption<P, K>[];
  }

  const stringOptions = options as Array<K[]>;
  return stringOptions.map(converArrayToOption);
};

export const getOptionPropertyNames = <P extends object = any, K = keyof P>(
  option: IReduxPrefetchOption<P, K>
) => {
  const { propertyName, prefetchMethodName, paramNames = [] } = option;
  return [propertyName, prefetchMethodName, ...paramNames];
};

export interface IReduxPrefetchOptionValue<P> {
  propertyValue?: any;
  prefetchMethod?: (...params: P[]) => void;
  params?: any[];
}

export const isOptionValid = <P extends object>(
  props: P,
  option: IReduxPrefetchOption<P>
): boolean => {
  return option && isFunction(props[option.prefetchMethodName]);
};

export const getOptionValues = <P extends object>(
  props: P,
  option: IReduxPrefetchOption<P>
): IReduxPrefetchOptionValue<P> => {
  const { propertyName, prefetchMethodName, paramNames } = option;
  return {
    propertyValue: props[propertyName],
    prefetchMethod: (props[prefetchMethodName] as any) as (
      ...params: P[]
    ) => void,
    params: paramNames && paramNames.map(paramName => props[paramName])
  };
};

export const areValuesReady = <P extends object>(
  props: P,
  options: IReduxPrefetchOption<P>[]
) => {
  return options.every(option => props[option.propertyName] !== undefined);
};

const paramsReadyToPrefetch = <P extends object>(
  props: P,
  option: IReduxPrefetchOption<P>
) => {
  return (
    option.paramNames === undefined ||
    option.paramNames.every(paramName => props[paramName] !== undefined)
  );
};

export const optionsReadyToPrefetch = <P extends object>(
  props: P,
  options: IReduxPrefetchOption<P>[],
  skipPropertyNames: Array<keyof P> = []
) => {
  return options
    .filter(option => props[option.propertyName] === undefined)
    .filter(option => !skipPropertyNames.includes(option.propertyName))
    .filter(option => paramsReadyToPrefetch(props, option));
};

export const prefetchOption = <P extends object>(
  props: P,
  option: IReduxPrefetchOption<P>
) => {
  const { prefetchMethod, params } = getOptionValues(props, option);
  if (!prefetchMethod) {
    return;
  }

  params ? prefetchMethod(...params) : prefetchMethod();
  return option;
};
