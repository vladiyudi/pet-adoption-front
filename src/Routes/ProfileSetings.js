import { Avatar } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import { TextField } from "@mui/material";
import { useAuthContext } from "../Contexts/authContexts";
import { useState } from "react";
import Button from "@mui/material/Button";
import { yellow, green } from "@mui/material/colors";
import PetsIcon from "@mui/icons-material/Pets";
import { useMediaQuery } from 'react-responsive'

export default function ProfileSetings() {
  const { currentUser, handleUpdateProfile } = useAuthContext();
  const [userName, setUserName] = useState(currentUser.userName);
  const [email, setEmail] = useState(currentUser.email);
  const [lastName, setLastName] = useState(currentUser.lastName? currentUser.lastName: '');
  const [phone, setPhone] = useState(currentUser.phoneNumber? currentUser.phoneNumber: '');
  const [bio, setBio] = useState(currentUser.bio? currentUser.bio : '');

  const isMobile = useMediaQuery({ maxWidth: 767 })

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className={!isMobile?" d-flex flex-column updateForm": 'd-flex flex-column updateSmallForm'}>
        <div>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar
              alt="Remy Sharp"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFCRjSzyP6tm4c_Ic1ezyqvS86fiye3dvYn31xgP_U8-wUKLwcidDMxHWQTNwSWULPvo4&usqp=CAU"
              sx={{ width: 150, height: 150 }}
            />
          </StyledBadge>
        </div>
        <div className=" d-flex flex-column mt-4">
          <TextField
            id="standard-basic"
            label="First name"
            variant="standard"
            value={userName}
            color="success"
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Last name"
            variant="standard"
            value={lastName}
            color="success"
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Email"
            variant="standard"
            value={email}
            color="success"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Phone number"
            variant="standard"
            value={phone}
            color="success"
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            multiline
            rows={4}
            id="standard-basic"
            label="Bio"
            variant="standard"
            value={bio}
            color="success"
            onChange={(e) => setBio(e.target.value)}
          />
          <Button
            className="mt-4 align-self-center"
            color="success"
            variant="contained"
            onClick={() => {handleUpdateProfile(userName, lastName, email, phone, bio)
          }
            }
          >
            <PetsIcon
              className="mb-1 me-2"
              sx={{
                color: yellow[50],
              }}
            />
            <span>Update profile</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
