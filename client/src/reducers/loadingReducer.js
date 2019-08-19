import { LOADING, REMOVE_LOADING } from '../actions/types';

const initialState = {
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loading: !action.payload
            }
        case REMOVE_LOADING:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}