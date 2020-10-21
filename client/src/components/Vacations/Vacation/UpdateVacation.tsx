import React, { useState, } from 'react';
import { useDispatch, } from 'react-redux';
import { IVacation } from '../../../models/vacation';
import classes from './Vacation.module.css';
import inputClasses from '../../UI/Input/Input.module.css';
import moment from 'moment';
import Button from '../../UI/Button/Button';
import * as actions from '../../../redux/actions/index';

interface Props {
    vacation: IVacation,
    index: number,
};

const UpdateVacation: React.FC<Props> = ({ vacation, index, }) => {

    const { id, } = vacation;
    const [destination, setDestination] = useState(vacation.destination);
    const [description, setDescription] = useState(vacation.description);
    const [startDate, setStartDate] = useState(vacation.startDate);
    const [endDate, setEndDate] = useState(vacation.endDate);
    const [price, setPrice] = useState(vacation.price);
    const [image, setImage]: any = useState(vacation.image);
    const [isUpdated, setIsUpdated] = useState(false);

    const dispatch = useDispatch();
    const onUpdateVacation = (
        description: any, image: any, startDate: any, endDate: any, price: any, id: any
    ) => dispatch(
        actions.updateVacation(description, image, startDate, endDate, price, id)
    );

    const submitHandler = (e: any) => {
        e.preventDefault();
        onUpdateVacation(description, image, startDate, endDate, price, id);
        // console.log(description, image, startDate, endDate, price, id)
        setIsUpdated(true);
    };

    return (
        <div className={classes.Modal}>
            <div className={inputClasses.Input}>
                {/* {addVacationRedirect} */}
                {/* <form> */}
                <form onSubmit={submitHandler}>
                    <input
                        className={inputClasses.InputElement}
                        type='text'
                        placeholder='Destination'
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                    />
                    <input
                        className={inputClasses.InputElement}
                        type='textarea'
                        placeholder='Description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <input
                        className={inputClasses.InputElement}
                        type='date'
                        placeholder='Start Date'
                        value={moment(startDate).format('YYYY-MM-DD')}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <input
                        className={inputClasses.InputElement}
                        type='date'
                        placeholder='End Date'
                        value={moment(endDate).format('YYYY-MM-DD')}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                    <input
                        className={inputClasses.InputElement} type='number'
                        placeholder='Price'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    {/* <label className={classes.Label} htmlFor="imageInput"><i></i> &nbsp; Choose Image</label> */}
                    {/* <input className={classes.InputElement} type='file' id='imageInput' accept='image/*' onChange={(e: any) => setImage(e.target.files[0])} /> */}
                    <input
                        className={inputClasses.InputElement}
                        type='file'
                        accept='image/*'
                        onChange={(e: any) => setImage(e.target.files[0])}
                    />
                    {/* <button>Submit</button> */}
                    <div style={{ textAlign: 'center' }}>
                        <Button btnType='Success'>Save Changes</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateVacation;