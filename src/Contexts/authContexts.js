import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { usePetContext } from "./petContext";
import { Cookies } from "react-cookie";

export const baseUrl = "http://localhost:8080";

const authConext = createContext();
export function useAuthContext() {
  return useContext(authConext);
}

export default function AuthContexts({ children }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [errorSignup, setErrorSignUp] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [errorLogin, setErrorLogin] = useState("");
  const [updateError, setUpdateError] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  // const [editedUser, setEditedUser] = useState({});
  const [hello, setHello] = useState("");

  useEffect(() => {
    verifyUser();
  }, []);

  const verifyUser = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/users/verify`, {
        withCredentials: true,
      });
      setCurrentUser(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const getAllUsers = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/users/all`, {
        withCredentials: true,
      });
      setAllUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const openPrivatePage = (user) => {
    // setEditedUser(user);
    navigate(`/${user._id}`);
  };

  const handleLoginPage = async (login, password) => {
    const loginUser = { email: login, password: password };
    try {
      const res = await axios.post(`${baseUrl}/api/users/login`, loginUser, {
        withCredentials: true,
      });
      const { user } = res.data;
      setCurrentUser(user);
      handleClose();
      navigate("/search");
    } catch (err) {
      err.response.data.message
        ? setErrorLogin(err.response.data.message)
        : setErrorLogin(err.response.data);
      setTimeout(() => {
        setErrorLogin("");
      }, 3000);
    }
  };

  async function handleLogout() {
    try {
      const res = await axios.get(`${baseUrl}/api/users/logout/`, {
        withCredentials: true,
      });
      const { ok } = res.data;
      if (ok) {
        setCurrentUser({});
        navigate("/");
      }
    } catch (err) {
      console.log(err.response.data);
    }
    setCurrentUser("");
  }

  const handleUpdateProfile = async (
    userName,
    lastName,
    email,
    phoneNumber,
    bio,
    userid
  ) => {
    const updatedUser = {
      userName: userName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      bio: bio,
      _id: userid,
    };
    try {
      const res = await axios.put(`${baseUrl}/api/users/update`, updatedUser, {
        withCredentials: true,
      });
      setCurrentUser(res.data);
    } catch (err) {
      err.response.data.message
        ? setUpdateError(err.response.data.message)
        : setUpdateError(err.response.data);
      setTimeout(() => {
        setUpdateError("");
      }, 3000);
    }
  };

  const handleSignUp = async (user, signup, password1, password2) => {
    const newUser = {
      userName: user,
      email: signup,
      password1: password1,
      password2: password2,
    };
    try {
      const res = await axios.post(`${baseUrl}/api/users/signUp`, newUser);
      setHello(res.data);
      handleClose();
      // navigate('/search')
    } catch (err) {
      err.response.data.message
        ? setErrorSignUp(err.response.data.message)
        : setErrorSignUp(err.response.data);
      setTimeout(() => {
        setErrorSignUp("");
      }, 3000);
    }
  };

  const handleAddtoFavorites = async (pet) => {
    const favoritePet = { petId: pet._id };
    try {
      const res = await axios.post(
        `${baseUrl}/api/users/favorites`,
        favoritePet,
        { withCredentials: true }
      );
      setCurrentUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemoveFromFavorites = async (pet) => {
    try {
      const res = await axios.delete(
        `${baseUrl}/api/users/favorites/${pet._id}`,
        { withCredentials: true }
      );
      setCurrentUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddToAdopted = async (pet) => {
    const adoptedPet = { petId: pet._id };
    try {
      const res = await axios.post(`${baseUrl}/api/users/adopted`, adoptedPet, {
        withCredentials: true,
      });
      setCurrentUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const returnPet = async (petId) => {
    try {
      const res = await axios.delete(`${baseUrl}/api/users/adopted/${petId}`, {
        withCredentials: true,
      });
      setCurrentUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fosterPet = async (petId) => {
    try {
      const res = await axios.get(`${baseUrl}/api/users/foster/${petId}`, {
        withCredentials: true,
      });
      setCurrentUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSetAdmin = async (id) => {
    try {
      const res = await axios.get(`${baseUrl}/api/users/admin/${id}`, {
        withCredentials: true,
      });
      updateUsersList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemoveAdmin = async (id) => {
    try {
      const res = await axios.get(`${baseUrl}/api/users/remove/${id}`, {
        withCredentials: true,
      });
      updateUsersList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateUsersList = (updated) => {
    const updatedUsers = allUsers.map((user) => {
      if (updated._id === user._id) {
        return updated;
      } else return user;
    });
    setAllUsers(updatedUsers);
  };

  return (
    <authConext.Provider
      value={{
        openPrivatePage,
        handleOpen,
        handleClose,
        open,
        handleLoginPage,
        handleSignUp,
        errorSignup,
        currentUser,
        errorLogin,
        handleLogout,
        handleUpdateProfile,
        updateError,
        allUsers,
        // editedUser,
        handleAddtoFavorites,
        handleAddToAdopted,
        handleRemoveFromFavorites,
        returnPet,
        fosterPet,
        hello,
        getAllUsers,
        verifyUser,
        handleSetAdmin,
        handleRemoveAdmin,
      }}
    >
      {children}
    </authConext.Provider>
  );
}
