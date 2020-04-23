import React from 'react';
import classes from './SideDrawer.module.css';
import Logo from '../../../components/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import BackDrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxilary';



const sideDrawer = (props) => {
    return (
        <Aux>
            <BackDrop show={props.open} clicked={props.closed}/>
            <div className={classes.SideDrawer}>
                <Logo/>
                <nav>
                    <NavigationItems isAuthenticated = {props.isAuth}/>
                </nav>
            </div>
        </Aux>
        
)};

export default sideDrawer;