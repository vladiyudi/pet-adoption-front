import React, { useState } from "react";
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
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SwipeableTemporaryDrawer from "./DropDown";
import DehazeIcon from '@mui/icons-material/Dehaze';

export default function NavBar() {
  const isMobile = useMediaQuery({ maxWidth: 700 });
  const { handleOpen, currentUser, handleLogout } = useAuthContext();

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const anchor = "top"

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  return (
    <div className="d-flex justify-content-center flex-column align-items-center">
      <div className="w-100  navBar d-flex justify-content-end align-items-center">
        <div className={currentUser?.userName ? "w-100" : "d-none"}>
          <span
            className={!isMobile ? "d-none" : "success"}
            onClick={
              toggleDrawer(anchor, true)
            }
          >
            <Button color="success">
              <DehazeIcon/>
            </Button>
            {/* <Hamburger color="#008000" className=""></Hamburger> */}
          </span>
          <div
            className={
              !isMobile ? "d-flex justify-content-between ms-2 " : "d-none"
            }
          >
            <div>
              <NavLink
                to={`/search`}
                className={({ isActive }) =>
                  isActive ? "text-success link" : "text-secondary link"
                }
              >
                <Button className="mb-1 ms-1" variant="standard">
                  <SearchIcon
                    sx={{
                      color: green[800],
                    }}
                  />
                  <span className="mt-1">search</span>
                </Button>
              </NavLink>
              <NavLink
                to={`/mypets`}
                className={({ isActive }) =>
                  isActive ? "text-success link" : "text-secondary link"
                }
              >
                <Button
                  color={"success"}
                  variant="standard"
                  className={currentUser ? "me-1 ms-1 h-75" : "d-none"}
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
            <div className="holder">
              <NavLink
                to={`/profile/${currentUser?.userName}`}
                className={({ isActive }) =>
                  isActive ? "text-success link" : "text-secondary link"
                }
              >
                <Button className="mb-1" variant="standard">
                  <ManageAccountsIcon
                    sx={{
                      color: green[800],
                    }}
                  />
                  <span className="mt-1 ms-1">account</span>
                </Button>
              </NavLink>
              <NavLink
                to={`/admin`}
                className={({ isActive }) =>
                  isActive ? "text-success link" : "text-secondary link"
                }
              >
                <Button
                  color={"success"}
                  variant="standard"
                  className={currentUser?.admin ? "me-1 ms-1 h-75" : "d-none"}
                >
                  <AdminPanelSettingsIcon
                    className="mb-1 me-1"
                    sx={{
                      color: green[800],
                    }}
                  />
                  <span>Admin</span>
                </Button>
              </NavLink>
            </div>
          </div>

          <SwipeableTemporaryDrawer toggleDrawer={toggleDrawer} state={state} anchor={anchor}/>
        </div>
        <Button
          onClick={handleOpen}
          color={"success"}
          variant="contained"
          className={currentUser?.userName ? "d-none" : "me-2 h-75"}
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
          onClick={() => {
            handleLogout(currentUser._id);
          }}
          color={"success"}
          variant="outlined"
          className={currentUser?.userName ? "me-2 h-75" : "d-none"}
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
