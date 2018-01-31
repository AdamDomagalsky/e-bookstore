import {booksConstants} from '../consts/books';
import {bookNumberPerPage} from '../consts/apiUrl.js';
import {bookService} from '../services/books';
import {alertActions} from './alerts';
import {history} from '../helpers/history';
import {failureHandler} from '../helpers/failureActionHandler.js';

export const booksActions = {
	editBook,
	getBook,
	getBooks,
	deleteBook,
	addBook,
	getGenres,
	getPaginationPagesNumber,
	saveCategory,
	savePaginationPage
};

function editBook(book) {
	const success = book => {
		return {
			type: booksConstants.EDIT_SUCCESS,
			book
		};
	};
	const failure = error => {
		return {
			type: booksConstants.EDIT_FAILURE,
			error
		};
	};

	return dispatch => {
		bookService.editBook(book)
			.then(
				rsp => {
					dispatch(success(book));
					dispatch(alertActions.success(rsp));
				},
				error => {
					dispatch(failure(error));

					if (error.hasOwnProperty('errors'))
						dispatch(alertActions.error(error.errors.map(info => info.description).join('\n')));
					else if (Object.keys(error).length >= 1)
						dispatch(alertActions.error(Object.keys(error).map(x => error[x]).join('\n')));
					else
						dispatch(alertActions.error(error));

				}
			);
	};
};

function getBook(bookId) {
	const request = () => {
		return {
			type: booksConstants.GET_BOOK_REQUEST
		};
	};
	const success = book => {
		return {
			type: booksConstants.GET_BOOK_SUCCESS,
			book
		};
	};
	// const failure = error => { return { type: booksConstants.GET_BOOK_FAILURE, error }; };

	return dispatch => {
		dispatch(request());
		bookService.getBook(bookId)
			.then(
				book => {
					dispatch(success(book));
				},
				err => {
					failureHandler(dispatch, alertActions, err);
				}
			);
	};
};

function getPaginationPagesNumber() {
	const success = pagesNumber => {
		return {
			type: booksConstants.GET_PAGINATION_PAGES_NUMBER_SUCCESS,
			pagesNumber
		};
	};
	const failure = error => {
		return {
			type: booksConstants.GET_PAGINATION_PAGES_NUMBER_FAILURE,
			error
		};
	};

	return dispatch => {
		bookService.getPaginationPagesNumber(bookNumberPerPage)
			.then(
				pagesNumber => {
					dispatch(success(pagesNumber));
				},
				error => {
					dispatch(failure(error));
				}
			);
	};
}

function getBooks(pageNumber) {
	const success = books => {
		return {
			type: booksConstants.GET_BOOKS_SUCCESS,
			books
		};
	};
	// const failure = error => { return { type: booksConstants.GET_BOOKS_FAILURE, error }; };

	return dispatch => {
		bookService.getBooks(pageNumber)
			.then(
				books => {
					dispatch(success(books));
				},
				err => {
					failureHandler(dispatch, alertActions, err);
				}
			);
	};
};


function deleteBook(bookId) {
    const success = book  => { return { type: booksConstants.GET_BOOKS_SUCCESS, book }; };
    const failure = error => { return { type: booksConstants.GET_BOOKS_FAILURE, error }; };

    return dispatch => {
        bookService.deleteBook(bookId)
            .then(
                book => {
                    dispatch(alertActions.success(book));
                    history.goBack();
                },
                err => {
                    failureHandler(dispatch,alertActions,err);
                }
            );
    };

};

function addBook(book) {
	const success = book => {
		return {
			type: booksConstants.ADD_BOOK_SUCCESS,
			book
		};
	};
	const failure = error => {
		return {
			type: booksConstants.ADD_BOOK_FAILURE,
			failure
		};
	};

	return dispatch => {
		bookService.addBook(book)
			.then(
				rsp => {
					dispatch(success(rsp));
					dispatch(alertActions.success('This book has been added!'));
				},
				err => {
					failureHandler(dispatch, alertActions, err);
				}
			);
	};
};


function getGenres() {
	const success = (genres) => {
		return {
			type: booksConstants.GET_GENRES_SUCCESS,
			genres
		};
	};
	const failure = () => {
		return {
			type: booksConstants.GET_GENRES_FAILURE
		};
	};

	return dispatch => {
		bookService.getGenres()
			.then(
				rsp => {
					dispatch(success(rsp));
				},
				err => {
					dispatch(failure(err));

				}
			);
	};
};

function saveCategory(category) {
	return {
		type: booksConstants.SAVE_CATEGORY,
		category
	};
}

function savePaginationPage(page) {
	return {
		type: booksConstants.SAVE_PAGINATION_PAGE,
		page
	};
}
