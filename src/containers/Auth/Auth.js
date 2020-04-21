import React , { Component} from 'react';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Auth extends Component{
    state = {
        controls:{
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'type your email'
                },
                value: '',
                validation:{
                    required: true,
                    isEmail:true
                },
                valid : false,
                touched: false
            },
            pass: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'type your pass'
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 5
                },
                valid : false,
                touched: false
            }
        },
        isSignUp : true
    }

    checkvalidity(value , rules){
        let isValid = true;
        if(!rules){
            return true;
        }

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    switchAuthModeHandler = () => {
        this.setState(preState => {
            return {isSignUp : !preState.isSignUp};
        })
    }

    inputChangedHandler = (event , controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value : event.target.value,
                valid : this.checkvalidity(event.target.value , this.state.controls[controlName].validation ),
                touched : true
            }
        };

        this.setState({controls : updatedControls});
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value ,this.state.controls.pass.value  , this.state.isSignUp);
    }


    render(){
        const formElementsArray = [];
        for(let key in this.state.controls){
            formElementsArray.push({
                id:key,
                config: this.state.controls[key]
            });
        }

        const form = formElementsArray.map(formElement => (
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
            
        ));
        return (
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success" >Submit</Button>
                    <Button btnType="Danger" clicked={this.switchAuthModeHandler}>{this.state.isSignUp ? 'SignIn' : 'SignUp'}</Button>
                </form>
            </div>
        );
    }
}


// const mapStateToProps = state => {
//     return {
//         ings: state.burgerBuilder.ingredients,
//         price: state.burgerBuilder.totalprice,
//         error: state.burgerBuilder.error
//     };
// }

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email,password , isSignUp) => dispatch(actions.auth(email,password , isSignUp)),
        
    };
}

//export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));

export default connect(null,mapDispatchToProps)(Auth);