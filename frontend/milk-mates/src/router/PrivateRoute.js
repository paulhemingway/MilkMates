import React from 'react'
import { Navigate } from 'react-router-dom'

export default function PrivateRoute(props) {
  return props.loggedIn && !props.user.isAdmin
    ? props.component 
    : <Navigate to='/' /> 
}
