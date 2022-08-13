import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../Contexts/authContexts'



export default function PrivateRoute({children}) {
const navigate = useNavigate()
const {currentUser} = useAuthContext()

useEffect(() => {
  if(!currentUser){
    navigate('/')
  }
}, [currentUser])

  return (
    children
  )
}
