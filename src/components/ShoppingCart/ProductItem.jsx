//React & Redux
import React from 'react'
import PropTypes from 'prop-types'

//Semantic UI
import { List } from 'semantic-ui-react';

//Components
import Product from './Product'

const ProductItem = ({ product, onAddToCartClicked }) => (
  <div style={{ marginBottom: 20 }}>
    <Product
      title={product.title}
      id={product.bookId}
      author={product.author}
      price={product.price}
     />
  </div>
);

ProductItem.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inventory: PropTypes.number.noRequired
  }).isRequired,
  onAddToCartClicked: PropTypes.func.isRequired
}

export default ProductItem
