import { fetchProducts, GET_PRODUCTS } from '../prod-actions';
import { api } from '../../../../app/dux/service/api';

api.get = jest.fn();
describe('products>dux>actions', () => {
  beforeEach(() => {
    api.get = jest.fn();
  });
  it('should create products fetch middleware action', () => {
    const action = fetchProducts();
    expect(action.baseFetchActionType).toBe(GET_PRODUCTS);

    action.callAPI(); // can be done more elaborate testing with redux-mock-store
    expect(api.get).toHaveBeenCalledWith('products');
  });
});
