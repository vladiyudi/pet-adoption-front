import React from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useState } from "react";
import { usePetContext } from "../Contexts/petContext";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { InputLabel } from "@mui/material";
import { yellow } from "@mui/material/colors";
import FormControl from "@mui/material/FormControl";
import PetsIcon from "@mui/icons-material/Pets";

export default function AddAndDysplayPet({ePet}) {
  const [petName, setPetName] = useState(ePet?.name?ePet?.name:"");
  const [petType, setType] = useState(ePet?.type?ePet?.type:"");
  const [breed, setBreed] = useState(ePet?.breed?ePet?.breed:"");
  const [weight, setWeight] = useState(ePet?.weight?ePet?.weight:"");
  const [height, setHeight] = useState(ePet?.height?ePet?.height:"");
  const [color, setColor] = useState(ePet?.color?ePet?.color:"");
  const [hypoallergenic, setHypoallergenic] = useState(ePet?.hypoallergenic?ePet?.hypoallergenic:"");
  const [bio, setBio] = useState(ePet?.bio?ePet?.bio:"");
  const [dietary, setDietary] = useState(ePet?.dietary?ePet?.dietary:"");
  const { handleAddNewPet, handleEditPet } = usePetContext();

  return (
    <div className="w-100 d-flex justify-content-center">
      <div className="d-flex flex-column align-items-center rounded w-75 rounded">
        <span className="fs-3 text-success"><b>{ePet?'Edit a pet':'Add a new pet'}</b></span>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <div className="d-flex flex-column">
          <InputLabel color="success" id="demo-simple-select-helper-label">
                Type
              </InputLabel>
              <Select
              className="mt-1 me-1"
                color="success"
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={petType}
                // inputProps={{width: "100%"}}
                label="Type"
                onChange={(e) => {
                  setType(e.target.value);
                }}
              >
                <MenuItem value={"Dog"}>Dog</MenuItem>
                <MenuItem value={"Cat"}>Cat</MenuItem>
              </Select>
            <div>
              <TextField
                className="mt-1 me-1"
                id="outlined-basic"
                label="New pet's name"
                variant="outlined"
                value={petName}
                onChange={(e) => {
                  setPetName(e.target.value);
                }}
                color="success"
              />
              <TextField
                className="mt-1 me-1"
                id="outlined-basic"
                label="Breed"
                variant="outlined"
                value={breed}
                onChange={(e) => {
                  setBreed(e.target.value);
                }}
                color="success"
              />
            </div>
            <div>
            <TextField
              className="mt-1 me-1"
              id="outlined-basic"
              label="Height"
              variant="outlined"
              value={height}
              onChange={(e) => {
                setHeight(e.target.value);
              }}
              color="success"
            />
            <TextField
              className="mt-1 me-1"
              id="outlined-basic"
              label="Weight"
              variant="outlined"
              value={weight}
              onChange={(e) => {
                setWeight(e.target.value);
              }}
              color="success"
            />
               </div>
               <div>
            <TextField
              className="mt-1 me-1"
              id="outlined-basic"
              label="Color"
              variant="outlined"
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
              }}
              color="success"
            />
            <TextField
              className="mt-1 me-1"
              id="outlined-basic"
              label="Hypoallergenic"
              variant="outlined"
              value={hypoallergenic}
              onChange={(e) => {
                setHypoallergenic(e.target.value);
              }}
              color="success"
            />
            </div>
            <TextField
              className="mt-1 me-1"
              id="outlined-basic"
              label="Bio"
              variant="outlined"
              value={bio}
              onChange={(e) => {
                setBio(e.target.value);
              }}
              color="success"
            />
            <TextField
              className="mt-1 me-1"
              id="outlined-basic"
              label="Dietary"
              variant="outlined"
              value={dietary}
              onChange={(e) => {
                setDietary(e.target.value);
              }}
              color="success"
            />
            <Button
                className="mt-1 me-1"
              color="success"
              variant="contained"
              onClick={() => {
               !ePet && handleAddNewPet(
                  petName,
                  petType,
                  breed,
                  weight,
                  height,
                  color,
                  hypoallergenic,
                  bio,
                  dietary
                );
                ePet && handleEditPet(
                  petName,
                  petType,
                  breed,
                  weight,
                  height,
                  color,
                  hypoallergenic,
                  bio,
                  dietary
                )
                setBio("");
                setBreed("");
                setColor("");
                setDietary("");
                setHeight("");
                setHypoallergenic("");
                setPetName("");
                setType("");
                setWeight("");
              }}
            >
              <PetsIcon
                className="mb-1 me-2"
                sx={{
                  color: yellow[50],
                }}
              />
              <span>{ePet? 'Save Pet':'Add Pet'}</span>
            </Button>
          </div>
        </FormControl>
      </div>
    </div>
  );
}
