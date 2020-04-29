import React, {Component , useState , useEffect , useCallback} from 'react';
import Aux from '../../hoc/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect , useDispatch , useSelector } from 'react-redux';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';



const BurgerBuilder = props => {
    // constructor(props){
    //     super(props);
    //     this.state = {...}
    // }
    

    const [purchasing , setPurchasing] = useState(false);

    const dispatch = useDispatch();
    const onIngredientAdded = ingName => dispatch(actions.addIngredient(ingName));
    const onIngredientRemoved = ingName => dispatch(actions.removeIngredient(ingName));
    const onInitingredients =  useCallback(() => dispatch(actions.initIngredients()) , [dispatch]);
    const onInitPurchase  =  () => dispatch(actions.purchaseInit());
    const onSetRedirectURL  =  (path) => dispatch(actions.setAuthRedirectPath(path));



    const ings = useSelector(state => {
        return state.burgerBuilder.ingredients;
    });

    const price = useSelector(state => {
        return state.burgerBuilder.totalprice;
    });

    const error = useSelector(state => {
        return state.burgerBuilder.error;
    });

    const isAuthenticated = useSelector(state => {
        return state.auth.token !== null;
    });

    
    useEffect(() => {
        onInitingredients();
    } , [onInitingredients]);

    const updatePurchaseState = (ingredients) => {
        const ingredient = {
            ...ingredients
        };
        const sum = Object.keys(ingredient).map(igkey => {
            return ingredient[igkey]
        }).reduce((sum , el) => {
            return sum + el;
        } , 0);

        return sum>0 ;
    }

    const purchasehandler = () =>{
        console.log("came here");
        if(!isAuthenticated){
            setPurchasing(true);
        }else{
            console.log("came here should");
            onSetRedirectURL('/checkout');
            props.history.push('/auth');
        }
        
    }

   

    

    const purchaseCancelhandler =()=>{
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        
       
        onInitPurchase();
        props.history.push('/checkout');
        
    }

        const disabledInfo = {
            ...ings
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = <Spinner/>;   
        

        if(ings){
            burger = 
            <Aux>
                <Burger ingredients={ings}/>
                <BuildControls ingredientAdded={onIngredientAdded} 
                ingredientRemoved = {onIngredientRemoved}
                disabled = {disabledInfo}
                purchaseable = {updatePurchaseState(ings)}
                price={price}
                isAuth = {isAuthenticated}
                ordered = {purchasehandler}/>
            </Aux>;

            orderSummary = <OrderSummary price={price} 
                            ingredients={ings} 
                            purchaseCancelled = {purchaseCancelhandler} 
                            purchaseContinue={purchaseContinueHandler}/>;
        }

        if(purchasing){
            orderSummary = error ? <p>cant load</p> : <Spinner/>;
        }

        return(
            <Aux>
                <Modal show={purchasing} modalClosed={purchaseCancelhandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalprice,
        error: state.burgerBuilder.error,
        isAuthenticated : state.auth.token !== null,
        
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitingredients: () => dispatch(actions.initIngredients()),
        onInitPurchase : () => dispatch(actions.purchaseInit()),
        onSetRedirectURL : (path) => dispatch(actions.setAuthRedirectPath(path))
    };
}

export default withErrorHandler(BurgerBuilder,axios);