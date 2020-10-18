import React from 'react';
import classes from './SideDrawer.module.css';
import Logo from '../Logo/Logo';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

interface Props {
    open: boolean,
    closed: any,
    isAuth: boolean,
};

const SideDrawer: React.FC<Props> = ({ open, closed, isAuth, }) => {

    let attachedClasses = [classes.SideDrawer, classes.Close];

    if (open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    };

    return (
        <>
            <Backdrop show={open} clicked={closed} />
            <div className={attachedClasses.join(' ')} onClick={closed}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={isAuth} />
                </nav>
            </div>
        </>
    );
};

export default SideDrawer;