import React from 'react'
import Checkbox from '@mui/material/Checkbox';
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../Contexts/authContexts';


export default function AdminListItem({user}) {
 const {currentUser, openPrivatePage} = useAuthContext()
  return (
    <div className='d-flex justify-content-center mt-1' onClick={()=>{openPrivatePage(user)}}>
    <div className='d-flex border rounded adminItem'>
    <div className='tableItem'>
      <span><span className='me-1'>{user.admin?`(A)`:'' }</span><b>{user.userName}</b></span>
      <span>&nbsp;</span>
      <span><b>{user?.lastName}</b></span>
    </div>
    <div className='tableItem'>
      <span>{user.email}</span>
    </div>
    <div className='tableItem'>
      <span>{user?.phoneNumber}</span>
    </div>
    </div>
    </div>
  
  )
}
