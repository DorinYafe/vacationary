import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import { useSelector, } from 'react-redux';

interface Props {
    isAuthenticated: any,
};

const NavigationItems: React.FC<Props> = ({ isAuthenticated, }) => {

    const userType = useSelector((state: any) => state.auth.userType);

    const adminNavigation = (
        <>
            <NavigationItem link='add-vacation'>Add Vacation</NavigationItem>
            <NavigationItem link='chart'>Chart</NavigationItem>
        </>
    )

    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link='/'>Home</NavigationItem>
            {
                isAuthenticated && userType === '"ADMIN"' ? adminNavigation : null
            }
            {
                !isAuthenticated ?
                    <NavigationItem link='/auth'>Authenticate</NavigationItem> :
                    <NavigationItem link='/logout'>Logout</NavigationItem>
            }
        </ul>
    );
};

export default NavigationItems;