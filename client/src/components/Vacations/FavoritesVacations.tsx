import React, { useEffect, useCallback, } from 'react';
import classes from './Vacations.module.css';
import { useSelector, useDispatch, } from 'react-redux';
import Vacation from './Vacation/Vacation';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../redux/actions/index';
import { IVacation } from '../../models/vacation';

const FavoritesVacations: React.FC = () => {

    const dispatch = useDispatch();
    // const vacations = useSelector((state: any) => state.vacation.vacations);
    const userFavoritesVacations = useSelector((state: any) => state.vacation.userFavoritesVacations);
    const loading = useSelector((state: any) => state.vacation.loading);
    // const onInitVacations = useCallback(
    //     () => dispatch(actions.initVacations()),
    //     [dispatch]);
    // const onGetUserFavoritesVacations = () => dispatch(actions.getUserFavoritesVacations());
    const onGetUserFavoritesVacations = useCallback(
        () => dispatch(actions.getUserFavoritesVacations()),
        [dispatch,]);

    useEffect(() => {
        onGetUserFavoritesVacations();
    }, []);

    // console.log(userFavoritesVacations);

    let vacationsView = <Spinner />;

    if (!loading) {
        vacationsView = (
            <div className={classes.Vacations}>
                {/* {userFavoritesVacations.map((vacation: IVacation, index: number) => (
                    <Vacation
                        key={vacation.id}
                        vacation={vacation}
                        index={index}
                    />
                ))} */}
            </div>
        )
    }

    return vacationsView;
};

export default FavoritesVacations;