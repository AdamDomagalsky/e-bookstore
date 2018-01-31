import {
	cartConstants
} from '../consts/cart';
import {
	alertActions
} from './alerts';
import {
	bookService
} from '../services/books';
import {
	cartService
} from '../services/cart';
import {
	store
} from '../helpers/store';
import {
	failureHandler
} from '../helpers/failureActionHandler.js';

export const cartActions = {
	addBookToCart,
	checkout,
	clearBasket,
	removeBook
};

const addBooksToCartUnsafe = book => ({
	type: cartConstants.ADD_TO_CART,
	book
});

function addBookToCart(bookId) {
	return dispatch =>
		bookService.getBook(bookId)
		.then(book => {
			dispatch(addBooksToCartUnsafe(book));
			dispatch(alertActions.success('This book has been added to cart.'));

			store.subscribe(() => {
				localStorage.setItem('cart', JSON.stringify(store.getState().cart));

			});
		});
};


function removeBook(bookId){
    const remove = bookId => { return  {type: cartConstants.REMOVE_BOOK, bookId};};

    return dispatch => new  Promise((resolve, reject) => {
        resolve(dispatch(remove(bookId)));
    })
        .then( _ => {
            store.subscribe(()=>{
                localStorage.setItem('cart', JSON.stringify(store.getState().cart));

            });
        });
};

function clearBasket(){
    const clear = _ => { return { type: cartConstants.CLEAR }; };

    return dispatch => new  Promise((resolve, reject) => {
        resolve(dispatch(clear()));
    })
   .then( _ => {
            localStorage.removeItem('cart');
    });
}

function checkout(order) {
	const request = () => {
		return {
			type: cartConstants.CHECKOUT_REQUEST
		};
	};
	const success = () => {
		return {
			type: cartConstants.CHECKOUT_SUCCESS
		};
	};


	const arrayOfBooksToResolve = order.products.map(x => cartService.checkout(x, order.userId));

	return dispatch => {
		dispatch(request());
		Promise.all(arrayOfBooksToResolve)
			.then(
				rsp => {
					dispatch(success());

					dispatch(alertActions.success('Your order has been fulfilled!'));
					dispatch(clearBasket());
				},
			    error => {
                                const err = JSON.parse(localStorage.getItem('user'))  ?  error : 'Are you logged in?';
					failureHandler(dispatch, alertActions, err);
				}
			);
	};
};
