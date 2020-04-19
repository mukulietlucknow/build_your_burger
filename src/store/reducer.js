import * as actionTypes from './actions';

const initialState = {
    ingredients: {
        salad : 0,
        meat : 0,
        bacon : 0, 
        cheese : 0,
    },
    totalprice: 4,
}

const INGREDIENT_PRICES = {
    salad : .5,
    cheese: .4,
    meat: 1.3,
    bacon: .7
}


const reducer = (state = initialState , action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return{
                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] + 1
                },
                totalprice: state.totalprice + INGREDIENT_PRICES[action.ingredientName]
            }
        case actionTypes.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] - 1
                },
                totalprice: state.totalprice - INGREDIENT_PRICES[action.ingredientName]
            }
        default:
            return state;
    }

    return state;
};

export default reducer;