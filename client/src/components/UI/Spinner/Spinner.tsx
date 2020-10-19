import React from 'react';
import classes from './Spinner.module.css';

const Spinner: React.FC = () => {
    return (
        <div className={classes.Loader}>Loading...</div>
    );
};

export default Spinner;