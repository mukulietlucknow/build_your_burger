import * as actionTypes from './actionTypes';
import axios from 'axios';


export const authStart = () => {
    return{
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (token ,userId) => {
    return{
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    }
};


export const authFail = (error) => {
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
    }
};

export const auth = (email , password , isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authdata = {
            email : email,
            password : password ,
            returnSecureToken : true,
            token : "mukul"
        }

        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBsgOySaZBIch4Nfqj_QWOsjkwILmF6eVw';
        if(!isSignUp){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBsgOySaZBIch4Nfqj_QWOsjkwILmF6eVw'
        }
        axios.post(url , authdata)
        .then(res => {
            console.log(res);
            dispatch(authSuccess(res.data.idToken , res.data.localId));
        })
        .catch(error => {
            console.log(error);
            dispatch(authFail(error));
        })
    };
};