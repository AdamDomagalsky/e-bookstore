import { combineReducers } from 'redux';
import { authentication } from './authentication';
import { registration } from './registration';
import { alert } from './alerts';
import { users } from './users';
import { books } from './books';
import { cart }  from './cart';
import { mybooks } from './rentals';

export default  combineReducers({
    user: authentication,
    books,
    users,
    registration,
    alert,
    cart,
    mybooks
});

export const getTotal = state =>
    state.addedIds.reduce((total, id) => total + state.products[id].price, 0).toFixed(2);
