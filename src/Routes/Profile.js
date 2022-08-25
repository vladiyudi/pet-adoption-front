import React from 'react'
import ProfileSetings from '../Components/ProfileSetings'
import { useAuthContext } from '../Contexts/authContexts'

export default function Profile() {
    const {currentUser} = useAuthContext()
    console.log("this",currentUser)
  return (
    <div>
        <ProfileSetings user={currentUser}/>
    </div>
  )
}
