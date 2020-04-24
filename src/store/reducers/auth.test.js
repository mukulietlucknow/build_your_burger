import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer' , () => {
    it("should return the initial state" , () => {
        expect(reducer(undefined , {})).toEqual({
            token : null,
            userID : null ,
            error : null,
            loading : false,
            authRedirectPath : '/',
        });
    });

    it('should store toekn on logging in' , () =>{
        expect(reducer({
            token : null,
        userID : null ,
        error : null,
        loading : false,
        authRedirectPath : '/',
        } , {type: actionTypes.AUTH_SUCCESS , idToken : 'some' , userID : 'some'})).toEqual({
            token : 'some',
            userID : 'some' ,
            error : null,
            loading : false,
            authRedirectPath : '/',
        })
    })
})