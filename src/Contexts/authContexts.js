import { createContext, useContext, useEffect, useState } from "react";
import React from "react";

const authConext = createContext();
export function useAuthContext() {
  return useContext(authConext);
}

export default function AuthContexts({ children }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleLoginPage = (login, password) => {
    console.log(login, password);
  };
  const handleSignUp = (signup, password1, password2) => {
    console.log(signup, password1, password2);
  };

  return (
    <authConext.Provider
      value={{ handleOpen, handleClose, open, handleLoginPage, handleSignUp }}
    >
      {children}
    </authConext.Provider>
  );
}
