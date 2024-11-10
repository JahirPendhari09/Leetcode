export const login = (userdata) => (dispatch) => {
    console.log('action called...')
    return (
        dispatch({type:"SUCCESS", payload:'1'})
    )
}

export const changeTab = (tab) => (dispatch) => {
    return (
        dispatch({type: 'CHANGE_TAB', payload: tab})
    )
}