import React, { useState, } from 'react';
import classes from './Vacation.module.css';
import { useSelector, useDispatch, } from 'react-redux';
import { IVacation, } from '../../../models/vacation';
import Icon from '../../UI/Icon/Icon';
import moment from 'moment';
import * as actions from '../../../redux/actions/index';
import UpdateVacation from './UpdateVacation';

interface Props {
    vacation: IVacation,
    index?: number,
};

const Vacation: React.FC<Props> = ({ vacation, index, }: any) => {

    const { destination, description, image, startDate, endDate, price, followersAmount, id, } = vacation;
    const [isUpdated, setIsUpdated] = useState(false);
    const dispatch = useDispatch();
    const userType = useSelector((state: any) => state.auth.userType);
    const onAddVacationToFV = (vacation: IVacation) => dispatch(actions.addVacationToFV(vacation));
    const onRemoveVacationFromFV = (vacation: IVacation) => dispatch(actions.removeVacationFromFV(vacation, index));
    const onDeleteVacation = (id: number, image: string,) => dispatch(actions.deleteVacation(id, image, index));

    let icons = null;

    if (userType === '"CUSTOMER"') {
        icons = (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Icon mode='follow' onClick={() => onAddVacationToFV(vacation)} />
                <Icon mode='unfollow' onClick={() => onRemoveVacationFromFV(vacation)} />
            </div>
        );
    };

    if (userType === '"ADMIN"') {
        icons = (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Icon mode='edit' onClick={() => setIsUpdated(!isUpdated)} />
                {/* <Icon mode='edit' onClick={() => onUpdateVacation(vacation)} /> */}
                <Icon mode='delete' onClick={() => onDeleteVacation(id, image)} />
            </div>
        );
    };

    let updateVacationModal = null;

    if (isUpdated === true) {
        updateVacationModal = <UpdateVacation vacation={vacation} index={index} />;
    };

    return (
        <div className={classes.CardItem} key={id}>
            {updateVacationModal}
            <div className={classes.CardItemImage}>
                <img alt={destination} src={`http://localhost:3001/${image}`} />
            </div>
            <div className={classes.CardItemContent}>
                <div className={classes.CardItemTopContent}>
                    {icons}
                    <h6>
                        {destination}
                        <span style={{ whiteSpace: 'normal' }}><strong>Description: </strong>{description}</span>
                        <span><strong>Followers: </strong>{followersAmount}</span>
                    </h6>
                </div>
                <div className={classes.CardItemBottomContent}>
                    <div className={classes.BoxDate}>
                        <ul>
                            <li><span><strong>Starts at: </strong>{moment(startDate).format('DD-MM-YYYY')}</span></li>
                            <li><span><strong>Ends at: </strong>{moment(endDate).format('DD-MM-YYYY')}</span></li>
                        </ul>
                    </div>
                    <div className={classes.BoxPrice}>
                        <p className={classes.DealBox}>
                            <span><strong>Price:</strong></span>
                            <strong>
                                <sub>{price}</sub>
                            </strong>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default Vacation;