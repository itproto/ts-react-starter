import * as React from 'react';
import { get, values } from 'lodash';
import { ReactHTML } from 'react';
import { Loadable } from 'react-loadable';
const NotFoundInChunk = () => <div>{} not found in chunk</div>;
export type ReactCompAll = keyof ReactHTML;
const isReactComponentClass = (val: CodeChunk) => {
  return get(val, 'prototype.isReactComponent');
};

const getFirstReactComponentInChunk = (chunk: CodeChunk) => {
  if (!chunk) {
    return undefined;
  }
  return values(chunk).filter(isReactComponentClass)[0];
};

type CodeChunk = any;
type ReactTempElement = any;

function Loading() {
  return <div>Loading...</div>;
}

export const loadComponent = async (
  path?: string,
  compName?: string
): Promise<ReactTempElement> => {
  let chunk: CodeChunk;
  switch (path) {
    case 'blog/posts':
      console.info(a);
      chunk = await import(/* webpackChunkName: "blog-posts" */
      `@src/components/blog/posts`);
      break;
  }
  if (!chunk) {
    return NotFoundInChunk;
  }
  if (isReactComponentClass(chunk)) {
    return chunk;
  }

  if (compName) {
    return chunk[compName] || NotFoundInChunk;
  }

  return getFirstReactComponentInChunk(chunk) || NotFoundInChunk;
};
