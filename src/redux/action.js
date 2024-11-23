import { userLogin, userRegisteration } from "../services/platform"
import { CHANGE_TAB, FETCH_ERROR, FETCH_LOADING, LOGIN_SUCCESS, SIGNUP_SUCCESS } from "./actionTypes"

export const gotoLogin = (loginData) => async(dispatch) => {
    try {
        dispatch({ type: FETCH_LOADING });
        const response = await userLogin(loginData);
        if (response && response.status === 200) {
            dispatch({ type: LOGIN_SUCCESS, payload: loginData });
        } else {
            dispatch({
                type: FETCH_ERROR,
                payload: response?.error || 'An unknown error occurred',
            });
        }
    } catch (error) {
        dispatch({
            type: FETCH_ERROR,
            payload: error.message || 'An unexpected error occurred',
        });
    }
}

export const gotoSignup = (signupData) => async (dispatch) => {
    try {
        dispatch({ type: FETCH_LOADING });
        const response = await userRegisteration(signupData);
        if (response && response.status === 200) {
            dispatch({ type: SIGNUP_SUCCESS, payload: response.data });
        } else {
            dispatch({
                type: FETCH_ERROR,
                payload: response?.error || 'An unknown error occurred',
            });
        }
    } catch (error) {
        dispatch({
            type: FETCH_ERROR,
            payload: error.message || 'An unexpected error occurred',
        });
    }
};


export const changeTab = (tab) => (dispatch) => {
    return (
        dispatch({type: CHANGE_TAB, payload: tab})
    )
}