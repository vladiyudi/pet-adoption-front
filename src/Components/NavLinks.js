import React from "react";
import Button from "@mui/material/Button";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { NavLink } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { green } from "@mui/material/colors";
import { useAuthContext } from "../Contexts/authContexts";

export default function NavLinks() {
const {currentUser} = useAuthContext()
  return (
    <div
      className='d-flex flex-column border align-self'
    >
      <div className="d-flex flex-column">
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
      <div className="d-flex flex-column">
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
  );
}
