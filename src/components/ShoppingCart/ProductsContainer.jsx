//React & Redux
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//Components
import ProductItem from './ProductItem';
import ProductsList from './ProductsList';

//Semantic UI
import { List } from 'semantic-ui-react';


const ProductsContainer = ({ products, books }) => (
    <ProductsList title="Products">
    <List  divided relaxed>
    {products.map((product,i) =>
      <ProductItem
        key={product.id + i}
        product={product}
      />
    )}
    </List>
  </ProductsList>
);

ProductsContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
  })).isRequired
};

const mapStateToProps = state => ({
  products: state.cart.products
});

export default connect(mapStateToProps)(ProductsContainer);
