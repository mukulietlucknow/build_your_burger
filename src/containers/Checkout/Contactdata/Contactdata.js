import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './Contactdata.module.css';

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address:{
            street : '',
            postalcode : ''
        }
    }

    render(){
        return (
            <div className={classes.ContactData}>
                <h4>enter your data</h4>
                <form> 
                    <input className={classes.Input} type="text" name="name" placeholder="Enter your name" />
                    <input className={classes.Input} type="email" name="email" placeholder="Enter your email" />
                    <input className={classes.Input} type="text" name="street" placeholder="Enter your street" />
                    <input className={classes.Input} type="text" name="post" placeholder="Enter your postal" />
                    <Button btnType="Success">Order</Button>
                </form>
            </div>
        )
    }

}


export default  ContactData;