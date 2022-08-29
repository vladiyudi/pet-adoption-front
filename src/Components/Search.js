import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { usePetContext } from "../Contexts/petContext";
import Checkbox from '@mui/material/Checkbox';
import PetsIcon from '@mui/icons-material/Pets';
import { green } from '@mui/material/colors';
import { yellow } from '@mui/material/colors';
import { useAuthContext } from "../Contexts/authContexts";
import PetsList from "./PetsList";
import ChatButton from "./ChatButton";

export default function Search() {
  const [minHeight, setMinHeight] = useState("");
  const [maxHeight, setMaxHeight] = useState("");
  const [minWeight, setMinWeight] = useState("");
  const [maxWeight, setMaxWeight] = useState("");
  const [type, setType] = useState('')
  const [status, setStatus] = useState('')
  const [name, setName] = useState('')
  const [advanced, setAdvanced] = useState(false)
  const{currentUser} = useAuthContext()

  const { handleSearchForm, pets } = usePetContext();

  const handleMinHeight = (e) => {
    setMinHeight(e.target.value);
  };
  const handleMaxnHeight = (e) => {
    setMaxHeight(e.target.value);
  };
  const handleMinWeight = (e) => {
    setMinWeight(e.target.value);
  };
  const handleMaxWeight = (e) => {
    setMaxWeight(e.target.value);
  };
  const handleType = (e)=>{
    setType(e.target.value)
  }
  const handleStatus = (e)=>{
    setStatus(e.target.value)
  }
  const handleName = (e)=>{
    setName(e.target.value)
  }

  return (
    <div className=" d-flex justify-content-center flex-column align-items-center">
      <span className='mt-5 w-50 homeContainer mb-5'>{
      `Greetings, ${currentUser.userName} ${currentUser.lastName?currentUser.lastName:''},
       \t Look how cute they are!`}  </span>
      <div className=" d-flex justify-content-start searchBar align-items-center flex-column">
      <div className="align-self-end d-flex  align-items-center">
        <span className="advanced text-warning mt-2">Advanced search</span>
      <Checkbox icon={<PetsIcon 
      sx={{
        color: yellow[800],
      }}
      />} checkedIcon={<PetsIcon 
        sx={{
          color: green[800],
        }}
      />} onClick={()=>{setAdvanced(!advanced)}}/>
      </div>
        <FormControl
          color="success"
          variant="standard"
          sx={{ minWidth: 120, margin: 0, width: 350 }}
        >
          <InputLabel id="demo-simple-select-standard-label">Type</InputLabel>
          <Select 
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
              value={type}
              onChange={handleType}
            label="Type"
          >
            <MenuItem value="" >
              All
            </MenuItem >
            <MenuItem value={'Dog'} >Dog</MenuItem>
            <MenuItem value={'Cat'} >Cat</MenuItem>
          </Select>
        </FormControl>
        <div className={advanced?"d-flex flex-column":'d-none'}>
        <FormControl
          color="success"
          variant="standard"
          sx={{ minWidth: 120, margin: 0, width: 350 }}
        >
          <InputLabel id="demo-simple-select-standard-label">
            Adoption status
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={status}
            onChange={handleStatus}
            label="Status"
          >
            <MenuItem value="" >
              All
            </MenuItem >
            <MenuItem value={'Available'} >Available</MenuItem>
            <MenuItem value={'Fostered'} >Fostered</MenuItem>
            <MenuItem value={'Adopted'} >Adopted</MenuItem>
          </Select>
        </FormControl>
        <TextField
          sx={{ minWidth: 120, margin: 0, width: 350 }}
          color="success"
          id="outlined-basic"
          label="Name"
          variant="standard"
          onChange={handleName}
          value={name}
        />
        <div className="d-flex justify-content-between">
          <TextField
            value={minHeight}
            color={minHeight <= 10 || !minHeight ? "success" : "warning"}
            id="standard-number"
            label={
              minHeight <= 10 || !minHeight
                ? "Min height"
                : "only between 1 and 10"
            }
            type="number"
            InputProps={{ inputProps: { min: 0, max: 10 } }}
            variant="standard"
            className="me-3 w-50"
            onChange={handleMinHeight}
          />
          <TextField
            value={maxHeight}
            color={maxHeight <= 100 || !maxHeight ? "success" : "warning"}
            id="standard-number"
            label={
              maxHeight <= 100 || !maxHeight
                ? "Max height"
                : "only between 1 and 100"
            }
            type="number"
            variant="standard"
            InputProps={{ inputProps: { min: 0, max: 100 } }}
            onChange={handleMaxnHeight}
            className={'w-50'}
          />
        </div>
        <div className="d-flex">
          <TextField
            value={minWeight}
            color={minWeight <= 10 || !minWeight ? "success" : "warning"}
            id="standard-number"
            label={
              minWeight <= 10 || !minWeight
                ? "Min weight"
                : "only between 1 and 10"
            }
            type="number"
            variant="standard"
            className="me-3 w-50"
            onChange={handleMinWeight}
            InputProps={{ inputProps: { min: 0, max: 10 } }}
          />
          <TextField
            value={maxWeight}
            color={maxWeight <= 100 || !maxWeight ? "success" : "warning"}
            id="standard-number"
            label={
              maxWeight <= 100 || !maxWeight
                ? "Max weight"
                : "only between 1 and 100"
            }
            type="number"
            variant="standard"
            onChange={handleMaxWeight}
            InputProps={{ inputProps: { min: 0, max: 100 } }}
            className='w-50'
          />
        </div>
        </div>
        <Button className="mt-4" color="success" variant="outlined" 
        onClick={()=>{handleSearchForm(minHeight, maxHeight, minWeight, maxWeight, type, status, name)

        }}>
          <PetsIcon className="mb-1 me-2"
      sx={{
        color: green[800],
      }}
      />
       <span> Search</span>
        </Button>
      </div>
      
      <PetsList/>
      <ChatButton/>
    </div>
  );
}
