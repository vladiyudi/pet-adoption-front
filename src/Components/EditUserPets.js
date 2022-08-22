import React from 'react'
import { useAuthContext } from '../Contexts/authContexts'
import PetCard from './PetCard'
import { nanoid } from 'nanoid'
import { usePetContext } from '../Contexts/petContext'

export default function EditUserPets() {

  const {editedUser} = useAuthContext()
  const {pets} = usePetContext()
  console.log(pets)

const fostered = pets.filter(pet=>editedUser.fosteredPets?.includes(pet._id))
const adopted = pets.filter(pet=>editedUser.adoptedPets?.includes(pet._id))


  return (
    <div>
    <div><span>Fostered</span>
    <div>{
     fostered.map(pet=><PetCard key={nanoid()} pet={pet} modal={false}/>)
      }</div>
    </div>
    <div><span>Adopted</span>
    <div>{
     adopted.map(pet=><PetCard key={nanoid()} pet={pet} modal={false}/>)
      }</div>
    </div>
    </div>
  )
}
