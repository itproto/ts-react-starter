import { productsSelector } from '../prod-selectors';

describe('products>dux>selector', () => {
  it('should select products from state', () => {
    const state = {
      products: {
        items: [
          {
            name: 'Apple iPhone 6s',
            color: 'Anthracite',
            price: 769
          },
          {
            name: 'Samsung Galaxy S8',
            color: 'Midnight Black',
            price: 569
          }
        ]
      }
    };
    expect(productsSelector(state).length).toBe(2);
    expect(productsSelector(state)[1]).toEqual({
      name: 'Samsung Galaxy S8',
      color: 'Midnight Black',
      price: 569
    });
  });
});
