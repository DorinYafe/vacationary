import * as actionTypes from './actionTypes';
import axios from 'axios';
import { setAxiosHeaders, } from '../../axios-instance';
import { LoginResponse, } from '../../models/loginResponse';
import { ICustomer, } from '../../models/user';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
};

export const authSuccess = (token: any, userType?: any) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token,
        userType,
    };
};

export const authFail = (error: any) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error,
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    return {
        type: actionTypes.AUTH_LOGOUT,
    };
};

export const authLogin = (username: string, password: string, isSignup: boolean) => {
    return (dispatch: any) => {
        const user: LoginResponse = {
            username,
            password,
        };
        axios.post('http://localhost:3001/users/login', user)
            .then(response => {
                localStorage.setItem('token', JSON.stringify(response.data.token));
                localStorage.setItem('userType', JSON.stringify(response.data.type));
                setAxiosHeaders();
                dispatch(authSuccess(response.data.token, response.data.type));
            })
            .catch(err => {
                dispatch(authFail(err.response));
            });
    };
};

export const auth = (firstName: any, lastName: any, username: any, password: any, isSignup: boolean,) => {
    return (dispatch: any) => {
        dispatch(authStart());
        const authData: ICustomer = {
            firstName,
            lastName,
            username,
            password,
            // token: true,
        };
        if (!isSignup) {
            dispatch(authLogin(username, password, isSignup));
        };
        axios.post('http://localhost:3001/users/register', authData)
            .then(response => {
                dispatch(authLogin(username, password, isSignup));
            })
            .catch(err => {
                dispatch(authFail(err.response));
            });
    };
};

export const setAuthRedirectPath = (path: string) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path,
    };
};

export const authCheckState = () => {
    return (dispatch: any) => {
        const token = localStorage.getItem('token');
        const userType = localStorage.getItem('userType');
        if (!token) {
            dispatch(logout());
        };
        dispatch(authSuccess(token, userType));
    };
};
