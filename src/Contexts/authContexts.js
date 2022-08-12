import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import axios from 'axios';

const baseUrl = 'http://localhost:8080'

const authConext = createContext();
export function useAuthContext() {
  return useContext(authConext);
}

export default function AuthContexts({ children }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const[errorSignup, setErrorSignUp] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [errorLogin, setErrorLogin] = useState('');

  const handleLoginPage =  async (login, password) => {
    const loginUser = {email: login, password: password}
    try{
      const res = await axios.post(`${baseUrl}/api/users/login`, loginUser);
      setCurrentUser(res.data);
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

  const handleSignUp = async (user, signup, password1, password2) => {
    const newUser = {userName: user, email: signup, password1: password1, password2: password2}
try{
    const res = await axios.post(`${baseUrl}/api/users/signUp`, newUser)
    console.log(res.data)  
    setCurrentUser(res.data)
  }
    catch(err){
      err.response.data.message ? setErrorSignUp(err.response.data.message) : setErrorSignUp(err.response.data)
      setTimeout(()=>{
        setErrorSignUp('')
      }, 3000)
    }
  };
  return (
    <authConext.Provider
      value={{ handleOpen, handleClose, open, handleLoginPage, handleSignUp, errorSignup, currentUser, errorLogin, handleLogout}}
    >
      {children}
    </authConext.Provider>
  );
}
