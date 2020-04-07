import React from 'react';
import Aux from '../../hoc/Auxilary';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Sidedrawer from '../Navigation/SideDrawer/Sidedrawer';

const layout = (props) => (
    <Aux>
        <Toolbar />
        <Sidedrawer />
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
);


export default layout;