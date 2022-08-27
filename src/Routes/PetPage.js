import React, { useEffect, useState } from "react";
import PetCard from "../Components/PetCard";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../Contexts/authContexts";
import { usePetContext } from "../Contexts/petContext";

export default function PetPage() {
  const [pet, setPet] = useState("");
  const {change} = usePetContext()
  const location = useLocation();
  const loc = location.pathname.split("/");
  const getPet = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/pets/find/${loc[2]}`, {
        withCredentials: true,
      });
      setPet(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPet();
  }, [change]);

  return (
    <div className="d-flex mt-5 w-100 justify-content-center">
      <PetCard pet={pet} modal={true}/>
    </div>
  );
}
