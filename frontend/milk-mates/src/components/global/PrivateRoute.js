import React from 'react'
import { Navigate } from 'react-router-dom'

export default function PrivateRoute(props) {
  return props.loggedIn 
    ? props.component 
    : <Navigate to='/' /> 
}
