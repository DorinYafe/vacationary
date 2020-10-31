import * as actionTypes from '../actions/actionTypes';
import { updateObject, } from '../../utils/transform';

const initialState = {
    vacations: [],
    userFavoritesVacations: [],
    loading: false,
    error: null,
    addVacationRedirectPath: '/add-vacation',
};

const setVacations = (state: any, action: any) => {
    return updateObject(state, {
        loading: false,
        vacations: action.vacations,
    });
};

const fetchVacationsStart = (state: any) => { return updateObject(state, { loading: true }) };

const fetchVacationsSuccess = (state: any, action: any) => {
    return updateObject(state, {
        loading: false,
        vacations: action.vacations,
    });
};

const fetchVacationsFail = (state: any) => { return updateObject(state, { loading: false }) };

const addVacationToFavoritesSuccess = (state: any, action: any) => {
    const updatedFavoriteV = state.vacations.filter((vacation: any) => vacation.id === action.vacation.id && (state.vacations[vacation.id] = action.vacation));
    return updateObject(state, updatedFavoriteV);
};

const removeVacationFromFavoritesSuccess = (state: any, action: any) => {
    const updatedUnfavoriteV = state.vacations.filter((vacation: any) => vacation.id === action.vacation.id && (state.vacations[vacation.id] = action.vacation));
    return updateObject(state, updatedUnfavoriteV);
};

const removeVacationSuccess = (state: any, action: any) => {
    const vacationToDelete = state.vacations.filter((vacation: any) => vacation.id !== action.id);
    const updatedVacationsState = {
        vacations: vacationToDelete,
        loading: false,
    };
    return updateObject(state, updatedVacationsState);
};

const setAddVacationRedirectPath = (state: any, action: any) => {
    return updateObject(state, {
        addVacationRedirectPath: action.path,
    });
};

const getUserFavoritesVacations = (state: any, action: any) => {
    const userFavoritesVacations = action.vacations;
    const userUnfavoritesVacations = state.vacations.filter((vacation: any) => !action.vacations.map((v: any) => v.destination).includes(vacation.destination));
    const vacations = userFavoritesVacations.concat(userUnfavoritesVacations);
    return updateObject(state, {
        userFavoritesVacations: vacations,
    });
};

const reducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.SET_VACATIONS:
            return setVacations(state, action);
        case actionTypes.FETCH_VACATIONS_STARTS:
            return fetchVacationsStart(state);
        case actionTypes.FETCH_VACATIONS_SUCCESS:
            return fetchVacationsSuccess(state, action);
        case actionTypes.FETCH_VACATIONS_FAIL:
            return fetchVacationsFail(state);
        case actionTypes.ADD_VACATION_TO_FAVORITES_SUCCESS:
            return addVacationToFavoritesSuccess(state, action);
        case actionTypes.REMOVE_VACATION_FROM_VAFORITES_SUCCESS:
            return removeVacationFromFavoritesSuccess(state, action);
        case actionTypes.REMOVE_VACATION_SUCCESS:
            return removeVacationSuccess(state, action);
        case actionTypes.SET_ADD_VACATION_REDIRECT_PATH:
            return setAddVacationRedirectPath(state, action);
        case actionTypes.GET_USER_FAVORITES_VACATIONS_SUCCESS:
            return getUserFavoritesVacations(state, action);
        default:
            return state;
    };
};

export default reducer;