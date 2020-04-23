import React, { Component } from 'react';
import Aux from '../../hoc/Auxilary';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Sidedrawer from '../Navigation/SideDrawer/Sidedrawer';
import {connect} from 'react-redux';


class Layout extends Component {

    state = {
        showSideDrawer:true
    }
    sideDrawClosedhandler = () => {
        this.setState({showSideDrawer:false});
    }
    render(){
        return(
            <Aux>
                <Toolbar isAuth={this.props.isAuthenticated}/>
                <Sidedrawer isAuth={this.props.isAuthenticated} open={this.state.showSideDrawer} closed={this.sideDrawClosedhandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
};

const mapStateToProps = state => {
    return {
        isAuthenticated : state.auth.token !== null,

    };
};

export default connect(mapStateToProps,null)(Layout);