import React from 'react';
import classes from './NavigationItem.module.css';
import { NavLink, } from 'react-router-dom';

interface Props {
    exact?: any,
    link: any,
    children: any,
};

const NavigationItem: React.FC<Props> = ({ exact, link, children, }) => {
    return (
        <li className={classes.NavigationItem}>
            <NavLink activeClassName={classes.active} exact={exact} to={link}>{children}</NavLink>
        </li>
    )
};

export default NavigationItem;