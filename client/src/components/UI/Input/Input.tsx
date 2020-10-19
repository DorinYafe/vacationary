import React from 'react';
import classes from './Input.module.css';

interface Props {
    invalid: any,
    shouldValidate: any,
    touched: any,
    elementType: any,
    elementConfig: any,
    value: any,
    changed: any,
    label?: any,
};

const Input: React.FC<Props> = ({ invalid, shouldValidate, touched, elementType, elementConfig, value, changed, label, }) => {

    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if (invalid && shouldValidate && touched) {
        inputClasses.push(classes.Invalid);
    };

    switch (elementType) {
        case ('input'):
            inputElement =
                <input
                    className={inputClasses.join(' ')}
                    {...elementConfig}
                    value={value}
                    onChange={changed} />;
            break;
        case ('textarea'):
            inputElement =
                <textarea
                    className={inputClasses.join(' ')}
                    {...elementConfig}
                    value={value}
                    onChange={changed} />;
            break;
        default:
            inputElement =
                <input
                    className={inputClasses.join(' ')}
                    {...elementConfig}
                    value={value}
                    onChange={changed} />
    };

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{label}</label>
            {inputElement}
        </div>
    );
};

export default Input;