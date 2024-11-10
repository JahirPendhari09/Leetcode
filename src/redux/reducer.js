
const initialState = {
    auth: false,
    currTab: 2
}

export const reducer = ( state = initialState , {type, payload}) => {
    switch (type) {
        case 'SUCCESS' : {
            return 1
        }
        case 'CHANGE_TAB': {
            return {...state, currTab: payload}
        }
        default : {
            return state
        }
    }
}