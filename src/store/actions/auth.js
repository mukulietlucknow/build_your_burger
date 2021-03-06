import * as actionTypes from './actionTypes';

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
    // return dispatch => {
    //     dispatch(authStart());
    //     const authdata = {
    //         email : email,
    //         password : password ,
    //         returnSecureToken : true,
    //         token : "mukul"
    //     }

    //     let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBsgOySaZBIch4Nfqj_QWOsjkwILmF6eVw';
    //     if(!isSignUp){
    //         url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBsgOySaZBIch4Nfqj_QWOsjkwILmF6eVw'
    //     }
    //     axios.post(url , authdata)
    //     .then(res => {
    //         console.log(res);
    //         const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
    //         localStorage.setItem('token' , res.data.idToken);
    //         localStorage.setItem('expirationDate' , expirationDate);
    //         localStorage.setItem('userId' , res.data.localId);
    //         dispatch(authSuccess(res.data.idToken , res.data.localId));
    //         dispatch(checkAuthTimeout(res.data.expiresIn))
    //     })
    //     .catch(error => {
    //         console.log(error);
    //         dispatch(authFail(error.response.data.error));
    //     })
    // };
    return {
        type : actionTypes.AUTH_USER,
        email : email,
        isSignUp : isSignUp,
        password : password,
    }
};

export const logout = (expirationTime) => {
    // localStorage.removeItem('token');
    // localStorage.removeItem('expirationDate');
    // localStorage.removeItem('userId');
    return  {
       type : actionTypes.AUTH_INITIATE_LOGOUT,
    }
}

export const logoutSuccessed = () => {
    return  {
        type : actionTypes.AUTH_LOGOUT,
     }
}


export const checkAuthTimeout = (expirationTime) => {
    // return dispatch => {
    //     setTimeout(() => {
    //         dispatch(logout());
    //     }, expirationTime*1000);
    // }
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime : expirationTime,
    }
}

export const setAuthRedirectPath = (path) => {
    return  {
        type : actionTypes.SET_AUTH_REDIRECT_PATH,
        path : path,
    }
}

export const authCheckState = () => {
    // return dispatch => {
    //     const token = localStorage.getItem('token');
    //     const expirationDate = new Date(localStorage.getItem('expirationDate'));
    //     if (!token) {
    //         dispatch(logout());
    //     }else{
    //         if (expirationDate <= new Date()){
    //             dispatch(logout());
    //         }else{
    //             const userId = localStorage.getItem('userId');
    //             dispatch(authSuccess(token , userId));
    //             dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()/1000)));
    //         }            
    //     }
    // }
    return{
        type: actionTypes.AUTH_CHECK_INITIAL_STATE,        
    }
}