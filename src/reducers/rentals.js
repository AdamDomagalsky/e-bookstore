import { myBooksConstants } from '../consts/rentals';

export function mybooks( state = { mybooks:[]}, action ){
    switch(action.type){
        case myBooksConstants.GET_MY_BOOKS_SUCCESS:
            return {
                ...state,
                mybooks: action.myBooks,
                status: 'OK'
            };

        case myBooksConstants.GET_MY_BOOKS_FAILURE:
            return {
                ...state,
                mybooks: [],
                status: 'Get has failed'
            };
        
    default:
        return { ...state };
    }
}