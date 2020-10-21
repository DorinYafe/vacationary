import * as actionTypes from './actionTypes';
import axios, { setAxiosHeaders } from '../../axios-instance';
import { IVacation } from '../../models/vacation';
import moment from 'moment';

export const fetchVacationsStart = () => {
    return {
        type: actionTypes.FETCH_VACATIONS_STARTS,
    };
};

export const fetchVacationsSuccess = (vacations: any) => {
    return {
        type: actionTypes.FETCH_VACATIONS_SUCCESS,
        vacations,
    };
};

export const fetchVacationsFail = (error: any) => {
    return {
        type: actionTypes.FETCH_VACATIONS_FAIL,
        error,
    };
};

export const fetchVacations = () => {
    return (dispatch: any) => {
        dispatch(fetchVacationsStart());
        axios.get('/')
            .then(res => {
                console.log(res.data);
                dispatch(fetchVacationsSuccess(res.data));
            })
            .catch(err => {
                dispatch(fetchVacationsFail(err));
            });
    };
};

const setVacations = (vacations: any) => {
    return {
        type: actionTypes.SET_VACATIONS,
        vacations,
    };
};

export const initVacations = () => {
    return (dispatch: any) => {
        axios.get('/vacations')
            .then(response => {
                dispatch(setVacations(response.data));
            })
            .catch(error => {
                dispatch(fetchVacationsFail(error));
            });
    };
};

export const addVacationToFavoritesSuccess = (vacation: IVacation) => {
    return {
        type: actionTypes.ADD_VACATION_TO_FAVORITES_SUCCESS,
        vacation,
    };
};

export const addVacationToFavoritesFail = (error: any) => {
    return {
        type: actionTypes.ADD_VACATION_TO_FAVORITES_FAIL,
        error,
    };
};

export const addVacationToFV = (vacation: IVacation) => {
    return (dispatch: any) => {
        setAxiosHeaders();
        axios.post('/vacations/make-favorite', vacation)
            .then(res => {
                const favoriteV = res.data;
                dispatch(addVacationToFavoritesSuccess(favoriteV));
            })
            .catch(e => {
                dispatch(addVacationToFavoritesFail(e.message));
            });
    };
};

export const removeVacationFromFavoritesSuccess = (vacation: IVacation, index: number) => {
    return {
        type: actionTypes.REMOVE_VACATION_FROM_VAFORITES_SUCCESS,
        vacation,
        index,
    };
};

export const removeVacationFromFavoritesFail = (error: any) => {
    return {
        type: actionTypes.REMOVE_VACATION_FROM_VAFORITES_FAIL,
        error,
    };
};

export const removeVacationFromFV = (vacation: IVacation, index: number) => {
    return (dispatch: any) => {
        setAxiosHeaders();
        axios.delete(`/vacations/remove-vacation-from-fv/${vacation.id}`)
            .then(res => {
                dispatch(removeVacationFromFavoritesSuccess(vacation, index));
            })
            .catch(e => {
                dispatch(removeVacationFromFavoritesFail(e.message));
            });
    };
};

export const addVacationSuccess = (vacation: any) => {
    return {
        type: actionTypes.ADD_VACATION_SUCCESS,
        vacation,
    };
};

export const addVacationFail = (error: any) => {
    return {
        type: actionTypes.ADD_VACATION_FAIL,
        error,
    };
};

export const addVacation = (destination: any, description: any, image: any, startDate: any, endDate: any, price: string) => {
    const vacationForm = new FormData();
    vacationForm.append('destination', destination);
    vacationForm.append('description', description);
    vacationForm.append('image', image);
    vacationForm.append('startDate', startDate);
    vacationForm.append('endDate', endDate);
    vacationForm.append('price', price);
    return (dispatch: any) => {
        axios.post<IVacation>('/vacations/add-vacation', vacationForm)
            .then(res => {
                dispatch(addVacationSuccess(vacationForm));
            })
            .catch(e => {
                dispatch(addVacationFail(e));
            });
    };
};

export const removeVacationSuccess = (id: number, index: number) => {
    return {
        type: actionTypes.REMOVE_VACATION_SUCCESS,
        id,
        index,
    };
};

export const removeVacationFail = (error: any) => {
    return {
        type: actionTypes.REMOVE_VACATION_FAIL,
        error,
    };
};

export const deleteVacation = (id: number, image: string, index: number) => {
    const vacationForm = new FormData();
    vacationForm.append('image', image);
    return (dispatch: any) => {
        axios.delete(`/vacations/${id}`, { data: vacationForm })
            .then(res => {
                dispatch(removeVacationSuccess(id, index));
            })
            .catch(e => {
                dispatch(removeVacationFail(e));
            });
    };
};

export const setAddVacationRedirectPath = (path: string) => {
    return {
        type: actionTypes.SET_ADD_VACATION_REDIRECT_PATH,
        path,
    };
};

export const updateVacationSuccess = (vacation: IVacation) => {
    return {
        type: actionTypes.UPDATE_VACATION_SUCCESS,
        vacation,
    };
};

export const updateVacationFail = (error: any) => {
    return {
        type: actionTypes.UPDATE_VACATION_FAIL,
        error,
    };
};

export const updateVacation = (description: any, image: any, startDate: any, endDate: any, price: any, id: any) => {
    const vacationForm = new FormData();
    vacationForm.append('description', description);
    vacationForm.append('image', image);
    vacationForm.append('startDate', moment(startDate).format('YYYY-MM-DD'));
    vacationForm.append('endDate', moment(endDate).format('YYYY-MM-DD'));
    vacationForm.append('price', price);
    // console.log(vacationForm);
    return (dispatch: any) => {
        axios.put(`/vacations/update-vacation/${id}`, vacationForm)
            .then(res => {
                dispatch(updateVacationSuccess(res.data));
                dispatch(initVacations());
            })
            .catch(e => {
                dispatch(updateVacationFail(e.message));
            });
    };
};

export const getUserFavoritesVacationsSuccess = (vacations: any) => {
    return {
        type: actionTypes.GET_USER_FAVORITES_VACATIONS_SUCCESS,
        vacations,
    };
};

export const getUserFavoritesVacationsFail = (error: any) => {
    return {
        type: actionTypes.GET_USER_FAVORITES_VACATIONS_FAIL,
        error,
    };
};

export const getUserFavoritesVacations = () => {
    setAxiosHeaders();
    return (dispatch: any) => {
        axios.get('/vacations/user-favorites-vacations')
            .then(res => {
                dispatch(getUserFavoritesVacationsSuccess(res.data));
            })
            .catch(e => {
                dispatch(getUserFavoritesVacationsFail(e.message));
            });
    };
};