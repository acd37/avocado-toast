import axios from 'axios';
import {
	GET_PROFILE,
	GET_ERRORS,
	SET_CURRENT_USER,
	REMOVE_LOADING,
	PROFILE_LOADING,
	GET_SUCCESS_MESSAGE
} from './types';

// get current profile
export const getCurrentProfile = () => (dispatch) => {
	dispatch(setIsLoading());
	axios
		.get('/api/users')
		.then((res) => {
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			});
		})
		.catch((err) => {
			// dispatch(removeLoading());
			dispatch({
				type: GET_PROFILE,
				payload: {}
			});
		});
};

// reset user
export const resetUser = () => (dispatch) => {
	axios
		.put('/api/categories/reset')
		.then((res) => {
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

// delete account
export const deleteAccount = () => (dispatch) => {
	if (window.confirm('Are you sure? This cannot be reversed.')) {
		axios
			.delete('/api/users')
			.then((res) => {
				dispatch({
					type: SET_CURRENT_USER,
					payload: {}
				});
			})
			.catch((err) =>
				dispatch({
					type: GET_ERRORS,
					payload: err.response.data
				})
			);
	}
};

// create category
export const createCategory = (categoryData) => (dispatch) => {
	axios
		.post('api/categories', categoryData)
		.then((res) => {
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
};

export const deleteCategory = (categoryData) => (dispatch) => {
	let data = {
		category_id: categoryData
	};

	axios
		.delete('/api/categories', { data: data })
		.then((res) => {
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

// load funds
export const loadFunds = (fundData) => (dispatch) => {
	axios
		.put('/api/categories/load', fundData)
		.then((res) => {
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

// load funds
export const addIncome = (incomeData) => (dispatch) => {
	axios
		.put('/api/users/income', incomeData)
		.then((res) => {
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

// release funds
export const releaseFunds = (releaseData) => (dispatch) => {
	console.log('release data', releaseData);
	axios
		.put('/api/categories/release', releaseData)
		.then((res) => {
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

// create category
export const createTransaction = (transactionData) => (dispatch) => {
	axios
		.post('/api/transactions', transactionData)
		.then((res) => {
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			});
		})
		.catch((err) => {
			console.log(err.response.data);
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
};

export const deleteTransaction = (transactionData) => (dispatch) => {
	let data = {
		transaction_id: transactionData
	};

	axios
		.delete('/api/transactions', { data: data })
		.then((res) => {
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

export const updateUserProfile = (userData) => (dispatch) => {
	axios
		.put(`/api/users/${userData.id}`, userData)
		.then((res) => {
			dispatch({
				type: GET_PROFILE,
				payload: res.data.user
			});
			dispatch({
				type: GET_SUCCESS_MESSAGE,
				payload: res.data.success
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

export const updateUserPassword = (userData) => (dispatch) => {
	axios
		.put(`/api/users/password/${userData.id}`, userData)
		.then((res) => {
			dispatch({
				type: GET_PROFILE,
				payload: res.data.user
			});
			dispatch({
				type: GET_SUCCESS_MESSAGE,
				payload: res.data.success
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

export const setIsLoading = () => {
	return {
		type: PROFILE_LOADING
	};
};

export const removeLoading = () => {
	return {
		type: REMOVE_LOADING
	};
};
