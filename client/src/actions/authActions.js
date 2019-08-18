import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwtDecode from 'jwt-decode';


import { GET_ERRORS, SET_CURRENT_USER } from './types';

// register
export const registerUser = (userData, history) => dispatch => {

    axios.post('api/users', userData)
        .then(res => {
            history.push('/')
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

// login
export const loginUser = userData => dispatch => {
    // collect credential auth from BCS api
    axios.post('api/auth/login', userData)
        .then(res => {

            const { token } = res.data;

            // set token to localstorage
            localStorage.setItem('budget', token);

            // set token as default header on axios requests
            setAuthToken(token);

            // decode token to get user data
            const decoded = jwtDecode(token)

            // get the rest of the user profile
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}


// create transaction
// export const createTransaction = transactionData => dispatch => {
//     dispatch(setIsLoading());

//     axios.post('api/transactions', transactionData)
//         .then(res => {
//             dispatch(removeLoading());
//             dispatch(setCurrentUser(res.data));
//         })
//         .catch(err => {
//             const errors = { msg: "There was an error processing your request. Please try again." }
//             dispatch(removeLoading());
//             dispatch({
//                 type: GET_ERRORS,
//                 payload: errors
//             })
//         })
// }


// set logged in user
export const setCurrentUser = decoded => dispatch => {
    dispatch({
        type: SET_CURRENT_USER,
        payload: decoded
    });
};


// logs user out
export const logoutUser = history => dispatch => {
    // remove token from localStorage
    localStorage.removeItem('budget');

    // remove auth header
    setAuthToken(false);

    // set current user to {}
    dispatch(setCurrentUser({}));
};