import React from "react";
import Button from "@mui/material/Button";
import { useAuthContext } from '../Contexts/authContexts';
import PetsIcon from '@mui/icons-material/Pets';
import { yellow, green } from '@mui/material/colors';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function NavBar() {
    const {handleOpen, currentUser, handleLogout} = useAuthContext()
  return (
    <div className="d-flex justify-content-center">
      <div className="w-75  navBar d-flex justify-content-end align-items-center">
        <div className={currentUser?"w-100":'d-none'}>
          <Button className="mb-1 ms-4" variant="standard" >
          <ManageAccountsIcon sx={{
        color: green[800],
      }}/>
      <span className="mt-1 ms-2">
       account
          </span>
          </Button>
          <Button  color={"success"} variant="standard" className={currentUser?"me-2 ms-1 h-75":'d-none'}>
          <FavoriteIcon className="mb-1 me-2"
      sx={{
        color: green[800],
      }}
      />
      <span>
       My Pets
          </span>
          </Button>
        </div>
        <Button onClick={handleOpen} color={"success"} variant="contained" className={currentUser?'d-none':"me-2 h-75"}>
        <PetsIcon className="mb-1 me-2"
      sx={{
        color: yellow[50],
      }}
      />
      <span>
       Login
          </span>
          </Button>
          <Button onClick={handleLogout} color={"success"} variant="outlined" className={currentUser?"me-2 h-75":'d-none'}>
        <PetsIcon className="mb-1 me-2"
      sx={{
        color: green[800],
      }}
      />
      <span>
       Logout
          </span>
          </Button>
          
      </div>
    </div>
  );
}
