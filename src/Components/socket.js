import React from "react";
import io from "socket.io-client";
import { baseUrl } from "../Contexts/authContexts";


 const socket = io(baseUrl, {
    transports: ["websocket", "polling", "flashsocket"],
  });

  export default socket