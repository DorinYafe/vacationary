import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../Logo/Logo';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems';
import { useSelector, } from 'react-redux';

interface Props {
    drawerToggleClicked: any,
    isAuth: any,
};

const Toolbar: React.FC<Props> = ({ drawerToggleClicked, }) => {

    const isAuth = useSelector((state: any) => state.auth.token !== null);

    return (
        <header className={classes.Toolbar}>
            <DrawerToggle clicked={drawerToggleClicked} />
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems isAuthenticated={isAuth} />
            </nav>
        </header>
    );
};

export default Toolbar;