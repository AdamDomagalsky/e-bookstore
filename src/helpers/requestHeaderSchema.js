import authHeader from '../helpers/authHeader.js';

export default function requestOptions(method = 'GET', body, type = 'application/json') {
	return Object.assign({
		headers: {
			'Content-Type': type,
			Authorization: authHeader()
		}
	}, {
		method,
		body: body
	});
};