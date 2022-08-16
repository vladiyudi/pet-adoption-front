import React from 'react'
import { TextField } from '@mui/material'
import { Button } from '@mui/material'
import { useState } from 'react'
import { usePetContext } from '../Contexts/petContext'

export default function AddAndDysplayPet() {
    const [petName, setPetName] = useState('')
    const [petType, setType] = useState('')
    const [breed, setBreed] = useState('')
    const [weight, setWeight] = useState('')
    const [height, setHeight] = useState('')
    const [color, setColor] = useState('')
    const [hypoallergenic, setHypoallergenic] = useState('')
    const [bio, setBio] = useState('')
    const [dietary, setDietary] = useState('')
const {handleAddNewPet} = usePetContext()

  return (
    <div className='d-flex flex-column align-items-center'>
       <span>Add a new pet</span> 
       <div className='d-flex flex-wrap'>
       <TextField id="outlined-basic" label="New pet's name" variant="outlined" value={petName} onChange={(e)=>{setPetName(e.target.value)}}/>
       <TextField id="outlined-basic" label="New pet's type" variant="outlined" value={petType} onChange={(e)=>{setType(e.target.value)}}/>
       <TextField id="outlined-basic" label="Breed" variant="outlined" value={breed} onChange={(e)=>{setBreed(e.target.value)}}/>

       <TextField id="outlined-basic" label="Height" variant="outlined" value={height} onChange={(e)=>{setHeight(e.target.value)}}/>

       <TextField id="outlined-basic" label="Weight" variant="outlined" value={weight} onChange={(e)=>{setWeight(e.target.value)}}/>

       <TextField id="outlined-basic" label="Color" variant="outlined" value={color} onChange={(e)=>{setColor(e.target.value)}}/>
       <TextField id="outlined-basic" label="Hypoallergenic" variant="outlined" value={hypoallergenic} onChange={(e)=>{setHypoallergenic(e.target.value)}}/>
       <TextField id="outlined-basic" label="Bio" variant="outlined" value={bio} onChange={(e)=>{setBio(e.target.value)}}/>
       <TextField id="outlined-basic" label="Dietary" variant="outlined" value={dietary} onChange={(e)=>{setDietary(e.target.value)}}/>
       <Button onClick={()=>{
        handleAddNewPet(petName, petType, breed, weight, height, color, hypoallergenic, bio, dietary)
       }}>Update</Button>
       </div>
    </div>
  )
}
