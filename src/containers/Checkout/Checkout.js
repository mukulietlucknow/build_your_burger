import React , {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route , Redirect} from 'react-router-dom';
import ContactData from './Contactdata/Contactdata';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';


// this checkout has created

const Checkout = props => {
    // state = {
    //     ingredients : null, 
    //     price : 0,
    // }


    const checkoutContinuedHandler = () => {
        console.log("checkout form");
       props.history.replace('/checkout/contact_data');
    }

    const checkoutCancelledHandler = () => {
        props.history.goBack();
    }

    // componentWillMount(){
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for(let param of query.entries()){
    //         if(param[0] === 'price'){
    //             price = param[1];
    //         }else{
    //             ingredients[param[0]] = + param[1];
    //         }
            
    //     }

    //     this.setState({ingredients: ingredients , price : price});
    // }

    

        let summary =  <Redirect to='/'/>;
                
        if(props.ings){
            const purchasedRedirect = props.purchased ? <Redirect to='/'/> : null ;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary checkoutCancelled={checkoutCancelledHandler} checkoutContinued={checkoutContinuedHandler} ingredients={props.ings}/> 
                    <Route path={props.match.path + '/contact_data'} 
                    render={(props) => (<ContactData {...props} ingredients={props.ings} price={props.price} />)}  />
                    {/* <Route path={this.props.match.path + '/contact_data'} 
                    component={ContactData}  /> */}
                </div>
            )
        }
        return summary;
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased : state.order.purchased
    };
}



// here dispatch is not required as we are not dispatching 

export default connect(mapStateToProps)(Checkout);