import { CLEAR_SUCCESS_MESSAGE, GET_SUCCESS_MESSAGE } from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
    switch (action.type) {
        case CLEAR_SUCCESS_MESSAGE:
            return {};
        case GET_SUCCESS_MESSAGE:
            return {
                ...state,
                message: action.payload
            }
        default:
            return state;
    }
}
