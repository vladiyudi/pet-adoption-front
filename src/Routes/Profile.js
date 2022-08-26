import React from 'react'
import ProfileSetings from '../Components/ProfileSetings'
import { useAuthContext } from '../Contexts/authContexts'

export default function Profile() {
    const {currentUser} = useAuthContext()
  return (
    <div>
        <ProfileSetings user={currentUser}/>
    </div>
  )
}
