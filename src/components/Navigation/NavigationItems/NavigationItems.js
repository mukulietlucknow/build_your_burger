import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from '../NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}> 
        <NavigationItem exact link="/">Builder</NavigationItem>
        <NavigationItem link="/orders">orders</NavigationItem>
    </ul>
);


export default navigationItems;