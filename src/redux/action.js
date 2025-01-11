import { CHANGE_TAB, LOGIN_SUCCESS, LOGOUT_SUCCESS, SIGNUP_SUCCESS, VERIFY_EMAIL } from "./actionTypes"

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

export const logoutUser = () => (dispatch) => {
    return (
        dispatch({type: LOGOUT_SUCCESS })
    )
}

export const verifyUserEmail = () => (dispatch) => {
    return (
        dispatch({type: VERIFY_EMAIL })
    )
}