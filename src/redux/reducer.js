import { CHANGE_TAB, LOGIN_SUCCESS, SIGNUP_SUCCESS } from "./actionTypes"

const initialState = {
    auth: false,
    currTab: 2
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
        default : {
            return state
        }
    }
}