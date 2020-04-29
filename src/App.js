import React , { useEffect , Suspense} from 'react';
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {Route , Switch , withRouter , Redirect} from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const Checkout = React.lazy (() => {
  return import('./containers/Checkout/Checkout');
});

const Orders = React.lazy (() => {
  return import('./containers/Orders/Orders');
});

const Auth = React.lazy (() => {
  return import('./containers/Auth/Auth');
});

const App = props => {
    const {onTryAuto} = props;
    useEffect(() => {
      onTryAuto();
    } , [onTryAuto]);  
    
    let routes = (
      <Switch>
            <Route path="/auth" exact render={(props) => <Auth {...props}/>} />
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/" />
      </Switch>          
      
    );

    if (props.isAuthenticated){
      routes = (
        <Switch>          
            <Route path="/checkout" render={(props) => <Checkout {...props}/>} />
            <Route path="/orders" render={(props) => <Orders {...props}/>} />
            <Route path="/logout" exact component={Logout} />
            <Route path="/auth" exact render={(props) => <Auth {...props}/>} />
            <Route path="/" exact component={BurgerBuilder} />
            
          </Switch>
      );
    }
    return (
      <div >
        <Layout><Suspense fallback={<p>Loading</p>}>{routes}</Suspense></Layout>
      </div>
    );
};
 

const mapStateToProps = state => {
  return {
    isAuthenticated : state.auth.token !== null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAuto : () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps , mapDispatchToProps)(App));
