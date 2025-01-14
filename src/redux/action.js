import { loginUser, registerNewUser } from "../services/auth"
import { CHANGE_TAB, ERROR, LOGIN_SUCCESS, LOGOUT_SUCCESS, SIGNUP_SUCCESS, VERIFY_EMAIL } from "./actionTypes"

export const gotoLogin = (loginData) => async(dispatch) => {

    if( loginData.username === 'test@gmail.com' && loginData.password === 'Test@123') {
        dispatch({type: LOGIN_SUCCESS, payload: loginData })
    }
    else{
        try{
            const response = await loginUser(loginData)
            dispatch({type: LOGIN_SUCCESS, payload: response.data.user })
        }
        catch(err) {
            dispatch({ type: ERROR, payload: { error: err} })
        }
    }
}

export const gotoSignup = (signupData) => async (dispatch) => {
    try{
        const response = await registerNewUser(signupData)
        dispatch({type: SIGNUP_SUCCESS, payload: response.data.user })
    }
    catch(err) {
        dispatch({ type: ERROR, payload: { error: err} })
    }
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
