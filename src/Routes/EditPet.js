import React from 'react'
import AddAndDysplayPet from '../Components/AddAndDysplayPet'
import { usePetContext } from '../Contexts/petContext'
import PetCard from '../Components/PetCard'
import { nanoid } from 'nanoid'

export default function EditPet() {
    const {ePet} = usePetContext()
  return (
    <div className='d-flex flex-column'>
    <div><AddAndDysplayPet ePet={ePet}/></div>
    <div className='align-self-center mt-4'> <PetCard pet={ePet} modal={false} admin={true}/></div>
    </div>
  )
}
