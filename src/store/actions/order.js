import * as actiontypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id , orderData) => {
    return{
        type:actiontypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return{
        type:actiontypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return{
        type: actiontypes.PURCHASE_BURGER_START
    }
}

export const purchaseInit = () => {
    return{
        type: actiontypes.PURCHASE_INIT
    }
}

export const purchaseBurger = (orderData , token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token , orderData)
        .then(response => {
            console.log(response);
            dispatch(purchaseBurgerSuccess(response.data.name , orderData));
        })
        .catch(error => {
            console.log(error); 
            dispatch(purchaseBurgerFail(error));
        });
    }
}

export const fetchOrderSuccess = (orders) => {
    return{
        type:actiontypes.FETCH_ORDER_SUCCESS,
        orders: orders
    }
};

export const fetchOrderFail = (error) => {
    return{
        type:actiontypes.FETCH_ORDER_FAIL,
        error: error
    }
};


export const fetchOrderStart = () => {
    return{
        type:actiontypes.FETCH_ORDER_START,
    }
};


export const fetchOrders = (token , userId) => {
    return dispatch => {
        const queryParams = '?auth='+ token + '&orderBy="userId"&equalTo="'+userId + '"';
        dispatch(fetchOrderStart());
        axios.get('/orders.json' + queryParams)
        .then(res => {
            const fetchedOrders = [];
            for (let key in res.data){
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            dispatch(fetchOrderSuccess(fetchedOrders));

        })
        .catch(err => {
            dispatch(fetchOrderSuccess(err));
        });
    }
}







