import React from "react";
import Button from "@mui/material/Button";
import { useAuthContext } from '../Contexts/authContexts';
import PetsIcon from '@mui/icons-material/Pets';
import { yellow, green } from '@mui/material/colors';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

export default function NavBar() {
    const {handleOpen} = useAuthContext()
  return (
    <div className="d-flex justify-content-center">
      <div className="w-75  navBar d-flex justify-content-end align-items-center">
        <div>
          <Button className="">
          <ManageAccountsIcon sx={{
        color: green[800],
      }}/>
          </Button>
        </div>
        <Button onClick={handleOpen} color="success" variant="contained" className="me-2 h-75">
        <PetsIcon className="mb-1 me-2"
      sx={{
        color: yellow[50],
      }}
      />
      <span>
          Login
          </span>
          </Button>
      </div>
    </div>
  );
}
