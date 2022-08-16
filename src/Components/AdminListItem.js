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
      <span>{user.userName} </span>
      <span>&nbsp;</span>
      <span>{user?.lastName}</span>
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

 

{/* <table class="table table-bordered">
  <tbody>
    <tr>
    <th scope="row">1</th>
      <td>{user.admin}</td>
      <td>{user.userName}</td>
      <td>{user?.lastName}</td>
      <td>{user.email}</td>
      <td>{user?.phoneNumber}</td>
      <td>{user?.fosteredPets}</td>
      <td>{user?.adoptedPets}</td>
    </tr>
  </tbody>
</table> */}


      
  
}
