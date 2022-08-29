import { Button, TextField } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
// import io from "socket.io-client";
import { baseUrl } from "../Contexts/authContexts";
import TelegramIcon from "@mui/icons-material/Telegram";
import { nanoid } from "nanoid";
import { createRef } from "react";
import { useAuthContext } from "../Contexts/authContexts";
import socket from "./socket";


export default function Chat({ chat }) {

  const [message, setMessage] = useState("");
  const [feed, setFeed] = useState([]);
  const messageRef = createRef();
  const {currentUser} = useAuthContext()


  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("disconnect", () => {
      console.log("disconnected");
    });
    socket.on("message", (data) => {
      console.log(data);
      setFeed((state)=>[...state, data]);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      // socket.off("message");
    };
  }, []);

  const scrollToBottom = () => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {scrollToBottom()}, [feed])

  const handleChatMessage = (e) => {
    socket.emit("message", {message: message, user: currentUser.userName});
  };
  return (
    <div className="d-flex flex-column align items center justify-content-between h-100">
      <div className="wrap mb-3" >
        {feed?.map(message => {
          return <div key={nanoid()} className={''}>
            <div className={'border rounded p-2 mt-1 bg-primary text-white inline-block'}>   {message.message}</div>
            <div className="text-secondary fs-6">{message.user}</div>
            </div>;
        })}
        <div ref={messageRef}></div>
      </div>
      <div className="w-100 d-flex align-items-center justify-content-between">
        <TextField fullWidth 
        label="Enter a message" 
        id="fullWidth" 
         value={message}
         onChange={(e) => {
           setMessage(e.target.value);
         }}
         />
        <Button
          onClick={() => {
            handleChatMessage();
            setMessage("");
          }}
        >
          {" "}
          <TelegramIcon
            sx={{
              fontSize: 50,
            }}
          />{" "}
        </Button>
      </div>
    </div>
  );
}
