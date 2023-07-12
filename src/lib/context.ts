
import { createContext } from "react";

export default createContext({
    user:{
        token: "",
        userName:""
    },
    setUser:(user:any)=> {}
});