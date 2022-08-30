import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useAuthContext } from "../Contexts/authContexts";
import { TextField } from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useState, useEffect } from "react";
import FlutterDashIcon from "@mui/icons-material/FlutterDash";
import PetsIcon from "@mui/icons-material/Pets";
import { green } from "@mui/material/colors";
import FaceIcon from '@mui/icons-material/Face';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid green",
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const { handleClose, open, handleLoginPage, handleSignUp, errorSignup, errorLogin, hello} =
    useAuthContext();
  const [login, setLogin] = useState(true);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signUp, setSignUp] = useState("");
  const [signPass1, setSignPass1] = useState("");
  const [signPass2, setSignPass2] = useState("");
  const [user, setUser] = useState("");

  const handleLogin = () => {
    setLogin(!login);
  };
  const handleLoginEmail = (e) => {
    setLoginEmail(e.target.value);
  };
  const handleLoginPassword = (e) => {
    setLoginPassword(e.target.value);
  };
  const handleSignInput = (e) => {
    setSignUp(e.target.value);
  };
  const handleSignPassword1 = (e) => {
    setSignPass1(e.target.value);
  };
  const handleSignPassword2 = (e) => {
    setSignPass2(e.target.value);
  };

  const handleUser = (e) => {
    setUser(e.target.value);
  }

  useEffect (()=>{
    if (Object.keys(hello).length) {
      setLogin(true)}
  },[hello])

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="errorHolder">
          <div className="d-flex justify-content-evenly">
            <Button
              color="success"
              onClick={handleLogin}
              className={
                login ? "text-decoration-underline fw-bold" : "undefined"
              }
            >
              Login
            </Button>
            <Button
              className={
                !login ? "text-decoration-underline fw-bold" : "undefined"
              }
              color="success"
              onClick={handleLogin}
            >
              Sign up
            </Button>
          </div>
          <div className="danger">{errorSignup && errorSignup }</div>
          <div className="danger">{errorLogin && errorLogin }</div>
          </div>
          <div className={!login ? "d-none" : "undefined"}>
            <div className="d-flex align-items-center">
              <FlutterDashIcon className="me-3 mt-2" />
              <TextField
                color="success"
                id="outlined-basic"
                label="email"
                variant="standard"
                className="ms-2 w-75 mb-2"
                type="email"
                onChange={handleLoginEmail}
                value={loginEmail}
              />
            </div>
            <div className="d-flex align-items-center">
              <LockOpenIcon className="me-3 mb-1" />
              <TextField
                color="success"
                id="outlined-basic"
                label="password"
                variant="standard"
                className="ms-2 w-75 mb-4"
                type="password"
                onChange={handleLoginPassword}
                value={loginPassword}
              />
            </div>
            <div className="d-flex justify-content-center">
              <Button
                color="success"
                variant="outlined"
                className="mt-2"
                onClick={() => {
                  handleLoginPage(loginEmail, loginPassword);
                  setLoginEmail("");
                  setLoginPassword("");
                }}
              >
                <PetsIcon
                  className="mb-1 me-2"
                  sx={{
                    color: green[800],
                  }}
                />
                <span>Login</span>
              </Button>
            </div>
          </div>
          <div className={login  ? "d-none" : "undefined"}>
          <div className="d-flex align-items-center">
              <FaceIcon className="me-3 mt-2" />
              <TextField
                color="success"
                id="outlined-basic"
                label="user name"
                variant="standard"
                className="ms-2 w-75 mb-2"
                type="email"
                onChange={handleUser}
                value={user}
              />
            </div>
            <div className="d-flex align-items-center">
              <FlutterDashIcon className="me-3 mt-2" />
              <TextField
                color="success"
                id="outlined-basic"
                label="email"
                variant="standard"
                className="ms-2 w-75 mb-2"
                type="email"
                onChange={handleSignInput}
                value={signUp}
              />
            </div>
            <div className="d-flex align-items-center mb-2">
              <LockOpenIcon className="me-3 mt-3" />
              <TextField
                color="success"
                id="outlined-basic"
                label="password"
                variant="standard"
                className=" ms-2 w-75"
                type="password"
                onChange={handleSignPassword1}
                value={signPass1}
              />
            </div>
            <div className="d-flex align-items-center mb-4">
              <LockOpenIcon className="me-3 mt-3 mb-3" />
              <TextField
                color="success"
                id="outlined-basic"
                label="password"
                variant="standard"
                className="ms-2 w-75 mb-3"
                type="password"
                onChange={handleSignPassword2}
                value={signPass2}
              />
            </div>
            <div className="d-flex justify-content-center">
              <Button
                color="success"
                variant="outlined"
                onClick={() => {
                  handleSignUp(user, signUp, signPass1, signPass2);
                  setUser("");
                  setSignPass1("");
                  setSignPass2("");
                  setSignUp("");
                }}
              >
                <PetsIcon
                  className="mb-1 me-2"
                  sx={{
                    color: green[800],
                  }}
                />
                <span>SIGN UP</span>
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
