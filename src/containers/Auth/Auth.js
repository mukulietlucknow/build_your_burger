import React , { Component , useState ,useEffect } from 'react';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';
import {checkvalidity} from '../../shared/utility';

const Auth = props => {
    const [authForm , setAuthForm] = useState({
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
    });
    const [isSignUp , setIsSignUp] = useState();
    const {building,authRedirectPath, onSetAuthRedirectPath} = props;
    useEffect(() => {
        if (!building && authRedirectPath !== '/'){
            onSetAuthRedirectPath()
        }
    } , [building,authRedirectPath,onSetAuthRedirectPath]);
    
    

    const switchAuthModeHandler = () => {
        setIsSignUp(!isSignUp);
    }

    const inputChangedHandler = (event , controlName) => {
        const updatedControls = {
            ...authForm,
            [controlName]:{
                ...authForm[controlName],
                value : event.target.value,
                valid : checkvalidity(event.target.value , authForm[controlName].validation ),
                touched : true
            }
        };

        setAuthForm(updatedControls);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(authForm.email.value ,authForm.pass.value  , isSignUp);
    }

    


    
        const formElementsArray = [];
        for(let key in authForm){
            formElementsArray.push({
                id:key,
                config: authForm[key]
            });
        }

        let form = formElementsArray.map(formElement => (
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
            
        ));

        if (props.loading){
            form = <Spinner/>
        }
        let errorMsg = null;
        if(props.error){
            errorMsg = <p> { props.error.message }</p>
        }

        let authRedirect = null;
        if (props.isAuthenticated){
            authRedirect = <Redirect to={props.authRedirectPath}/>;
        }
        return (
            <div className={classes.Auth}>
                {authRedirect}
                <form onSubmit={submitHandler}>
                    {form}
                    <Button btnType="Success" >Submit</Button>
                    <Button btnType="Danger" clicked={switchAuthModeHandler}>{isSignUp ? 'SignIn' : 'SignUp'}</Button>
                </form>
                {errorMsg}
            </div>
        );
}


const mapStateToProps = state => {
    return {
        loading : state.auth.loading,
        error : state.auth.error,
        isAuthenticated : state.auth.token !== null,
        building : state.burgerBuilder.building,
        authRedirectPath : state.auth.authRedirectPath
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email,password , isSignUp) => dispatch(actions.auth(email,password , isSignUp)),
        onSetAuthRedirectPath : () => dispatch(actions.setAuthRedirectPath('/')),
        
    };
}

//export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));

export default connect(mapStateToProps,mapDispatchToProps)(Auth);