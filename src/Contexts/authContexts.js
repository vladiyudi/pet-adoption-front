import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { usePetContext } from "./petContext";

export const baseUrl = 'http://localhost:8080'

const authConext = createContext();
export function useAuthContext() {
  return useContext(authConext);
}

export default function AuthContexts({ children }) {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const[errorSignup, setErrorSignUp] = useState('');
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('currentUser')? JSON.parse(localStorage.getItem('currentUser')): {});
  const [errorLogin, setErrorLogin] = useState('');
  const [updateError, setUpdateError] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [editedUser, setEditedUser] = useState({})
  // const {updatePetStatus} = usePetContext();
  // console.log(updatePetStatus)

  useEffect(() => {
    if(currentUser){
      handleClose()
      localStorage.setItem('currentUser', JSON.stringify(currentUser))
    }
    getAllUsers()
  } , [currentUser]);


  const getAllUsers = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/users/all`);
      setAllUsers(res.data)
    } catch (error) {
      console.log(error);
    }
  }

  const openPrivatePage=(user)=>{
    setEditedUser(user)
    navigate(`/admin/${currentUser.userName}/${user.userName}`)
  }
   
  const handleLoginPage =  async (login, password) => {
    const loginUser = {email: login, password: password}
    try{
      const res = await axios.post(`${baseUrl}/api/users/login`, loginUser);
      setCurrentUser(res.data);
       navigate('/search')
    }catch(err){
      err.response.data.message ? setErrorLogin(err.response.data.message) : setErrorLogin(err.response.data)
      setTimeout(()=>{
        setErrorLogin('')
      }, 3000)
    }
  };

  function handleLogout(){
    setCurrentUser('');
  }

  const handleUpdateProfile = async (userName, lastName, email, phoneNumber, bio) =>{
    const updatedUser = {
      userName: userName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      bio: bio
    }
    try{
      const res = await axios.put(`${baseUrl}/api/users/${currentUser._id}`, updatedUser);
      setCurrentUser(res.data);
    }catch(err){
      err.response.data.message ? setUpdateError(err.response.data.message) : setUpdateError(err.response.data)
      setTimeout(()=>{
        setUpdateError('')
      }, 3000)
    }
  }

  const handleSignUp = async (user, signup, password1, password2) => {
    const newUser = {userName: user, email: signup, password1: password1, password2: password2}
try{
    const res = await axios.post(`${baseUrl}/api/users/signUp`, newUser)
    setCurrentUser(res.data)
    navigate('/search')
  }
    catch(err){
      err.response.data.message ? setErrorSignUp(err.response.data.message) : setErrorSignUp(err.response.data)
      setTimeout(()=>{
        setErrorSignUp('')
      }, 3000)
    }
  };

  const handleAddtoFavorites = async (pet) =>{
    const favoritePet = {petId: pet._id}
    try{
      const res = await axios.post(`${baseUrl}/api/users/${currentUser._id}/favorites`, favoritePet)
      setCurrentUser(res.data)
    }catch(err){
      console.log(err)
    }
  }

  const handleRemoveFromFavorites = async (pet) => {
    try{
    const res = await axios.delete(`${baseUrl}/api/users/${currentUser._id}/favorites/${pet._id}`)
    setCurrentUser(res.data)
  }catch(err){
      console.log(err)
    }
  }

  const handleAddToAdopted = async (pet) =>{
    const adoptedPet = {petId: pet._id}
    try{
      const res = await axios.post(`${baseUrl}/api/users/${currentUser?._id}/adopted`, adoptedPet)
      setCurrentUser(res.data)

    }catch(err){
      console.log(err)
    }
  }

  const returnPet = async (petId) =>{
    try{
      const res = await axios.delete(`${baseUrl}/api/users/${currentUser._id}/adopted/${petId}`)
      setCurrentUser(res.data)
    }catch(err){
      console.log(err)
    }
  }

  const fosterPet = async (petId) =>{
    try{
      const res = await axios.put(`${baseUrl}/api/users/${currentUser._id}/foster/${petId}`)
      setCurrentUser(res.data)
    }catch(err){
      console.log(err)
    }
  }

  return (
    <authConext.Provider
      value={{openPrivatePage, handleOpen, handleClose, open, handleLoginPage, handleSignUp, errorSignup, currentUser, errorLogin, handleLogout, handleUpdateProfile, updateError, allUsers, editedUser, handleAddtoFavorites, handleAddToAdopted, handleRemoveFromFavorites, returnPet, fosterPet}}
    >
      {children}
    </authConext.Provider>
  );
}
