import React, { useEffect } from 'react'
import PetCard from '../Components/PetCard'
import { usePetContext } from '../Contexts/petContext'
import { useAuthContext } from '../Contexts/authContexts'
import { useState } from 'react'
import { Button } from '@mui/material'
import { nanoid } from 'nanoid'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';


export default function MyPets() {

  const [interested, setInerested] = useState(true)
  const [adopted, setAdopted] = useState(false)
  const [fostered, setFostered] = useState(false)

  const {pets} = usePetContext();
  const {currentUser} = useAuthContext();

  const favorite = pets?.filter(pet=>{
    return currentUser.interested?.includes(pet?._id)
  })

  const adoptedList = pets?.filter(pet=>{
    const match = currentUser.adoptedPets?.filter(adopted=>adopted===pet?._id)
    return pet?._id===match[0]
  } )

  const fosteredList = pets?.filter(pet=>{
    const match = currentUser.fosteredPets?.filter(fostered=>fostered===pet?._id)
    return pet?._id===match[0]
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
>
  <CheckRoundedIcon className={interested?'undefined':'d-none'}/>
  <span className='ms-1'>Interested</span>
  </Button>
<Button 
className='mb-2' color={'success'}
onClick={()=>{
  setAdopted(false)
  setFostered(true)
  setInerested(false)
}}
>
<CheckRoundedIcon className={fostered?'undefined':'d-none'}/>
<span className='ms-1'> Fostered</span> 
  </Button>
  <Button className='mb-2' color={'success'}
onClick={()=>{
  setAdopted(true)
  setFostered(false)
  setInerested(false)
}}
>
<CheckRoundedIcon className={adopted?'undefined':'d-none'}/>
  <span className='ms-1'>  Adopted</span>
  </Button>
</div>
<div className={interested?'w-100 d-flex flex-wrap justify-content-center mt-4':'d-none'}>
<span className={!favorite?.length?'undefined':'d-none'}>Currently you're not interested in any pets</span>
{favorite?.map(pet => <PetCard key={nanoid()} pet={pet} admin={false}/>)}
</div>
<div className={fostered?'w-100 d-flex flex-wrap justify-content-center mt-4':'d-none'}>
<span className={!fosteredList?.length?'undefined':'d-none'}>Currently you don't foster any pets</span>
{fosteredList?.map(pet => <PetCard key={nanoid()} pet={pet} admin={false}/>)}
</div>
<div className={adopted?'w-100 d-flex flex-wrap justify-content-center mt-4':'d-none'}>
<span className={!adoptedList?.length?'undefined':'d-none'}>Currently you don't adopt any pets</span>
{adoptedList?.map(pet => <PetCard key={nanoid()} pet={pet} admin={false}/>)}
</div>
    </div>
  )
}
