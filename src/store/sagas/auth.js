import { put,delay } from 'redux-saga/effects';
//import {delay} from 'redux-saga';
import * as actions from '../actions/index';
import axios from 'axios';


export function* logoutSaga(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put(actions.logoutSuccessed());
}


export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime*1000);
    yield put(actions.logout());    
}


export function* authUserSaga(action) {
    put(actions.authStart());
    const authdata = {
        email : action.email,
        password : action.password ,
        returnSecureToken : true,
        token : "mukul"
    }

    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBsgOySaZBIch4Nfqj_QWOsjkwILmF6eVw';
    if(!action.isSignUp){
        url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBsgOySaZBIch4Nfqj_QWOsjkwILmF6eVw'
    }
    try{
    const res = yield axios.post(url , authdata)
    yield console.log(res);
    const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
    yield localStorage.setItem('token' , res.data.idToken);
    yield localStorage.setItem('expirationDate' , expirationDate);
    yield localStorage.setItem('userId' , res.data.localId);
    yield put(actions.authSuccess(res.data.idToken , res.data.localId));
    yield put(actions.checkAuthTimeout(res.data.expiresIn))
    }catch(err){
        yield console.log(err);
        yield put(actions.authFail(err.response.data.error));
    }
    
}