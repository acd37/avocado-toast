import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import loadingReducer from './loadingReducer';
import profileReducer from './profileReducer';
import successReducer from './successReducer';

export default combineReducers({
	auth: authReducer,
	errors: errorReducer,
	profile: profileReducer,
	loading: loadingReducer,
	success: successReducer
});
