import * as React from 'react';
import { __tests__ } from '../products-list';

const { ProductsListComponent } = __tests__;
describe('product list component', () => {
  it('should render component', () => {
    expect(<ProductsListComponent fetchProducts={jest.fn()} products={[]} />);
  });
});
