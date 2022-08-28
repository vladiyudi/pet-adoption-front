import React, { useEffect } from "react";
import AdminListItem from "../Components/AdminListItem";
import { useAuthContext } from '../Contexts/authContexts';
import { Button, Switch } from "@mui/material";
import { useState } from "react";
import AddAndDysplayPet from "../Components/AddAndDysplayPet";
import PetCard from "../Components/PetCard";
import { usePetContext } from "../Contexts/petContext";
import { nanoid } from "nanoid";
import { useMediaQuery } from "react-responsive";
import AnnouncementIcon from '@mui/icons-material/Announcement';
import Checkbox from '@mui/material/Checkbox';


export default function Admin() {
    const {allUsers, getAllUsers} = useAuthContext();
    const {pets, openNewsFeed} = usePetContext()
    const [page, setPage] = useState(true)
    const isMobile = useMediaQuery({ maxWidth: 700 });

useEffect(()=>{
  getAllUsers()
},[])
  return (
    <div className="d-flex flex-column align-items-center mt-4">
            <span 
            className="feed">  
              <Checkbox onChange={openNewsFeed} icon={<AnnouncementIcon/>} checkedIcon={<AnnouncementIcon/>} />
              </span>
      <div className="fs-5">
      <span>
        <Button color='success'>Users</Button>
        </span>
      <Switch defaultChecked color="success" 
      onChange={()=>{setPage(!page)}}
      />
      <span> <Button color='success'>Pets</Button></span>
      </div>
      <div className={!page ?'d-none':'mt-4 w-100 d-flex flex-column align-items-center'}>
    <AddAndDysplayPet isMobile={isMobile}/> 
    <div className="d-flex flex-wrap justify-content-center mt-4">
          {pets.map(pet=><PetCard key={nanoid()} pet={pet} modal={false} admin={true} />)}
        </div>
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
