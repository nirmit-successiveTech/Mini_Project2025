"use client"
import { createContext, useContext, useEffect, useState } from "react";

const userContext = createContext();
export const userAuth =()=>useContext(userContext)

export default function UserProvider({ children }) {

    const [myuserId,setMyuserId]=useState(null)

    useEffect(()=>{
        const loggedInUserId = localStorage.getItem("loggedUserId");
        if(loggedInUserId){
            setMyuserId(loggedInUserId);
        } else {
            console.log("No user is logged in.");
        }
    },[])

    const login=(userid)=>{
        localStorage.setItem("loggedUserId",userid)
        setMyuserId(userid)
    }

    const logout=()=>{
        localStorage.removeItem("loggedUserId");
        setMyuserId(null);
    }

  return (
    <userContext.Provider value={{login,logout,myuserId}}>
        {children}
    </userContext.Provider>
  )
}