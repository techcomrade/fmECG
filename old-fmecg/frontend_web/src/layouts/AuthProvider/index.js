import { Children, useEffect } from "react";
import React from "react";
import { getLocalStorage, setLocalStorage } from "../../utils/storageUtils";
import { useNavigate } from "react-router-dom";
const authContext = React.createContext();
const AuthProvider = ({children}) => {
    // const navigate = useNavigate();
    useEffect(()=>{
        let token = getLocalStorage('token');
        if(token == null){
            setLocalStorage('token');
        }
        if(!token) window.location.assign('/login');
    },[getLocalStorage('token')])
    return (
        <authContext.Provider>
            {children}
        </authContext.Provider>
    )
}

export default AuthProvider;