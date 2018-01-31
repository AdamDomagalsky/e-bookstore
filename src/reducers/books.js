import { booksConstants } from '../consts/books';

export function books(state = {books: [],genres: [],category: null,paginationPage : 1}, action) {
    switch (action.type) {

    //Add
    case booksConstants.ADD_BOOK_SUCCESS:
        return {
            ...state,
            bookAdd: 'Success'
        };

    case booksConstants.ADD_BOOK_FAILURE:
        return {
            ...state,
            bookAdd: 'Failure'
        };

    //Edit
    case booksConstants.EDIT_SUCCESS:
        return {
            ...state,
            book: action.book,
            bookEdition: 'Success',
            bookId : action.book.bookId
        };

    case booksConstants.EDIT_FAILURE:
        return {
            ...state,
            book: {...action.book},
            bookEdition: 'Failure',
            bookId : null
        };

    //Get Book
    case booksConstants.GET_BOOK_SUCCESS:
        return {
            ...state,
            book: {...action.book},
            status: 'done'
        };

    case booksConstants.GET_BOOK_FAILURE:
        return {
            ...state,
            book: null,
            status: "rejected"
        };

    case booksConstants.GET_BOOK_REQUEST:
        return {
            ...state,
            book: null,
            status: "request"
        };

    //Get Books
    case booksConstants.GET_BOOKS_SUCCESS:
        return {
            ...state,
            books : action.books,
            status: 'OK'
        };

    case booksConstants.GET_BOOKS_FAILURE:
        return {
            ...state,
            books: [],
            status: "Get has failed"
        };

    //Delete Book
    case booksConstants.DELETE_BOOK_FAILURE:
        return {
            ...state,
            status: "Delete has failed"
        };

    case booksConstants.DELETE_BOOK_SUCCESS:
        return {
            ...state,
            book: null,
            status: "OK"
        };

    //GENRES
    case booksConstants.GET_GENRES_SUCCESS:
        return {
            ...state,
            genres: action.genres,
            status: "OK"
        };


    case booksConstants.GET_GENRES_FAILURE:
        return {
            ...state,
            genres: [],
            status: "Not ok"
        };

    case booksConstants.SAVE_CATEGORY:
        return {
            ...state,
            category: action.category
        };


    //PAGINATION
    case booksConstants.GET_PAGINATION_PAGES_NUMBER_SUCCESS:
        return {
            ...state,
            pagesNumber: action.pagesNumber
        };



    case booksConstants.GET_PAGINATION_PAGES_NUMBER_FAILURE:
        return {
            ...state,
            pagesNumber: 0
        };


    case booksConstants.SAVE_PAGINATION_PAGE:
        return {
            ...state,
            paginationPage: action.page
        };


    default:
        return { ...state };
    }
}
