import { CHANGE_TAB, LOGIN_SUCCESS, SIGNUP_SUCCESS } from "./actionTypes"

export const gotoLogin = (loginData) => (dispatch) => {
    return (
        dispatch({type: LOGIN_SUCCESS, payload: loginData })
    )
}

export const gotoSignup = (signupData) => (dispatch) => {
    return (
        dispatch({type: SIGNUP_SUCCESS, payload: signupData })
    )
}

export const changeTab = (tab) => (dispatch) => {
    return (
        dispatch({type: CHANGE_TAB, payload: tab})
    )
}