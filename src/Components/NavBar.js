import React from "react";
import Button from "@mui/material/Button";
import { useAuthContext } from "../Contexts/authContexts";
import PetsIcon from "@mui/icons-material/Pets";
import { yellow, green } from "@mui/material/colors";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { NavLink } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { Sling as Hamburger } from "hamburger-react";
import { useMediaQuery } from "react-responsive";

export default function NavBar() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { handleOpen, currentUser, handleLogout } = useAuthContext();
  return (
    <div className="d-flex justify-content-center">
      <div className="w-75  navBar d-flex justify-content-end align-items-center">
        <div className={currentUser ? "w-100" : "d-none"}>
          <span className={!isMobile? "d-none":'success'}>
            <Hamburger color="#008000"></Hamburger>
          </span>
          <div
            className={!isMobile ? "d-flex justify-content-between" : "d-none"}
          >
            <div>
              <NavLink
                to={`/search`}
                className={({ isActive }) =>
                  isActive ? "text-success" : "text-secondary"
                }
              >
                <Button className="mb-1 ms-4" variant="standard">
                  <SearchIcon
                    sx={{
                      color: green[800],
                    }}
                  />
                  <span className="mt-1 ms-2">search</span>
                </Button>
              </NavLink>
              <NavLink
                to={`/mypets`}
                className={({ isActive }) =>
                  isActive ? "text-success" : "text-secondary"
                }
              >
                <Button
                  color={"success"}
                  variant="standard"
                  className={currentUser ? "me-2 ms-1 h-75" : "d-none"}
                >
                  <FavoriteIcon
                    className="mb-1 me-2"
                    sx={{
                      color: green[800],
                    }}
                  />
                  <span>My Pets</span>
                </Button>
              </NavLink>
            </div>
            <NavLink
              to={`/profile/${currentUser.userName}`}
              className={({ isActive }) =>
                isActive ? "text-success" : "text-secondary"
              }
            >
              <Button className="mb-1" variant="standard">
                <ManageAccountsIcon
                  sx={{
                    color: green[800],
                  }}
                />
                <span className="mt-1 ms-2">account</span>
              </Button>
            </NavLink>
          </div>
        </div>
        <Button
          onClick={handleOpen}
          color={"success"}
          variant="contained"
          className={currentUser ? "d-none" : "me-2 h-75"}
        >
          <PetsIcon
            className="mb-1 me-2"
            sx={{
              color: yellow[50],
            }}
          />
          <span>Login</span>
        </Button>
        <Button
          onClick={handleLogout}
          color={"success"}
          variant="outlined"
          className={currentUser ? "me-2 h-75" : "d-none"}
        >
          <PetsIcon
            className="mb-1 me-2"
            sx={{
              color: green[800],
            }}
          />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
}