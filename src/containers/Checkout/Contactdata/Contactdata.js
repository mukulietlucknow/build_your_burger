import React, { useState} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './Contactdata.module.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import {checkvalidity} from '../../../shared/utility';

const ContactData = props => {
    const [ formIsValid, setFormIsValid ] = useState(false);
    const [orderForm, setOrderForm] = useState({ 
        name: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'name'
        },
        value: '',
        validation:{
            required: true,
        },
        valid : false,
        touched: false
    },               
    city :  {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'city'
        },
        value: '',
        validation:{
            required: true,
        },
        valid : false,
        touched: false
    },
    zip:  {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'zip'
        },
        value: '',
        validation:{
            required: true,
            minLength:5,
            maxLength:5
        },
        valid : false,
        touched: false
    },
    country:  {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'country'
        },
        value: '',
        validation:{
            required: true,
        },
        valid : false,
        touched: false
    },               
    email :  {
        elementType: 'input',
        elementConfig: {
            type: 'email',
            placeholder: 'mail'
        },
        value: '',
        validation:{
            required: true
        },
        valid : false,
        touched: false
    },           
    deliverySpeed :  {
        elementType: 'select',
        elementConfig: {
            options: [{value: 'fastest' , displayValue: "Fastest"},
                      {value: 'cheapest' , displayValue: "Cheapest"}]
        },
        value: 'fasted',
        valid: true,
        validation: {},
    }});
             


    

    const orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for(let formElementIdentifier in orderForm){
            formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: props.ings,
            price: props.price,
            orederData: formData,
            userId: props.userId,
        }

        props.onOrderBurger(order , props.token);
        // axios.post('/orders.json' , order)
        // .then(response => {
        //     console.log(response);
        //     this.setState({loading:false });
        //     props.history.push('/');
        // })
        // .catch(error => {
        //     console.log(error);
        //     this.setState({loading:false});
        // });
    }

    

    const inputChangedHandler = (event , inputIdentifier) => {
        const updatedOrderForm = {
            ...orderForm
        };
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier] 
        };

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkvalidity(updatedFormElement.value , updatedFormElement.validation);
        updatedFormElement.touched = true;
        //console.log(updatedFormElement.valid);
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsvalid = true;
        for(let inputIdentifier in updatedOrderForm){
            formIsvalid = updatedOrderForm[inputIdentifier].valid && formIsvalid;
        }
        setOrderForm(updatedOrderForm);
        setFormIsValid(formIsvalid);

    }

    
        const formElementsArray = [];
        for(let key in orderForm){
            formElementsArray.push({
                id:key,
                config: orderForm[key]
            });
        }

        let form = (
                <form onSubmit={orderHandler}>                     
                    {formElementsArray.map(formElement => (
                        <Input 
                            key={formElement.id}
                            elementType={formElement.config.elementType} 
                            elementConfig={formElement.config.elementConfig} 
                            value={formElement.config.value}  
                            invalid = {!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched = {formElement.config.touched}
                            changed={(event) => inputChangedHandler(event , formElement.id)}
                        /> 
                    ))}
                    <Button btnType="Success" clicked={orderHandler} disabled={!formIsValid}>Order</Button>
                </form>
        );
        if(props.loading){
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>enter your data</h4>
                {form}
            </div>
        )


}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalprice,
        loading: state.order.loading,
        token : state.auth.token,
        userId : state.auth.userID,
    };
};

const mapDispatchToProps = (dispatch) => {
    return{
        onOrderBurger : (orderData , token) => dispatch(actions.purchaseBurger(orderData , token))
    }
    
};


export default  connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData , axios));