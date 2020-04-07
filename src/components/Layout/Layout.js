import React, { Component } from 'react';
import Aux from '../../hoc/Auxilary';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Sidedrawer from '../Navigation/SideDrawer/Sidedrawer';

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
                <Toolbar />
                <Sidedrawer open={this.state.showSideDrawer} closed={this.sideDrawClosedhandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
};


export default Layout;