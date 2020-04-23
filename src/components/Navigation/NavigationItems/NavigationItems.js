import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from '../NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}> 
        <NavigationItem exact link="/">Builder</NavigationItem>
        {props.isAuthenticated ? <NavigationItem link="/orders">orders</NavigationItem> : null}
        {!props.isAuthenticated 
        ? <NavigationItem link="/auth">Authenticate</NavigationItem> : <NavigationItem link="/logout">Logout</NavigationItem>}
    </ul>
);


export default navigationItems;