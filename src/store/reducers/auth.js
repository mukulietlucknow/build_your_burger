import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token : null,
    userID : null ,
    error : null,
    loading : false,
    authRedirectPath : '/',
};

const reducer = (state = initialState , action) => {
    switch(action.type){
        case actionTypes.AUTH_START:
            return{
                ...state,
                loading: true,
                error : null
            }; 
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return{
                ...state,
                authRedirectPath : action.path,
            }; 
        case actionTypes.AUTH_SUCCESS:
            return{
                ...state,
                loading: false,
                error : null,
                userID : action.userId,
                token : action.token
            }; 
        case actionTypes.AUTH_FAIL:
            return{
                ...state,
                loading: false,
                error : action.error
            }; 
        case actionTypes.AUTH_LOGOUT:
            return{
                ...state,
                userId: null,
                token : null
            };
        default:
            return state;
    }    
};

export default reducer;