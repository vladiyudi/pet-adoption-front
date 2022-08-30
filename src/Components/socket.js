import React from "react";
import io from "socket.io-client";
import { baseUrl } from "../Contexts/authContexts";


 const socket = io(baseUrl, {
    transports: ["websocket", "polling", "flashsocket"],
  });

  const nameSpace = io(`${baseUrl}/serverNews`, {transports: ["websocket", "polling", "flashsocket"]});

  export {nameSpace}

  export default socket