import { userConstants } from '../consts/users';

const {userName, roles} = JSON.parse(localStorage.getItem('user')) || {};

export function authentication(state = { userName, roles}, action) {
    switch (action.type) {

    //Login
    case userConstants.LOGIN_REQUEST:
        return {
            ...state,
            loggingIn: true
        };

    case userConstants.LOGIN_SUCCESS:
        return {
            loggedIn: true,
            ...action.user
        };

    case userConstants.LOGIN_FAILURE:
        return {};

    //Logout
    case userConstants.LOGOUT_SUCCESS:
        return { };

    default:
        return { ...state };
    }
}
