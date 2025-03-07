import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

const PrivateRoute = ({children}) => {
  const auth = useSelector(store => store.reducer.auth)
  const location = useLocation()
  return (
    auth ? children : <Navigate to='/login' state={{ from: location }}/>
  )
}

export default PrivateRoute
