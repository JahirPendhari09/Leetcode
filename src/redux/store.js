import { applyMiddleware, combineReducers, legacy_createStore } from "redux"
import { reducer } from "./reducer"
import { thunk } from 'redux-thunk'
const reducers = combineReducers({
    reducer
})
export const store = legacy_createStore(reducers, applyMiddleware(thunk))