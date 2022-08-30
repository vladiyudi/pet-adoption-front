import React, { useEffect } from "react";
import { Avatar, TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useState } from "react";
import { usePetContext } from "../Contexts/petContext";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { InputLabel } from "@mui/material";
import { yellow } from "@mui/material/colors";
import FormControl from "@mui/material/FormControl";
import PetsIcon from "@mui/icons-material/Pets";
import Form from "react-bootstrap/Form";
import { PropagateLoader } from "react-spinners";

export default function AddAndDysplayPet({ ePet, isMobile }) {
  const [petName, setPetName] = useState(ePet?.name ? ePet?.name : "");
  const [petType, setType] = useState(ePet?.type ? ePet?.type : "");
  const [breed, setBreed] = useState(ePet?.breed ? ePet?.breed : "");
  const [weight, setWeight] = useState(ePet?.weight ? ePet?.weight : "");
  const [height, setHeight] = useState(ePet?.height ? ePet?.height : "");
  const [color, setColor] = useState(ePet?.color ? ePet?.color : "");
  const [hypoallergenic, setHypoallergenic] = useState(
    ePet?.hypoallergenic ? ePet?.hypoallergenic : ""
  );
  const [bio, setBio] = useState(ePet?.bio ? ePet?.bio : "");
  const [dietary, setDietary] = useState(ePet?.dietary ? ePet?.dietary : "");
  const { handleAddNewPet, handleEditPet, loading } = usePetContext();
  const [picture, setPicture] = useState(null);
  const [preview, setPreview] = useState(null);

  const handlePictureUpload = (e) => {
    setPicture(e.target.files[0]);
  };

  useEffect(() => {
    if (!picture) {
      setPreview(null);
      return;
    }
    const obgUrl = URL.createObjectURL(picture);
    setPreview(obgUrl);
    return () => {
      URL.revokeObjectURL(obgUrl);
    };
  }, [picture]);

  return (
    <div className="w-100 d-flex justify-content-center">
      <div className="d-flex flex-column align-items-center rounded w-75 rounded">
        <span className="fs-3 text-success">
          <b>{ePet ? "Edit a pet" : "Add a new pet"}</b>
        </span>

        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <div className="mb-1 d-flex align-items-center">
            <Avatar
              src={preview ? preview : ePet?.picture || "undefined"}
              sx={{ width: 120, height: 120 }}
            ></Avatar>
            <div className="winp ms-3">
              <Form.Label>Upload Picture</Form.Label>
              <Form.Control type="file" onChange={handlePictureUpload} />
            </div>
          </div>
          <div className="d-flex flex-column">
            <InputLabel
              color="success"
              id="demo-simple-select-helper-label"
              className="inputLable"
            >
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
                className={isMobile ? "mt-1 me-1 w-100" : "mt-1 me-1"}
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
                className={isMobile ? "mt-1 me-1 w-100" : "mt-1 me-1"}
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
                className={isMobile ? "mt-1 me-1 w-100" : "mt-1 me-1"}
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
                className={isMobile ? "mt-1 me-1 w-100" : "mt-1 me-1"}
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
                className={isMobile ? "mt-1 me-1 w-100" : "mt-1 me-1"}
                id="outlined-basic"
                label="Color"
                variant="outlined"
                value={color}
                onChange={(e) => {
                  setColor(e.target.value);
                }}
                color="success"
              />
              <FormControl
                className={isMobile ? "mt-1 me-1 w-100" : "mt-1 me-1 control"}
              >
                <InputLabel id="demo-simple-select-label"  color="success">
                  Hypoallergenic
                </InputLabel>
                <Select
                 color="success"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={hypoallergenic}
                  label="Hypoallergenic"
                  onChange={(e) => {
                    setHypoallergenic(e.target.value);
                  }}
                >
                  <MenuItem value={true}>True</MenuItem>
                  <MenuItem value={false}>False</MenuItem>
                </Select>
              </FormControl>
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
                !ePet &&
                  handleAddNewPet(
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
                  );
                ePet &&
                  handleEditPet(
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
                  );
                setBio("");
                setBreed("");
                setColor("");
                setDietary("");
                setHeight("");
                setHypoallergenic("");
                setPetName("");
                setType("");
                setWeight("");
                setPreview("");
              }}
            >
              <PetsIcon
                className="mb-1 me-2"
                sx={{
                  color: yellow[50],
                }}
              />
              <span>{ePet ? "Save Pet" : "Add Pet"}</span>
            </Button>
          </div>
        </FormControl>
        <div className={loading ? "undefined" : "d-none"}>
          <PropagateLoader color="#ffb703" />
        </div>
      </div>
    </div>
  );
}
