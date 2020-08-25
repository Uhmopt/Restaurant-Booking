// import * as UserActions from './user.actions';
import axios from 'axios';
export const REGISTER_ERROR = 'REGISTER_ERROR';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

export function submitRegister(data) {

	var fk_data = `{\n    "firstName": ${data.firstName},\n    "surname": ${data.username},\n    "phone": ${data.phone},\n    "email": ${data.email},\n    "username": ${data.username},\n    "password": ${data.password},\n    "roles": [\n        "ADMIN"\n    ]\n}`;

	var config = {
	  method: 'post',
	  url: 'https://ontab.co.uk/v1/user/register',
	  headers: { },
	  data : fk_data
	};

	const request = axios(config); 
    return dispatch =>
    request.then(
        response => {
			console.log(response);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: response.data
            })
        }
    ).catch(function (error) {
        return dispatch({
            type: REGISTER_ERROR,
            payload: error
        });
    });
}
