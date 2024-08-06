
const initialState = {
    auth : false
}

export const reducer = ( state = initialState , {type, payload}) => {
    switch (type) {
        case 'SUCCESS' : {
            return 1
        }
        default : {
            return state
        }
    }
}