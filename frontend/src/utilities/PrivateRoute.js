import { Outlet, Navigate } from 'react-router-dom'

import React from 'react'

const PrivateRoute = () => {
    const authenticated = false
    console.log('private route')
  return (
    !authenticated ? <Outlet/> : <Navigate to='/login' />
  )
}

export default PrivateRoute