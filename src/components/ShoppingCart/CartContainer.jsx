//React & Redux
import React from 'react';
import { connect } from 'react-redux';
import { getTotal } from '../../reducers/';
import { cartActions } from '../../actions/cart';
import Cart from './Cart';

class CartContainer extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            dispatch: this.props.dispatch
        };

        this.onCheckout = this.onCheckout.bind(this);
        this.onBasketClean = this.onBasketClean.bind(this);
        this.onRemoveClicked = this.onRemoveClicked.bind(this);
    }

    onCheckout(products,userId){
        this.state.dispatch(cartActions.checkout({
            products: Object.keys(products),
            userId
        }));
    }

    onBasketClean(){
        this.state.dispatch(cartActions.clearBasket());
    }


    onRemoveClicked(bookId){
        this.state.dispatch(cartActions.removeBook(bookId));
    }


    render(){
        const { products, total, quantity, userId} = this.props;

        return (
            <Cart
              products={products}
              quantity={quantity}
              total={total}
              onCheckoutClicked={() => this.onCheckout(products,userId)}
              onRemoveClicked={this.onRemoveClicked}
              onBasketClean={this.onBasketClean}/>
        );
    }
};



const mapStateToProps = state => ({
    products: state.cart.products,
    quantity: state.cart.quantityById,
    userId: state.user.userName,
    total: getTotal(state.cart)
});

export default connect(mapStateToProps)(CartContainer);
