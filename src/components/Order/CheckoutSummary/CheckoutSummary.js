import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from '../CheckoutSummary/CheckoutSummary.module.css';
const CheckoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1> we hope it taste well</h1>
            <div style={{width: '300px' , height: '300px' , margin: 'auto'}}>
            <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType="Success" clicked={props.checkoutContinued}>Continue</Button>
            <Button btnType="Danger" clicked={props.checkoutCancelled}>Cancel</Button>
        </div>
    );
}

export default CheckoutSummary;