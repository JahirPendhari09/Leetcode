import { CHANGE_TAB, FETCH_ERROR, FETCH_LOADING, LOGIN_SUCCESS, SIGNUP_SUCCESS } from "./actionTypes"

const initialState = {
    auth: false,
    currTab: 2,
    loading: false,
    error: false,
    isRegistered: false,
}

export const reducer = ( state = initialState , {type, payload}) => {
    switch (type) {
        
        case CHANGE_TAB : {
            return {...state, currTab: payload}
        }
        default : {
            return state
        }
    }
}