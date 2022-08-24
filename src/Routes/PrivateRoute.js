import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../Contexts/authContexts'



export default function PrivateRoute({children}) {
const navigate = useNavigate()
const {currentUser, handleLogout} = useAuthContext()
// navigate('/')
useEffect(() => {
  if(!currentUser?.userName){
    // handleLogout()
    navigate('/')
  }
}, 
[currentUser]
// []
)

  return (
    children
  )
}
