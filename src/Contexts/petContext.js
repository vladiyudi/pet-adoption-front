import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import axios from "axios";
import { baseUrl, useAuthContext } from "./authContexts";
import { useNavigate } from "react-router-dom";

const petContext = createContext();
export function usePetContext() {
  return useContext(petContext);
}

export default function PetContext({ children }) {
  // const context = useAuthContext();
  // console.log(context);
  const [pets, setPets] = useState([]);
  const [openPetModal, setOpenPetModal] = useState(false);
  const [pet, setPet] = useState("");
  const [addAdmin, setAddAdmin] = useState(false);
  const [ePet, setEPet] = useState({});
  const [change, setChange] = useState(false)
  const navigate = useNavigate();

  const handleOpenPetModal = (pet, admin) => {
    setOpenPetModal(true);
    setPet(pet);
    setAddAdmin(admin);
  };
  const handleClosePetModal = () => setOpenPetModal(false);

  const getAllPets = async () => {
    try {
      const allPets = await axios.get(`${baseUrl}/api/pets`, { withCredentials: true });
      setPets(allPets.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addToFormData = (
    petName,
    type,
    breed,
    weight,
    height,
    color,
    hypoallergenic,
    bio,
    diet,
    picture
  ) => {
    const petData = new FormData();
    petData.append("name", petName);
    petData.append("type", type);
    petData.append("breed", breed);
    petData.append("weight", weight);
    petData.append("height", height);
    petData.append("color", color);
    petData.append("hypoallergenic", hypoallergenic);
    petData.append("bio", bio);
    petData.append("dietary", diet);
    petData.append("picture", picture);
    return petData;
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
    dietary,
    picture
  ) => {
    const diet = dietary.split(",").map((diet) => " " + diet.trim());
    const petData = addToFormData(
      petName,
      type,
      breed,
      weight,
      height,
      color,
      hypoallergenic,
      bio,
      diet,
      picture
    );
    try {
      const res = await axios.post(`${baseUrl}/api/pets/add`, petData,{withCredentials: true});
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
      searchInput, {withCredentials: true}
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
    });
    setPets(updatedList);
  };

  const handleUpdatePetToAdopted = async (petId) => {
    try {
      const updatedPet = await axios.get(
        `${baseUrl}/api/pets/adopt/${petId}`, {withCredentials: true}
      );
      updatePetStatus(updatedPet.data);
      setChange(!change)
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdatePetToAvailable = async (petId) => {
    const updatedPet = await axios.delete(
      `${baseUrl}/api/pets/adopted/${petId}`, {withCredentials: true}
    );
    updatePetStatus(updatedPet.data);
    setChange(!change)
  };

  const handleUpdatePetToFostered = async (petId) => {
    const updatedPet = await axios.get(`${baseUrl}/api/pets/${petId}/foster`, {withCredentials: true}
    );
    updatePetStatus(updatedPet.data);
    setChange(!change)
  };

  const editPet = (pet) => {
    setEPet(pet);
    navigate(`/admin/edit/${pet.name}`);
  };

  const handleEditPet = async (
    petName,
    petType,
    breed,
    weight,
    height,
    color,
    hypoallergenic,
    bio,
    dietary,
    picture
  ) => {
    try {
      let diet = "";
      if (typeof dietary === "string") {
        diet = dietary?.split(",")?.map((diet) => " " + diet.trim());
      } else {
        diet = dietary;
      }
      const editedPet = addToFormData(
        petName,
        petType,
        breed,
        weight,
        height,
        color,
        hypoallergenic,
        bio,
        diet,
        picture,
      );
      const res = await axios.put(`${baseUrl}/api/pets/edit/${ePet._id}`, editedPet, {withCredentials: true});
      getAllPets();
      navigate("/admin");
    } catch (err) {
      console.log(err);
    }
  };

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
        addAdmin,
        editPet,
        ePet,
        handleEditPet,
        change,
      }}
    >
      {children}
    </petContext.Provider>
  );
}
