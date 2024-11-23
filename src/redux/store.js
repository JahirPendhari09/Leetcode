import { applyMiddleware, combineReducers, legacy_createStore } from "redux"
import { reducer } from "./reducer"
import { reducer as authReducer } from "./authReducer.js/reducer"
import { thunk } from 'redux-thunk'
const reducers = combineReducers({
    reducer,
    authReducer
})
export const store = legacy_createStore(reducers, applyMiddleware(thunk))