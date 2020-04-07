import React from 'react';
import classes from './Logo.module.css';
import burgerLogo from '../../assests/images/original.png';


const logo = (props) => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="MyBurger" />
    </div>
);

export default logo;