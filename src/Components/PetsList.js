import React from 'react'
import { usePetContext } from "../Contexts/petContext";
import PetCard from './PetCard';

export default function PetsList() {
    const {pets} = usePetContext();
  
  return (
    <div className='mt-5 d-flex flex-wrap justify-content-center'>{
        pets.map(pet => {
            return <PetCard key={pet._id} pet={pet} admin={false} modal={false}/>
        })
    }</div>
  )
}
