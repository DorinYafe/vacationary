import React, { useState, } from 'react';
import classes from './Layout.module.css';
import { connect, } from 'react-redux';
import Toolbar from '../UI/Toolbar/Toolbar';
import SideDrawer from '../UI/SideDrawer/SideDrawer';

interface Props {
    children: any,
};

const Layout: React.FC<Props> = ({ children, }) => {

    const [sideDrawerIsVisable, setSideDrawerIsVisable] = useState(false);

    const { isAuthenticated, }: any = mapStateToProps;

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

const mapStateToProps = (state: any) => {
    return {
        isAuthenticated: state.auth.token !== null,
    };
};

export default connect(mapStateToProps)(Layout);