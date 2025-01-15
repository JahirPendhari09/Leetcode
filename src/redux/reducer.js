import { CHANGE_TAB, ERROR, LOGIN_SUCCESS, LOGOUT_SUCCESS, SIGNUP_SUCCESS, VERIFY_EMAIL } from "./actionTypes"

const initialState = {
    auth: false,
    currTab: 2,
    isEmailVerified: false,
    email: '',
    username: '',
    error: false,
    errMessage: ''
}

export const reducer = ( state = initialState , {type, payload}) => {
    switch (type) {
        case LOGIN_SUCCESS : {
            return {...state, auth: true, error: false, email: payload.email, username: payload.username}
        }
        case SIGNUP_SUCCESS : {
            return {...state, auth: true, error: false, email: payload.email, username: payload.username}
        }
        case CHANGE_TAB : {
            return {...state, error: false, currTab: payload}
        }
        case LOGOUT_SUCCESS : {
            return initialState
        }
        case VERIFY_EMAIL : {
            return {...state, error: false, isEmailVerified: true}
        }
        case ERROR: {
            return {...state, error: true, errMessage: payload.error}
        }
        default : {
            return state
        }
    }
}