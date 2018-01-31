export function failureHandler(dispatch,action,err) {
    if (typeof err === 'string')
        dispatch(action.error(err));
    else if(err.hasOwnProperty('error') && Array.isArray(err.error))
        dispatch(action.error(err.error.map(info => info).join('\n')));
    else if(err.hasOwnProperty('error') && typeof err.error === 'string')
        dispatch(action.error(err.error));
    else
        dispatch(action.error(err.toString()));
}
