import React from 'react';
import classes from './Logo.module.css';
import vacationaryLogo from '../../../assets/images/palm-tree.jpg';

interface Props {
    height?: any,
};

const Logo: React.FC<Props> = ({ height, }) => {
    return (
        <div className={classes.Logo} style={{ height: height }}>
            <img src={vacationaryLogo} alt='Vacationary' />
        </div>
    )
};

export default Logo;