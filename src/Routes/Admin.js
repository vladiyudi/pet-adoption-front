import React from "react";
import AdminListItem from "../Components/AdminListItem";
import { useAuthContext } from '../Contexts/authContexts';
import { Switch } from "@mui/material";
import { useState } from "react";
import AddAndDysplayPet from "../Components/AddAndDysplayPet";

export default function Admin() {
    const {allUsers} = useAuthContext();
    const [page, setPage] = useState(true)
  return (
    <div className="d-flex flex-column align-items-center mt-4">
      <div className="fs-5">
      <span>Users</span>
      <Switch defaultChecked color="success" 
      onChange={()=>{setPage(!page)}}
      />
      <span>Pets</span>
      </div>
      <div className={!page ?'d-none':'mt-4 w-100'}>
    <AddAndDysplayPet/> 
    </div>
  <div className={page?'d-none':"mt-2 d-flex flex-column align-items-center"}>
    <div className="mb-4 fs-3 text-success"><b>Current users of the service</b></div>
    <div className="d-flex">
      <div className="tableItem"><b>Name</b></div>
      <div className="tableItem"><b>Email</b></div>
      <div className="tableItem"><b>Phone</b></div>

    </div>

      {allUsers.map(user => <AdminListItem key ={user._id} user={user}/>)}
  </div>
  </div>
  );
}
