import React from 'react';
import classes from './Backdrop.module.css';

interface Props {
    show: boolean,
    clicked: any,
};

const Backdrop: React.FC<Props> = ({ show, clicked, }) => (
    show ?
        <div className={classes.Backdrop} onClick={clicked}></div> : null
)

export default Backdrop;