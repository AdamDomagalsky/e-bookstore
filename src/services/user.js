import jwt_decode from 'jwt-decode';
import { apiUrl } from '../consts/apiUrl.js';
import requestOptionsCreator from '../helpers/requestHeaderSchema.js';
import handleResponse from './responseHelper';

export const userService = {
    login,
    logout,
    register
};

function login(email, password) {
    return fetch(`${apiUrl}/users/login`, requestOptionsCreator('POST',JSON.stringify({email,password})))
        .then(handleResponse)
        .then(data => {
            if (data.token) {
                const decoded_token = jwt_decode(data.token);
                const role = decoded_token['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

                localStorage.setItem('user',JSON.stringify({
                    token : data.token,
                    roles : role,
                    userName : email
                }));

                return  Object.assign({},{
                    roles:[role],
                    userName : email
                });
            }
        });
};

function logout() {
    localStorage.removeItem('user');
};

function register(user) {
    return fetch(`${apiUrl}/users`, requestOptionsCreator('POST',JSON.stringify({...user}))).then(handleResponse);
};
