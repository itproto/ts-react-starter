import { reducer } from '../prod-reducer';
import { GET_PRODUCTS } from '../prod-actions';
import { getActionFor } from '../../../../app/dux/middlewares/call-api-middleware';
import { getProducts } from '../../__fixtures__/products.fixture';
describe('products>dux>reducer', () => {
  it('should by default return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      items: []
    });
  });
  it('should handle FETCH/products/SUCC', () => {
    expect(
      reducer(undefined, {
        type: getActionFor(GET_PRODUCTS),
        response: getProducts()
      })
    ).toEqual({
      items: getProducts()
    });
  });
});
