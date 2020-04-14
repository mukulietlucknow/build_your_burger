import React, {Component} from 'react';
import Aux from '../../hoc/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
const INGREDIENT_PRICES = {
    salad : .5,
    cheese: .4,
    meat: 1.3,
    bacon: .7
}

class BurgerBuilder extends Component{
    // constructor(props){
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        ingredients:null,
        totalprice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error : false
    }

    componentDidMount(){
        axios.get('https://burger-f0ba1.firebaseio.com/ingredients.json').then(response => {
            console.log(response);
            this.setState({ingredients:response.data});
            console.log(response);
        }).catch(error => {
            this.setState({error : true});
        });
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

        this.setState({purchaseable: sum>0});
    }

    purchasehandler = () =>{
        this.setState({purchasing : true});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updateCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice =  this.state.totalprice;
        const newprice = oldPrice + priceAddition;
        this.setState({totalprice : newprice , ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updateCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updateCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice =  this.state.totalprice;
        const newprice = oldPrice - priceDeduction;
        this.setState({totalprice : newprice , ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseCancelhandler =()=>{
        this.setState({purchasing:false});
    }

    purchaseContinueHandler = () => {
        //alert("please proceed");
        // this.setState({loading:true});
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalprice,
        //     customer:{
        //         name: "mukul",
        //         address: {
        //             city : "koramangala",
        //             zip: "560034",
        //             country: "India"
        //         },
        //         email : "mukul.ietlucknow",
        //     },
        //     deliverySpeed : 'fastest'            
        // }
        // axios.post('/orders.json' , order)
        // .then(response => {
        //     console.log(response);
        //     this.setState({loading:false , purchasing:false});
        // })
        // .catch(error => {
        //     console.log(error);
        //     this.setState({loading:false,purchasing:false});
        // });
        const queryParams = [];
        for (let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) +  '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname : '/checkout',
            search: '?' + queryString
        });
        
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = <Spinner/>;   
        

        if(this.state.ingredients){
            burger = 
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls ingredientAdded={this.addIngredientHandler} 
                ingredientRemoved = {this.removeIngredientHandler}
                disabled = {disabledInfo}
                purchaseable = {this.state.purchaseable}
                price={this.state.totalprice}
                ordered = {this.purchasehandler}/>
            </Aux>;

            orderSummary = <OrderSummary price={this.state.totalprice} 
                            ingredients={this.state.ingredients} 
                            purchaseCancelled = {this.purchaseCancelhandler} 
                            purchaseContinue={this.purchaseContinueHandler}/>;
        }

        if(this.state.loading){
            orderSummary = this.state.error ? <p>cant load</p> : <Spinner/>;
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

export default withErrorHandler(BurgerBuilder,axios);