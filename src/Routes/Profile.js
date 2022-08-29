import React from 'react'
import ProfileSetings from '../Components/ProfileSetings'
import { useAuthContext } from '../Contexts/authContexts'
import ChatButton from '../Components/ChatButton'
import Chat from '../Components/Chat'

export default function Profile() {
    const {currentUser} = useAuthContext()
  return (
    <div>
        <ProfileSetings user={currentUser}/>
        <ChatButton/>
        {/* <Chat></Chat> */}
    </div>
  )
}
