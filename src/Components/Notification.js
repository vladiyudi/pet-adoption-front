import React from 'react';
import Button from '@mui/material/Button';
import { SnackbarProvider, useSnackbar } from 'notistack';
import {nameSpace} from './socket'
import {useEffect} from 'react'
import axios from 'axios';
import {baseUrl} from '../Contexts/authContexts'

function MyApp() {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    nameSpace.on("connect", () => {
      console.log("connected");
    });
    nameSpace.on('message', async (data) => {
      // console.log(data)
      const pet = await getPet(data.documentKey._id)
      // let status = data?.updateDescription?.updatedFields?.adoptionStatus
      let display = ''
      if (pet?.adoptionStatus === 'Adopted') display = 'error'
        else if (pet?.adoptionStatus === 'Available') display = 'success'
        if (pet?.adoptionStatus === 'Fostered') display = 'warning'
      handleClickVariant(`${pet.type} ${pet.name} became ${pet.adoptionStatus}`, display)
    })
  }, []);

  const getPet = async (petId)=>{
    try{
        const res = await axios.get(`${baseUrl}/api/pets/find/${petId}`, {withCredentials: true})
        return res.data
    }catch (err){
        console.log(err)
    }
  }

  const handleClickVariant = (message, variant) => {
    enqueueSnackbar(message, { variant });
  };
}

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <MyApp />
    </SnackbarProvider>
  );
}
