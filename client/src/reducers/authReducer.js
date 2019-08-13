import { SET_CURRENT_USER, USER_CREATED } from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
    isAuthenticated: false,
    loading: false,
    userCreated: false,
    user: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                loading: false,
                user: action.payload
            }
        case USER_CREATED:
            return {
                ...state,
                user: action.payload,
                userCreated: action.payload.userCreated
            }
        default:
            return state
    }
}