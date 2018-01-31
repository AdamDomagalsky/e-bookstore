import { myBooksConstants } from '../consts/rentals';


export function myBooks (state = [], action){
    switch (action.type) {
    case myBooksConstants.GET_MY_BOOK_SUCCESS:
        return {
            ...action.myBooks

        };

    default:
        return { ...state };
    }
}
