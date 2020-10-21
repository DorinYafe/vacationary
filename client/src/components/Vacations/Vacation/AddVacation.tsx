import React, { useState, useEffect, } from 'react';
import inputClasses from '../../UI/Input/Input.module.css';
import authClasses from '../../Auth/Auth.module.css';
import { Redirect, } from 'react-router-dom';
import { useDispatch, useSelector, } from 'react-redux';
import * as actions from '../../../redux/actions/index';
import Button from '../../UI/Button/Button';

const AddVacation: React.FC = () => {

    const [destination, setDestination] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage]: any = useState(null);
    const [isAdded, setIsAdded] = useState(false);
    let addVacationRedirect = null;

    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: any) => state.auth.token !== null);
    const addVacationRedirectPath = useSelector((state: any) => state.vacation.addVacationRedirectPath);
    const onAddVacation = (destination: any, description: any, image: any, startDate: any, endDate: any, price: any) =>
        dispatch(
            actions.addVacation(destination, description, image, startDate, endDate, price)
        );
    const onSetAddVacationRedirectPath = () => dispatch(actions.setAddVacationRedirectPath('/'));

    useEffect(() => {
        if (isAuthenticated && isAdded === true) {
            onSetAddVacationRedirectPath();
        }
    }, [isAdded, onAddVacation, onSetAddVacationRedirectPath,]);


    if (isAdded === true) {
        addVacationRedirect = <Redirect to={addVacationRedirectPath} />;
    };

    const submitHandler = (e: any) => {
        e.preventDefault();
        onAddVacation(destination, description, image, startDate, endDate, price);
        setIsAdded(true);
    };

    return (
        <div className={authClasses.Auth}>
            {addVacationRedirect}
            <form onSubmit={submitHandler}>
                <input className={inputClasses.InputElement} type='text' placeholder='Destination' onChange={(e) => setDestination(e.target.value)} />
                <input className={inputClasses.InputElement} type='textarea' placeholder='Description' onChange={(e) => setDescription(e.target.value)} />
                <input className={inputClasses.InputElement} type='date' placeholder='Start Date' onChange={(e) => setStartDate(e.target.value)} />
                <input className={inputClasses.InputElement} type='date' placeholder='End Date' onChange={(e) => setEndDate(e.target.value)} />
                <input className={inputClasses.InputElement} type='number' placeholder='Price' onChange={(e) => setPrice(e.target.value)} />
                {/* <label className={inputClasses.Label} htmlFor="imageInput"><i></i> &nbsp; Choose Image</label> */}
                <input className={inputClasses.InputElement} type='file' id='imageInput' accept='image/*' onChange={(e: any) => setImage(e.target.files[0])} />
                <Button btnType='Success'>Add</Button>
            </form>
        </div>
    );
};

export default AddVacation;