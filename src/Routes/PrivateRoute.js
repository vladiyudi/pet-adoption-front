import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../Contexts/authContexts'



export default function PrivateRoute({children}) {
const navigate = useNavigate()
const {currentUser, verifyUser} = useAuthContext()

//   useEffect(()=>{
// if (!currentUser?.userName) navigate('/')
//   },[currentUser])


  return (
    children
  )
}
