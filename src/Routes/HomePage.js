import React from 'react'
import adopt from './adopt.jpg'

export default function HomePage() {
  return (
    <div className='d-flex justify-content-evenly flex-column align-items-center homeContainer'>
    <span className='mt-5 w-50'>9 out of 10 pet owners consider their  <b>pet</b> to be <b>familiy member</b></span>
      <img src = {adopt} className='w-75 mt-2'/>
    </div>
  )
}
