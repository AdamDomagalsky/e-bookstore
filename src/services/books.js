import { apiUrl } from '../consts/apiUrl.js';
import requestOptionsCreator from '../helpers/requestHeaderSchema.js';
import handleResponse from './responseHelper';
import authHeader  from '../helpers/authHeader.js';
import { bookNumberPerPage } from '../consts/apiUrl.js';
import { store } from '../helpers/store';

export const bookService = {
    editBook,
    getBook,
    getBooks,
    deleteBook,
    addBook,
    getGenres,
    getPaginationPagesNumber
};

function editBook(book) {
    const header = requestOptionsCreator('PUT',JSON.stringify(book));

    return fetch(`${apiUrl}/books/${book.bookId}`,header)
        .then(rsp => rsp.ok ? 'Changes have been saved!' :  rsp.json().then(msg => Promise.reject(msg)));
};

function getBook(bookId) {
    return fetch(`${apiUrl}/books/${bookId}`,requestOptionsCreator('GET'))
        .then(handleResponse);
};

function getBooks(pageNumber) {
    return fetch(`${apiUrl}/books/page/${bookNumberPerPage}/${getPaginationQuery(pageNumber)}`,requestOptionsCreator('GET'))
        .then(handleResponse);
};

function deleteBook(bookId) {
    return fetch(`${apiUrl}/books/${bookId}`,requestOptionsCreator('DELETE'))
        .then(rsp => rsp.ok ? 'Book has been removed!' : Promise.reject(rsp));
};

function getGenres() {
    return fetch(`${apiUrl}/books/genre`,requestOptionsCreator('GET'))
        .then(handleResponse);
};

function addBook(book) {
    const header = {
        body : book,
        headers: {
            Authorization : authHeader()
        },
        method :"POST"
    };

    return fetch(`${apiUrl}/books`,header)
        .then(handleResponse);
};

function getPaginationPagesNumber(bookNumberPerPage){
    return fetch(`${apiUrl}/books/page/${getPaginationQuery(bookNumberPerPage)}`,requestOptionsCreator('GET'))
        .then(handleResponse);
};


const getPaginationQuery = bookNumberPerPage => {
    const category = store.getState().books.category;
    let query = `${bookNumberPerPage}`;

    if(category)
        query = `${bookNumberPerPage}?genre=${encodeURIComponent(category)}`;

    return query;
};
