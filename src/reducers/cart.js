import { cartConstants } from '../consts/cart';


const clearInitialState = {
    addedIds: [],
    quantityById: {},
    products: {}
};

const initialState = JSON.parse(localStorage.getItem('cart')) || clearInitialState;

export function cart (state = initialState, action){
    switch (action.type) {
    case cartConstants.ADD_TO_CART:

        return {
            ...state,
            addedIds : [...state.addedIds, action.book.bookId],
            products : {
                ...state.products,
                [action.book.bookId] : action.book
            },
            quantityById : {
                ...state.quantityById,
                [action.book.bookId] : state.products[action.book.bookId] ?
                    state.quantityById[action.book.bookId] + 1 : 1
            }
        };

    case cartConstants.REMOVE_BOOK:
        return {
            ...state,
            addedIds : [...state.addedIds].filter(x => x !== action.bookId),
            products : Object.assign({},Object.keys(state.products)
                .filter(key => key !== action.bookId)
                .reduce((result, current) => {
                    result[current] = state.products[current];
                    return result;
                }, {})),
            quantityById : Object.assign({},Object.keys(state.quantityById)
                .filter(key => key !== action.bookId)
                .reduce((result, current) => {
                    result[current] = state.quantityById[current];
                    return result;
                }, {}))
        };

    case cartConstants.CLEAR:
        return { ...clearInitialState };

    default:
        return { ...state };
  }
}
