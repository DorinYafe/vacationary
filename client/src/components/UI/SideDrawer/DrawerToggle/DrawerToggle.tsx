import React from 'react';
import classes from './DrawerToggle.module.css';

interface Props {
    clicked: any,
};

const DrawerToggle: React.FC<Props> = ({ clicked, }) => {
    return (
        <div className={classes.DrawerToggle} onClick={clicked}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default DrawerToggle;