import React , {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './Contactdata/Contactdata';
import {connect} from 'react-redux';

class Checkout extends Component{
    // state = {
    //     ingredients : null, 
    //     price : 0,
    // }

    checkoutContinuedHandler = () => {
        console.log("checkout form");
       this.props.history.replace('/checkout/contact_data');
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
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

    render(){
        return (
            <div>
               <CheckoutSummary checkoutCancelled={this.checkoutCancelledHandler} checkoutContinued={this.checkoutContinuedHandler} ingredients={this.props.ings}/> 
               <Route path={this.props.match.path + '/contact_data'} 
               render={(props) => (<ContactData {...this.props} ingredients={this.props.ings} price={this.props.price} />)}  />
               {/* <Route path={this.props.match.path + '/contact_data'} 
               component={ContactData}  /> */}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    };
}

// here dispatch is not required as we are not dispatching 

export default connect(mapStateToProps , null)(Checkout);