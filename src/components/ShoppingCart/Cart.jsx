//React & Redux
import React from 'react';

//Semantic UI
import {Button, Table } from 'semantic-ui-react';

//Components
import Product from './Product';

const Cart = ({ products, total, quantity, onCheckoutClicked, onBasketClean, onRemoveClicked }) => {
    const hasProducts = Object.keys(products).length > 0;
    const nodes = hasProducts ? (
    Object.keys(products).map(id =>
        <Product
          title={products[id].title}
          author={products[id].author}
          price={products[id].price}
          id={products[id].bookId}
          quantity={quantity[id]}
          srcImage={products[id].imagePath}
          key={products[id].id}
          onRemove={onRemoveClicked}
        />
      )
    ) : (
        <em>Please add some products to cart.</em>
    );

    return (
        <div>
          <h3>Your Cart</h3>
          <Table basic='very' celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Book title</Table.HeaderCell>
                <Table.HeaderCell>Price</Table.HeaderCell>
                <Table.HeaderCell>Remove book</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {nodes}
            </Table.Body>
          </Table>

          <p><Button onClick={onBasketClean}> Clean the basket </Button></p>
          <p>Total: &#36;{total}</p>

          <Button onClick={onCheckoutClicked}
                  disabled={hasProducts ? '' : 'disabled'}>
                  Checkout
          </Button>
        </div>
    );
};

export default Cart;
