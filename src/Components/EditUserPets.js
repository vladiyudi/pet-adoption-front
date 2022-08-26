import React, { useEffect } from "react";
import { useAuthContext } from "../Contexts/authContexts";
import { useState } from "react";
import PetCard from "./PetCard";
import { nanoid } from "nanoid";
import { usePetContext } from "../Contexts/petContext";
import ProfileSetings from "./ProfileSetings";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {baseUrl} from '../Contexts/authContexts'

export default function EditUserPets() {
  // const { editedUser } = useAuthContext();
  const { pets } = usePetContext();
  const [editedUser, setEditedUser] = useState({});
  const location = useLocation()
  const loc = location.pathname.split('/')

  const findEditedUser = async ()=>{
    try{
    const res = await axios.get(`${baseUrl}/api/users/find/${loc[1]}`, {withCredentials:true})
    setEditedUser (res.data)}
    catch(err){
      console.log(err)
    }
  }

useEffect(()=>{findEditedUser()},[])

  const fostered = pets.filter((pet) =>
    editedUser.fosteredPets?.includes(pet._id)
  );
  const adopted = pets.filter((pet) =>
    editedUser.adoptedPets?.includes(pet._id)
  );

  return (
    <div>
      <ProfileSetings user={editedUser} />
      <div className="d-flex flex-column align-items-center mt-2">
        <h3 className="text-success">Fostered</h3>
        <div className="d-flex justify-content-center flex-wrap">
          {fostered.map((pet) => (
            <PetCard key={nanoid()} pet={pet} modal={false} />
          ))}
        </div>
      </div>
      <div className="d-flex flex-column align-items-center mt-3">
        <h3 className="text-success">Adopted</h3>
        <div className="d-flex justify-content-center flex-wrap">
          {adopted.map((pet) => (
            <PetCard key={nanoid()} pet={pet} modal={false} />
          ))}
        </div>
      </div>
    </div>
  );
}
