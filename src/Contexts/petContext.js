import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import axios from "axios";
import { baseUrl } from "./authContexts";

const petContext = createContext();
export function usePetContext() {
  return useContext(petContext);
}

export default function PetContext({ children }) {
  const [pets, setPets] = useState([]);
  const [openPetModal, setOpenPetModal] = useState(false);
  const [pet, setPet] = useState("");

  const handleOpenPetModal = (pet) => {
    setOpenPetModal(true);
    setPet(pet);
  };
  const handleClosePetModal = () => setOpenPetModal(false);

  const getAllPets = async () => {
    try {
      const allPets = await axios.get(`${baseUrl}/api/pets`);
      setPets(allPets.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddNewPet = async (
    petName,
    type,
    breed,
    weight,
    height,
    color,
    hypoallergenic,
    bio,
    dietary
  ) => {
    try {
      const diet = dietary.split(",").map((diet) => " " + diet.trim());
      const res = await axios.post(`${baseUrl}/api/pets/add`, {
        name: petName,
        type,
        breed,
        weight,
        height,
        color,
        hypoallergenic,
        bio,
        dietary: [diet],
      });
      getAllPets();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllPets();
  }, []);

  const handleSearchForm = async (
    minHeight,
    maxHeight,
    minWeight,
    maxWeight,
    type,
    status,
    name
  ) => {
    const searchInput = {
      name: name,
      type: type,
      status: status,
      minHeight: minHeight,
      maxHeight: maxHeight,
      minWeight: minWeight,
      maxWeight: maxWeight,
    };
    const searchResults = await axios.post(
      `${baseUrl}/api/pets/search`,
      searchInput
    );
    setPets(searchResults.data);
  };

  const updatePetStatus = (updatedPet) => {
    const updatedList = pets.map((pet) => {
      if (pet._id === updatedPet._id) {
        return updatedPet;
      } else {
        return pet;
      }
    })
    setPets(updatedList);
  };

  const handleUpdatePetToAdopted = async (petId, uid) => {
    try {
      const updatedPet = await axios.get(`${baseUrl}/api/pets/adopt/${uid}/${petId}`);
      updatePetStatus(updatedPet.data)
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdatePetToAvailable = async (petId) => {
    const updatedPet = await axios.delete(`${baseUrl}/api/pets/adopted/${petId}`);
    updatePetStatus(updatedPet.data)
  }

  const handleUpdatePetToFostered = async (petId, userId) =>{

    

    const updatedPet = await axios.put(`${baseUrl}/api/pets/${petId}/foster/${userId}`);
    updatePetStatus(updatedPet.data)
  }

  return (
    <petContext.Provider
      value={{
        handleSearchForm,
        pets,
        handleClosePetModal,
        handleOpenPetModal,
        openPetModal,
        pet,
        handleAddNewPet,
        handleUpdatePetToAdopted,
        handleClosePetModal,
        handleUpdatePetToAvailable,
        handleUpdatePetToFostered,
      }}
    >
      {children}
    </petContext.Provider>
  );
}
