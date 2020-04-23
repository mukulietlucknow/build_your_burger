import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './Contactdata.module.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import {checkvalidity} from '../../../shared/utility';

class ContactData extends Component {

    state = {
        orderForm :{
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
            } 
        },
        formIsValid: false
    }

    

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orederData: formData,
            userId: this.props.userId,
        }

        this.props.onOrderBurger(order , this.props.token);
        // axios.post('/orders.json' , order)
        // .then(response => {
        //     console.log(response);
        //     this.setState({loading:false });
        //     this.props.history.push('/');
        // })
        // .catch(error => {
        //     console.log(error);
        //     this.setState({loading:false});
        // });
    }

    

    inputChangedHandler = (event , inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
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
        this.setState({orderForm: updatedOrderForm , formIsvalid: formIsvalid});

    }

    render(){
        const formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
                <form onSubmit={this.orderHandler}>                     
                    {formElementsArray.map(formElement => (
                        <Input 
                            key={formElement.id}
                            elementType={formElement.config.elementType} 
                            elementConfig={formElement.config.elementConfig} 
                            value={formElement.config.value}  
                            invalid = {!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched = {formElement.config.touched}
                            changed={(event) => this.inputChangedHandler(event , formElement.id)}
                        /> 
                    ))}
                    <Button btnType="Success" clicked={this.orderHandler} disabled={!this.state.formIsvalid}>Order</Button>
                </form>
        );
        if(this.props.loading){
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