import React from 'react';
import Aux from '../../../hoc/Auxilary';
import Button from '../../UI/Button/Button';
const ordersummary = (props) => {
    const ingredientsummary = Object.keys(props.ingredients).map(
        ((igKey , i) => {
        return <li key={igKey+i}> <span style={{textTransform : 'capitalize'}}>{igKey}</span> : {props.ingredients[igKey]}</li>
        })
    );
    
    return(
        <Aux>
            <h3>Your order</h3>
            <p> Burger please get below</p>
            <ul>
                {ingredientsummary}
            </ul>
            <p>your final price is <strong>{props.price.toFixed(2)*75} /-</strong></p>
            <p>Continue to checkout</p>

            <Button btnType={"Danger"} clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType={"Success"}clicked={props.purchaseContinue}>CONTINUE</Button>
        </Aux>
    )
}


export default ordersummary;