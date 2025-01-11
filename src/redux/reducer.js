import { CHANGE_TAB, LOGIN_SUCCESS, LOGOUT_SUCCESS, SIGNUP_SUCCESS, VERIFY_EMAIL } from "./actionTypes"

const initialState = {
    auth: false,
    currTab: 2,
    isEmailVerified: false
}

export const reducer = ( state = initialState , {type, payload}) => {
    switch (type) {
        case LOGIN_SUCCESS : {
            return {...state, auth: true}
        }
        case SIGNUP_SUCCESS : {
            return {...state, auth: true}
        }
        case CHANGE_TAB : {
            return {...state, currTab: payload}
        }
        case LOGOUT_SUCCESS : {
            return initialState
        }
        case VERIFY_EMAIL : {
            return {...state, isEmailVerified: true}
        }
        default : {
            return state
        }
    }
}