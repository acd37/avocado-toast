import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';


import { GET_ERRORS, SET_CURRENT_USER, LOADING, REMOVE_LOADING, USER_CREATED } from './types';

// register

export const registerUser = userData => dispatch => {
    dispatch(setIsLoading());

    axios.post('api/users', userData)
        .then(res => {
            dispatch(removeLoading());
            dispatch({
                type: USER_CREATED,
                payload: res.data
            })
        })
        .catch(err => {
            const errors = { msg: "There was an error processing your request. Please try again." }
            dispatch(removeLoading());
            dispatch({
                type: GET_ERRORS,
                payload: errors
            })
        })
}

// login
export const loginUser = userData => dispatch => {

    dispatch(setIsLoading());

    // collect credential auth from BCS api
    axios.post('api/auth/login', userData)
        .then(res => {

            if (!res.data.success) {
                const errors = { msg: "Your email address or password is incorrect. Please try again." }
                dispatch(removeLoading());
                dispatch({
                    type: GET_ERRORS,
                    payload: errors
                })
            } else {
                // get the bearer token returned from api
                const token = res.data.token;

                // set token to localstorage
                localStorage.setItem('budget', token);

                // set token as default header on axios requests
                setAuthToken(token);

                console.log(res.data)
                // get the rest of the user profile
                dispatch(setCurrentUser(res.data));
            }
        })
        .catch(err => {
            const errors = { msg: "There was an error processing your request. Please try again." }
            dispatch(removeLoading());
            dispatch({
                type: GET_ERRORS,
                payload: errors
            })
        })
}


// set logged in user
export const setCurrentUser = userData => dispatch => {
    dispatch({
        type: REMOVE_LOADING
    })
    dispatch({
        type: SET_CURRENT_USER,
        payload: userData
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


export const setIsLoading = () => {
    return {
        type: LOADING
    };
};

export const removeLoading = () => {
    return {
        type: REMOVE_LOADING
    };
};