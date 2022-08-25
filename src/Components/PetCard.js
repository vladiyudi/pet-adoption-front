import * as React from "react";
import { Avatar } from "@mui/material";
import { usePetContext } from "../Contexts/petContext";
import PetsIcon from "@mui/icons-material/Pets";
import { green } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { useAuthContext } from "../Contexts/authContexts";
import { useState } from "react";


const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function PetCard({ pet, modal, admin }) {
  const {
    handleOpenPetModal,
    handleUpdatePetToAdopted,
    handleClosePetModal,
    handleUpdatePetToAvailable,
    handleUpdatePetToFostered,
    editPet,
  } = usePetContext();
  const {
    handleAddtoFavorites,
    handleAddToAdopted,
    handleRemoveFromFavorites,
    returnPet,
    fosterPet,
  } = useAuthContext();
  const { currentUser } = useAuthContext();

  let diet = "";
  pet.dietary?.forEach((element, i) => {
    if (i === pet.dietary.length - 1) {
      diet += element;
    } else {
      diet += element + "," + " ";
    }
  });

  let aStatus = "";
  if (pet.adoptionStatus === "Adopted") {
    aStatus = "danger";
  } else if (pet.adoptionStatus === "Fostered") {
    aStatus = "warning";
  } else {
    aStatus = "success";
  }

  return (
    <div
      className="border petCard me-2 mb-2 pb-4 pt-1 pe-1"
      onClick={() => {
        !modal && handleOpenPetModal(pet, admin);
      }}
    >
      <div className="d-flex w-100">
        <div>
          <Avatar
            className={`mt-3 ms-3 petAvatar-${aStatus}`}
            alt="Remy Sharp"
            src={pet.picture}
            sx={{ width: 120, height: 120 }}
          />
        </div>
        <div className="ms-4 mt-4 d-flex flex-column justify-content-evenly w-100">
          <div className="d-flex justify-content-between w-100">
            <div className="petName w-100">
              <div className="d-flex justify-content-between">
                <div className="">
                  <span className="text-secondary">name: </span>
                  <span className="text-success">
                    <b>{pet.name}</b>
                  </span>
                </div>
                <div className="aStatus me-3">
                  <span className={`text-${aStatus}`}>
                    {pet.adoptionStatus}
                  </span>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="text-secondary">type: </span>
                  <span className="text-success">
                    <b>{pet.type}</b>
                  </span>
                </div>
                <div
                  className={"me-3"}
                  onClick={(e) => {
                    e.stopPropagation();
                   !currentUser?.interested?.includes(pet._id) && handleAddtoFavorites(pet)
                   currentUser?.interested?.includes(pet._id) && handleRemoveFromFavorites(pet);
                  }}
                >
                  <span className="text-success">Save</span>
                  <Checkbox
                    checked={currentUser?.interested?.includes(pet._id) ? true : false}
                    {...label}
                    icon={<FavoriteBorder />}
                    checkedIcon={
                      <Favorite
                        sx={{
                          color: green[800],
                        }}
                      />
                    }
                  />
                </div>
              </div>
              <div className="mt-1 mb-2">
                <span className="text-secondary">breed: </span>
                <span className="text-success">
                  <b>{pet.breed}</b>
                </span>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-start  w-100 ">
            <div className="mb-2">
              <span className="text-secondary">height: </span>
              <span className="text-success">
                <b>{pet.height}</b>
              </span>
            </div>
            <div className="ms-4">
              <span className="text-secondary">weight: </span>
              <span className="text-success">
                <b>{pet.weight}</b>
              </span>
            </div>
          </div>
          <div className={modal ? "d-flex" : "d-none"}>
            <div>
              <span className="text-secondary">color: </span>
              <span className="text-success">
                <b>{pet.color}</b>
              </span>
            </div>
            <div className="ms-4">
              <span className="text-secondary">hypoallergenic: </span>
              <span className="text-success">
                <b>{`${pet.hypoallergenic}`}</b>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-end"></div>
      <div className={modal ? "ms-5 mt-2 mb-4 me-5" : "d-none"}>
        <div>
          <span className="text-secondary">bio: </span>
          <span className="text-success">
            <i>{`${pet.bio}`}</i>
          </span>
        </div>
        <div>
          <span className="text-secondary">dietery: </span>
          <span className="text-success">
            <i>{diet}</i>
          </span>
        </div>
      </div>
      <div
        className={modal ? " d-flex justify-content-center " : "d-none"}
      >
        <Button className={admin?"me-2":"d-none"}
         color="secondary"
         variant="contained"
         onClick={(e)=>{
          e.stopPropagation();
          handleClosePetModal();
          editPet(pet)
        }}
        >
        <PetsIcon className={"mb-1 me-2"} sx={{}} 
        />
          <span>Edit</span>
        </Button>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleClosePetModal();
            returnPet(pet._id);
            handleUpdatePetToAvailable(pet._id);
          }}
          color="error"
          variant="contained"
          className={
            pet.adoptionStatus==='Adopted' && currentUser?.adoptedPets?.includes(pet._id) || pet.adoptionStatus==='Fostered' && currentUser?.fosteredPets?.includes(pet._id)?
              "me-2"
              : "d-none"
          }
        >
          <PetsIcon className={"mb-1 me-2"} sx={{}} />
          <span>Return</span>
        </Button>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleClosePetModal();
            fosterPet(pet._id);
            handleUpdatePetToFostered(pet._id, currentUser?._id);
          }}
          color="warning"
          variant="contained"
          className={pet.adoptionStatus==='Available' ? "me-2" : "d-none"}
        >
          <PetsIcon className={"mb-1 me-2"} sx={{}} />
          <span>Foster</span>
        </Button>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleClosePetModal();
            handleAddToAdopted(pet);
            handleUpdatePetToAdopted(pet._id);
          }}
          color="success"
          variant="contained"
          className={
            pet.adoptionStatus==='Available' || currentUser?.fosteredPets?.includes(pet._id) ? 
            "me-2" 
            : "d-none"
          }
        >
          <PetsIcon className={"mb-1 me-2"} sx={{}} />
          <span>Adopt</span>
        </Button>
      </div>
    </div>
  );
}
