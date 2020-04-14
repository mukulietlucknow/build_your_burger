import React from 'react'
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import {withRouter} from 'react-router-dom';

const burger = (props) => {
    console.log(props);
    let transformedIngredients = Object.keys(props.ingredients).map(igKey => {        
        // console.log(Object.keys(props.ingredients));
        // console.log(Object.entries(props.ingredients));
        return [...Array(props.ingredients[igKey])].map( (_,i) => {            
            return <BurgerIngredient key={igKey+i} type={igKey}/>
        });
    }).reduce((arr  , el ) => {
        return arr.concat(el)
    } , []);

    if(transformedIngredients.length === 0){
        transformedIngredients = <p>PleaseStart Adding some thing to the burger</p>
    }
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default withRouter(burger);