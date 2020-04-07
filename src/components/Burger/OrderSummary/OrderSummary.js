import React, { Component } from 'react';
import Aux from '../../../hoc/Auxilary';
import Button from '../../UI/Button/Button';
class OrderSummary extends Component {

    componentWillUpdate(){
        
    }

    render(){
        const ingredientsummary = Object.keys(this.props.ingredients).map(
            ((igKey , i) => {
            return <li key={igKey+i}> <span style={{textTransform : 'capitalize'}}>{igKey}</span> : {this.props.ingredients[igKey]}</li>
            })
        );
        return (
            <Aux>
                <h3>Your order</h3>
                <p> Burger please get below</p>
                <ul>
                    {ingredientsummary}
                </ul>
                <p>your final price is <strong>{this.props.price.toFixed(2)*75} /-</strong></p>
                <p>Continue to checkout</p>

                <Button btnType={"Danger"} clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType={"Success"}clicked={this.props.purchaseContinue}>CONTINUE</Button>
            </Aux>
        )
    }    
    
}


export default OrderSummary;