import { userConstants } from '../consts/users';
import { userService } from '../services/user';
import { alertActions } from './alerts';
import { history } from '../helpers/history';

export const userActions = {
    login,
    logout,
    register
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push(`${process.env.PUBLIC_URL}/`);
                },
                error => {
                    dispatch(failure(error));

                    if(error.hasOwnProperty('errors'))
                        dispatch(alertActions.error(error.errors.map(info => info.description).join('\n')));
                    else
                        dispatch(alertActions.error('Login or password is incorrect.'));

                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user }; }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user }; }
    function failure(err)  { return { type: userConstants.LOGIN_FAILURE, err  }; }
}

function logout() {
    return dispatch => {
        dispatch(success());
        userService.logout();

    };

    function success(user) { return { type: userConstants.LOGOUT_SUCCESS, user }; }
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => {
                    dispatch(success(user));
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error));

                    if(error.hasOwnProperty('errors'))
                        dispatch(alertActions.error(error.errors.map(info => info.description).join('\n')));
                    else
                        dispatch(alertActions.error('Can not obtain data.'));

                }
            );
    };

    function request(user)  { return { type: userConstants.REGISTER_REQUEST, user  }; }
    function success(user)  { return { type: userConstants.REGISTER_SUCCESS, user  }; }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error }; }
}
