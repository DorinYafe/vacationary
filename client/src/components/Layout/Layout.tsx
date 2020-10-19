import React, { useState, } from 'react';
import classes from './Layout.module.css';
import { useSelector, } from 'react-redux';
import Toolbar from '../UI/Toolbar/Toolbar';
import SideDrawer from '../UI/SideDrawer/SideDrawer';

interface Props {
    children: any,
};

const Layout: React.FC<Props> = ({ children, }) => {

    const [sideDrawerIsVisable, setSideDrawerIsVisable] = useState(false);
    const isAuthenticated = useSelector((state: any) => state.auth.token !== null);

    const sideDrawerCloseHandler = () => {
        setSideDrawerIsVisable(false);
    };

    const sideDrawerToggleHandler = () => {
        setSideDrawerIsVisable(!sideDrawerIsVisable);
    };

    return (
        <>
            <Toolbar isAuth={isAuthenticated} drawerToggleClicked={sideDrawerToggleHandler} />
            <SideDrawer
                isAuth={isAuthenticated}
                open={sideDrawerIsVisable}
                closed={sideDrawerCloseHandler}
            />
            <main className={classes.Content}>
                {children}
            </main>
        </>
    );
};

export default Layout;