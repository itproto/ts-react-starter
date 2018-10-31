import {
  IProduct,
  ProductColorMap,
  ProductColorMapping
} from '@src/components/products/dux/@types';
import { createAsyncAction, createStandardAction } from 'typesafe-actions';
export const fetchProducts = createAsyncAction(
  '@products/FETCH_PRODUCTS_REQUEST',
  '@products/FETCH_PRODUCTS_SUCCESS',
  '@products/FETCH_PRODUCTS_FAILURE'
)<void, IProduct[], Error>();

export const fetchColorMappings = createAsyncAction(
  '@products/FETCH_COLOR_MAPPING_REQUEST',
  '@products/FETCH_COLOR_MAPPING_SUCCESS',
  '@products/FETCH_COLOR_MAPPING_FAILURE'
)<void, ProductColorMap, Error>();

export const ADD_MAPPING = createStandardAction('@products/ADD_MAPPING')<
  ProductColorMapping
>();
export const UPDATE_MAPPING = createStandardAction('@products/ADD_MAPPING')<
  ProductColorMapping
>();
