import React, { useEffect } from 'react'
import PetCard from '../Components/PetCard'
import PetsList from '../Components/PetsList'
import { usePetContext } from '../Contexts/petContext'

export default function MyPets() {

  // const {pets} = usePetContext();

  useEffect(() => {},[])

  return (
    <div className='mt-5 d-flex justify-content-center'>
      <div className={<PetsList />?'d-none':'undefined'}>You currently do not own or foster any pets.</div>
      <PetsList />
    </div>
  )
}
