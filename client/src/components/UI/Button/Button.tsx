import React from 'react';
import classes from './Button.module.css';

interface Props {
    disabled?: any,
    btnType: any,
    clicked?: any,
    children?: any,
};

const Button: React.FC<Props> = ({ disabled, btnType, clicked, children, }) => {
    return (
        <>
            <button
                disabled={disabled}
                className={[classes.Button, classes[btnType]].join(' ')}
                onClick={clicked}>
                {children}
            </button>
        </>
    );
};

export default Button;