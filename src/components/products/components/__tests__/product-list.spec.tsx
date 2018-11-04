import * as React from 'react';
import { __tests__ } from '../products-list';
import { Wrapper } from '../../../../common/components/wrapper/wrapper';
import * as Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import { getProducts } from '../../__fixtures__/products.fixture';
const { ProductsListComponent } = __tests__;

function setup(defProps: any = {}) {
  const props = {
    fetchProducts: jest.fn(),
    products: undefined,
    title: 'Foo',
    ...defProps
  };
  const eWrapper = shallow(<ProductsListComponent {...props} />);
  return {
    props,
    eWrapper
  };
}

describe('product list component', () => {
  let eWrapper, props;
  beforeEach(() => {
    const temp = setup();
    eWrapper = temp.eWrapper;
    props = temp.props;
  });
  it('should render initially wrapper with loading', () => {
    expect(eWrapper.find(Wrapper)).toHaveLength(1);
    expect(
      eWrapper
        .find(Wrapper)
        .dive()
        .find('.card-title')
        .text()
    ).toBe('Foo');
    expect(
      eWrapper
        .find(Wrapper)
        .dive()
        .find('.card-body')
        .contains('Loading')
    ).toBe(true);
  });
  it('should call fetch on mount', () => {
    expect(props.fetchProducts).toBeCalled();
  });
  it('should render products table', () => {
    eWrapper.setProps({ products: getProducts() });
    expect(eWrapper.find('table')).toHaveLength(1);
    expect(eWrapper.find('table').find('thead tr th')).toHaveLength(3);
    expect(
      eWrapper
        .find('table')
        .find('thead tr th')
        .at(1)
        .text()
    ).toBe('Price');
    expect(eWrapper.find('table tbody tr')).toHaveLength(3);
    const prod = getProducts()[0];
    expect(
      eWrapper
        .find('table tbody tr')
        .first()
        .text()
    ).toBe(`${prod.name}${prod.price}${prod.color}`);
  });
});
