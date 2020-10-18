import * as actionTypes from '../actions/actionTypes';
import { updateObject, } from '../../utils/transform';

const initialState = {
    token: null,
    userType: null,
    error: null,
    loading: false,
    authRedirectPath: '/auth',
};

const authStart = (state: any) => updateObject(state, { error: false, loading: true });

const authSuccess = (state: any, action: any) => {
    return updateObject(state, {
        token: action.token,
        userType: action.userType,
        error: null,
        loading: false,
    });
};

const authFail = (state: any, action: any) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    });
};

const authLogout = (state: any) => updateObject(state, { token: null, userType: null });

const setAuthRedirectPath = (state: any, action: any) => {
    return updateObject(state, {
        authRedirectPath: action.path,
    });
};

const reducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state);
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return setAuthRedirectPath(state, action);
        default:
            return state;
    };
};

export default reducer;