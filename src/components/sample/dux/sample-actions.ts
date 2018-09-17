import { createAction } from 'redux-actions';
import { IAction } from '@src/app/dux';
import { AnyAction } from 'redux';

// const pattern = `@sampleApp/${actionName}`
// const generateSimpleActionName = (ns:string, actionName:string) =>

export const incrementCounter = createAction(
  'INC',
  (value: number = 1) => value,
  () => ({ admin: false })
);

export const formatUnicorn = (str: string, args: any) => {
  if (!args.length) {
    return str;
  }
  Object.keys(args).forEach(key => {
    str = str.replace(new RegExp('\\{' + key + '\\}', 'gi'), args[key]);
  });
  return str;
};

// const pattern = '{appName}/{appNamespace}/{modelName}/{requestPhase}';

const createAppAction = <P = undefined, M = undefined>(
  baseType: String,
  payloadCreator?: (...params: any[]) => P,
  metaCreator?: () => M
) => {
  return (...actionParams: any[]): IAction<P> | AnyAction => {
    return {
      type: baseType,
      payload: payloadCreator ? payloadCreator(...actionParams) : undefined,
      meta: metaCreator ? metaCreator() : undefined
    };
  };
};

export const decrementCounter = createAppAction(
  'DEC',
  (value: number = 1) => value,
  () => ({ admin: true })
);
