import React, { useEffect, useCallback, } from 'react';
import classes from './Vacations.module.css';
import { useSelector, useDispatch, } from 'react-redux';
// import axios from '../../axios-instance';
import Vacation from './Vacation/Vacation';
import Spinner from '../../components/UI/Spinner/Spinner';
// import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../redux/actions/index';
import { IVacation } from '../../models/vacation';

const Vacations: React.FC = () => {

    const dispatch = useDispatch();
    const vacations = useSelector((state: any) => state.vacation.vacations);
    const loading = useSelector((state: any) => state.vacation.loading);
    const onInitVacations = useCallback(
        () => dispatch(actions.initVacations()),
        [dispatch]);

    useEffect(() => {
        onInitVacations();
    }, [onInitVacations, loading,]);

    let vacationsView = <Spinner />;

    if (!loading) {
        vacationsView = (
            <div className={classes.Vacations}>
                {vacations.map((vacation: IVacation, index: number) => (
                    <Vacation
                        key={vacation.id}
                        vacation={vacation}
                        index={index}
                    />
                ))}
            </div>
        )
    }

    return vacationsView;
};

export default Vacations;
// export default withErrorHandler(Vacations, axios);