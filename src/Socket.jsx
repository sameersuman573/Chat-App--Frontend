import { createContext, useContext, useMemo } from "react";
import io from "socket.io-client";
import { Server } from "./Constants/Config";

// To access this socket in other files we will use context
// we donot want that our socket is created everytime so we will use Usememo hook

const SocketContext = createContext();
// created context provider



const getSocket = () => useContext(SocketContext);
// created context consumer
// If I will call this function in any file it will return the socket instance
 // wherever I will cal this function it will return teh socket instance


const SocketProvider = ({ children }) => { const socket = 
  useMemo(() => io(`${Server}`, {
        withCredentials: true}),
    []
  );

  console.log(socket);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketProvider, getSocket };
 



