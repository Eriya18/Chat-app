import React from 'react'
import {Outlet, Navigate} from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const PrivateRoutes = () => {
  const {user}=useAuth()
  return (
    <div>
        {user? <Outlet/>: <Navigate to= '/login'/>}
    </div>
  )
}


export default PrivateRoutes