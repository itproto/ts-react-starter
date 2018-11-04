import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '@src/app/dux/root-reducer';
import { productsSelector } from '../dux/prod-selectors';
import { fetchProducts } from '../dux/prod-actions';
import './style.css';
import { IProduct } from '../@types/api';
import { Wrapper } from '@src/common/components/wrapper/wrapper';
import { selectedDictionarySelector, mapValue } from '@src/components/dict';
import { IDict } from '@src/components/dict';
import * as cx from 'classnames';

class ProductsListComponent extends React.Component<IProps, {}> {
  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    const { products, title = 'Products' } = this.props;
    if (!products || !products.length) {
      return <Wrapper title={title}>Loading</Wrapper>;
    }

    return <Wrapper title={title}>{this.renderProducts(products)}</Wrapper>;
  }

  renderProducts = (products: IProduct[]) => {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Color</th>
          </tr>
        </thead>
        <tbody>{products.map(this.renderProduct)}</tbody>
      </table>
    );
  };

  renderProduct = (prod: IProduct) => {
    const mappedColor = this.mapColor(prod.color);
    return (
      <tr key={prod.name}>
        <td>{prod.name}</td>
        <td>{prod.price}</td>
        <td className={cx({ mapped: mappedColor !== undefined })}>
          {mappedColor || prod.color}
        </td>
      </tr>
    );
  };

  mapColor = (color: string) => {
    const { selectedDictionary } = this.props;
    if (!selectedDictionary) {
      return undefined;
    }
    return mapValue(selectedDictionary, color);
  };
}

// It is no need to expose this component (it is wrapped by connect) except for tests
// it is possible to test connected component directly, but I would prefer to test pure component
export const __tests__ = {
  ProductsListComponent
};

// #region @connect
interface IStateToProps {
  products: IProduct[];
  selectedDictionary?: IDict;
}
interface IDispatchToProps {
  fetchProducts: () => void;
}
interface IOwnProps {
  title?: string;
}
type IProps = IStateToProps & IDispatchToProps & IOwnProps;

const mapStateToProps = (state: RootState) => ({
  products: productsSelector(state),
  selectedDictionary: selectedDictionarySelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ fetchProducts }, dispatch);

export const ProductsList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsListComponent);
// #endregion
