import { isArray, isFunction } from 'lodash';

// #region OPTIONS_INPUTs
/**
 * Options can be entered using different foormats
 *
 * 1. As string[][]
 * [['foo', 'getFoo', 'bar']]
 * 2. Simple string[]
 * ['foo', 'getFoo', 'bar']
 * 3. Or nicely typed as IReduxPrefetchOption[]
 * [
 *  {
 *    propertyName: 'foo',
 *    prefetchMethodName: 'getFoo',
 *    paramNames: ['bar']
 *  }
 * ]
 * Option 1, 2 is transformed to 3
 */
export interface IReduxPrefetchOption<P extends object = any, K = keyof P> {
  propertyName: K;
  prefetchMethodName: K;
  paramNames?: K[];
  comparator?: (oldVal: P, newVal: P) => boolean;
}

type PrefetchOptions<P extends object = any, K = keyof P> =
  | K[]
  | IReduxPrefetchOption<P, K>;

export type OptionsInput<P extends object> =
  | Array<PrefetchOptions<P>>
  | PrefetchOptions<P>;

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

export const toTypedOptions = <P extends object = any, K = keyof P>(
  srcOptions: OptionsInput<P>
): IReduxPrefetchOption<P, K>[] => {
  const options = isArray(srcOptions[0]) ? 
  if (!isArray(options[0])) {
    return options as IReduxPrefetchOption<P, K>[];
  }

  const stringOptions = options as Array<K[]>;
  return stringOptions.map(converArrayToOption);
};
// #endregion

export const getOptionPropertyNames = <P extends object = any, K = keyof P>(
  option: IReduxPrefetchOption<P, K>
) => {
  const { propertyName, prefetchMethodName, paramNames = [] } = option;
  return [propertyName, prefetchMethodName, ...paramNames];
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
