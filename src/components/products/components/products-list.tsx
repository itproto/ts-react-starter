import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '@src/app/dux/root-reducer';
import { productsSelector } from '../dux/prod-selectors';
import { fetchProducts } from '../dux/prod-actions';
import './style.css';
import { IProduct } from '../@types/api';
import { Wrapper } from '@src/common/components/wrapper/wrapper';

type IState = {
  selectedDictIndex: number;
};

class ProductsListComponent extends React.Component<IProps, IState> {
  state: IState = {
    selectedDictIndex: 0
  };

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

  renderProduct = (prod: IProduct) => (
    <tr key={prod.name}>
      <td>{prod.name}</td>
      <td>{prod.price}</td>
      <td>{prod.color}</td>
    </tr>
  );
}

// #region @connect
interface IStateToProps {
  products: IProduct[];
}
interface IDispatchToProps {
  fetchProducts: () => void;
}
interface IOwnProps {
  title?: string;
}
type IProps = IStateToProps & IDispatchToProps & IOwnProps;

const mapStateToProps = (state: RootState) => ({
  products: productsSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ fetchProducts }, dispatch);

export const ProductsList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsListComponent);
// #endregion
