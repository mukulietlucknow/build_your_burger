import React, {Component} from 'react';
import Aux from '../../hoc/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index';
import axios from '../../axios-orders';


class BurgerBuilder extends Component{
    // constructor(props){
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        purchasing: false,
        // loading: false,
        // error : false
    }

    componentDidMount(){
        // axios.get('https://burger-f0ba1.firebaseio.com/ingredients.json').then(response => {
        //     console.log(response);
        //     this.setState({ingredients:response.data});
        //     console.log(response);
        // }).catch(error => {
        //     this.setState({error : true});
        // });
        this.props.onInitingredients();
    }

    updatePurchaseState = (ingredients) => {
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

    purchasehandler = () =>{
        this.setState({purchasing : true});
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updateCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updateCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice =  this.state.totalprice;
    //     const newprice = oldPrice + priceAddition;
    //     this.setState({totalprice : newprice , ingredients:updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if(oldCount <= 0){
    //         return;
    //     }
    //     const updateCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updateCount;
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice =  this.state.totalprice;
    //     const newprice = oldPrice - priceDeduction;
    //     this.setState({totalprice : newprice , ingredients:updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // }

    purchaseCancelhandler =()=>{
        this.setState({purchasing:false});
    }

    purchaseContinueHandler = () => {
        
        // const queryParams = [];
        // for (let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i) +  '=' + encodeURIComponent(this.state.ingredients[i]))
        // }
        // queryParams.push('price='+ this.props.totalprice);
        // const queryString = queryParams.join('&');
        // this.props.history.push({
        //     pathname : '/checkout',
        //     search: '?' + queryString
        // });

        this.props.history.push('/checkout');
        
    }

    render(){
        const disabledInfo = {
            ...this.props.ings
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = <Spinner/>;   
        

        if(this.props.ings){
            burger = 
            <Aux>
                <Burger ingredients={this.props.ings}/>
                <BuildControls ingredientAdded={this.props.onIngredientAdded} 
                ingredientRemoved = {this.props.onIngredientRemoved}
                disabled = {disabledInfo}
                purchaseable = {this.updatePurchaseState(this.props.ings)}
                price={this.props.price}
                ordered = {this.purchasehandler}/>
            </Aux>;

            orderSummary = <OrderSummary price={this.props.price} 
                            ingredients={this.props.ings} 
                            purchaseCancelled = {this.purchaseCancelhandler} 
                            purchaseContinue={this.purchaseContinueHandler}/>;
        }

        if(this.state.loading){
            orderSummary = this.props.error ? <p>cant load</p> : <Spinner/>;
        }

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelhandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalprice,
        error: state.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitingredients: () => dispatch(burgerBuilderActions.initIngredients()),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));