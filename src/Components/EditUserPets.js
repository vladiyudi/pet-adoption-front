import React from 'react'
import { useAuthContext } from '../Contexts/authContexts'
import PetCard from './PetCard'
import { nanoid } from 'nanoid'
import { usePetContext } from '../Contexts/petContext'
import ProfileSetings from './ProfileSetings'

export default function EditUserPets() {

  const {editedUser} = useAuthContext()
  const {pets} = usePetContext()

const fostered = pets.filter(pet=>editedUser.fosteredPets?.includes(pet._id))
const adopted = pets.filter(pet=>editedUser.adoptedPets?.includes(pet._id))


  return (
    <div>
      <ProfileSetings user={editedUser}/>
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
