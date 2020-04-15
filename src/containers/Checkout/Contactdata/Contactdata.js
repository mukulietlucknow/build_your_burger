import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './Contactdata.module.css';
import axios from '../../../axios-orders';

import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address:{
            street : '',
            postalcode : ''
        },
        loading : false,
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading:true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.price,
            customer:{
                name: "mukul",
                address: {
                    city : "koramangala",
                    zip: "560034",
                    country: "India"
                },
                email : "mukul.ietlucknow",
            },
            deliverySpeed : 'fastest'            
        }
        axios.post('/orders.json' , order)
        .then(response => {
            console.log(response);
            this.setState({loading:false });
            this.props.history.push('/');
        })
        .catch(error => {
            console.log(error);
            this.setState({loading:false});
        });
    }

    render(){

        let form = (
                <form> 
                    <input className={classes.Input} type="text" name="name" placeholder="Enter your name" />
                    <input className={classes.Input} type="email" name="email" placeholder="Enter your email" />
                    <input className={classes.Input} type="text" name="street" placeholder="Enter your street" />
                    <input className={classes.Input} type="text" name="post" placeholder="Enter your postal" />
                    <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
                </form>
        );
        if(this.state.loading){
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>enter your data</h4>
                {form}
            </div>
        )
    }

}


export default  ContactData;