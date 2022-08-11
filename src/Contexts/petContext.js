import React from 'react'
import { createContext, useContext, useState } from "react";

const petContext = createContext();
export function usePetContext() {
  return useContext(petContext);
}

export default function PetContext({children}) {

    const handleSearchForm = (minHeight, maxHeight, minWeight, maxWeight, type, status, name)=>{
      const searchInput = {
        name: name,
        type: type,
        status: status,
        minHeight: minHeight,
        maxHeight: maxHeight,
        minWeight: minWeight,
        maxWeight: maxWeight
      }
      console.log(searchInput)
    }


  return (
    <petContext.Provider 
    value={{handleSearchForm}}
    >
    {children}
    </petContext.Provider>
  )
}
