import React from 'react'
import { Navigate } from 'react-router-dom'

export default function AdminRoute(props) {
  return props.isAdmin === 1 
    ? props.component 
    : <Navigate to='/' /> 
}
