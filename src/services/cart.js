import { apiUrl } from '../consts/apiUrl.js';
import requestOptionsCreator from '../helpers/requestHeaderSchema.js';
import handleResponse from './responseHelper';

export const cartService = {
    checkout
};

function checkout(bookId,userId) {
    return fetch(`${apiUrl}/rentals`, requestOptionsCreator('POST',JSON.stringify({
        BookId: bookId,
        UserEmail : userId
    })))
    .then(handleResponse);

};
