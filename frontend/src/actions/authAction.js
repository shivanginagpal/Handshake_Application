import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../components/auth/HelperApis';

export const registeruser = (userData,history) => dispatch => {
     axios.post('/signUpStudent', userData)
      .then(res => history.push('/login'))
      .catch(err => 
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
        );
};

//Login
 export const loginUser = (userData, history) => dispatch =>{
    axios.post('/signIn',userData)
    .then(res => {
        const {token} = res.data;
        //set token to local storage
        localStorage.setItem('jwtToken',token);
        setAuthToken(token);
        //Decode token
        const decoded = jwt_decode(token);
        //set current user
        dispatch(setCurrentUser(decoded));
    }).catch(err =>
        dispatch(
            {
                type: GET_ERRORS,
                payload: err.response.data
            }));
};

//Set Logged in user
export const setCurrentUser = (decoded) => {
    return{
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

//LogOut
export const logoutUser = () => dispatch =>{
    localStorage.removeItem('jwtToken');
    //remove auth
    setAuthToken(false);
    //Set current user empty obj
    dispatch(setCurrentUser({}));
}