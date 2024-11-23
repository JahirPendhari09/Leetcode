import { CHANGE_TAB, FETCH_ERROR, FETCH_LOADING, LOGIN_SUCCESS, SIGNUP_SUCCESS } from "../actionTypes"

const initialState = {
    auth: false,
    currTab: 2,
    loading: false,
    error: false,
    isRegistered: false,
    user: {}
}

export const reducer = ( state = initialState , {type, payload}) => {
    switch (type) {
        case LOGIN_SUCCESS : {
            return {...state, auth: true, loading: false, user: payload}
        }
        case SIGNUP_SUCCESS : {
            return {...state, isRegistered: true, loading: false}
        }
        case FETCH_ERROR : {
            return {...state, loading: false, error: true}
        }
        case FETCH_LOADING : {
            return {...state, loading: true}
        }
        
        default : {
            return state
        }
    }
}