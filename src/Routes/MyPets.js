import React, { useEffect } from 'react'
import PetCard from '../Components/PetCard'
import { usePetContext } from '../Contexts/petContext'
import { useAuthContext } from '../Contexts/authContexts'
import { useState } from 'react'
import { Button } from '@mui/material'
import { nanoid } from 'nanoid'


export default function MyPets() {

  const [interested, setInerested] = useState(true)
  const [adopted, setAdopted] = useState(false)
  const [fostered, setFostered] = useState(false)

  const {pets} = usePetContext();
  const {currentUser} = useAuthContext();

  const favorite = pets.filter(pet=>{
    return currentUser.interested?.includes(pet._id)
  })

  const adoptedList = pets.filter(pet=>{
    const match = currentUser.adoptedPets.filter(adopted=>adopted===pet._id)
    return pet._id===match[0]
  } )

  const fosteredList = pets.filter(pet=>{
    const match = currentUser.fosteredPets.filter(fostered=>fostered===pet._id)
    return pet._id===match[0]
  })


  return (
<div className='d-flex justify-content-center mt-3 flex-column align-items-center'>
<div>
<Button className='mb-2' color={'success'} 
onClick={()=>{
  setAdopted(false)
  setFostered(false)
  setInerested(true)
}}
>Interested</Button>
<Button className='mb-2' color={'success'}
onClick={()=>{
  setAdopted(true)
  setFostered(false)
  setInerested(false)
}}
>Adopted</Button>
<Button 
className='mb-2' color={'success'}
onClick={()=>{
  setAdopted(false)
  setFostered(true)
  setInerested(false)
}}
>Fostered</Button>
</div>
<div className={interested?'w-75 d-flex flex-wrap justify-content-center mt-4':'d-none'}>
{favorite.map(pet => <PetCard key={nanoid()} pet={pet} admin={false}/>)}
</div>
<div className={adopted?'w-75 d-flex flex-wrap justify-content-center mt-4':'d-none'}>
 
{adoptedList.map(pet => <PetCard key={nanoid()} pet={pet} admin={false}/>)}
</div>
<div className={fostered?'w-75 d-flex flex-wrap justify-content-center mt-4':'d-none'}>
{fosteredList.map(pet => <PetCard key={nanoid()} pet={pet} admin={false}/>)}
</div>
    </div>
  )
}
