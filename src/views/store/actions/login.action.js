// import * as UserActions from './user.actions';
import axios from 'axios';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';


export function submitLogin(userData) {
    console.log(userData);

    
    var data = JSON.stringify({"username": userData.username,"password": userData.password});
    var config = {
    method: 'post',
    url: 'https://ontab.co.uk/v1/authenticate',
    headers: { 
        'Content-Type': 'application/json'
    },
    data : data
    };

    const request = axios(config); 
    return dispatch =>
    request.then(
        response => {
            console.log(response)
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data
            })
        }
    ).catch(function (error) {
        console.log("serwefewfew")
        return dispatch({
            type: LOGIN_ERROR,
            payload: error
        });
    });
}