import React from 'react'
import adopt from './adopt.jpg'
import { useAuthContext } from '../Contexts/authContexts'

export default function HomePage() {

  const {hello} = useAuthContext()

  return (
    <div className='d-flex justify-content-evenly flex-column align-items-center homeContainer'>
    <span className={!hello?.userName?'mt-5 w-50':'mt-5 w-50 text-warning'}>{hello?.userName? `Greetings, ${hello.userName} ${hello.lastName?hello.lastName:''}! \t Login to enter pet adoption agency` :`9 out of 10 pet owners consider their pet to be familiy member`}</span>
      <img src = {adopt} className='w-75 mt-2'/>
    </div>
  )
}
