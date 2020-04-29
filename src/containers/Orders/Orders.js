import React, { Component , useEffect } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

const Orders  = props => {

    // state = {
    //     orders : [],
    //     loading : true,
    // }
    const {onFetchOrders} = props;
    useEffect(() => {
        onFetchOrders(props.token , props.userId);
    } , [onFetchOrders]);

    
        let orders = (<div>
            {props.orders.map(order => (
            <Order key={order.id} ingredients = {order.ingredients} price={order.price}/>
        ))};
        </div>)

        if (props.loading){
            orders = <Spinner />
        }
        return (
            <div>
                {orders}
            </div>
        );
}

const mapStateToProps = state => {
    return {orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId : state.auth.userID,
    };
};

const mapDispatchToProps = (dispatch) => {
    return{
        onFetchOrders : (token , userId) => dispatch(actions.fetchOrders(token , userId)),
    }
    
};




export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders , axios));