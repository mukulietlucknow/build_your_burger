import React , {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './Contactdata/Contactdata';

class Checkout extends Component{
    state = {
        ingredients : {
            salad : 1,
            meat : 1,
            cheese :1,
            bacon : 1
        }
    }

    checkoutContinuedHandler = () => {
       this.props.history.replace('/checkout/contact_data');
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for(let param of query.entries()){
            ingredients[param[0]] = + param[1];
        }

        this.setState({ingredients: ingredients});
    }

    render(){
        return (
            <div>
               <CheckoutSummary checkoutCancelled={this.checkoutCancelledHandler} checkoutContinued={this.checkoutContinuedHandler} ingredients={this.state.ingredients}/> 
               <Route path={this.props.match.path + '/contact_data'} component={ContactData} />
            </div>
        )
    }
}

export default Checkout;