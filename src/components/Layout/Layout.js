import React, { useState } from 'react';
import Aux from '../../hoc/Auxilary';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Sidedrawer from '../Navigation/SideDrawer/Sidedrawer';
import {connect} from 'react-redux';


const Layout = props => {

    const [DrawerIsVisible , setDrawerIsVisible] = useState(false);

    const sideDrawClosedhandler = () => {
        setDrawerIsVisible(false);
    }
        return(
            <Aux>
                <Toolbar isAuth={props.isAuthenticated}/>
                <Sidedrawer isAuth={props.isAuthenticated} open={DrawerIsVisible} closed={sideDrawClosedhandler}/>
                <main className={classes.Content}>
                    {props.children}
                </main>
            </Aux>
        )
    
};

const mapStateToProps = state => {
    return {
        isAuthenticated : state.auth.token !== null,

    };
};

export default connect(mapStateToProps,null)(Layout);