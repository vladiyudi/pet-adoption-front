import { Avatar } from "@mui/material";
import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import { TextField } from "@mui/material";
import { useAuthContext } from "../Contexts/authContexts";
import { useState } from "react";
import Button from "@mui/material/Button";
import { yellow, green } from "@mui/material/colors";
import PetsIcon from "@mui/icons-material/Pets";
import { useMediaQuery } from "react-responsive";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";

export default function ProfileSetings({ user }) {
  const {
    handleUpdateProfile,
    updateError,
    currentUser,
    handleSetAdmin,
    handleRemoveAdmin,
  } = useAuthContext();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [admin, setAdmin] = useState(false);

  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    if(Object.keys(user).length){
    setUserName(user?.userName);
    setEmail(user?.email);
    setLastName(user?.lastName ? user?.lastName : "");
    setPhone(user?.phoneNumber ? user?.phoneNumber : "");
    setBio(user?.bio ? user?.bio : "");
    setAdmin(user?.admin ? true : false);
    }
  }, [user]);


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
      <div
        className={
          !isMobile
            ? " d-flex flex-column updateForm"
            : "d-flex flex-column updateSmallForm"
        }
      >
        <div className="d-flex align-items-center justify-content-between">
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
          <div>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    onClick={() => {
                      currentUser?.admin &&
                        admin === false &&
                        handleSetAdmin(user._id) &&
                        setAdmin(!admin);
                      currentUser?.admin &&
                        admin === true &&
                        handleRemoveAdmin(user._id) &&
                        setAdmin(!admin);
                    }}
                    checked={admin}
                    sx={{
                      color: green[800],
                      "&.Mui-checked": {
                        color: green[800],
                      },
                    }}
                  />
                }
                label="Admin"
              />
            </FormGroup>
          </div>
        </div>
        <div className=" d-flex flex-column mt-4">
          <TextField
            id="standard-basic"
            label="First name"
            variant="standard"
            value={userName}
            color="success"
            onChange={(e) => setUserName(e.target.value)}
            InputProps={{
              style: { color: green[900] },
            }}
          />
          <TextField
            id="standard-basic"
            label="Last name"
            variant="standard"
            value={lastName}
            color="success"
            onChange={(e) => setLastName(e.target.value)}
            InputProps={{
              style: { color: green[900] },
            }}
          />
          <TextField
            id="standard-basic"
            label="Email"
            variant="standard"
            value={email}
            color="success"
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              style: { color: green[900] },
            }}
          />
          <TextField
            id="standard-basic"
            label="Phone number"
            variant="standard"
            value={phone}
            color="success"
            onChange={(e) => setPhone(e.target.value)}
            InputProps={{
              style: { color: green[900] },
            }}
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
            InputProps={{
              style: { color: green[900] },
            }}
          />
          <Button
            className="mt-4 align-self-center"
            color="success"
            variant="contained"
            onClick={() => {
              handleUpdateProfile(
                userName,
                lastName,
                email,
                phone,
                bio,
                user._id
              );
            }}
          >
            <PetsIcon
              className="mb-1 me-2"
              sx={{
                color: yellow[50],
              }}
            />
            <span>Update profile</span>
          </Button>
          <span className="text-danger mt-4 align-self-center">
            {updateError}
          </span>
        </div>
      </div>
    </div>
  );
}
