import {io } from "socket.io-client";
import { useRef } from "react";
import { API } from "../api";

const SOCKET_URL = API;
export const useSocket = ()=>{

    const socketRef = useRef();

    if(!socketRef.current){
        socketRef.current = io(SOCKET_URL,{
            transports: ['websocket' ],
        });
    }

    return socketRef.current
}