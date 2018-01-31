import {rentalsService} from '../services/rentals';
import {bookService} from '../services/books';
import {store} from '../helpers/store';
import {myBooksConstants} from '../consts/rentals';
import {alertActions} from './alerts';
import {apiUrl} from '../consts/apiUrl';
import authHeader from '../helpers/authHeader.js';

export const rentalsActions = {
	getMyBooks,
	getEpubBook
};

function getMyBooks() {
	const success = myBooks => {
		return {
			type: myBooksConstants.GET_MY_BOOKS_SUCCESS,
			myBooks
		};
	};
	const failure = error => {
		return {
			type: myBooksConstants.GET_MY_BOOKS_FAILURE,
			error
		};
	};

	return dispatch => {
		rentalsService.getMyBooks(store.getState().user.userName)
			.then(mybooks => mybooks,
				error => {
					dispatch(failure('Are you certain that you have at least one book?'));
				}
			)
			.then(mybooks => mybooks.map(x => bookService.getBook(x.bookId)))
			.then(books => {
				Promise.all(books)
					.then(
						rsp => {
							dispatch(success(rsp));
						}
					);
			})
			.catch(err => {
				dispatch(alertActions.error('Are you certain that you have at least one book?'));
			});
	};
};

function getEpubBook(bookTitle, bookId) {
	fetch(`${apiUrl}/books/ebook/${bookId}`,
			Object.assign({
				headers: {
					'Content-Type': 'application/octet-stream',
					Authorization: authHeader()
				}
			}, {
				method: 'GET'
			})
		)
		.then(response => response.blob())
		.then(myBlob => saveAs(myBlob, `${bookTitle}${Math.floor(Date.now()/1000)}.epub`))
}

function saveAs(blob, fileName) {
	var url = window.URL.createObjectURL(blob);

	var anchorElem = document.createElement("a");
	anchorElem.style = "display: none";
	anchorElem.href = url;
	anchorElem.download = fileName;

	document.body.appendChild(anchorElem);
	anchorElem.click();

	document.body.removeChild(anchorElem);

	// On Edge, revokeObjectURL should be called only after
	// a.click() has completed, atleast on EdgeHTML 15.15048
	setTimeout(function () {
		window.URL.revokeObjectURL(url);
	}, 1000);
}