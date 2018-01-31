import {
	apiUrl
} from '../consts/apiUrl';

import requestOptionsCreator from '../helpers/requestHeaderSchema.js';
import handleResponse from './responseHelper';

export const rentalsService = {
	getMyBooks
};


function getMyBooks(userMail) {
	return fetch(`${apiUrl}/rentals/${userMail}`, requestOptionsCreator('GET'))
		.then(handleResponse);
};